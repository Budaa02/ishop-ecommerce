const mongoose = require("mongoose");

//Admin hereglegch bol buh erhtei hereglegch baina
// Customer hereglegch bol Admin Panel ruu nevterch chadahgui hereglegch baina
// User hereglegch ni zarim neg Admin Panel deer ustgah, oorchloh esvel uusgeh erhgui hereglegch baina.

const userRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the Role Name"],
    unique: true,
  },
});

const UserRole = mongoose.model("Userrole", userRoleSchema);

module.exports = UserRole;
