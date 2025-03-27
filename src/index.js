import express from "express";
import dotenv from "dotenv";
import { globalErrorHandler } from "./utils/error.util";


const PORT = process.env.PORT || 3003;

const app = express();



app.use(globalErrorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


