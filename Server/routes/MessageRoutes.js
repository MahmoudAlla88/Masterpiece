const express = require("express");

const router = express.Router();

const {
  createMessage,
  getMessages,
  getMessagesByReadStatus,
  updateMessageReadStatus
} = require("../controllers/MessageControllers");


router.post("/contact", createMessage);
router.get("/contact/getmessages", getMessages);
router.get("/contact/getMessagesByReadStatus",  getMessagesByReadStatus);
router.put("/contact/messages/:id/read", updateMessageReadStatus);


module.exports = router;