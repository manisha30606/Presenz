import {StudentModel , TeacherModel} from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';


dotenv.config();

// =============  STUDENT SIGNUP & LOGIN =============

export const stuSignup = async (req, res) => {
    try {
        const { stuName, stuEmail, stuPhone, stuId, stuPassword, stuPhoto ,stuGender} = req.body;

        // Validate input
        if (!stuName || !stuEmail || !stuPhone || !stuId || !stuPassword || !stuPhoto || !stuGender) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Check for existing user
        const user = await StudentModel.findOne({ stuEmail });
        if (user) {
            return res.status(409).json({ message: "User already exists, please login.", success: false });
        }

        // Handle Base64 photo
        const buffer = Buffer.from(stuPhoto.split(',')[1], 'base64');
        const photoPath = path.join(process.cwd(), 'uploads', `${Date.now()}_photo.png`);
        fs.writeFileSync(photoPath, buffer);

        // Hash password
        const hashedPassword = await bcrypt.hash(stuPassword, 10);

        // Save to DB
        const newUser = new StudentModel({
            stuName,
            stuEmail,
            stuPhone,
            stuId,
            stuPassword: hashedPassword,
            stuPhoto: photoPath, 
            stuGender,
        });

        await newUser.save();

        res.status(201).json({ message: "Signup successful!", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }


};



export const stuLogin = async (req, res) => {
    try {
        const { stuId, stuPassword } = req.body;
        const errorMsg = 'Auth failed: stuId or password is incorrect';

        if (!stuId || !stuPassword) {
            return res.status(400).json({ message: "Both stuId and password are required", success: false });
        }

        const user = await StudentModel.findOne({ stuId });

        if (!user) {
            return res.status(401).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(stuPassword, user.stuPassword);

        if (!isPassEqual) {
            return res.status(401).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { stuId: user.stuId, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            stuName: user.stuName,
            stuId: user.stuId
        });
    } catch (err) {
        console.error('Login Error: ', err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// ================== TEACHER SIGNUP & LOGIN ==================

export const teacherSignup = async (req, res) => {
    try {
        const { teaName, teaEmail,teaId, teaPassword ,teaGender} = req.body;
       

        // Additional input validation
        if (!teaName || !teaEmail || !teaId || !teaPassword || !teaGender) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Check if email or ID already exists
        const existingteacher = await TeacherModel.findOne({
            $or: [{ teaId }, { teaEmail }],
        });

        if (existingteacher) {
            const conflictField = existingteacher.teaId === teaId ? 'teaId' : 'teaEmail';
            return res.status(409).json({
                message: `Duplicate entry detected: ${conflictField} already exists.`,
                success: false,
            });
        }
        

        // Hash password and create teacher
        const hashedPassword = await bcrypt.hash(teaPassword, 10);
        const newteacher = new TeacherModel({
            teaName,
            teaEmail,
            teaId,
            teaPassword: hashedPassword,
            teaGender,
        });

        await newteacher.save();

        return res.status(201).json({
            message: 'Signup successful!',
            success: true,
        });
    } catch (err) {
        console.error('Signup Error:', err);

        // Handle MongoDB unique key error
        if (err.code === 11000) {
            const key = Object.keys(err.keyPattern)[0];
            return res.status(409).json({
                message: `Duplicate entry for ${key}.`,
                success: false,
            });
        }

        return res.status(500).json({
            message: 'Internal server error.',
            success: false,
        });
    }
};

export const teacherLogin = async (req, res) => {
    const { teaEmail, teaPassword } = req.body;

    try {
        const teacher = await TeacherModel.findOne({ teaEmail });
        if (!teacher) {
            return res.status(404).json({ message: 'tea not found' });
        }

        const isMatch = await bcrypt.compare(teaPassword, teacher.teaPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: teacher._id, teaEmail: teacher.teaEmail },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
