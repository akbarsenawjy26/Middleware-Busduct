const express = require("express");
const router = express.Router();
const modbusController = require("../controllers/influxdbController");

router.get("/modbus-data/phase1/:slaveId", modbusController.getPhase1Data);
router.get("/modbus-data/phase2/:slaveId", modbusController.getPhase2Data);
router.get("/modbus-data/phase3/:slaveId", modbusController.getPhase3Data);
router.get("/modbus-data/common/:slaveId", modbusController.getCommonData);

module.exports = router;
