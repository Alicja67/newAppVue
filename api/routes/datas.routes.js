const express = require('express');
const Datas = require('../models/datas.model');

const router = express.Router();

//GET ALL DATA
router.get('/', async (req, res) => {
  try {
    const allData = await Datas.find();
    console.log(allData.length);
    if(allData.length === 0) {
      res.status(404).json({message: 'Data not found'});
    } else {
      res.status(200).json(allData);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
