import express, { response }from "express";
import { PrismaClient } from "@prisma/client";  
import "dotenv/config";
import userRoute from "./router/userRoute";
import inventoryRoute from "./router/inventoryRoute";
import borrowandreturnRoute from "./router/borrowandreturnRoute";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use("/api",userRoute)
app.use("/api",inventoryRoute)
app.use("/api", borrowandreturnRoute)


const port = 1992;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})