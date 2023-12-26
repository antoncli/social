import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to database successfuly!");
    });

    connection.on("error", (error) => {
      console.error("Database connection error!");
      console.error(error);
    });
  } catch (error) {
    console.error("Can't connect to database!");
    console.log(error);
  }
}
