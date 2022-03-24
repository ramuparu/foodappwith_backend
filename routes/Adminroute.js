import express from "express";

import {CreateVendor,GetVendors,GetVendorById} from '../controllers/index.js'

const router = express.Router()

router.post('/vandor',CreateVendor)

router.get('/vandors',GetVendors)

router.get('/vandor/:id',GetVendorById)

export {router as AdminRoute}