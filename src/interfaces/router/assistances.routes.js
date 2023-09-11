import express from "express";
import {
  getAllAssistances,
  createAssistance
} from "../controller/assistancesController.js";


const router = express.Router();

router.get("/", getAllAssistances);
router.post("/create", createAssistance);


export default router;
