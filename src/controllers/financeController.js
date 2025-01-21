const finance = require("../models/financeModel");

const getFinances = async (req, res) => {
  try {
    const finances = await finance.find({ user: req.user.id });
    res.status(200).json(finances);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const createFinance = async (req, res) => {
  const { title, amount, type } = req.body;

  if (!title || !amount || !type) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  try {
    const Finance = await finance.create({
      user: req.user.id,
      title,
      amount,
      type,
    });

    res.status(201).json(Finance);
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const updateFinance = async (req, res) => {
  const { id } = req.params;

  try {
    const Finance = await finance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!Finance) {
      return res.status(404).json({ message: "Data finance tidak ditemukan" });
    }

    res
      .status(200)
      .json({ message: "Finance berhasil diperbarui", data: Finance });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

const deleteFinance = async (req, res) => {
  const { id } = req.params;

  try {
    const Finance = await finance.findByIdAndDelete(id);

    if (!Finance) {
      return res.status(404).json({ message: "Data finance tidak ditemukan" });
    }

    res.status(200).json({ message: "Finance berhasil dihapus" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

const getFinanceReport = async (req, res) => {
  const userId = req.user.id;

  try {
    const Finances = await finance.find({ user: userId });

    const totalIncomes = Finances.filter(
      (finance) => finance.type === "income"
    ).reduce((acc, item) => acc + item.amount, 0);

    const totalExpenses = Finances.filter(
      (finance) => finance.type === "expense"
    ).reduce((acc, item) => acc + item.amount, 0);

    const balance = totalIncomes - totalExpenses;

    res.status(200).json({
      totalIncomes,
      totalExpenses,
      balance,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

module.exports = {
  getFinances,
  createFinance,
  updateFinance,
  deleteFinance,
  getFinanceReport,
};
