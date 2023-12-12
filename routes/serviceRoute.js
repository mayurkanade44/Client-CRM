import express from "express";
import {
  getAllClientComplaints,
  getSingleComplaint,
  newComplaint,
} from "../controllers/serviceController.js";

const router = express.Router();

router.route("/complaint/:id").post(newComplaint).get(getAllClientComplaints);
router.route("/singleComplaint/:id").get(getSingleComplaint);

export default router;
