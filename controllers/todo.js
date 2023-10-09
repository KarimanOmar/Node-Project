const fs = require("fs");
var todosModel = require("../models/todo");
//function readTodos

// function readTodos() {
//   //   return JSON.parse(fs.readFileSync("data.json", "utf-8"));
//   fs.readFile("data.json", "utf8", (err, data) => {
//     return JSON.parse(data);
//   });
// }

//function getNextId
// function getNextId() {
//   var todoArr = readTodos();
//   return todoArr.length > 0
//     ? Math.max(...todoArr.map((todo) => todo.id)) + 1
//     : 1;
// }
// function getNextId() {
//   fs.readFile("data.json", "utf8", (err, data) => {
//     var todoArr = JSON.parse(data);
//     return todoArr.length > 0
//       ? Math.max(...todoArr.map((todo) => todo.id)) + 1
//       : 1;
//   });
// }

// //function writeTodos
// function writeTodos(data) {
//   //   fs.writeFileSync("data.json", JSON.stringify(data));
//   fs.writeFile("data.json", JSON.stringify(data), () => {});
// }

// function saveTodo(todo) {
//   var todos = readTodos();
//   todo.status = "to-do";
//   todo.id = getNextId();
//   todos.push(todo);
//   writeTodos(todos);
// }
// function saveTodo(todo) {
//   fs.readFile("data.json", "utf8", (err, data) => {
//     var todos = JSON.parse(data);
//     todo.status = "to-do";
//     todo.id = getNextId();
//     todos.push(todo);
//     writeTodos(todos);
//   });
// }

// function getTodoById(id) {
//   var todos = readTodos();
//   var todo = todos.find((todo) => todo.id == id);
//   return todo;
// }
// function getTodoById(id) {
//   fs.readFile("data.json", "utf8", (err, data) => {
//     var todos = JSON.parse(data);
//     var todo = todos.find((todo) => todo.id == id);
//     return todo;
//   });
// }

// function updateTodoById(title, id) {
//   var todos = readTodos();
//   var todo = todos.find((todo) => todo.id == id);
//   todo.title = title;
//   writeTodos(todos);
//   return todo;
// }
// function updateTodoById(title, id) {
//   fs.readFile("data.json", "utf8", (err, data) => {
//     var todos = JSON.parse(data);
//     var todo = todos.find((todo) => todo.id == id);
//     todo.title = title;
//     writeTodos(todos);
//     return todo;
//   });
// }

// function deleteTodoById(id) {
//   var todos = readTodos();
//   var todo = todos.find((todo) => todo.id == id);
//   todos.splice(todo, 1);
//   writeTodos(todos);
//   return todo;
// }
// function deleteTodoById(id) {
//   fs.readFile("data.json", "utf8", (err, data) => {
//     var todos = JSON.parse(data);
//     var todo = todos.find((todo) => todo.id == id);
//     todos.splice(todo, 1);
//     writeTodos(todos);
//     return todo;
//   });
// }

function getAlltodos() {
  return todosModel.find().populate("userId");
}

function saveTodo(todo) {
  return todosModel.create(todo);
}

function getTodoById(id) {
  return todosModel.findOne({ _id: id }).populate("userId");
}

function updateTodoById(id, title, status) {
  return todosModel
    .findByIdAndUpdate(id, { title: title, status: status }, { new: true })
    .populate("userId");
}

function deleteTodoById(id) {
  return todosModel.findByIdAndDelete({ _id: id }).populate("userId");
}
//================================================
module.exports = {
  saveTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  getAlltodos,
};
