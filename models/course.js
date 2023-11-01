const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  c_name: { type: String, required: true , unique: true},
  category: { type: String, required: true },
  credit: { type: Number, required: true },
  staff: {
    "name":String, 
    "yearOfJoining" :Date, 
    "department":String,
  },
  students: [
    {
      name: String,
      dob: Date,
      regNo: String,
      department: String,
    },
  ],
});


module.exports = mongoose.model('Course', courseSchema);