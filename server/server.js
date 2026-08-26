const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);
const { generateID } = require('./functions');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Successfully connected!");
})

app.get("/:dataType", (req, res) => {
    const dataType = req.params.dataType;
    knex(dataType).select()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}));
})

app.post("/:dataType", async (req, res) => {
    const dataType = req.params.dataType;
    const body = req.body;
    console.log(req.body);
    const typePrefix = await knex("type_prefix").select("prefix").where({type: dataType}).first();
    const newID = generateID(typePrefix.prefix);
    const insertion = {
        ...body,
        id: newID,
    }
    
    console.log(`Trying to insert ${insertion.name} to ${dataType}`);

    knex(dataType).insert(insertion)
    .then(data => res.status(200).json({message: `Successfully inserted ${insertion.name} with ID ${insertion.id}`}))
    .catch(err => res.status(400).json({message: err}));
})

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})