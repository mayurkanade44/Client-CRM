import express from 'express'
import { employeeRegister, employeeLogin, employeeDeletion } from '../controllers/hotelEmpController.js'

const router = express.Router()

router.route('/register').post(employeeRegister)
router.route('/login').post(employeeLogin)
router.route('/:id').delete(employeeDeletion)



export default router

