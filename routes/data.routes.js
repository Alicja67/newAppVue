const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.data);
});

router.post('/', (req, res) => {
  const title = req.body;
  const description = req.body;
  const newData = { nasa_id: uuidv4(), title, description };
  db.data.push(newData);
  res.send({
    message: 'Ok',
  });
  console.log(req.body);
});

router.put('/', (req, res) => {

});

module.exports = router;
