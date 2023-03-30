const mongoose = require("mongoose");

const adminApi = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Enter the First Name"],
  },
  lastname: {
    type: String,
    required: [true, "Enter the Last Name"],
  },
  email: {
    type: String,
    require: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    require: [true, "Please provide a password!"],
    unique: false,
  },
  phone: {
    type: Number,
    minimun: 0,
  },
  address: {
    type: String,
    required: [true, "Enter the address"],
  },
  userrole: {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRole",
    },
  },
});
const Users = mongoose.model("Users", adminApi);

module.exports = Users;
