const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);
require('dotenv').config();
const { generateID } = require('./functions');
const fs = require('fs/promises');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
})

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
        let tables = [];

        const pgResult = await knex.raw(
            `SELECT table_name FROM information_schema.tables
            WHERE table_schema = current_schema()`
        );
        tables = pgResult.rows.map(row => row.table_name);
        const fullDatabase = {};
        for (const table of tables) {
            fullDatabase[table] = await knex(table).select('*');
        }
        res.status(200).json(fullDatabase);
    } catch (err) {
        res.status(400).json({message: `Error loading database: ${err}`});
    }

    
})

app.get("/:dataType", (req, res) => {
    const dataType = req.params.dataType;
    knex(dataType).select()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}));
})

app.post("/:dataType", upload.single("image"), async (req, res) => {
    const dataType = req.params.dataType;
    const body = req.body;
    console.log(body);
    const responses = [];
    const typePrefix = await knex("type_prefix").select("prefix").where({type: dataType}).first();
    const newID = generateID(typePrefix.prefix);

    if (req.file) {
        const newImageID = generateID("IMG");
        const imageExtensions = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/gif": ".gif",
            "image/webp": ".webp",
        };

        const extension = imageExtensions[req.file.mimetype];
        if (!extension) {
            return res.status(400).json({ message: "Unsupported image type" });
        }

        try {
            console.log(body.image);
            await fs.writeFile(`data/images/${newImageID}${extension}`, req.file.buffer);
            console.log("Successfully wrote file to " + `data/images/${newImageID}${extension}`);
        } catch (err) {
            console.log(err);
        }
        body.image = newImageID;
    }

    const insertion = {
        ...body,
        id: newID,
    }

    try {
        console.log(`Trying to insert ${insertion.name} to ${dataType}`);
        await knex(dataType).insert(insertion);
        responses.push(`Successfully inserted ${insertion.name} with ID ${insertion.id}\n`)
    } catch (err) {
        responses.push(err + '\n');
    }

    res.status(200).json({message: responses})
});

app.patch("/:dataType/:id", async (req, res) => {
    const { dataType, id } = req.params;
    const body = req.body;
    
    console.log(`Trying to patch ${id} in ${dataType}`);

    knex(dataType).where({id: id}).update(body)
    .then(data => res.status(200).json({message: `Successfully updated ${id}`, data: body}))
    .catch(err => res.status(400).json({message: err}));
})

app.delete("/:dataType/:id", async (req, res) => {
    const { dataType, id } = req.params;
    console.log(`Trying to delete ${id} from ${dataType}`);
    knex(dataType).where({id: id}).delete()
    .then(data => res.status(200).json({message: `Successfully deleted ${id} from ${dataType}`}))
    .catch(err => res.status(400).json({message: err}));
})

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})