import { NotificationModel} from '../Models/User.js';

// ---------- NOTIFICATIONS (assignment, test, announcement) ----------


//================== CREATE NOTIFICATION ==================
export const createNotification = async (req, res) => {
  try {
    const { title, description, type, subject, teacher, dueDate } = req.body;

    // Validation logs (Optional but helpful for debugging)
    console.log("Notification Body Data:", req.body);

    const notification = new NotificationModel({
      title,
      description,
      type,
      subject,
      teacher,
      dueDate
    });

    await notification.save();
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    console.error("Notification Creation Error:", error);
    res.status(500).json({ error: 'Failed to create notification', details: error.message });
  }
};


//================== GET ALL NOTIFICATIONS ==================

export const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

//================== GET NOTIFICATION==================
export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    await NotificationModel.findByIdAndDelete(notificationId);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
};