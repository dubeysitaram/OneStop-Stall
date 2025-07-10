import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app=express()
const port=4000


//middle ware
app.use(express.json()) // epress.json -> using this middelware whenever we get a request from frontend to backend we can parse that into object or in json form
app.use(cors())// using this we access the backend from frontend

// Db connection
connectDB();

app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

// wwe have exposed our Uplodas folder so that images can be accessed using htat path /uplods on borwser or at frontend
app.use("/images",express.static('uploads'))


// http method 
app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

// mongodb+srv://arymansharma125:Checkbox1234@cluster0.6kyyf.mongodb.net/?