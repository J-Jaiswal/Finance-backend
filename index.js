import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/FinancialRoute.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;
const dbString = process.env.DB_STRING;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send({ message: "Server is running!!" });
});

app.use("/finance-record", router);

// MongoDB Connection (no deprecated options needed)
mongoose
  .connect(dbString)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
