const express = require('express');
const Users = require('../models/users.model');

const router = express.Router();

//GET CONTACT BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await Users.findById(id);
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

module.exports = router;
