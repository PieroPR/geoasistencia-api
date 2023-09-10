import express from "express";
import {
  getAllCourses,
  // getSalonById,
  // getSalonsGeneral,
  createCourse,
  // updateSalon,
} from "../controller/coursesController.js";

const router = express.Router();

router.get("/", getAllCourses);
// router.get("/:id", getSalonById);
// router.get("/search/:search", getSalonsGeneral);
router.post("/create", createCourse);
// router.patch("/update/:id", updateSalon);

// router.post('/filter', filterSalons);

export default router;
