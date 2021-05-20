import mongoose from "mongoose";

const faceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  dateTime: {
    type: String,
    require: true,
  },
  images: {
    type: String,
    require: true,
  },
  node: {
    type: String,
    require: true,
  },
  isStranger: {
    type: Boolean,
    require: true,
  },
  // isCorrect: {
  //   type: String,
  //   default: "null",
  // },
});

export default mongoose.model("Faces", faceSchema);
