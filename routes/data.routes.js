const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

const getElementFromLink = (req) => (
  db.data.find(element => element.nasa_id === parseInt(req.params.id))
);

router.get('/', (req, res) => {
  res.json(db.data);
});

router.post('/', async(req, res) => {
  try {
    const { title, description } = req.body;
    const newData = { nasa_id: uuidv4(), title, description };
    db.data.push(newData);
    res.send({
      message: 'Ok',
      newData,
    });
    console.log(req.body);
  } catch(err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.put('/:id', (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const updatedElement = { nasa_id: id, title, description };
  db.data[ db.data.indexOf(getElementFromLink(req))] = updatedElement;
  res.send({
    message: 'OK',
    updatedElement,
  })
  console.log(updatedElement);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedElement = db.data.splice(db.data.indexOf(getElementFromLink(req)), 1);
  res.send({
    message: 'Element is deleted',
  });
  console.log(id);
});


module.exports = router;
