const express = require("express");
const router = express.Router();
const modbusController = require("../controllers/influxdbController");

router.get("/influx-db/phase1/:slaveId", modbusController.getPhase1Data);
router.get("/influx-db/phase2/:slaveId", modbusController.getPhase2Data);
router.get("/influx-db/phase3/:slaveId", modbusController.getPhase3Data);
router.get("/influx-db/common/:slaveId", modbusController.getCommonData);

module.exports = router;
