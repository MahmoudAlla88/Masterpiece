const ContactMessage = require("../models/Contact");

 const nodemailer= require('nodemailer');
 const dotenv= require('dotenv');
  dotenv.config();
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
     console.log(req.body);
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
    try {
      const messages = await ContactMessage.findAll();

      if (!messages.length) {
        return res.status(404).json({ message: "No contact messages found" });
      }

      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  const getMessagesByReadStatus = async (req, res) => {
    try {
      const { status } = req.query;  
      let readStatus = null;
  
      if (status === "read") {
        readStatus = true;
      } else if (status === "unread") {
        readStatus = false;
      }
  
      
      const messages = await ContactMessage.findAll({
        where: readStatus !== null ? { read: readStatus } : {},
      });
  
      if (messages.length === 0) {
        return res.status(200).json({ message: "No messages found" });
      }
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages by read status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  const updateMessageReadStatus = async (req, res) => {
    const { id } = req.params;
  
    try {
      const message = await ContactMessage.findByPk(id);
  
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
  
      // تحديث حالة القراءة إلى true
      message.read = true;
      await message.save();
  
      return res.status(200).json(message);
    } catch (error) {
      console.error("Error updating message read status:", error);
      return res.status(500).json({ message: "Failed to update message status" });
    }
  };
  







  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 465,
    secure: true,                
    auth: {
      user: process.env.EMAIL_USER,   
      pass: process.env.EMAIL_PASS,   
    },
  });



 const replyToMessage = async (req, res) => {
    const { messageId } = req.params;
    const { replyText } = req.body;
  
    if (!replyText?.trim()) {
      return res.status(400).json({ message: 'نصّ الرد مطلوب' });
    }
  
    try {
    
      const msg = await ContactMessage.findByPk(messageId);
      if (!msg) {
        return res.status(404).json({ message: 'الرسالة غير موجودة' });
      }
  console.log(msg)
      
      const mailOpts = {
        from: `"${process.env.EMAIL_USER}" <${process.env.EMAIL_USER}>`,
        to: msg.email,                          // بريد صاحب الرسالة
        subject: `Re: ${msg.subject}`,
        text: replyText,
        html: `<p>${replyText.replace(/\n/g, '<br>')}</p>`,
      };
  
      await transporter.sendMail(mailOpts);
  
   
      await msg.update({ replyText, repliedAt: new Date() });
  
      res.json({ success: true, message: 'Reply sent and saved.' });
    } catch (err) {
      console.error('Reply error:', err);
      res.status(500).json({ message: 'Failed to send reply.' });
    }
  };




  module.exports = {createMessage , getMessages , getMessagesByReadStatus , updateMessageReadStatus , replyToMessage}