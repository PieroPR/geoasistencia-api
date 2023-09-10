import express from "express";
import {
  getAllDocents,
  authenticateDocent,
  getDocentById,
  getDocentsGeneral,
  createDocent,
  updateDocent
} from "../controller/docentsController.js";

const router = express.Router();

router.get("/", getAllDocents);
router.get("/:id", getDocentById);
router.get("/search/:search", getDocentsGeneral);
router.post('/login', authenticateDocent);
router.post("/create", createDocent);
router.patch("/update/:id", updateDocent);

// router.post('/filter', filterDocents);

export default router;
