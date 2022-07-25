import express from "express";
import { createServiceRequest } from "../controllers/serviceRequestController.js";

const router = express.Router();

router.route("/createSR").post(createServiceRequest);

export default router;
