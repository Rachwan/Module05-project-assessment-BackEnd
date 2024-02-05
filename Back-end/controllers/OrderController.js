import Order from '../models/Order.js';
import Product from "../models/Product.js";
import User from "../models/User.js";

export const orderController = {
  createOrder: async (req, res) => {
    const {
      total,
      userId,
      productsOrdered,
    } = req.body;

    const orders = await Order.find();
    let count = orders.length + 1;

    try {
      const newOrder = await Order.create({
        orderNumber: count,
        total,
        userId,
        productsOrdered,
      });

      if (newOrder) {
        for (let i = 0; i < productsOrdered.length; i++) {
          const product = await Product.findById(productsOrdered[i].productId);
          if (product) {
            product.stock -= Number(productsOrdered[i].quantity);
            await product.save();
          } else {
            return res.status(404).json({ message: "Product Not Found" });
          }
        }
      }
      await newOrder.save();
      return res
        .status(200)
        .json({
          message: "Your Order has been created successfuly!",
          Order: newOrder,
        });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      return res.status(200).json({ Orders: orders });
    } catch (error) {
      return res.status(404).json({ status: 404, error: error });
    }
  },

  getOrderById: async (req, res) => {
    const id = req.params.id;
    try {
      const order = await Order.findById(id);
      if (order) {
        return res.status(200).json({ Order: order });
      } else {
        return res.status(404).send(`Order with ID ${id} is not found!`);
      }
    } catch (error) {
      return res.status(404).json({ status: 404, error: error });
    }
  },

  getOrdersByUser: async (req, res) => {
    const userId = req.body.userId;
    try {
      const orders = await Order.find({ userId: userId });
      orders
        ? res.status(200).json({ Orders: orders })
        : res.status(404).send(`Invalid UserID ${userId}!`);
    } catch (error) {
      return res.status(404).json({ status: 404, error: error });
    }
  },

  updateOrder: async (req, res) => {
    const id = req.params.id;

    try {

      const editOrder = await Order.findByIdAndUpdate(id);

      if (editOrder) {
        return res
          .status(200)
          .json({ message: "Your Order has been successfully updated" });
      }

      return res
        .status(400)
        .send(`Error occurred or Order with ID ${id} is not found!`);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    const id = req.params.id;
    try {
      const removeOrder = await Order.findById(id);
      if (removeOrder) {
          await Order.deleteOne({ _id: removeOrder._id });
          return res
            .status(200)
            .send(`Order with ID ${id} has been deleted successfully!`);
        } else {
        return res.status(400).json({ message: "Order not found" });
      }
    } catch (error) {
      return res.status(404).json({ status: 404, error: error });
    }
  },
};
