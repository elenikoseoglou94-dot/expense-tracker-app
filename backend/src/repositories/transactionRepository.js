const prisma = require('../config/prisma');

const findAllByUserId = async (userId) => {
  return prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { date: 'desc' }
  });
};

const createTransaction = async (transactionData) => {
  return prisma.transaction.create({
    data: transactionData,
    include: { category: true }
  });
};

const deleteTransaction = async (transactionId, userId) => {
  return prisma.transaction.deleteMany({
    where: { id: transactionId, userId }
  });
};

module.exports = {
  findAllByUserId,
  createTransaction,
  deleteTransaction
};
