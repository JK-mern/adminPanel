import express from 'express'
import { createEmployee, findEmployee, updateEmployee } from '../controllers/employe.controller.js'

const router = express.Router ()

router.post('/createEmployee',createEmployee)
router.get('/getEmployee/:empName',findEmployee)
router.put('/update/:empName',updateEmployee)


export default router