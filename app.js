const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./client/build"));

// Import Routes
const travellerRouter = require("./routes/traveller.route");
const flightRouter = require("./routes/flight.route");

// Routes Middlewares
app.use("/api/v1", travellerRouter);
app.use("/api/v1/flights", flightRouter);

// Client Router
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/client/build",
  });
});

// Port Listening
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
