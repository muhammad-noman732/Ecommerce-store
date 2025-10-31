import mongoose from "mongoose"

const carSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  mileage: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  engineSize: { type: String },
  bodyType: { type: String },
  color: { type: String },
  price: { type: Number, required: true },
  location: { type: String, default: "UK" },
  condition: { type: String, enum: ["New","Used"], default: "Used" },
  description: { type: String, required: true },
  images: [{ type: String }],
  // Added top 2 important fields for operations
  stockNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ["AVAILABLE","RESERVED","SOLD"], default: "AVAILABLE" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},{ timestamps: true })

const Product = mongoose.model("Product", carSchema)

export default Product