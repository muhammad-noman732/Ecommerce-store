import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

    cartData: {
      type: Object,
      default: {},
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"], 
      default: "USER",        
    },
    stripeCustomerId :{
      type: String,
      default:null
    }
  },
  { timestamps: true, minimize: false }
);

export const User = mongoose.model("User", userSchema);
