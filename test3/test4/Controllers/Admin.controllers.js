import jwt from "jsonwebtoken";
import ProductModal from "../Modals/Product.modal.js";
import UserModal from "../Modals/User.modal.js";



export const blockUser = async(req , res) => {

    try {

        const {userId} = req.body;
    const user = await UserModal.findByIdAndUpdate(userId,{isBlocked : true},{new : true});

    if (user){
        return res.status(200).json({ success: true, message: "User bloacked Successfully", user: user })
    }
    throw new Error("Internal error please try again")
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error }) 
    }

}

export const unBlockUser = async(req , res) => {

    try {

        const {userId} = req.body;
    const user = await UserModal.findByIdAndUpdate(userId, {isBlocked : false},{new : true});

    if (user){
        return res.status(200).json({ success: true, message: "User Unbloacked Successfully", user: user })
    }
    throw new Error("Internal error please try again")
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error }) 
    }

}

export const blockProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await ProductModal.findByIdAndUpdate(productId, { isBlocked: true }, { new: true })

        if (product) {
            return res.status(200).json({ success: true, message: "Product blocked Successfully", product: product })
        }

        throw new Error("Internal Error, Please try again.")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}


export const unblockProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await ProductModal.findByIdAndUpdate(productId, { isBlocked: false }, { new: true })

        if (product) {
            return res.status(200).json({ success: true, message: "Product unblocked Successfully", product: product })
        }

        throw new Error("Internal Error, Please try again.")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const verifyProduct = async(req , res) => {
    try {

      const {productId} = req.body
      const product = await ProductModal.findByIdAndUpdate(productId, {isVerified : true} , {new:true} ) 

      if(product){
        return res.status(200).json({ success: true, message: "Product Successfully verified", product: product })
      }
      throw new Error("Internal Error, Please try again.")

     
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }

}


export const getAllBuyers = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const allBuyer = await UserModal.find({ role: "Buyer" })

        if (allBuyer.length) {
            return res.status(200).json({ status: "success", user:allBuyer })
        }

        return res.status(404).json({ status: "error", message: "No users found." })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}


export const getAllSellers = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const allSeller = await UserModal.find({ role: "Seller" })

        if (allSeller.length) {
            return res.status(200).json({ status: "success", user:allSeller })
        }

        return res.status(404).json({ status: "error", message: "No users found." })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getAllProducts = async ( req , res) => {
    try {
        const product = await ProductModal.find({})
        if(product.length){
            return res.status(200).json({ status: "Success", products: product });
        }
        return res.status(404).json({status: "error", message: "No products found....." })

        
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }

}

export const getverifiedProducts = async (req , res) => {
    try {
        const product = await ProductModal.find({isVerified:true});

        if(product.length){
            return res.status(200).json({ status: "Success", product: product });
        }
        return res.status(404).json({status: "error", message: "No products found....." })
        
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }

}

export const getUnVerifiedProducts = async (req , res) => {
    try {
        const product = await ProductModal.find({isVerified:false});
        
        if(product.length){
            return res.status(200).json({ status: "Success", product: product });
        }
        return res.status(404).json({status: "error", message: "No products found....." })
        
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }

}


export const getBlockedProducts = async (req , res) => {
    try {
        const product = await ProductModal.find({isBlocked:"true"});
        
        if(product.length){
            return res.status(200).json({ status: "Success", product: product });
        }
        return res.status(404).json({status: "error", message: "No products found....." })
        
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }

}
