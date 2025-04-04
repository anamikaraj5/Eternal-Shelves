import express,{json} from 'express'
import dotenv from 'dotenv'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/adminauth.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app=express() 

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



dotenv.config()

app.use(json())

app.use('/',userauth)
app.use('/',adminauth)

const PORT = process.env.PORT 

mongoose.connect('mongodb://mongodbb:27017/library').then(()=>
    {
        console.log("MongoBD connected successfully to Library")
    })
    .catch((error)=>
    {
        console.error("Mongodb connection failed",error)
    })

app.listen(PORT,function(){
    console.log(`server is listening at ${PORT}`)
})