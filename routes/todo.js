const fs = require("fs");
const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
var {
  saveTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  getAlltodos,
} = require("../controllers/todo");
const { error } = require("console");
//==============================================
// router.use(authentication);
// get all todos

router.get("/", async (req, res) => {
  try {
    var todos = await getAlltodos();
    res.json({ data: todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// save todo

router.post("/", authentication, async (req, res) => {
  var title = req.body.title;

  try {
    var newTodo = await saveTodo({ title: title, userId: req.id });
    // newTodo.save();
    res.status(201).json({ data: newTodo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get doto by id

router.get("/:id", async (req, res) => {
  var { id } = req.params;
  try {
    var newTodo = await getTodoById(id);
    if (newTodo) {
      res.status(201).json({ data: newTodo });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update todo by id
router.patch("/:id", async (req, res) => {
  var { title, status } = req.body;
  var { id } = req.params;
  try {
    var todo = await updateTodoById(id, title, status);
    if (todo) {
      res.status(200).json({ data: todo });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete todo by id
router.delete("/:id", async (req, res) => {
  var { id } = req.params;
  try {
    var newTodo = await deleteTodoById(id);
    if (newTodo) {
      res.status(201).json({ message: "Deleted", data: newTodo });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
