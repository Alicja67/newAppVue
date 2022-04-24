const express = require("express");
const Titles = require("../models/titles.model");

const router = express.Router();

//GET ALL CONTACTS BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Titles.findById(id);
    if(!data) res.status(404).json({message: 'Data not found. No valid ID'})
    res.status(200).json(data);
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
      const updatedTitle = await Titles.updateOne({ _id: id }, { $set: { title } });
      res.status(200).json(updatedTitle);
    } else {
      res.status(404).json({ message: 'Data not found. No valid ID' });
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
