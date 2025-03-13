const express = require("express");
const router = express.Router();
const errorHandler = require("../utils/error");
const Task = require("../models/Task");

// Create a new task
router.post("/api/tasks", async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (
      !title ||
      !description ||
      !status ||
      title === "" ||
      description === "" ||
      status === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.json({ message: "Task successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all tasks
router.get("/api/tasks", async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit

    // const tasks = await Task.find();
    const tasks = {}

    if(endIndex < Task.countDocuments().exec()) {
      tasks.next = {
        page: page + 1,
        limit: limit
      }
    }
  
    if (startIndex < 0){
      tasks.previous = {
        page: page - 1,
        limit: limit
      }
    }


    tasks.tasks = await Task.find().limit(limit).skip(startIndex).exec()
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

//Get one Task id
router.get("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = await Task.findById(req.params.id);
    if (!taskId) return res.json({ message: "Product not found" });
    res.json(taskId);
  } catch (error) {
    console.log(error); // Logs error for debugging
    res.status(500).send("Server error");
  }
});

//update task
router.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).send("Product not found");
    }

    res.json(updateTask);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the product" });
  }
});

// Delete product
router.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTaskId = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTaskId)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product", error });
  }
});

module.exports = router;
