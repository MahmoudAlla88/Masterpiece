require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const client = new OAuth2Client(process.env.CLIENT_ID); 




module.exports.googleSignIn = async (req, res) => {
  const { token } = req.body;

  try {
   
    const ticket = await client.verifyIdToken({
      idToken: token,  
      audience: process.env.CLIENT_ID ,  // client ID من Google
    });

    const payload = ticket.getPayload();  // من هاي بجيب معلومات المستخدم من جوجل

    // هون بدور على ال user اذا مش موجود بنشئ او اذا موجود بعمله select
    const [user, created] = await User.findOrCreate({
      where: { google_id: payload.sub },  // التحقق من Google ID
      defaults: {
        email: payload.email,
        name: payload.name,
        phone: "phone", 
        password:""
      },
    });

   
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,   
      maxAge: 3600000, 
    });

    res.send({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
