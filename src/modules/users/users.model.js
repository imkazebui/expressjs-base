import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  emailPrimary: {
    type: String,
    require: true,
  },
  emailOptional: {
    type: [],
  },
});

export default mongoose.model("User", userSchema);
