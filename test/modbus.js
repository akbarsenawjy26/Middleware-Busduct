const express = require("express");
const ModbusRTU = require("modbus-serial");
const app = express();
const port = 3001;

// Buat koneksi Modbus TCP
const client = new ModbusRTU();
client.connectTCP("192.16.17.2", { port: 502 });
client.setID(59);

// Endpoint untuk membaca data Modbus
app.get("/read", async (req, res) => {
  try {
    // Membaca 10 register mulai dari alamat 0
    const data = await client.readHoldingRegisters(0, 10);

    // Mengonversi data menjadi JSON
    res.json({ data: data.data });
    log;
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
