const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/musicians", async (req, res) => {
    const musician = await Musician.findAll();
    res.json(musician);
})

app.post("/musicians", async (req, res) => {
    const data =  await Musician.create(req.body);
    res.json(data);
})

app.put("/musicians/:id", async (req, res) => {
    const find = await Musician.update(req.body, {where: {id: req.params.id}});
    res.json(find);
})

app.delete("/musicians/:id", async (req, res) => {
    const data = await Musician.destroy({where: {id: req.params.id}});
    res.json(data);
})

app.get("/musicians", async (req, res) => {
    const data = req.params.id;
    const data2 = await Musician.findByPk(data);
    res.json(data2);
})






module.exports = app;