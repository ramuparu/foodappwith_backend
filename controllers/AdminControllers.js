import { vendorModel } from "../models/index.js"
import { GeneratePassword, GenerateSalt } from "../utility/index.js"

export const findVandor = async (id,email)=>{
    if(email){
        return await vendorModel.findOne({email:email})
    }else{
        return await vendorModel.findById(id)
    }
}

export const CreateVendor = async(req,res,next)=>{

    const {name,ownerName,phone,email,password,foodType,pincode,address} = req.body

    const salt = await GenerateSalt() 

    const userPassword = await GeneratePassword(password,salt)

    try{
        const vendorEmailIsExist = await findVandor('',email)
        
          if (vendorEmailIsExist){
              return res.json({
                "message":"email already existed"
            })
          }else{
            const vendorDetails =await new vendorModel({name,ownerName,phone,email,password : userPassword,foodType,pincode,address,salt,serviceAvailable: false,rating : 0 ,coverImages : []})
            await vendorDetails.save()
            return res.json({
                "message":"vendor added successfully"
            })
          }
        
    }catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }

}

export const GetVendors = async(req,res,next)=>{

    
    try {
        const getVandors = await vendorModel.find({})
        if (getVandors){
            return res.json({
                "message":"vendor fetched success",
                data : getVandors
            })
        }else {
            return res.status(402).json({
                "message":"no vendors found"
            }) 
        }
    }catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }

}

export const GetVendorById = async(req,res,next)=>{
    
    const {id} = req.params

    try {
        const getVandors = await findVandor(id)
        if (getVandors){
            return res.json({
                "message":"vendor fetched success",
                data : getVandors
            })
        }else {
            return res.status(402).json({
                "message":"no vendor found"
            }) 
        }
    }catch(err){
        return res.status(500).json({
            "message":err.message
        })
    }

}

