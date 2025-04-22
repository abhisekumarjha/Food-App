import mongoose from "mongoose";

export const connectDB = async function (dbURL) {
  await mongoose.connect(dbURL).then(() => console.log("DB Connected!"));
};
