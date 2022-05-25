const express = require('express');
const Users = require('../models/users.model');

const router = express.Router();

//GET CONTACT BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await Users.find({ id });
  console.log('goo');
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
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, login, password, id } = req.body;
  try {
    if (firstName && lastName && email && login && password && id) {
      const post = new Users({ firstName, lastName, email, login, password, id });
      const newUser = await post.save();
      res.status(201).json(newUser);
    }
    res.status(400).json({ message: 'Missing data' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//EDIT BY ID
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email, login } = req.body;
  const { id } = req.params;

  try {
    let dataToUpdate = await Users.find({ id });
    if (dataToUpdate) {
      if (!firstName && !lastName && !email && !login) {
        res.status(404).json({ message: 'Sothing went wrong...' });
      }
      await Users.updateOne({ id }, { $set: { firstName, lastName, email, login } });
      dataToUpdate = await Users.find({ id });
      res.status(200).json(dataToUpdate);
    } else {
      res.status(404).json({ message: 'Data not found. No valid ID' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
