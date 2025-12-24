import express from "express";
import {
    createCheckoutSession,
    verifyPaymentSession,
    stripeWebhook,
    createPayment
} from "../controllers/stripe.controller.js";
import isAuth from "../middleware/isAuth.js";

const stripeRouter = express.Router();

// Create Stripe Checkout Session (protected route - user must be logged in)
stripeRouter.post('/create-checkout-session', isAuth, createCheckoutSession);

// Verify payment session after checkout (protected route - user must be logged in)
stripeRouter.get('/verify-session/:sessionId', isAuth, verifyPaymentSession);

// Stripe webhook endpoint is handled in index.js to allow raw body parsing

// Legacy endpoint - keeping for backward compatibility
stripeRouter.post('/create-session', isAuth, createPayment);

export default stripeRouter;