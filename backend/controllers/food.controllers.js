import FoodModel from "../models/food.modules.js";
import fs from "fs"; // file system - default with node.js

// add food item

const addFood = async function (req, res) {
  let image_filename = req.file?.filename;

  const food = new FoodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "Food added",
    });
  } catch (error) {
    console.error(`Error at food add: ${error}`);
    res.json({
      success: false,
      message: "Error at food added",
    });
  }
};

// all food list

const listFood = async function (req, res) {
  try {
    const foods = await FoodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error(`Error at food list fetching: ${error}`);
    res.json({
      success: false,
      message: "Error at food list fetching",
    });
  }
};

// all food item

const removeFood = async function (req, res) {
  try {
    const food = await FoodModel.findById(req.body.id);
    fs.unlink(`./uploads/${food.image}`, () => {});
    await FoodModel.findOneAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.error(`Error at food item delete: ${error}`);
    res.json({
      success: false,
      message: "Error at food item deleting",
    });
  }
};

export { addFood, listFood, removeFood };
