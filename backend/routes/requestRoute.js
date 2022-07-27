import express from "express";
import {
    allEmployeeSR,
  createServiceRequest,
  getSingleSR,
} from "../controllers/serviceRequestController.js";

const router = express.Router();

router.route("/createSR").post(createServiceRequest);
router.route("/singleSR/:id").get(getSingleSR);
router.route("/employeeSR/:id").get(allEmployeeSR);

export default router;
