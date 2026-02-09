import 'dotenv/config'
import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js';
import userRouter from './routes/UserRoutes.js';
import sellerRouter from './routes/SellerRoutes.js';
import connectClodinary from './configs/Cloudinary.js';
import productRouter from './routes/ProductRoutes.js';
import cartRouter from './routes/CartRoutes.js';
import addressRouter from './routes/AddressRoute.js';
import orderRouter from './routes/OrderRoutes.js';
import { stripeWebHook } from './controllers/OrderController.js';

const app= express()

const port = process.env.PORT || 4000;
 await connectDB()
 await connectClodinary()


// allow multiple origins
const allowedOrigins=['http://localhost:5173']

app.post('/stripe', express.raw({type:'application/json'}), stripeWebHook)

// middleware config
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : allowedOrigins, credentials:true
}))

app.get('/', (req, res)=>res.send("api is working")
)

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)


app.listen(port, ()=>{
    console.log(`port is running on port number ${port}`);
    
})