import express from "express";
import {
  addLocation,
  getAllLocations,
  updateLocation,
} from "../controllers/locationController.js";
const router = express.Router();

router.route("/add").post(addLocation);
router.route("/:id").get(getAllLocations).put(updateLocation);

export default router;
