import express from "express";
import FinancialRecordModel from "../models/FinancialRecord.model.js";

const router = express.Router();

router.get("/gettingAllByUserid/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });

    if (records.length === 0) {
      return res.status(404).send("No record found");
    }

    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newRecordBody = req.body;

    const newRecord = new FinancialRecordModel(newRecordBody);

    const recordSaved = await newRecord.save();

    res.status(200).json({ message: "New record added", data: recordSaved });
  } catch (error) {
    console.error("Error in saving financial record:", error);
    res
      .status(500)
      .json({ message: "Failed to add record", error: error.message });
  }
});

// update api not in use currently
router.put("/update/:id", async (req, res) => {
  try {
    const recordId = req.params.id;
    const updatedRecordBody = req.body;
    const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
      recordId,
      updatedRecordBody,
      { new: true }
    );

    if (!updatedRecord) return res.status(404).send("No record found");

    res.status(200).send({ message: "Record updated", data: updatedRecord });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const recordId = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(recordId);
    if (!record) return res.status(404).send("No record found");
    res.status(200).send({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
