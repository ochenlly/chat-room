const express = require("express");

const router = express.Router();

router.get("/welcome", (req, res) => {
  res.send("<h1>欢迎！</h1>");
});

module.exports = router;
