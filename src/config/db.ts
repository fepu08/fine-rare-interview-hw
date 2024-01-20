import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_CONNECTION_URI) {
      throw new Error('Missing Mongo URI');
    }

    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
