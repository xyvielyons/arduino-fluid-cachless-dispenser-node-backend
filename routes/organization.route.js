import express from "express";
import { CreateOrganization,UpdateOrganization,DeleteOrganization,getOrganization } from "../controllers/organization.controller.js";
const router = express.Router()

router.route('/createorganization')
.post(CreateOrganization)
router.route('/updateorganization')
.post(UpdateOrganization)
router.route('/getorganization')
.post(getOrganization)
router.route('/deleteorganization')
.post(DeleteOrganization)


export default router;