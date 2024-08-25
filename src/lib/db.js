import mongoose from "mongoose";

// const url = process.env.MONGODB_URI!;

// const url =
//   "mongodb+srv://shayanGstp:Shayan5262@shayangstp.lk8wplv.mongodb.net/next_ecom?retryWrites=true&w=majority&appName=ShayanGstp";

const startDb = async () => {
  console.log("Checking TextEncoder:", typeof TextEncoder);
  const url = "mongodb://127.0.0.1:27017/blog";
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
