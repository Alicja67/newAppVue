const express = require('express');
const Contacts = require('../models/contacts.model');

const router = express.Router();

//ADD NEW DATA
router.post('/send-message', async (req, res) => {
  const { author, sender, title, message } = req.body;
  try {
    const post = new Contacts({ author, sender, title, message });
    const newContact = await post.save();
    res.json({message: 'OK', newContact});
  } catch(err) {
    res.status(500).json({message: err})
  }
});

module.exports = router;
