import express from "express";
import dotenv from "dotenv";
dotenv.config()
import { globalErrorHandler } from "./utils/error.util.js";
import router from "./routes/index.js";


const PORT = process.env.PORT || 3003;

const app = express();

app.use("/api/v1", router);

app.use(globalErrorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


