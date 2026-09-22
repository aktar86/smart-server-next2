const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const bidRoutes = require("./routes/bid.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/bids", bidRoutes);

module.exports = app;
