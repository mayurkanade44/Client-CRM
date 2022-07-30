import express from "express";
import {
  allEmployeeSR,
  allHotelSR,
  createServiceRequest,
  getSingleSR,
  updateSingleSR,
} from "../controllers/serviceRequestController.js";

const router = express.Router();

router.route("/createSR").post(createServiceRequest);
router.route("/singleSR/:id").get(getSingleSR).put(updateSingleSR);
router.route("/employeeSR/:id").get(allEmployeeSR);
router.route("/hotelSR/:id").get(allHotelSR);

export default router;
