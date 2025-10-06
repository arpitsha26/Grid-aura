import express from "express";
import { createReport, deleteReport, getReportById, getReports, updateReport } from "../controllers/report.controller.js";

const reportrouter = express.Router();


reportrouter.post("/", createReport);
reportrouter.get("/", getReports);
reportrouter.get("/:id", getReportById);
reportrouter.put("/:id", updateReport);
reportrouter.delete("/:id", deleteReport);

export default reportrouter;