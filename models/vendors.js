import mongoose from "mongoose";

const VendorsShema = new mongoose.Schema({
    name : {type : String,required:true},
    ownerName : {type : String,required:true},
    foodType : {type : [String]},
    pincode : {type : String,required:true},
    address : {type : String},
    phone : {type : String,required:true},
    email :  {type : String,required:true},
    password : {type : String,required:true},
    salt : {type : String,required:true},
    serviceAvailable : {type : Boolean},
    coverImages : {type : [String]},
    rating : {type : Number},
    foods : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'food'
    }]
},{
    toJSON : {
       transform(doc,ret){
           
           delete ret.password,
           delete ret.salt,
           delete ret._v,
           delete ret.createdAt,
           delete ret.updatedAt
       }
    },
    timestamps : true
})

const vendorModel = mongoose.model('vandor',VendorsShema)

export { vendorModel}