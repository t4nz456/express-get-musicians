const express = require("express");
const { Musician } = require("../models/index")
const router = express.Router();

router.get("/", async (req, res) => {
    const musician = await Musician.findAll();
    res.json(musician);
})

router.post("/", async (req, res) => {
    const data =  await Musician.create(req.body);
    res.json(data);
})

router.put("/:id", async (req, res) => {
    const find = await Musician.update(req.body, {where: {id: req.params.id}});
    res.json(find);
})

router.delete("/:id", async (req, res) => {
    const data = await Musician.destroy({where: {id: req.params.id}});
    res.json(data);
})

router.get("/musicians", async (req, res) => {
    const data = req.params.id;
    const data2 = await Musician.findByPk(data);
    res.json(data2);
})

module.exports = router;