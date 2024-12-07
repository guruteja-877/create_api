const express = require("express");
const Data = require("../model/Data");

const router = express.Router();  //http methods ---> post,put,get,delete

//Post Method -to create new data
router.post("/post", async (req, res) => {
  const newData = new Data({ name: req.body.name, age: req.body.age });
  try {
    const savedData = await newData.save();
    res.status(201).json({savedData});
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
});

//Get all Method -get all data
router.get("/getAll", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method -get a single data by id
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method -update data by id
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Data.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method -delete existing data by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Data.findByIdAndDelete(id);
    if (!data) res.status(400).json({ message: "no user exist with given id" });
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
