const express = require("express");
const router = express.Router();
const refreshController = require("../../controllers/refreshtokencontroller");

router.get("/", refreshController.handlerefresh);

module.exports = router;
