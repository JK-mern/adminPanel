import mongoose from "mongoose";

const connectDb = async() => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to db successfully");
  } catch (error) {
    console.log(error);
  }
};


export default connectDb