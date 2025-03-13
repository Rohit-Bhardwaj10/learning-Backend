const express = require("express");
const router = express.Router();
const logoutcontroller = require("../../controllers/logoutcontroller");

router.get("/", logoutcontroller.handlelogout);

module.exports = router;
