import jwt from "jsonwebtoken";
import UserModal from "../Modals/User.modal.js";
import ProductModal from "../Modals/Product.modal.js";

export const addCart = async (req, res) => {
  try {
    const { token, productId } = req.body;

    if (!token || !productId) {
      throw new Error({
       success:false,
        message: "Token and Product id is required.",
      });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData?.userId;
    const user = await UserModal.findById({ _id: userId });

    user?.cart.push(productId);
    await user.save();
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({  success:false, message: error.message });
  }
};

export const allcartProduct = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData?.userId;
    const user = await UserModal.findById({ _id: userId });

    if (user) {
      const finaldata = [];

      for (let i = 0; i < user.cart.length; i++) {
        const product = await ProductModal.findById(user.cart[i]);
        console.log(user.cart[i]);
        if (product) {
          finaldata.push(product);
        }
      }
      return res.status(200).json({ success: true, products: finaldata });
    }
    throw new Error("User not found.");
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

export const removecartproduct = async(req , res) =>{
  try {

    const {token , productId} = req.body
    if( !token || !productId) throw new Error("userid and token is required")

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    const userId = decodedData?.userId
    const user = await UserModal.findById({_id:userId})
    const cart = user?.cart
    const removeitems = cart.indexOf(productId)
    cart.splice(removeitems,1)
    await user.save()
     return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

export const addWishlist = async (req, res) => {
  try {
      const { token, productId } = req.body;
      if (!token || !productId) throw new Error("Token and Product id is required.")

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedData?.userId;

      const user = await UserModal.findById({ _id: userId })

      user?.wishlist.push(productId);

      await user.save();

      return res.status(200).json({ success: true, user: user })

  } catch (error) {
      return res.status(500).json({ status: "error", message: error })
  }
}

export const getWishlistProducts = async (req, res) => {
  try {
      const { token } = req.body;

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedData?.userId;

      const user = await UserModal.findById(userId)


      if (user) {
          var finalData = [];
          for (var i = 0; i < user.wishlist.length; i++) {
              // console.log(user.cart[i])
              const product = await ProductModal.findById(user.wishlist[i])
              if (product) {
                  finalData.push(product)
              }
          }
          return res.status(200).json({ success: true, products: finalData })
      }
      throw new Error("User not found.")

  } catch (error) {
      return res.status(500).json({ status: "error", message: error })
  }
}




