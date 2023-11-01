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

router.post('/courses/:courseId/students', async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const students = req.body; // Expect an array of student objects in the request body
  
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      const addedStudents = [];
  
      for (const studentData of students) {
        const { name, dob, regNo, department } = studentData;
        const newStudent = {
          name,
          dob,
          regNo,
          department,
        };
        course.students.push(newStudent);

        addedStudents.push(newStudent);
      }
  
      await course.save();
      res.status(201).json({
        message: 'Students added to the course',
        students: addedStudents,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding students to the course' });
    }
  });

  router.get('/students/:courseId', (req, res) => {
    const courseId = req.params.courseId;
  
    Course.findById(courseId, 'students', (err, course) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      if (!course) {
        res.status(404).json({ error: 'Course not found' });
        return;
      }
  
      const students = course.students;
      res.json(students);
    });
  });
module.exports = router;
