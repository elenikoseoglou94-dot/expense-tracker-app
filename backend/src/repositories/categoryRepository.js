const prisma = require('../config/prisma');

const findAllByUserId = async (userId) => {
  return prisma.category.findMany({
    where: { userId },
    orderBy: { id: 'desc' }
  });
};

const createCategory = async (categoryData) => {
  return prisma.category.create({
    data: categoryData
  });
};

const deleteCategory = async (categoryId, userId) => {
  return prisma.category.deleteMany({
    where: { id: categoryId, userId }
  });
};

module.exports = {
  findAllByUserId,
  createCategory,
  deleteCategory
};
