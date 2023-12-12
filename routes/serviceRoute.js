import express from "express";
import { getAllClientComplaints, newComplaint } from "../controllers/serviceController.js";

const router = express.Router();

router.route("/complaint/:id").post(newComplaint).get(getAllClientComplaints)

export default router;
