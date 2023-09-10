import express from "express";
import {
  getAllSchedules,
  getScheduleById,
  // getSalonsGeneral,
  createSchedule,
  updateSchedule,
} from "../controller/schedulesController.js";

const router = express.Router();

router.get("/", getAllSchedules);
router.get("/:id", getScheduleById);
// router.get("/search/:search", getSalonsGeneral);
router.post("/create", createSchedule);
router.patch("/update/:id", updateSchedule);

// router.post('/filter', filterSalons);

export default router;
