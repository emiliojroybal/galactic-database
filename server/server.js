const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);

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


app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})