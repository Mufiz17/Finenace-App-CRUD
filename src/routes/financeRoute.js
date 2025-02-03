const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getFinances,
  createFinance,
  updateFinance,
  deleteFinance,
  getFinanceReport,
  getFinancesByDate,
  getCategories
} = require("../controllers/financeController");

router.get("/", protect, getFinances);
router.post("/", protect, createFinance);
router.put("/:id", protect, updateFinance);
router.delete("/:id", protect, deleteFinance);
router.get("/report", protect, getFinanceReport);
router.get("/:date", protect, getFinancesByDate);
router.get('/categories', protect, getCategories);

module.exports = router;