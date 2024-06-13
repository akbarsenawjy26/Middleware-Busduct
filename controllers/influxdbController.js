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

    const phase1Data = {
      voltageLN: data[0]._value,
      voltageLL: data[1]._value,
      current: data[2]._value,
      cosPhi: data[3]._value,
      pf: data[4]._value,
      activePower: data[5]._value,
      reactivePower: data[6]._value,
      apparentPower: data[7]._value,
      thdv: data[8]._value,
      thdi: data[9]._value,
    };

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

    const phase2Data = {
      voltageLN: data[10]._value,
      voltageLL: data[11]._value,
      current: data[12]._value,
      cosPhi: data[13]._value,
      pf: data[14]._value,
      activePower: data[15]._value,
      reactivePower: data[16]._value,
      apparentPower: data[17]._value,
      thdv: data[18]._value,
      thdi: data[19]._value,
    };

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

    const phase3Data = {
      voltageLN: data[20]._value,
      voltageLL: data[21]._value,
      current: data[22]._value,
      cosPhi: data[23]._value,
      pf: data[24]._value,
      activePower: data[25]._value,
      reactivePower: data[26]._value,
      apparentPower: data[27]._value,
      thdv: data[28]._value,
      thdi: data[29]._value,
    };

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

    const commonData = {
      totalCurrent: data[30]._value,
      totalPF: data[31]._value,
      totalActivePower: data[32]._value,
      totalReactivePower: data[33]._value,
      totalApparentPower: data[34]._value,
      totalFreq: data[35]._value, // Adjusted index to 35 for totalFreq
      NeutralCurrent: data[36]._value, // Adjusted index to 36 for NeutralCurrent
    };

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
