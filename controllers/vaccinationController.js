const Vaccination = require("../models/Vaccination");

// Add vaccination record (Doctor only)
exports.addVaccination = async (req, res) => {
  try {
    const {
      patientId,
      vaccineName,
      doseNumber,
      vaccinationDate,
      nextDoseDate,
    } = req.body;

    // Basic validation
    if (!patientId || !vaccineName || !doseNumber || !vaccinationDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const vaccination = await Vaccination.create({
      patient: patientId,
      vaccineName,
      doseNumber,
      vaccinationDate,
      nextDoseDate,
      administeredBy: req.user.id, // doctor ID from JWT
    });

    res.status(201).json({
      message: "Vaccination record added successfully",
      vaccination,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get logged-in patient's vaccination history
exports.getMyVaccinations = async (req, res) => {
  try {
    // Only patients can access
    if (req.user.role !== "patient") {
      return res
        .status(403)
        .json({ message: "Access denied. Patients only." });
    }

    const vaccinations = await Vaccination.find({
      patient: req.user.id,
    }).select("vaccineName doseNumber vaccinationDate nextDoseDate");

    res.json({ vaccinations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

