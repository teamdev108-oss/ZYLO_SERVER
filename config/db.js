import mongoose from "mongoose";

const connectDb = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGODB_URL);
    if (connection.ok) console.log("db connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
