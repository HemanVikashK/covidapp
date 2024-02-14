const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./utils/db");

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/userRoute");
const centerRoute = require("./routes/centerRoute");
const seatRoute = require("./routes/seatRoute");

app.use("/user", userRoute);
app.use("/center", centerRoute);
app.use("/seat", seatRoute);

const PORT = 9000;

app.listen(PORT, console.log(`this is running on server ${PORT}`));
