import express from "express";
import { RegisterPesapalIPN,pesapalIPN,getRegisteredIpns,InitiatePayment } from "../controllers/pesapal.controller.js";
import { authorization } from "../utils/pesapal.js";
const router = express.Router()

router.route('/pesapalipn')
.post(authorization,pesapalIPN)
router.route('/initiatepayment')
.post(authorization,InitiatePayment)
router.route('/pesapalregister')
.get(authorization,RegisterPesapalIPN)
router.route('/registeredipns')
.get(authorization,getRegisteredIpns)

export default router;