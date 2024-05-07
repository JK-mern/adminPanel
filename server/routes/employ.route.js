import express from 'express'
import { createEmployee } from '../controllers/employe.controller.js'

const router = express.Router ()

router.post('/createEmployee',createEmployee)


export default router