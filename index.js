import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/FinancialRoute.js";
import "dotenv/config";

const app = Express();
const port = process.env.VITE_PORT;
app.use(cors());
app.use(Express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server is running!!" });
});

app.use("/finance-record", router);
// require("dotenv").config();

// const mongoURL =
//   "mongodb+srv://jayeshjaiswal2510:F7pL2Co2GQZMO9lR@cluster0.grfya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbString = process.env.VITE_DB_STRING;
mongoose
  .connect(dbString)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port} `);
    });
    console.log("Connected with Database");
  })
  .catch((error) => {
    console.log("Database connection Failed ", error);
  });
