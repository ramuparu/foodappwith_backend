import jwt from 'jsonwebtoken'

import { findVandor } from "./index.js";

import { ValidatePassword } from "../utility/index.js";
import { APP_SECRET } from '../config/index.js';
import { FoodModel } from '../models/index.js';

export const VandorLogin = async(req,res,next)=>{
    
    const {email,password} = req.body

    

    try {
        const emailExist =await findVandor('',email)
        console.log(emailExist)
        if (emailExist){
            const isPasswordMatched =await ValidatePassword(password,emailExist.password,emailExist.salt)

            if (isPasswordMatched){
                
                const jwtKey = jwt.sign({
                    name : emailExist.name,
                    _id : emailExist._id ,
                    foodType : emailExist.foodType ,
                    email : emailExist.email
                },APP_SECRET,{expiresIn:'1d'})

                res.json({
                    jwtKey,
                    "message":"jwt token generate successfully"
                })
            }else {
                return res.status(402).json({
                    "message":"password mismatch"
                }) 
            }
            
        }
    }catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }

}

export const GetVandorProfile = async(req,res,next)=>{

    const user = req.user
    
    try {
        if (user){
            const adminUser =await findVandor(user._id)

            return res.json({
                "user":adminUser
               
            })
        }else {
                return res.status(401).json({
                    "message":"user not found"
                }) 
            }
        }catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }
    }

export const UpdateVandorProfile = async(req,res,next)=>{

        const user = req.user

        const {name,foodType,address,phone} = req.body
        
        try {
            const existingVandor = await findVandor(user._id)
            if (existingVandor){
                
                existingVandor.name = name;
                existingVandor.foodType = foodType;
                existingVandor.address = address;
                existingVandor.phone = phone;

                const savedAdminCred =await existingVandor.save()
                return res.json({
                    "user":savedAdminCred
                   
                })
            }else {
                    return res.status(401).json({
                        "message":"user not updated"
                    }) 
                }
            }catch(err){
            return res.status(500).json({
                "message":err.message
            })
        }
}  

export const UpdateVandorProfileService = async(req,res,next)=>{

    const user = req.user

    
    
    try {
        const existingVandor = await findVandor(user._id)
        if (existingVandor){
            
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable

            const savedAdminService =await existingVandor.save()
            return res.json({
                "user":savedAdminService
               
            })
        }else {
                return res.status(401).json({
                    "message":"user not updated"
                }) 
            }
        }catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }
} 

export const AddFood = async(req,res,next)=>{

    const user = req.user

    const {name,description,category,foodType,readyTime,price} = req.body

    try {
        const existingVandor = await findVandor(user._id)
        if (existingVandor){
            
            

            // const images = files.map((file:Express.Multer.File)=>file.filename)

            const createFood = await FoodModel.create({
                vandorId : existingVandor._id,
                name,
                description,
                category,
                foodType,
                readyTime,
                price,
                rating : 0,
                images : ['pop.jpg']
            })
             
            existingVandor.foods.push(createFood)
            const result =await existingVandor.save()
            return res.json({
                "data":result
            })
        }else {
                return res.status(401).json({
                    "message":"foods not added due to login invalid"
                }) 
            }
        }catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }
} 

export const GetFoods = async(req,res,next)=>{

    const user = req.user

    try {
        
        if (user){
            const getFoods = await FoodModel.find({vandorId : user._id})
            if (getFoods){
                return res.json({
                    "data":getFoods
                })
            }else {
                return res.status(401).json({
                    "message":"no foods found with current user"
                }) 
            }
            
        }else {
                return res.status(401).json({
                    "message":"user not found"
                }) 
            }
        }catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }
} 