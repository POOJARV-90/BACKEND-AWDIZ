import ProductModal from "../Modals/Product.modal.js";
import jwt from "jsonwebtoken"
import UserModal from "../Modals/User.modal.js";

export const addProduct = async (req , res)=>{
    try {
        
      const {name , price , image , category,token} = req.body;
      if (!name || !price || !image || !category|| !token) return res.status(404).json({status: "error" , message : "all fields are mendatory"})
      

      const decodedData = jwt.verify(token,process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }
        const userId = decodedData?.userId
      
       const Product =  new ProductModal({name , price , image , category ,userId: userId })

      await Product.save()
      return res.status(201).json({ status: "Sucess" , message :"product added succesfully", Product:Product })

    } catch (error) {
      res.status(500).json({status: "error" , message : error.message})
        
    }

}

export const allProducts = async (req, res) => {
  try {
      const Product = await ProductModal.find({isBlocked:false,isVerified: true });  //isVerified: true
      if (Product.length) {
          return res.status(200).json({ status: "Success", Product: Product })
      }
      return res.status(404).json({ status: "error", message: "No products found" })

  } catch (error) {
      return res.status(500).json({ status: "error", error: error.message })
  }
}


export const getYourProducts = async (req , res) => {
  try {
    const {token}= req.body
    if(!token) return res.status(404).json({status :"error", message:"token is mendatory"})

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    if (!decodedData) {
        return res.status(404).json({ status: "error", message: "Token not valid." })
    }
    const userId = decodedData?.userId

    const userproduct = await ProductModal.find({userId :userId})

    if(userproduct.length){
      return res.status(200).json({ status: "success", Product:userproduct })
    }
    return res.status(404).json({ status: "error", message: "No products found." })
    
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message })
  }

}

export const updateYourProduct = async (req , res) => {
  try {

    const { productId , name , price , category , image , token } = req.body

    if (!token) return res.status(404).json({ status: "error", message: "Token is mandtory.." })
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    if (!decodedData) {
        return res.status(404).json({ status: "error", message: "Token not valid." })
    }
    const userId = decodedData?.userId

    const updatedproduct = await ProductModal.findOneAndUpdate({ _id : productId , userId : userId} , { name , price , category , image} , {new : true})

    if(updatedproduct){
      return res.status(200).json({ status: "Sucess", product: updatedproduct })
    }

    return res.status(404).json({ status: "error", message: "You are trying to update product which is not yours.." })

    
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message })
  }

}

export const deleteyourProduct = async (req , res) => {

  try {
    const {productId , token} = req.body

    if(!productId)res.status(404).json({ status: "error", message: "Product id is mandtory.." })

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    const userId = decodedData?.userId

    const isdeleted = await ProductModal.findOneAndDelete({_id: productId , userId:userId})

    if(isdeleted){
      return res.status(200).json({ success: true, message: "Product Deleted Successfully." })
    }

    throw new Error("Mongodb error")

  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message })
  }

}

export const addRating = async(req , res)=>{
  try {
    const {productId , rating} = req.body
    const updatedProductRating = await ProductModal.findByIdAndUpdate(productId ,{$push:{ratings:rating}},{new : true})
    
    //updateYourProduct
    if(updatedProductRating){
      return res.status(200).json({ success: true, message: "Rating added Successfully", product: updatedProductRating })
    }

  throw new Error("Mongodb error")  
  
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message })
  }
}

export const addComments = async (req , res) => {
  try {

    const {productId,token,comment} = req.body;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;
        const user = await UserModal.findById(userId)

        const updateComments = await ProductModal.findByIdAndUpdate(productId,{$push:{comments:{comments:comment,name:user.name}}},{new:true})
        if(updateComments){
          return res.status(200).json({success:true, message:"Comment added Successfully!", product: updateComments})
        }
        throw new Error("Mongodb error")
    
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message })
  }

}


