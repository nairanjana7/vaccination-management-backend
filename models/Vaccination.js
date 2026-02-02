const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vaccineName: {
      type: String,
      required: true,
    },

    doseNumber: {
      type: Number,
      required: true,
    },

    vaccinationDate: {
      type: Date,
      required: true,
    },

    nextDoseDate: {
      type: Date,
    },

    administeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vaccination", vaccinationSchema);
