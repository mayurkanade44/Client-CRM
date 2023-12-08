import express from "express";
import {
  addLocation,
  getAllLocations,
} from "../controllers/locationController.js";
const router = express.Router();

router.route("/add").post(addLocation);
router.route("/:id").get(getAllLocations);

export default router;
