import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./MongoDB/connect.js";
import mongoose from "mongoose";
// import router from "./routes/FinancialRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const startServer = async () => {
  try {
    await connectDB(process.env.DB_STRING);
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
};

startServer();

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.get("/", (req, res) => {
  res.send({ message: "Server is running!!" });
});

// app.use("/finance-record", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error", err.message);
});
