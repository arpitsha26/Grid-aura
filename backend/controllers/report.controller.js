import Report from "../models/report.js";
import Project from "../models/project.js";
import User from "../models/user.js";


export const createReport = async (req, res) => {
  try {
    const { name, description, fileLink, pdfFile, excelFile, generatedBy, relatedProject } = req.body;

    const report = new Report({
      name,
      description,
      fileLink,
      pdfFile,
      excelFile,
      generatedBy,
      relatedProject,
    });

    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Failed to create report", error });
  }
};


export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("generatedBy", "fullName email")
      .populate({
        path: "relatedProject",
        select: "name status location budget assets materials",
        populate: [
          { path: "assets" }, 
          { path: "materials" } 
        ]
      });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Failed to fetch reports", error });
  }
};


export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id)
      .populate("generatedBy", "fullName email")
      .populate({
        path: "relatedProject",
        select: "name status location budget assets materials",
        populate: [
          { path: "assets" },
          { path: "materials" }
        ]
      });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Failed to fetch report", error });
  }
};


export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedReport = await Report.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ message: "Failed to update report", error });
  }
};


export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Failed to delete report", error });
  }
};
