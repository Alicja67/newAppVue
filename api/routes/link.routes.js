const express = require('express');
const Links = require('../models/links.model');

const router = express.Router();

//GET ONE BY _ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let link = await Links.findById(id);
  try {
    if(!link) {
      res.status(404).json({message: 'Data not found. No valid ID'});
    } else {
      res.status(200).json(await Links.findById(id));
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//ADD NEW DATA
router.post('/', async (req, res) => {
  const { href, nasa_id } = req.body;
  try {
    if (!href && !nasa_id) {
      res.status(400).json({ message: 'Missing data' });
    }
    const post = new Links({ href, nasa_id });
    const newLink = await post.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ error: err.message || err.toString() });
  }
});

//EDIT BY ID
router.put('/:id', async (req, res) => {
  const { href, nasa_id } = req.body;
  const { id } = req.params;
  let editedLink = await Links.findById(id);
  try {
    if (editedLink) {
      if(!href && !nasa_id) {
        res.status(400).json({ message: 'Missing data' })
      }
      await Links.updateOne({ _id: id }, { $set: { href, nasa_id } });
      editedLink = await Links.findById(id);
      res.status(201).json(editedLink);
    } else {
      res.status(404).json({ message: 'Data not found. No valid ID' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//DELETE BY ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const delatedData = await Links.findById(id);
    if (delatedData) {
      await Links.deleteOne({ _id: id });
      res.status(204).json({ message: 'Deteled successfully' });
    } else {
      res.status(404).json({ message: 'Data not found. No valid ID' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
