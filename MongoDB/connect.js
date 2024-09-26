import mongoose from "mongoose";

const connectDB = async (url) => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable command buffering
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

export default connectDB;
