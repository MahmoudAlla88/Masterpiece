const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.pattern.base': 'Name must contain only letters and spaces'
    }),
  phone: Joi.string()
    .min(9)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must contain digits only',
      'string.min': 'Phone number must be at least 9 digits long'
    }),
  location: Joi.string().allow('', null),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address'
    }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and a number or symbol'
    })
});
exports.signup = async (req, res) => {
  try {
    const { name, phone, location, email, password } = req.body;  

    const { error, value } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
    
      const messages = error.details.map(d => d.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
  

    
    const existingUserByPhone = await User.findOne({ where: { phone } });
    const existingUserByEmail = await User.findOne({ where: { email } });
    
    if (existingUserByPhone) {
      return res.status(400).json({ message: 'Phone number is already in use' });
    }
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      name,
      phone,
      email,           
      password: hashedPassword,
    });

  
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || 'mysecretkey', {
      expiresIn: '1d',
    });

    
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,         
      sameSite: 'strict',  
      maxAge: 24 * 60 * 60 * 1000, 
    });

   
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        location: newUser.location,
        email: newUser.email, 
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
        attributes: ['id', 'name', 'email', 'phone', 'location', 'image', 'role'], 
     
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



  exports.deleteUser = async (req, res) => {
    const { id } = req.params;
  
 
    try {
      
      const deletedRows = await User.findByPk(id);
      if (!deletedRows) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await deletedRows.destroy();
  
   
      return res.sendStatus(204);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  exports.restoreUser = async (req, res) => {
    const { id } = req.params;
  
    try {
     
      const user = await User.findByPk(id, { paranoid: false });
      if (!user) {
        return res.status(404).json({ error: 'User not found (even in trash)' });
      }
  
     
      if (user.deletedAt === null) {
        return res.status(400).json({ error: 'User is already active' });
      }
  
     
      await user.restore();              
  
      return res.status(200).json({ message: 'User restored successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  exports.getDeletedUsers = async (req, res) => {
    const users = await User.find({ deletedAt: { $ne: null } });
    res.json({ success: true, users });
  };