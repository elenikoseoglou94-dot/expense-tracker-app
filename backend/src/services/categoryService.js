const categoryRepository = require('../repositories/categoryRepository');

const getCategories = async (userId) => {
  return categoryRepository.findAllByUserId(userId);
};

const createCategory = async (userId, formData) => {
  const { name, type } = formData;

  if (!name || !type) {
    throw new Error('Το όνομα και ο τύπος είναι υποχρεωτικά.');
  }

  return categoryRepository.createCategory({
    name,
    type,
    userId
  });
};

const deleteCategory = async (categoryId, userId) => {
  return categoryRepository.deleteCategory(Number(categoryId), userId);
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory
};
