const categoryService = require('../services/categoryService');

const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getCategories(req.user.userId);
    return res.json(categories);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategory(req.user.userId, req.body);
    return res.status(201).json(newCategory);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id, req.user.userId);
    return res.json({ message: 'Η κατηγορία διαγράφηκε.' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  create,
  remove
};
