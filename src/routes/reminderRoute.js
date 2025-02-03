const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getReminders,
  createReminder,
  updateReminderStatus,
  deleteReminder,
} = require("../controllers/reminderController");

router.get("/", protect, getReminders)
router.post("/", protect, createReminder);
router.put("/:id", protect, updateReminderStatus)
router.delete("/:id", protect, deleteReminder);
module.exports = router;
