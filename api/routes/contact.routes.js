const express = require('express');
const Contacts = require('../models/contacts.model');

const router = express.Router();

//GET CONTACT BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await Contacts.findById(id);
  try {
    if (!data) {
      res.status(404).json({ message: 'Data not found. No valid ID' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//ADD NEW DATA
router.post('/send-message', async (req, res) => {
  const { author, email, title, message } = req.body;
  try {
    if (author && email && title && message) {
      const post = new Contacts({ author, email, title, message });
      const newContact = await post.save();
      res.status(201).json(newContact);
    }
    res.status(400).json({ message: 'Missing data' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
