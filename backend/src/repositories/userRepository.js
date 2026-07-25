const prisma = require('../config/prisma');

const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const findById = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId }
  });
};

const createUser = async (userData) => {
  return prisma.user.create({
    data: userData
  });
};

module.exports = {
  findByEmail,
  findById,
  createUser
};
