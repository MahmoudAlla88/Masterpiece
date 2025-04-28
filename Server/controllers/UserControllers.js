const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 


exports.signup = async (req, res) => {
  try {
    const { name, phone, location, email, password } = req.body;  // Ensure email is included

    // Check if the phone number or email already exists in the database
    const existingUserByPhone = await User.findOne({ where: { phone } });
    const existingUserByEmail = await User.findOne({ where: { email } });
    
    if (existingUserByPhone) {
      return res.status(400).json({ message: 'Phone number is already in use' });
    }
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await User.create({
      name,
      phone,
      email,           // Ensure email is passed to the database
      password: hashedPassword,
    });

    // Create a JWT token for the new user
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || 'mysecretkey', {
      expiresIn: '1d',
    });

    // Set the JWT token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,          // Set to true in production with HTTPS
      sameSite: 'strict',     // Cookie sharing policy
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
    });

    // Respond with user data and the generated token
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        location: newUser.location,
        email: newUser.email,  // Include email in the response
        role: newUser.role,
        adminApproved: newUser.adminApproved,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong while creating user' });
  }
};

  

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
     
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid login credentials' });
    }
  
   
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid login credentials' });
    }
  
      
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'mysecretkey', {
        expiresIn: '1d',
      });
     
      res.cookie('token', token, {
        httpOnly: true, 
        secure: false,      
        sameSite: 'strict',  
        maxAge: 24 * 60 * 60 * 1000, 
      });
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email:user.email,
          name: user.name,
          phone: user.phone,
          location: user.location,
          image: user.image,
          role: user.role,
          adminApproved: user.adminApproved
        },
        token
      }
    );
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong while logging in' });
  }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'location', 'image', 'role'], // تحديد الحقول المراد استرجاعها
     
      });
      res.status(200).json({
        success: true,
        users: users
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'حدث خطأ أثناء جلب المستخدمين'
      });
    }
  };