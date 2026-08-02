const transactionService = require('../services/transactionService');

const getAll = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions(req.user.userId);
    return res.json(transactions);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newTransaction = await transactionService.createTransaction(req.user.userId, req.body);
    return res.status(201).json(newTransaction);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await transactionService.deleteTransaction(req.params.id, req.user.userId);
    return res.json({ message: 'Η κίνηση διαγράφηκε.' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const summary = async (req, res) => {
  try {
    const summaryData = await transactionService.getSummary(req.user.userId);
    return res.json(summaryData);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  create,
  remove,
  summary
};
