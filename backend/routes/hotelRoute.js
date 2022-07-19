import express from "express";
import {
  hotelRegister,
  hotelLogin,
  addTreatmentLocation,
  editTreatmentLocation,
  deleteTreatmentLocation,
  hotelDeletion,
  getAllHotels,
  singleHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.route("/hotelRegistration").post(hotelRegister);
router.route("/hotelLogin").post(hotelLogin);
router.route("/allHotels").get(getAllHotels);
router.route("/:id").delete(hotelDeletion).get(singleHotel);
router
  .route("/locations/:id")
  .post(addTreatmentLocation)
  .patch(editTreatmentLocation)
  .delete(deleteTreatmentLocation);

export default router;
