import express from "express";
import {
  addLocation,
  deleteLocation,
  getAllLocations,
  getLocationDetails,
  updateLocation,
} from "../controllers/locationController.js";
const router = express.Router();

router
  .route("/:id")
  .post(addLocation)
  .get(getLocationDetails)
  .put(updateLocation)
  .delete(deleteLocation);
router.get("/client/:id", getAllLocations);

export default router;
