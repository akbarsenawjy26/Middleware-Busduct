const ModbusModel = require("../models/modbusModel");

const slaves = [
  { id: 58, ip: "192.168.17.111" },
  { id: 59, ip: "192.168.17.111" },
];

let cachedData = {};

function convertRegistersToFloat(highRegister, lowRegister) {
  const combinedRegisters = (highRegister << 16) | (lowRegister & 0xffff);
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(combinedRegisters, 0);
  return buffer.readFloatBE(0);
}

const fetchData = async (slave) => {
  const modbus = new ModbusModel(slave.ip);
  try {
    const data = await modbus.readRegisters(0, 80, slave.id); // Adjusted the number of registers to 80
    console.log(slave.id, " : ", data);
    const result = {
      phase1: {
        voltageLN: convertRegistersToFloat(data[0], data[1]),
        voltageLL: convertRegistersToFloat(data[2], data[3]),
        current: convertRegistersToFloat(data[4], data[5]),
        cosPhi: convertRegistersToFloat(data[6], data[7]),
        pf: convertRegistersToFloat(data[8], data[9]),
        activePower: convertRegistersToFloat(data[10], data[11]),
        reactivePower: convertRegistersToFloat(data[12], data[13]),
        apparentPower: convertRegistersToFloat(data[14], data[15]),
        thdv: convertRegistersToFloat(data[16], data[17]),
        thdi: convertRegistersToFloat(data[18], data[19]),
      },
      phase2: {
        voltageLN: convertRegistersToFloat(data[20], data[21]),
        voltageLL: convertRegistersToFloat(data[22], data[23]),
        current: convertRegistersToFloat(data[24], data[25]),
        cosPhi: convertRegistersToFloat(data[26], data[27]),
        pf: convertRegistersToFloat(data[28], data[29]),
        activePower: convertRegistersToFloat(data[30], data[31]),
        reactivePower: convertRegistersToFloat(data[32], data[33]),
        apparentPower: convertRegistersToFloat(data[34], data[35]),
        thdv: convertRegistersToFloat(data[36], data[37]),
        thdi: convertRegistersToFloat(data[38], data[39]),
      },
      phase3: {
        voltageLN: convertRegistersToFloat(data[40], data[41]),
        voltageLL: convertRegistersToFloat(data[42], data[43]),
        current: convertRegistersToFloat(data[44], data[45]),
        cosPhi: convertRegistersToFloat(data[46], data[47]),
        pf: convertRegistersToFloat(data[48], data[49]),
        activePower: convertRegistersToFloat(data[50], data[51]),
        reactivePower: convertRegistersToFloat(data[52], data[53]),
        apparentPower: convertRegistersToFloat(data[54], data[55]),
        thdv: convertRegistersToFloat(data[56], data[57]),
        thdi: convertRegistersToFloat(data[58], data[59]),
      },
      common: {
        totalCurrent: convertRegistersToFloat(data[60], data[61]),
        totalPF: convertRegistersToFloat(data[62], data[63]),
        totalActivePower: convertRegistersToFloat(data[64], data[65]),
        totalReactivePower: convertRegistersToFloat(data[66], data[67]),
        totalApparentPower: convertRegistersToFloat(data[68], data[69]),
        totalFreq: convertRegistersToFloat(data[74], data[75]),
        NeutralCurrent: convertRegistersToFloat(data[76], data[77]),
      },
    };

    cachedData[slave.id] = result;
  } catch (err) {
    console.error(`Error reading Modbus data from slave ID ${slave.id}:`, err);
  }
};

const startPolling = async (slavery) => {
  try {
    for (let slave of slavery) {
      fetchData(slave);
      await sleep(1000);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setImmediate(() => {
      startPolling(slaves);
    });
  }
};

const modbusController = {
  readModbusData: async (req, res) => {
    const slaveId = parseInt(req.params.slaveId);
    const data = cachedData[slaveId];

    if (!data) {
      return res
        .status(404)
        .json({ error: `No data found for slave ID ${slaveId}` });
    }

    res.json(data);
    console.log(data);
  },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
startPolling(slaves);

module.exports = modbusController;
