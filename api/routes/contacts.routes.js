const express = require('express');
const Contacts = require('../models/contacts.model');

const router = express.Router();

//GET ALL CONTACTS
router.get('/send-message', async (req, res) => {
  // res.json(db.links);
  console.log("All contacts");
  try {
    res.status(200).json(await Contacts.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//ADD NEW DATA
router.post('/send-message', async (req, res) => {
  const { author, email, title, message } = req.body;
  try {
    const post = new Contacts({author, email, title, message});
    const newContact = await post.save();
    res.json({message: 'Ok', newContact});
  } catch(err) {
    res.status(400).json({ error: err.message || err.toString() });
  }
  // if(author && email && title && message) {
  // await res.send('The message has been sent!');
  // }
  // else {
  // res.send('You can\'t leave fields empty!')
  // }
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
