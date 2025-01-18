import express from 'express';
import bcrypt from 'bcrypt';
import ensureAuthenticated from '../Middleware/Auth.js';
import { loginValidation, signupValidation, teacherLoginValidation, teacherSignupValidation } from '../Middleware/AuthValidation.js';
import { StudentModel, TeacherModel } from '../Models/User.js';
import {stuLogin,stuSignup, teacherLogin, teacherSignup } from '../Controllers/AuthController.js';
import getStudentData from '../Controllers/getStudentData.js';
import attendanceHandler from '../Controllers/attendanceHandler.js';
import { updateStatus } from '../Controllers/updateStatus.js';
import { getTeacher } from '../Controllers/getTeacher.js';
const router = express.Router();

// student Routes
router.post('/login/student', loginValidation, stuLogin);
router.post('/signup/student', signupValidation, stuSignup);

// teacher Routes
router.post('/login/teacher', teacherLoginValidation, teacherLogin);
router.post('/signup/teacher', teacherSignupValidation, teacherSignup);

// Protected Routes
router.get('/studata', ensureAuthenticated, getStudentData);

//Make Attendance
router.post('/attendance', ensureAuthenticated, attendanceHandler);

router.post('/updateStatus',ensureAuthenticated,updateStatus);

router.get("/getTeacher", ensureAuthenticated, getTeacher);

export default router;
