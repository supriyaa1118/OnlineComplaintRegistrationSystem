const Complaint = require("../models/Complaint");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, userEmail } = req.body;

    const complaint = new Complaint({
      title,
      description,
      category,
      userEmail,
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint Submitted Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Complaint (Title, Description, Category)
const updateComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Complaint Updated Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Complaint Status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Complaint Status Updated Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Complaint Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaint,
  updateComplaintStatus,
  deleteComplaint,
};