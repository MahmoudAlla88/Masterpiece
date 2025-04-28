// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
const authMiddleware = async(req, res, next) => {
  try {
    
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }


    const decoded = jwt.verify(token, JWT_SECRET);
   
    req.user = decoded; 
 
    console.log("req==",req.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
