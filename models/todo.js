const mongoose = require("mongoose");

// var todoSchema = mongoose.Schema({
//   title: {
//     type: String,
//     minLength: [3, "title is less than 3 characters"],
//     maxLength: 25,
//     require: true,
//     uniq: true,
//     trim: true,
//     validate: {
//       validator: function (v) {
//         return /[a-z]{,5}/.test(v);
//       },
//       message: (props) => `${props.value} is not a valid title`,
//     },
//     default: "any ***",
//   },
//   status: {
//     type: String,
//     enum: ["Todo", "In progress", "Done"],
//     default: "Todo",
//   },
// });
var todoSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User2",
    },
    title: {
      type: String,
      minLength: 3,
      maxLength: 25,
      require: true,
    },
    status: {
      type: String,
      enum: ["Todo", "In progress", "Done"],
      default: "Todo",
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

var todoModel = mongoose.model("Todo2", todoSchema);
module.exports = todoModel;
