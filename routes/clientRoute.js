import express from "express";
import {
  getAllClient,
  registerClient,
} from "../controllers/clientController.js";
const router = express.Router();

router.get("/", getAllClient);
router.post("/register", registerClient);

export default router;
