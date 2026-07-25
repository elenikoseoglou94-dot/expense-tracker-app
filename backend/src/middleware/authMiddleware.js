const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Δεν υπάρχει token.' });
  }

  const parts = authHeader.split(' ');
  const token = parts[1];

  if (!token) {
    return res.status(401).json({ message: 'Μη έγκυρο authorization header.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'very-secret-key');
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Μη έγκυρο ή ληγμένο token.' });
  }
};

module.exports = authMiddleware;

// TODO: double-check token expiry edge case

// fixed missing password length check

// fixed missing password length check
