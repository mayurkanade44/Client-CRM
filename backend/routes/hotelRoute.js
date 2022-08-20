import express from "express";
import {
  hotelRegister,
  hotelLogin,
  editHotel,
  hotelDeletion,
  getAllHotels,
  singleHotel,
} from "../controllers/hotelController.js";
import { authenticateUser, authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/hotelRegistration")
  .post(authenticateUser, authorizeUser("Admin"), hotelRegister);
router.route("/hotelLogin").post(hotelLogin);
router.route("/allHotels").get(getAllHotels);
router
  .route("/:id")
  .delete(authenticateUser, authorizeUser("Admin"), hotelDeletion)
  .get(authenticateUser, singleHotel);

export default router;
