import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/FinancialRoute.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;
const dbString = process.env.DB_STRING;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/finance-record", router);

app.listen(port, () => {
  console.log(`Server running smoothing 4000`);
});

// MongoDB Connection (no deprecated options needed)
mongoose
  .connect(dbString)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
