const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      uniq: true,
      minLength: 8,
    },
    password: {
      type: String,
      require: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    // },
    firstName: {
      type: String,
      require: true,
      minLength: [3, "invalid minLength"],
      maxLength: [15, "invalid maxLength"],
    },
    lastName: {
      type: String,
      require: true,
      minLength: [3, "invalid minLength"],
      maxLength: [15, "invalid maxLength"],
    },
    dob: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
//bcryptjs
userSchema.pre("save", async function (next) {
  var salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
//////////////////////////////
var userModel = mongoose.model("User2", userSchema);
module.exports = userModel;
