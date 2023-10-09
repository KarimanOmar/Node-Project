const fs = require("fs");
var usersModel = require("../models/user");

function getAllusers() {
  return usersModel.find();
}

function saveuser(user) {
  return usersModel.create(user);
}

function getuserById(id) {
  return usersModel.findOne({ _id: id });
}

function updateuserById(id, password) {
  return usersModel.findByIdAndUpdate(
    id,
    { password: password },
    { new: true }
  );
}

function deleteuserById(id) {
  return usersModel.findByIdAndDelete({ _id: id });
}
//================================================
module.exports = {
  saveuser,
  getuserById,
  updateuserById,
  deleteuserById,
  getAllusers,
};
