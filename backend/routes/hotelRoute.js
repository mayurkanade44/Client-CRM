import express from "express";
import {
  hotelRegister,
  hotelLogin,
  editHotel,
  hotelDeletion,
  getAllHotels,
  singleHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.route("/hotelRegistration").post(hotelRegister);
router.route("/hotelLogin").post(hotelLogin);
router.route("/allHotels").get(getAllHotels);
router.route("/:id").delete(hotelDeletion).get(singleHotel);

export default router;
