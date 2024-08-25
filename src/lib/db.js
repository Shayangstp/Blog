import mongoose from "mongoose";

// const url = process.env.MONGODB_URI!;

const url =
  "mongodb+srv://shayanGstp:Shayan5262@shayangstp.lk8wplv.mongodb.net/blog?retryWrites=true&w=majority&appName=ShayanGstp";

const startDb = async () => {

  let connection = "";
  try {
    if (!connection) {
      connection = await mongoose.connect(url);
    }
    console.log("DB connected");
    return connection;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default startDb;
