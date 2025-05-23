const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const apiroute = require("./apiroute");
const authroute = require("./authapiroute");
const responseroute = require("./responseroute");
const visitorRoute = require("./visitorRoute");
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://formbuilderevotechfrontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/forms", apiroute);
app.use("/api/responses", responseroute);
app.use("/auth/api", authroute);
app.use("/api/visitor", visitorRoute);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database is connected.");
    app.listen(process.env.PORT, () => {
      console.log("server is running on port number 3001");
    });
  })
  .catch((error) => {
    console.log("database is not connected", error);
  });
