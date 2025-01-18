import { TeacherModel } from "../Models/User.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb"; // Import ObjectId

export const updateStatus = async (req, res) => {
  try {
    const { status, teaId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access. Token is missing." });
    }

    // Verify token
    let teacherIdFromToken;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      teacherIdFromToken = decoded.id; // Corrected field name
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    if (!teaId) {
      return res.status(400).json({ message: "teacher ID is required." });
    }

    if (!status || (status !== "ON" && status !== "OFF")) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // console.log("teaId from request body:", teaId);
    // console.log("Token decoded teacherId:", teacherIdFromToken);

    // Convert teaId to ObjectId before querying the database
    let objectIdteaId;
    try {
      objectIdteaId = new ObjectId(teaId);
    } catch (error) {
      return res.status(400).json({ message: "Invalid teacher ID format." });
    }

    // Ensure that the token's teacher matches the teaId
    if (teacherIdFromToken !== teaId) {
      return res.status(403).json({ message: "You are not authorized to update this teacher's status." });
    }

    // Allow only authenticated teachers to update statuses
    const teacher = await TeacherModel.findOneAndUpdate(
      { _id: objectIdteaId }, // Use _id with ObjectId conversion
      { teaStatus: status },
      { new: true } // Return the updated document
    );

    if (!teacher) {
      return res.status(404).json({
        message: `Teacher with ID ${teaId} not found. Please check the ID and try again.`,
      });
    }

    res.status(200).json({
      message: "Status updated successfully",
      status: teacher.admStatus,
    });
  } catch (error) {
    console.error("Error updating status:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};
