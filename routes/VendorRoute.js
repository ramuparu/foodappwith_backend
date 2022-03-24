import express from "express";

import multer from "multer";

import {VandorLogin,GetVandorProfile, UpdateVandorProfile, UpdateVandorProfileService,AddFood,GetFoods}  from "../controllers/index.js"

import { AuthenticateAdmin } from "../middlewares/index.js";

const router = express.Router();

// const imageStorage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null,'images')
//     },
//     filename : function(req,file,cb){
//         cb(null,new Date().toISOString()+'-'+file.originalname)
        
//     }
// })

// const images = multer({storage : imageStorage}).array('images',10)

router.post('/login',VandorLogin)

router.use(AuthenticateAdmin)

router.get('/profile',GetVandorProfile)

router.put('/profile',UpdateVandorProfile)

router.patch('/profile',UpdateVandorProfileService)

router.post('/food',AddFood)

router.get('/foods',GetFoods)


export {router as VenderRoute}