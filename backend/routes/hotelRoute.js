import express from "express";
import {
  hotelRegister,
  hotelLogin,
  editHotel,
  hotelDeletion,
  getAllHotels,
  singleHotel,
} from "../controllers/hotelController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/hotelRegistration").post(authenticateUser, hotelRegister);
router.route("/hotelLogin").post(hotelLogin);
router.route("/allHotels").get(getAllHotels);
router.route("/:id").delete(hotelDeletion).get(authenticateUser, singleHotel);

export default router;
