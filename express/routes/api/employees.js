const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeeController");

router
  .route("/")
  .get(employeeController.getallemp)
  .post(employeeController.createnewemp)
  .put(employeeController.updateemp)
  .delete(employeeController.deleteemp);

router.route("/:id").get(employeeController.getemp);

module.exports = router;
