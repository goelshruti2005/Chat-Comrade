import {app} from "./app.js"
import {connectDB} from "../src/db/index.js"
import dotenv from "dotenv"
import { startServer } from "./startServer.js"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(()=>{
   //startServer(process.env.PORT)
   app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`);
 })
})
.catch((err)=>{
    console.log("Server connection failed !!! ", err);
})

app.get('/',(req, res)=>{
    res.send("Hello")
})

