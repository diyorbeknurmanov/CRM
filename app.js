const express = require("express");
const config = require("config");
const router = require("./routes/index.routes");
const PORT = config.get("port") || 3333;

const app = express();
app.use(express.json());

app.use("/api", router);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
