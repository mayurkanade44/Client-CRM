import express from "express";
import { newComplaint } from "../controllers/complaintController.js";

const router = express.Router();

router.route("/:id").post(newComplaint);

export default router;
