import express from 'express';
import { Config } from "./Config/envConfig.js";
import { connectDB } from './Config/dbConfig.js';
import authRouter from './Routes/route.js';
import movieRouter from './Routes/moiveRoute.js';
import tvRouter from './Routes/tvRoute.js';
import { protectRoute } from './middelware/authvalidate.js';
import cookieParser from 'cookie-parser';
import searchRoute from './Routes/searchroute.js';
import path from 'path'

const app = express();

app.use(cookieParser())

const PORT = Config.PORT || 3000;
const __dirname = path.resolve()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/movie',protectRoute,movieRouter)
app.use('/api/v1/tv',protectRoute,tvRouter)
app.use('/api/v1/search',protectRoute,searchRoute)



if(Config.NODE_ENV ==="production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend" ,"dist","index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
  connectDB()
});

