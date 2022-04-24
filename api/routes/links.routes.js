const express = require('express');
const Links = require('../models/links.model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Links.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
