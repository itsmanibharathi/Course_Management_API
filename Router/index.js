const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/courses/:courseName/students', async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const { name, dob, regNo, department } = req.body;

      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      const newStudent = {
        name,
        dob,
        regNo,
        department,
      };
  
      course.students.push(newStudent);
      await course.save();
  
      res.status(201).json({ message: 'Student added to the course', student: newStudent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding a student to the course' });
    }
  });
  

module.exports = router;
