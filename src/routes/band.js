const express = require('express');
const { Band, Musician } = require('../models');
const router = express.Router();

router.get('/bands', async (req, res) => {
  const bands = await Band.findAll({
    include: {
      model: Musician,
    },
  });
  res.json(bands);
});

router.get('/bands/:id', async (req, res) => {
    const bandId = req.params.id;
    const band = await Band.findByPk(bandId, {
      include: {
        model: Musician,
      },
    });
    res.json(band);
  });

  

module.exports = router;
