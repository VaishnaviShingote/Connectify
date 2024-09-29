import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config(); //all environment variables will be in process.env

const app =express();
const port = process.env.PORT || 3002;
const databaseURL = process.env.DATABASE_URL;

app.use(
    cors({
        origin: [process.env.ORIGIN], //different origins for different frontends
        methods: ["GET","POST","PUT","PATCH","DELETE"],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);


const server=app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
    console.log("CORS Origin:", process.env.ORIGIN);

})

mongoose
    .connect(databaseURL)
    .then(() => console.log("Database connection successful"))
    .catch((err) => console.log(err.message))