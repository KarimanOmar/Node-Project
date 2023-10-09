//1-cors
//2-not found
//3-error handling
//4-bcrypt
//npm i bcryptjs
//npm i jsonwebtoken
//npm install pug
const express = require("express");

const cors = require("cors"); //cors

const fs = require("fs");

const mongoose = require("mongoose");

const todoRoutes = require("./routes/todo");

const userRoutes = require("./routes/user");

const todoModel = require("./models/todo");

const app = express();

//middleware
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");
app.get("/", async function (req, res) {
  var todos = await todoModel.find();
  res.status(200).render("todos", { todos: todos });
});
//cors
app.use(
  cors({
    origin: "*",
    // methods: "GET POST PATCH",
  })
);
//handling routes
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
//not found
app.use("*", function (req, res, next) {
  res.status(404).json({ message: "not found" });
});
//error handling
app.use(function (err, req, res, next) {
  res.status(500).json({ message: "something went wrong !" });
});
mongoose.connect("mongodb://127.0.0.1:27017/todoDB").then(() => {
  console.log("connected to db success");
});

var port = 3333;

app.listen(port, () => {
  console.log(`successfuly ${port}`);
});
