import mongoose from "mongoose";

const connectdb = (url: string, port: string, name: string) => {
  mongoose
    .connect(`mongodb://${url}:${port}/${name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};

export default connectdb;
