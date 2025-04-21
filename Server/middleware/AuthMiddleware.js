// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
const authMiddleware = async(req, res, next) => {
  try {
    
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm=",process.env.JWT_SECRET)
    const decoded = jwt.verify(token, JWT_SECRET);
    // const user = await User.findByPk(decoded.id);

    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    req.user = decoded; 
 
    console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
