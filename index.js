import express from "express";

import bodyParser from 'body-parser'

import mongoose from "mongoose";

import path from "path";

import { AdminRoute,VenderRoute } from "./routes/index.js";
import { MONGO_URL } from "./config/index.js";

const app = express()

const PORT = 8000

mongoose.connect(MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(res=>{
    console.log(`DB connected`)
}).catch(err=>{
    console.log(err)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/admin',AdminRoute)
app.use('/vendor',VenderRoute)

app.listen(PORT,()=>{
    console.log(`Server Running At ${PORT}`)
})