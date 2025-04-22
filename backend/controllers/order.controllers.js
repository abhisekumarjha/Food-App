import OrderModel from "../models/order.modules.js";
import UserModel from "../models/user.modules.js";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECKET_KEY);

// place order from frontend
const placeOrder = async function (req, res) {
  const url = "https://foodapp-jha.vercel.app";

  try {
    const newOrder = new OrderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await UserModel.findById(req.body.userId, { cartData: 1 });

    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 40 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error at payment gateway_stripe", error);
    res.json({
      success: false,
      message: "Error at payment gateway_stripe",
    });
  }
};

const verifyOrder = async function (req, res) {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });

      res.json({
        success: true,
        message: "Payment Successfull",
      });
    } else {
      await OrderModel.findByIdAndDelete(orderId);

      res.json({
        success: false,
        message: "Payment Un-successfull",
      });
    }
  } catch (error) {
    console.error("Error at payment page", error);
    res.json({
      success: false,
      message: "Error at payment page",
    });
  }
};

// user order list
const userOrders = async function (req, res) {
  try {
    const orders = await OrderModel.find({ userId: req.body.userId });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error at listing user orders", error);
    res.json({
      success: false,
      message: "Error at listing user orders",
    });
  }
};

// listing orders for admin panel

const listOrders = async function (req, res) {
  try {
    const orders = await OrderModel.find({});
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error at listing orders to admin panel", error);
    res.json({
      success: false,
      message: "Error at listing orders to admin panel",
    });
  }
};

// API endpoint for updating order status

const updateStatus = async function (req, res) {
  try {
    await OrderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({
      success: true,
      message: "Food order status updated",
    });
  } catch (error) {
    console.error("Error at food order status update", error);
    res.json({
      success: false,
      message: "Unable to update ordered food status",
    });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
