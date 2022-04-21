const express = require("express");
// const { v4: uuidv4 } = require('uuid');
// const db = require('../../db');
const Datas = require("../models/datas.model");

const router = express.Router();

//GET ALL DATA
router.get("/", async (req, res) => {
  res.json(db.data);
  try {
    res.json(await Datas.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
  console.log(req.body);
});

//GET ONE BY _ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.json(await Datas.findById(id));
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//ADD NEW DATA
router.post("/", async (req, res) => {
  try {
    const post = new Datas({ title: req.body.title, description: req.body.description });
    const newData = await post.save();
    res.json({ message: "OK", newData });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//EDIT BY _ID
router.put("/:id", async (req, res) => {
  const { title, description, nasa_id } = req.body;
  const { id } = req.params;

  try {
    const dep = await Datas.findById(id);
    if (dep) {
      const editedData = await Datas.updateOne(
        { _id: id },
        { $set: { title, description, nasa_id } }
      );
      res.json({ message: "ok", dep, editedData });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dep = await Datas.findById(id);
    if (dep) {
      const deletedData = await Datas.remove({ _id: id });
      res.status(204).res.json({ message: "Ok", deletedData });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    req.status(500).json({ message: err });
  }
});

module.exports = router;
