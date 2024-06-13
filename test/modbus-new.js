const express = require("express");
const ModbusRTU = require("modbus-serial");
const app = express();
const port = 3001;

const client = new ModbusRTU();

async function connectModbus() {
  try {
    await client.connectTCP("192.168.17.1", { port: 502, timeout: 5000 }); // Set timeout 5 detik
    client.setID(51);
    console.log("Connected to Modbus TCP");
  } catch (err) {
    console.error("Error connecting to Modbus TCP:", err);
  }
}

app.get("/read", async (req, res) => {
  try {
    if (!client.isOpen) {
      await connectModbus();
    }

    console.log("Reading Modbus data...");
    const data = await client.readHoldingRegisters(0, 10);
    console.log("Data read successfully:", data.data);

    res.json({ data: data.data });
  } catch (err) {
    console.error("Error reading Modbus data:", err);
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
