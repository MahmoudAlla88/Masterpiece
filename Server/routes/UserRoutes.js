const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/UserControllers');
const authMiddleware = require('../middleware/AuthMiddleware');
router.post("/login",login);
router.post("/signup",signup);
router.get('/me', authMiddleware, (req, res) => {
    res.json(req.user);
  });
module.exports=router;