const express = require('express');
const Datas = require('../models/datas.model');

const router = express.Router();

//GET ALL DATA
router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Datas.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
