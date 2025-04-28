const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signup, login ,getAllUsers} = require('../controllers/UserControllers');
const authMiddleware = require('../middleware/AuthMiddleware');
router.post("/login",login);
router.post("/signup",signup);
router.get('/users', getAllUsers);
// router.get('/me', authMiddleware, (req, res) => {
//     res.json(req.user);
//   });
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "location",
        "image",
        "role",
        "adminApproved",
      ],
    });
console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);     // الآن يحوي role و غيره
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
  router.post("/logout", (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,          // استعمل نفس القيم المستخدمة عند الإنشاء
      sameSite: "strict",
      expires: new Date(0),   // أو maxAge: 0
      path: "/",              // تأكد من مطابقة الـ path
    });
    return res.status(200).json({ message: "Logged out successfully" });
  });





  router.patch(
    "/me",
    authMiddleware,
    upload.single("image"), // field name = image
    async (req, res) => {
      try {
        const { name, phone, location } = req.body;
        const updates = { name, phone, location };
  
        if (req.file) {
          updates.image = `/uploads/${req.file.filename}`;
        }
       
        
  
        await User.update(updates, { where: { id: req.user.userId } });
        const user = await User.findByPk(req.user.userId, {
          attributes: [
            "id",
            "name",
            "email",
            "phone",
            "location",
            "image",
            "role",
            "adminApproved",
          ],
        });
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Update failed" });
      }
    }
  );
  
  // ------------- PATCH /user/change-password -------------
  router.patch("/change-password", authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.userId);
  
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) return res.status(401).json({ message: "Current password incorrect" });
  
    if (newPassword.length < 6)
      return res.status(400).json({ message: "Password too short" });
  
    const hash = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hash }, { where: { id: req.user.userId } });
  
    res.json({ message: "Password updated" });
  });
  





module.exports=router;