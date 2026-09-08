const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const categoryRepository = require('../repositories/categoryRepository');

const register = async (formData) => {
  const { fullName, email, password } = formData;
  const userAlreadyExists = await userRepository.findByEmail(email);

  if (userAlreadyExists) {
    throw new Error('Υπάρχει ήδη χρήστης με αυτό το email.');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await userRepository.createUser({
    fullName,
    email,
    passwordHash
  });

  await categoryRepository.createCategory({
    name: 'Γενικά',
    type: 'EXPENSE',
    userId: newUser.id
  });

  await categoryRepository.createCategory({
    name: 'Γενικά',
    type: 'INCOME',
    userId: newUser.id
  });

  return {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email
  };
};

const login = async (formData) => {
  const { email, password } = formData;
  const foundUser = await userRepository.findByEmail(email);

  if (!foundUser) {
    throw new Error('Λάθος email ή κωδικός.');
  }

  const passwordMatches = await bcrypt.compare(password, foundUser.passwordHash);

  if (!passwordMatches) {
    throw new Error('Λάθος email ή κωδικός.');
  }

  const token = jwt.sign(
    {
      userId: foundUser.id,
      email: foundUser.email
    },
    process.env.JWT_SECRET || 'very-secret-key',
    { expiresIn: '1d' }
  );

  return {
    message: 'Το login έγινε επιτυχώς.',
    token,
    user: {
      id: foundUser.id,
      fullName: foundUser.fullName,
      email: foundUser.email
    }
  };
};

const getMe = async (userId) => {
  const foundUser = await userRepository.findById(userId);

  if (!foundUser) {
    throw new Error('Ο χρήστης δεν βρέθηκε.');
  }

  return {
    id: foundUser.id,
    fullName: foundUser.fullName,
    email: foundUser.email
  };
};

module.exports = {
  register,
  login,
  getMe
};
