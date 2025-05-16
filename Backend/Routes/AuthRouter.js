import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import ensureAuthenticated from '../Middleware/Auth.js';
import { loginValidation, signupValidation, teacherLoginValidation, teacherSignupValidation } from '../Middleware/AuthValidation.js';
import { StudentModel, TeacherModel } from '../Models/User.js';
import {stuLogin,stuSignup, teacherLogin, teacherSignup } from '../Controllers/AuthController.js';
import getStudentData from '../Controllers/getStudentData.js';
import attendanceHandler from '../Controllers/attendanceHandler.js';
import { updateStatus } from '../Controllers/updateStatus.js';
import { getTeacher } from '../Controllers/getTeacher.js';
import { uploadNote, getNotes , deleteNote} from '../Controllers/uploadNotes.js';
import {
  createNotification,
  getNotifications,
  deleteNotification,
} from '../Controllers/uploadNotfication.js';


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


// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});


// Upload Notes
const upload = multer({ storage });

router.post('/upload-note', upload.single('file'), uploadNote);
router.get('/notes', getNotes);
router.delete('/notes/:id', deleteNote);


// Notification Routes
router.post('/notifications', ensureAuthenticated, createNotification); // Create notification
router.get('/notifications', getNotifications);    // Get all notifications
router.delete('/notifications/:id', deleteNotification); // Delete notification


  

export default router;
