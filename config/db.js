import mongoose from "mongoose";

const connectDb = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDb;