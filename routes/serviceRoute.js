import express from "express";
import {
  getAllComplaints,
  getSingleClientComplaints,
  getSingleComplaint,
  newComplaint,
  updateComplaint,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/allComplaints", getAllComplaints);

router.post("/clientComplaint/:id", newComplaint);

router
  .route("/singleComplaint/:id")
  .get(getSingleComplaint)
  .put(updateComplaint);

export default router;
