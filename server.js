require("dotenv").config();
const app = require("./src/app");
const client = require("./src/config/db");
const port = process.env.PORT || 3000;

async function startServer() {
  await client.connect();
  console.log("MongoDB is connected");

  app.get("/", (req, res) => {
    res.send("Smart Server is running");
  });

  app.listen(port, () => {
    console.log("Server running on port 3000");
  });
}

startServer();
