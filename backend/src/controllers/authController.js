const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const createdUser = await authService.register(req.body);

    return res.status(201).json({
      message: 'Ο χρήστης δημιουργήθηκε επιτυχώς.',
      user: createdUser
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || 'Σφάλμα στο register.'
    });
  }
};

const login = async (req, res) => {
  try {
    const loginData = await authService.login(req.body);
    return res.json(loginData);
  } catch (err) {
    return res.status(400).json({
      message: err.message || 'Σφάλμα στο login.'
    });
  }
};

const me = async (req, res) => {
  try {
    const currentUser = await authService.getMe(req.user.userId);
    return res.json(currentUser);
  } catch (err) {
    return res.status(404).json({
      message: err.message || 'Σφάλμα στο me.'
    });
  }
};

module.exports = {
  register,
  login,
  me
};
