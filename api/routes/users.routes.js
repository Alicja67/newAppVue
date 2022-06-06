const express = require('express');
const Users = require('../models/users.model');

const router = express.Router();

//GET ALL CONTACTS
router.get('/', async (req, res) => {
  try {
    const allData = await Users.find();
    console.log(allData.length);
    if(allData.length === 0) {
      res.status(404).json({message: 'There are no users in DB'});
    } else {
      res.status(200).json(allData);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
