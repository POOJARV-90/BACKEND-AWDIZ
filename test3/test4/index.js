import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Login, Register, getCurrentUser } from './Controllers/User.controller.js';
import { addProduct, allProducts, deleteyourProduct, getYourProducts, updateYourProduct } from './Controllers/Product.controller.js';
import { checkseller } from './middleware/All.middleware.js';
import { addCart, addWishlist, allcartProduct, getWishlistProducts, removecartproduct } from './Controllers/Buyers.controller.js';

const app = express();
app.use(express.json())
dotenv.config();


app.get("/",(req, res)=>{
    res.send("Working....")
})

app.post("/register",Register)
app.post("/login",Login)
app.post('/get-current-user', getCurrentUser)
app.get("/all-products", allProducts)


//SELLER

app.post('/add-product' , checkseller, addProduct )
app.get('/get-your-product' , checkseller, getYourProducts)
app.patch('/update-your-product', checkseller, updateYourProduct)
app.delete('/delete-your-product', checkseller, deleteyourProduct)

//BUYER 
app.post("/add-wishlist", addWishlist)
app.get("/get-wishlist-products", getWishlistProducts)
app.post('/addCart', addCart)
app.get('/get-all-cart-product',allcartProduct)
app.delete('/remove-cart-product',removecartproduct)



mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to DB");
})

app.listen(8000,()=>{
    console.log("listing on port 8000");
})