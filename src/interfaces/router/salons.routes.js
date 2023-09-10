import express from "express";
import {
  getAllSalons,
  getSalonById,
  // getSalonsGeneral,
  createSalon,
  updateSalon,
} from "../controller/salonsController.js";

const router = express.Router();

router.get("/", getAllSalons);
router.get("/:id", getSalonById);
// router.get("/search/:search", getSalonsGeneral);
router.post("/create", createSalon);
router.patch("/update/:id", updateSalon);

// router.post('/filter', filterSalons);

export default router;
