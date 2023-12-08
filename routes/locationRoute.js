import express from "express";
import { addLocation } from "../controllers/locationController.js";
const router = express.Router();

router.route("/add").post(addLocation);

export default router