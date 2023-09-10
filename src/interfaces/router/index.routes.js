import express from "express";
import docentsRouter from "./docents.routes.js";
import salonsRouter from "./salons.routes.js";
import coursesRouter from "./courses.routes.js";
import schedulesRouter from "./schedules.routes.js";
const router = express.Router();

router.use("/docents", docentsRouter);
router.use("/salons", salonsRouter);
router.use("/courses", coursesRouter);
router.use("/schedules", schedulesRouter);

export default router;
