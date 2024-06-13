const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const influx = new InfluxDB({
  url: "http://localhost:8086",
  token:
    "jfHVFte40Q937UgC6_v62iDdYvHHPWC1HIi_Ifpl8y3MjnsD634l-KedjmDzWBqpWR32mFSwxISMXPHY5p8a-A==",
});

const queryApi = influx.getQueryApi("WIT.SBY");

async function fetchModbusData(slaveId) {
  const query = `from(bucket: "BusDuct")
    |> range(start: -1h)
    |> filter(fn: (r) => r._measurement == "modbus_data" and r.slaveId == "${slaveId}")
    |> last()`;

  try {
    const result = await queryApi.collectRows(query);
    return result;
  } catch (err) {
    console.error(`Error querying InfluxDB for slave ID ${slaveId}:`, err);
    throw new Error(
      `Failed to fetch data from InfluxDB for slave ID ${slaveId}`
    );
  }
}

module.exports = {
  fetchModbusData,
};
