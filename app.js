const express = require("express");
const app = express();
const port = 3001;

const modbusRoutes = require("./routes/modbusRoutes");
const influxRoutes = require("./routes/influxdbRoute");

app.use("/api", modbusRoutes);
app.use("/api", influxRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
