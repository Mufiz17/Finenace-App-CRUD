const Reminder = require("../models/reminderModel");

// ✅ Mengambil semua reminder milik user yang sedang login
const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id });
    res.status(200).json(reminders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Membuat reminder (dengan menyimpan user ID)
const createReminder = async (req, res) => {
  const { title, amount, dueDate } = req.body;
  try {
    if (!title || !dueDate || !amount) {
      return res.status(400).json({ message: "Title dan Date diperlukan" });
    }

    const reminder = await Reminder.create({
      user: req.user.id, // Tambahkan user ID
      title,
      amount,
      dueDate,
    });

    res.status(201).json(reminder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const updateReminderStatus = async (req, res) => {
    try {
      const reminder = await Reminder.findById(req.params.id);
  
      if (!reminder) {
        return res.status(404).json({ message: "Reminder tidak ditemukan" });
      }
  
      // Cek apakah user memiliki reminder ini
      if (reminder.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Tidak diizinkan mengedit reminder ini" });
      }
  
      // Update semua field yang ada di request body
      reminder.title = req.body.title || reminder.title;
      reminder.amount = req.body.amount || reminder.amount;
      reminder.dueDate = req.body.dueDate || reminder.dueDate;
      reminder.status = req.body.status || reminder.status;
  
      await reminder.save();
  
      res.status(200).json(reminder);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  };
  

// ✅ Menghapus reminder
const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({ message: "Reminder tidak ditemukan" });
    }

    // Pastikan user hanya bisa menghapus reminder miliknya sendiri
    if (reminder.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Tidak diizinkan menghapus reminder ini" });
    }

    await reminder.deleteOne();
    res.status(200).json({ message: "Reminder berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getReminders,
  createReminder,
  updateReminderStatus, // 🔥 Pastikan namanya sesuai dengan routing!
  deleteReminder,
};
