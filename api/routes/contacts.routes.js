const express = require('express');
const Contacts = require('../models/contacts.model');

const router = express.Router();

//GET ALL CONTACTS
router.get('/', async (req, res) => {
  console.log('All contacts');
  try {
    res.status(200).json(await Contacts.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
