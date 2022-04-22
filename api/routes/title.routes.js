const express = require("express");
const Titles = require("../models/titles.model");

const router = express.Router();

//GET ALL CONTACTS BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const titleFromId = await Titles.findById(id);
    if(titleFromId){
      res.json(titleFromId);
    } else {
      res.status(404).json({message: 'No valid Id'});
    }

  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//ADD NEW DATA
router.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    const post = new Titles({ title });
    const newTitle = await post.save();
    if(newTitle){
      res.status(201).send({ newTitle });
    } else {
      res.status(500)
    }
  } catch (err) {
    res.status(400).json({ error: err.message || err.toString() });
  }
});

//EDIT BY ID
router.put("/:id", async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  try {
    let dep = await Titles.findById(id);
    if (dep) {
      const editedLink = await Titles.updateOne({ _id: id }, { $set: { title } });
      dep = await Titles.findById(id);
      res.status(200).json(dep);
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//DELETE BY ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dep = await Titles.findById(id);
    if (dep) {
      console.log(dep);
      await Titles.deleteOne({ _id: id });
      res.status(204).json({ message: "Ok" });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
