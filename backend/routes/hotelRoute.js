import express from 'express'
import { hotelRegister, hotelLogin} from '../controllers/hotelController.js'

const router = express.Router()

router.route("/hotelRegistration").post(hotelRegister)
router.route("/hotelLogin").post(hotelLogin)

export default router