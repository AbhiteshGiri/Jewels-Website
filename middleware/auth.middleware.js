const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.adminOnly = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ read from cookie
    if (!token) {
      return res.status(401).json({ success: false, message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access forbidden" });
    }

    req.admin = decoded; 
    next(); 
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
