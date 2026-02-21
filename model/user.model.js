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
    processing: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
    },
    verifyCode: String,
    verifyCodeExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    signUpWithGoogle: {
      type: Boolean,
      default: false,
    },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("user", userSchema);
