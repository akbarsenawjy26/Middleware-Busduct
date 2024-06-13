const ModbusRTU = require("modbus-serial");

class ModbusModel {
  constructor(ip) {
    this.ip = ip;
    this.client = new ModbusRTU();
  }

  async connect() {
    try {
      await this.client.connectTCP(this.ip, { port: 502, timeout: 3000 });
      console.log(`Connected to Modbus TCP at ${this.ip}`);
    } catch (err) {
      console.error(`Error connecting to Modbus TCP at ${this.ip}:`, err);
      throw err;
    }
  }

  async readRegisters(startAddress, numRegisters, slaveId) {
    if (!this.client.isOpen) {
      await this.connect();
    }
    this.client.setID(slaveId);
    const data = await this.client.readHoldingRegisters(
      startAddress,
      numRegisters
    );
    return data.data;
  }
}

module.exports = ModbusModel;
