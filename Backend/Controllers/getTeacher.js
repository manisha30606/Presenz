import { TeacherModel } from "../Models/User.js";

// Assuming you have a JWT authentication middleware
// Use the middleware to ensure req.user contains the teacher's ID
export const getTeacher = async (req, res) => {
    try {
        const teacherId = req.user.id; // Get teacher ID from the authenticated user's JWT token
        const teacher = await TeacherModel.findById(teacherId);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({
            teaId: teacher._id,
            teaName: teacher.name,
            teaEmail: teacher.email,
            teaStatus: teacher.status, // Ensure 'status' field exists in your schema
        });
    } catch (error) {
        console.error("Error fetching teacher details:", error.message);
        res.status(500).json({ error: error.message });
    }
};
