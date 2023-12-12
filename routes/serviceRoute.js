import express from "express";
import { newComplaint } from "../controllers/serviceController.js";

const router = express.Router();

router.route("/complaint/:id").post(newComplaint);

export default router;
