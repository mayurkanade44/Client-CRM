import express from "express";
import { addService, getAllService } from "../controllers/adminController.js";
const router = express.Router();

router.route("/service").post(addService).get(getAllService);

export default router;
