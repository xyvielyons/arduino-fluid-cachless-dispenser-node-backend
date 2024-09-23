import express from "express";
import { arduinoPostMessage,arduinoGetMessage } from "../controllers/arduino.controller.js";
import { authorization } from "../utils/pesapal.js";
const router = express.Router()

router.route('/postmessage')
.post(authorization,arduinoPostMessage)
router.route('/getmessage')
.get(arduinoGetMessage)

export default router;