import express from "express";
import { addService } from "../controllers/adminController.js";
const router = express.Router();

router.route("/service").post(addService);

export default router;
