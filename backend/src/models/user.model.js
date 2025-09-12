import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      
    },
        role: {
      type: String,
      enum: ["host", "guest"],
      default: "guest",
    },

    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },

    
    
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
