import express from 'express'
import { employeeRegister } from '../controllers/hotelEmpController.js'

const router = express.Router()

router.route('/register').post(employeeRegister)



export default router

