const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const Data = require('../models/data.model');

const router = express.Router();

const getElementFromLink = (req) => (
  db.data.find(element => element.nasa_id === parseInt(req.params.id))
);

//GET ALL DATA
router.get('/', async (req, res) => {
  // res.json(db.data);
  try {
    res.json(await Data.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
  console.log(req.body);
});

//GET ONE BY _ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    res.json(await Data.findById(id));
  } catch(err) {
    res.status(500).json({ message: err });
  }
  // console.log(req.body);
});

//ADD NEW DATA
router.post('/', async (req, res) => {
  try {
    const post = new Data({ title: req.body.title, description: req.body.description});
    const newData = await post.save();
    res.json({message: 'OK',
  newData});
  } catch(err) {
    res.status(500).json({message: err})
  }

  // try {
  //   const { title, description } = req.body;
  //   const newData = { nasa_id: uuidv4(), title, description };
  //   db.data.push(newData);
  //   res.send({
  //     message: 'Ok',
  //     newData,
  //   });
  //   console.log(req.body);
  // } catch(err) {
  //   res.json({ error: err.message || err.toString() });
  // }
});

//EDIT BY _ID
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    // const put = await Data.findById(id);
    if(put) {
      await Data.updateOne({ _id: id, }, { $set: { title, description }});
      res.json({ message: 'ok', put});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
  // const updatedElement = { nasa_id: id, title, description };
  // db.data[ db.data.indexOf(getElementFromLink(req))] = updatedElement;
  // res.send({
  //   message: 'OK',
  //   updatedElement,
  // })
  // console.log(updatedElement);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // const deletedElement = db.data.splice(db.data.indexOf(getElementFromLink(req)), 1);
  // res.send({
  //   message: 'Element is deleted',
  // });
  // console.log(id);
  // const deleted = await Data.findById(id);
  try {
    const deletedData = await Data.remove({_id: id});
    res.json(deletedData);
  } catch(err) {
    req.status(500).json({message: err});
  }
});

module.exports = router;
