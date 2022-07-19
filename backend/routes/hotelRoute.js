import express from "express";
import {
  hotelRegister,
  hotelLogin,
  addTreatmentLocation,
  editTreatmentLocation,
  deleteTreatmentLocation,
} from "../controllers/hotelController.js";

const router = express.Router();

router.route("/hotelRegistration").post(hotelRegister);
router.route("/hotelLogin").post(hotelLogin);
router
  .route("/addLocations/:id")
  .post(addTreatmentLocation)
  .patch(editTreatmentLocation)
  .delete(deleteTreatmentLocation);

export default router;
