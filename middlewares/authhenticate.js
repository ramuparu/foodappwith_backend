
import jwt from "jsonwebtoken";

import { APP_SECRET } from "../config/index.js";

export const AuthenticateAdmin = async(req,res,next)=>{
    
    let jwtToken
    let autorHeaders = req.headers['authorization']

    try{
    if (autorHeaders !== undefined){
        jwtToken = autorHeaders.split(' ')[1]
    }
    if (jwtToken===undefined){
        res.status(401).json({"message":"invalid access token"})
    }else{
        jwt.verify(jwtToken,APP_SECRET,async(err,payload)=>{
            if(err){
                res.status(400).json({"message":"invalid jwt token"}) 
            }else{
                req.user = payload
                next()
            }
        })
    }
}catch(err){
    return res.status(500).json({
        "message":"internal server error"
    })
}
    

}