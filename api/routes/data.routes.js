const express = require('express');
const Datas = require('../models/datas.model.js');

const router = express.Router();

//GET ONE BY _ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await Datas.findById(id);
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
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title && !description) {
      res.status(400).json({ message: 'Missing data' });
    }
    const post = new Datas({ title, description });
    const newData = await post.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//EDIT BY _ID
router.put('/:id', async (req, res) => {
  const { title, description, nasa_id } = req.body;
  const { id } = req.params;

  try {
    let editedData = await Datas.findById(id);
    if (editedData) {
      if(!title && !description && !nasa_id) {
        res.status(400).json({ message: 'Missing data' })
      }
      await Datas.updateOne({ _id: id }, { $set: { title, description, nasa_id } });
      editedData = await Datas.findById(id);
      res.status(201).json(editedData);
    } else {
      res.status(404).json({ message: 'Data not found. No valid ID' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await Datas.findById(id);
    if (deletedData) {
      await Datas.deleteOne({ _id: id });
      res.status(204).json({ message: 'Deteled successfully' });
    } else {
      res.status(404).json({ message:'Data not found. No valid ID' });
    }
  } catch (err) {
    req.status(500).json({ message: err });
  }
});

module.exports = router;
