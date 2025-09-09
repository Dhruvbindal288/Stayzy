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
      sparse: true, 
      lowercase: true,
    },

    password: {
      type: String,
      select: false, 
    },

    phone: {
      type: String,
      unique: true,
      sparse: true, 
    },

    googleId: {
      type: String, 
      unique: true,
      sparse: true,
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

    
    otp: {
      code: String,
      expiresAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
