const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    regNo: { type: String, required: true },
    department: { type: String, required: true },
  });

const courseSchema = new mongoose.Schema({
  c_name: { type: String, required: true , unique: true},
  category: { type: String, required: true },
  credit: { type: Number, required: true },
  staff: { type: String, required: true },
  students: [studentSchema]
});

module.exports = mongoose.model('Course', courseSchema);