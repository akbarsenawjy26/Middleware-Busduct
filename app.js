const express = require("express");
const app = express();
const port = 3001;

const modbusRoutes = require("./routes/modbusRoutes");

app.use("/api", modbusRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
