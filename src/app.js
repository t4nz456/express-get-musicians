const express = require("express");
const app = express();
const router2 = require("/.routes/musicians");
const router3 = require("/.routes/bands");
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/musicians", router2);
app.use("/bands", router3);







module.exports = app;