import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import router from "./routes/FinancialRoute.js";
import dotenv from "dotenv";

// Initialize Express
const app = express();

dotenv.config();

const port = process.env.PORT || 3000; // Use PORT instead of VITE_PORT
const dbString = process.env.DB_STRING; // Use DB_STRING instead of VITE_DB_STRING

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send({ message: "Server is running!!" });
});

// app.use("/finance-record", router);

// MongoDB Connection
mongoose
  .connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
