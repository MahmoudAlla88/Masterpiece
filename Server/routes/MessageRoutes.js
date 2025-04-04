const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require("../controllers/MessageControllers");

router.post("/contact", createMessage);

router.get("/contact/getmessages", getMessages);

module.exports = router;