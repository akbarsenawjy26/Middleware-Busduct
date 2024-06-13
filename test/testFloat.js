const express = require("express");
const ModbusRTU = require("modbus-serial");
const app = express();
const port = 3001;

// Inisialisasi Modbus client
const client = new ModbusRTU();

// Fungsi untuk mengatur koneksi client
function setClient() {
  client.setID(59); // Ganti dengan ID perangkat Modbus Anda
  client.setTimeout(1000);
}

// Fungsi untuk menggabungkan dua register 16-bit menjadi float 32-bit
function convertRegistersToFloat(data) {
  const registers = data.data;
  const highRegister = registers[0];
  const lowRegister = registers[1];

  // Gabungkan kedua register menjadi satu nilai 32-bit
  const combinedRegisters = (highRegister << 16) | lowRegister;

  // Konversi nilai 32-bit menjadi buffer
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32BE(combinedRegisters, 0);

  // Konversi buffer menjadi float
  const floatValue = buffer.readFloatBE(0);

  return floatValue;
}

// Endpoint untuk membaca data Modbus dan mengonversinya menjadi float
app.get("/read-float", async (req, res) => {
  try {
    await client.connectTCP("192.168.17.111", { port: 502 }); // Ganti dengan alamat IP dan port server Modbus Anda
    setClient();

    const data = await client.readHoldingRegisters(2, 2); // Baca dua register mulai dari alamat 0
    const floatValue = convertRegistersToFloat(data);

    res.json({ floatValue });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    client.close();
  }
});

// Jalankan server Express
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
