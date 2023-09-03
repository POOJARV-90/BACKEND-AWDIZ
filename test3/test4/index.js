import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan';
import { Login, Register, getCurrentUser, getNumber, sendOtp, verifyOtp } from './Controllers/User.controller.js';
import { addComments, addNewCart, addProduct, addRating, allNewCartProducts, allProducts, deleteyourProduct, getSingleProductData, getYourProducts, updateYourProduct } from './Controllers/Product.controller.js';
import { checkseller, isAdmin, isValidUser } from './middleware/All.middleware.js';
import { addCart, addWishlist, allcartProduct, getWishlistProducts, removecartproduct } from './Controllers/Buyers.controller.js';
import { blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, getBlockedProducts, getUnVerifiedProducts, getverifiedProducts, unBlockUser, unblockProduct, verifyProduct } from './Controllers/Admin.controllers.js';


const app = express();
app.use(express.json())
dotenv.config();
app.use(cors())
app.use(morgan("dev"))


app.get("/",(req, res)=>{
    res.send("Working....")
})

app.post("/register",Register)
app.post("/login",Login)
app.post('/get-current-user', getCurrentUser)
app.get("/all-products", allProducts)
app.post("/get-number", getNumber)

app.post("/send-otp", sendOtp)
app.post("/verify-otp", verifyOtp) //verification


//SELLER

app.post('/add-product' , checkseller, addProduct )
app.post('/get-your-product' , checkseller, getYourProducts)
app.patch('/update-your-product', checkseller, updateYourProduct)
app.delete('/delete-your-product', checkseller, deleteyourProduct)

//BUYER 
app.patch('/add-comments',isValidUser, addComments) 
app.patch('/add-rating',isValidUser, addRating)
app.post("/add-wishlist", addWishlist)
app.get("/get-wishlist-products", getWishlistProducts)
app.post('/addCart', addCart)
app.post('/cart',addNewCart)
app.get('/get-all-cart-product',allcartProduct)
app.post('/your-cart-product',allNewCartProducts)
app.delete('/remove-cart-product',removecartproduct)
app.post('/get-single-product-data',getSingleProductData)

//ADMIN

app.get('/get-all-buyers', isAdmin, getAllBuyers) // UserModel.find({role : "Buyer"}) - assignemnt
app.get('/get-all-sellers', isAdmin, getAllSellers)// UserModel.find({role : "Seller"}) - assignemnt
app.get("/get-all-products", isAdmin, getAllProducts) // ProductModel.find({}) - assignemnt
app.patch("/block-user", isAdmin, blockUser)
app.patch("/unblock-user", isAdmin, unBlockUser)
app.patch("/block-product", isAdmin,blockProduct)
app.patch("/unblock-product", isAdmin,unblockProduct)
app.patch("/verify-product" , isAdmin ,verifyProduct)
app.patch("/get-verify-product", isAdmin, getverifiedProducts) 
app.patch("/get-un-verify-product", isAdmin, getUnVerifiedProducts) 
app.patch("/get-blocked-product", isAdmin, getBlockedProducts) 




mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to DB");
})

app.listen(8000,() => {
    console.log("listing on port 8000");
})