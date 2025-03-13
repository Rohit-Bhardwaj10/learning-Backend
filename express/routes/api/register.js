const express = require("express");
const router = express.Router();
const registercontroller = require("../../controllers/registercontroller");

router.post("/", registercontroller.handlenewuser);

module.exports = router;
