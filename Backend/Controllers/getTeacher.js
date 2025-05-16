import { TeacherModel } from "../Models/User.js";

//=================== GET TEACHER DATA  ==================
export const getTeacher = async (req, res) => {
    try {
        const teacherId = req.user.id; 
        const teacher = await TeacherModel.findById(teacherId);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({
            teaId: teacher._id,
            teaName: teacher.name,
            teaEmail: teacher.email,
            teaStatus: teacher.status,
        });
    } catch (error) {
        console.error("Error fetching teacher details:", error.message);
        res.status(500).json({ error: error.message });
    }
};
