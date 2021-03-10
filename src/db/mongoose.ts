import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
