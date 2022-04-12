const express = require('express');
const Links = require('../models/links.model');

const router = express.Router();

router.get('/', async (req, res) => {
  // res.json(db.links);
  try {
    res.json(await Links.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

//GET ONE BY _ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await Links.findById(id));
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

//ADD NEW DATA
router.post('/', async(req, res) => {
  try {
    const { href, nasa_id } = req.body;
    const post = new Links({ href, nasa_id  });
    const newLink = await post.save();
    res.json({ message: 'Ok', newLink });
  } catch(err) {
    res.json({ error: err.message || err.toString() });
  }
});

//EDIT BY ID
router.put('/:id', async (req, res) => {
  const { href } = req.body;
  const { id } = req.params;

  try {
    const dep = await Links.findById(id);
    if(dep) {
      const editedLink = await Links.updateOne( { _id: id }, { $set: { href } });
      res.json({ message: 'OK', editedLink });
    } else {
      res.status(404).json({ message: 'Not found...'});
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

//DELETE BY ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dep = await Links.findById(id);
    if(dep) {
      await Links.deleteOne( {_id: id} );
      res.json({ message: 'OK', dep });
    } else {
      res.status(404).json({ message: 'Not found...'});
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;