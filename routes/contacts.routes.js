const express = require('express');
const Contacts = require('../models/contacts.model');

const router = express.Router();

//ADD NEW DATA
router.post('/send-message', (req, res) => {
  const { author, email, title, message } = req.body;
  if(author && email && title && message) {
  res.send('The message has been sent!');
  }
  else {
  res.send('You can\'t leave fields empty!')
  }
  });

// router.post('/send-message', async (req, res) => {
//   const { author, email, title, message } = req.body;
//   try {
//     const post = await new Contacts({ author, email, title, message });
//     const newContact = await post.save();
//     res.json({message: 'OK', newContact});
//   } catch(err) {
//     res.status(500).json({message: err})
//   }
//   // res.json(req.body);
// });

module.exports = router;
