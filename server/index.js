import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"
import authRouter from './routes/auth.route.js'
import employRouter from './routes/employ.route.js'

dotenv.config()

const app = express()
const port = 3000
app.use(express.json())

//function call to connect  to database
connectDb()

app.use("/api/auth", authRouter)
app.use("/api/employers",employRouter)


//route to handle errors
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    return res.status (statusCode).json({success:false, statusCode,message})
})

app.listen (port, () =>{
    console.log("server is listening at port : "+port)
})
