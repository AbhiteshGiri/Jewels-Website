const jwt = require('jsonwebtoken');

module.exports = function generateToken(subject, role) {
  return jwt.sign({ sub: subject, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
