import mongoose from "mongoose";

// const url = process.env.MONGODB_URI!;

// const url =
//   "mongodb+srv://shayanGstp:Shayan5262@shayangstp.lk8wplv.mongodb.net/blog?retryWrites=true&w=majority&appName=ShayanGstp";

const url =
  "mongodb+srv://vercel-admin-user-66cb4c4f74938630adc6439b:GZzrYMhuVp7C11M4@shayangstp.lk8wplv.mongodb.net/blog?retryWrites=true&w=majority";

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
