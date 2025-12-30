import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true

    },
    status: {
        type: String,
        required: true,
        default: 'Order Placed'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    stripeSessionId: {
        type: String,
        default: null,
        sparse: true, // Allows multiple null values but unique non-null values
        index: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cod'],
        default: 'cod'
    },
    paidAt: {
        type: Date,
        default: null
    },
    date: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

export default Order