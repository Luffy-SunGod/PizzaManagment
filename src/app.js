import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { checkForAuthentication } from './middlewares/authentication.js';
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//Routes Import
import userRouter from "./routes/user.routes.js"
import orderRoute from "./routes/orders.routes.js"
import getPizzaRoute from "./routes/pizza.routes.js"

//routes

app.use("/api/user",userRouter)
app.use("/api/user",checkForAuthentication,orderRoute);
app.use("/api",getPizzaRoute);


export {app}