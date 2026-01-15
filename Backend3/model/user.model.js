import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true // Allow null/undefined for existing users or if not provided
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.isGoogleAuth;
      },
    },

    isGoogleAuth: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: null,
    },

    cartData: {
      type: Object,
      default: {},
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    stripeCustomerId: {
      type: String,
      default: null
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true, minimize: false }
);

export const User = mongoose.model("User", userSchema);
