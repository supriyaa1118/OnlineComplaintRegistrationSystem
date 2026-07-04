const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  updateComplaintStatus,
} = require("../controllers/complaintController");

// Create Complaint
router.post("/add", createComplaint);

// Get All Complaints
router.get("/", getComplaints);

// Update Complaint
router.put("/:id", updateComplaint);

// Update Complaint Status
router.put("/status/:id", updateComplaintStatus);

// Delete Complaint
router.delete("/:id", deleteComplaint);

module.exports = router;