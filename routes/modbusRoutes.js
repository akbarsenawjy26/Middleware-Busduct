const express = require("express");
const router = express.Router();
const modbusController = require("../controllers/modbusController");

router.get("/read/:slaveId", modbusController.readModbusData);

module.exports = router;
