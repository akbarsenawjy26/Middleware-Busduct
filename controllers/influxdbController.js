const ModbusData = require("../models/influxdbModel");

async function getPhase1Data(req, res) {
  const { slaveId } = req.params;

  try {
    const data = await ModbusData.fetchModbusData(slaveId);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found for slave ID ${slaveId}` });
    }

    // Assuming data returned is sorted and limited to the last 10 entries
    const phase1Data = data.map((row) => ({
      time: row._time,
      voltageLN: row.voltageLN,
      voltageLL: row.voltageLL,
      current: row.current,
      cosPhi: row.cosPhi,
      pf: row.pf,
      activePower: row.activePower,
      reactivePower: row.reactivePower,
      apparentPower: row.apparentPower,
      thdv: row.thdv,
      thdi: row.thdi,
    }));

    res.json(phase1Data);
  } catch (err) {
    console.error(`Error fetching Phase 1 data for slave ID ${slaveId}:`, err);
    res
      .status(500)
      .json({ error: `Failed to fetch Phase 1 data for slave ID ${slaveId}` });
  }
}

async function getPhase2Data(req, res) {
  const { slaveId } = req.params;

  try {
    const data = await ModbusData.fetchModbusData(slaveId);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found for slave ID ${slaveId}` });
    }

    const phase2Data = data.map((row) => ({
      time: row._time,
      voltageLN: row.voltageLN,
      voltageLL: row.voltageLL,
      current: row.current,
      cosPhi: row.cosPhi,
      pf: row.pf,
      activePower: row.activePower,
      reactivePower: row.reactivePower,
      apparentPower: row.apparentPower,
      thdv: row.thdv,
      thdi: row.thdi,
    }));

    res.json(phase2Data);
  } catch (err) {
    console.error(`Error fetching Phase 2 data for slave ID ${slaveId}:`, err);
    res
      .status(500)
      .json({ error: `Failed to fetch Phase 2 data for slave ID ${slaveId}` });
  }
}

async function getPhase3Data(req, res) {
  const { slaveId } = req.params;

  try {
    const data = await ModbusData.fetchModbusData(slaveId);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found for slave ID ${slaveId}` });
    }

    const phase3Data = data.map((row) => ({
      time: row._time,
      voltageLN: row.voltageLN,
      voltageLL: row.voltageLL,
      current: row.current,
      cosPhi: row.cosPhi,
      pf: row.pf,
      activePower: row.activePower,
      reactivePower: row.reactivePower,
      apparentPower: row.apparentPower,
      thdv: row.thdv,
      thdi: row.thdi,
    }));

    res.json(phase3Data);
  } catch (err) {
    console.error(`Error fetching Phase 3 data for slave ID ${slaveId}:`, err);
    res
      .status(500)
      .json({ error: `Failed to fetch Phase 3 data for slave ID ${slaveId}` });
  }
}

async function getCommonData(req, res) {
  const { slaveId } = req.params;

  try {
    const data = await ModbusData.fetchModbusData(slaveId);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found for slave ID ${slaveId}` });
    }

    const commonData = data.map((row) => ({
      time: row._time,
      totalCurrent: row._value,
      totalPF: row._value,
      totalActivePower: row._value,
      totalReactivePower: row._value,
      totalApparentPower: row._value,
      totalFreq: row._value,
      NeutralCurrent: row._value,
    }));

    res.json(commonData);
  } catch (err) {
    console.error(`Error fetching Common data for slave ID ${slaveId}:`, err);
    res
      .status(500)
      .json({ error: `Failed to fetch Common data for slave ID ${slaveId}` });
  }
}

module.exports = {
  getPhase1Data,
  getPhase2Data,
  getPhase3Data,
  getCommonData,
};
