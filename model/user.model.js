import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: string,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: string,
      required: true,
    },
    bio: {
      type: string,
      maxlength: 160,
      default: "",
    },
    avatar: {
      type: string,
      default: "",
    },
    coverImage: {
      type: string,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    blockUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("user", userSchema);
