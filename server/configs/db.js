import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("connected to db"));

    await mongoose.connect(`${process.env.MongoDB_URI}`);
  } catch (e) {
    console.error("error occurs", e);
  }
};

export default connectDB;
