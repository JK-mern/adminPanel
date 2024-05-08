import express from 'express'
import { createEmployee, findEmployee } from '../controllers/employe.controller.js'

const router = express.Router ()

router.post('/createEmployee',createEmployee)
router.get('/getEmployee/:empName',findEmployee)


export default router