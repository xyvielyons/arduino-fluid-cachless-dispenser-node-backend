import express from "express";
import { arduinoPostMessage,arduinoGetMessage } from "../controllers/arduino.controller.js";
const router = express.Router()

router.route('/postmessage')
.post(arduinoPostMessage)
router.route('/getmessage')
.get(arduinoGetMessage)

export default router;