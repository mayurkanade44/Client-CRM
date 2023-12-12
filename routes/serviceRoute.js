import express from "express";
import {
  getAllClientComplaints,
  getSingleComplaint,
  newComplaint,
  updateComplaint,
} from "../controllers/serviceController.js";

const router = express.Router();

router.route("/complaint/:id").post(newComplaint).get(getAllClientComplaints);
router.route("/singleComplaint/:id").get(getSingleComplaint).put(updateComplaint)

export default router;
