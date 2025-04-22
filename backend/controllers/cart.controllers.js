import UserModel from "../models/user.modules.js";

// add item(s) to cart
const addToCart = async function (req, res) {
  try {
    let userData = await UserModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item added to the cart",
    });
  } catch (error) {
    console.error("Error at Item added to the cart", error);
    res.json({
      success: false,
      message: "Unable to add Item into the cart",
    });
  }
};

// remove item(s) from cart
const removeFromCart = async function (req, res) {
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error("Error at item remove from cart", error);
    res.json({
      success: false,
      message: "Unable to remove item from cart",
    });
  }
};

// fetch cart item(s)
const getCartItem = async function (req, res) {
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData: cartData,
    });
  } catch (error) {
    console.error("Error at fetching cart data", error);
    res.json({
      success: false,
      message: "Error at fetching cart data",
    });
  }
};

export { addToCart, removeFromCart, getCartItem };
