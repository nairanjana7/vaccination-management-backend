const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { isDoctor } = require("../middleware/roleMiddleware");
const languageMiddleware = require("../middleware/languageMiddleware");

const {
  addVaccination,
  getMyVaccinations,
} = require("../controllers/vaccinationController");

// Doctor adds vaccination
router.post(
  "/add",
  protect,
  languageMiddleware,
  isDoctor,
  addVaccination
);

// Patient views own vaccination history
router.get(
  "/my",
  protect,
  languageMiddleware,
  getMyVaccinations
);

module.exports = router;
