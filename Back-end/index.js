import express from 'express';

import session from 'express-session';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { userRoutes } from './routes/UserRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import orderRoutes  from './routes/OrderRoutes.js'

import { loggedInUser, login, verifyToken } from './middewares/authentication.js';
import { logOut } from './middewares/authentication.js';


import "dotenv/config";
import connectDB from "./config/MongoConfig.js";


const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from the MERN backend!');
});

app.listen(PORT, (error) =>{ 
  if(!error) {
      console.log("Server is Running on port "+ PORT) 
  } else {
      console.log("Error: ", error)
  }
}   
);
connectDB()

app.use('/user', userRoutes);
app.use('/product', productRoutes)
app.use('/order', orderRoutes)

app.post("/login", login);
app.post("/logout", logOut);
app.get("/logged-in-user", verifyToken, loggedInUser);

app.use('/images', express.static('images'))