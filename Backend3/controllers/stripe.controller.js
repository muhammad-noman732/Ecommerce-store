import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
import { User } from "../model/user.model.js";
import Order from "../model/order.model.js";
import { sendOrderConfirmationEmail, sendOrderNotificationToBusiness } from "../utils/emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

/**
 * Create Stripe Checkout Session for payment
 * This creates a hosted payment page where customers can securely pay
 */
export const createCheckoutSession = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: items, amount, or address"
      });
    }

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: userId.toString()
        }
      });
      customerId = customer.id;

      await User.findByIdAndUpdate(userId, {
        stripeCustomerId: customerId,
      });
    }

    const frontendUrl = process.env.FRONTEND_URL || req.headers.origin;

    if (!frontendUrl || !/^https?:\/\//.test(frontendUrl)) {
      return res.status(500).json({
        success: false,
        message: "Configuration Error: FRONTEND_URL is invalid or missing. Check .env file."
      });
    }

    const lineItems = items.map(item => {
      let imageUrl = item.image;
      if (!imageUrl && item.images && Array.isArray(item.images) && item.images.length > 0) {
        imageUrl = item.images[0];
      }

      const image = imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('https'))
        ? [imageUrl]
        : [];

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name || item.title || 'Product',
            description: item.description || '',
            images: image,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      };
    });

    // Generate idempotency key based on user, items, and amount to prevent duplicate sessions
    const idempotencyKey = `checkout_${userId}_${Date.now()}_${amount}`;

    const sessionPayload = {
      customer: customerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/order-cancel`,
      metadata: {
        userId: userId.toString(),
        address: JSON.stringify(address),
        orderAmount: amount.toString()
      },
      automatic_tax: {
        enabled: false
      },
      shipping_address_collection: {},
    };

    const session = await stripe.checkout.sessions.create(sessionPayload, {
      idempotencyKey: idempotencyKey
    });

    return res.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create checkout session",
      ...(process.env.NODE_ENV === 'development' && { error: error.message, stack: error.stack })
    });
  }
};

/**
 * Verify payment session and retrieve session details
 * Called when user returns from successful payment
 */
export const verifyPaymentSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required"
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      return res.json({
        success: true,
        paid: true,
        session: {
          id: session.id,
          amount: session.amount_total / 100,
          currency: session.currency,
          customerEmail: session.customer_details?.email,
          paymentStatus: session.payment_status
        }
      });
    } else {
      return res.json({
        success: true,
        paid: false,
        paymentStatus: session.payment_status
      });
    }

  } catch (error) {
    console.error("Error verifying payment session:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify payment session",
      error: error.message
    });
  }
};

/**
 * Stripe Webhook Handler
 * Automatically updates orders when payment is confirmed
 * Requires webhook endpoint to be set up in Stripe Dashboard
 */
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      try {
        const order = await Order.findOne({ stripeSessionId: session.id });
        if (order) {
          // Idempotency check: Only update if not already paid
          if (order.payment === true && order.paymentStatus === 'completed') {
            console.log(`Order ${order._id} already processed for session ${session.id}`);
            break;
          }

          order.payment = true;
          order.paymentStatus = 'completed';
          order.paidAt = new Date();
          await order.save();

          // Send order completion emails (non-blocking)
          try {
            const user = await User.findById(order.userId);
            if (user) {
              // Send updated order confirmation to customer
              sendOrderConfirmationEmail(order, user).catch(err => 
                console.error('Failed to send payment confirmation to customer:', err)
              );
              
              // Send updated notification to business
              sendOrderNotificationToBusiness(order, user).catch(err => 
                console.error('Failed to send payment notification to business:', err)
              );
            }
          } catch (emailError) {
            // Don't fail the webhook if email fails
            console.error('Error sending payment completion emails:', emailError);
          }
        } else {
          console.warn(`Order not found for Stripe session: ${session.id}`);
        }
      } catch (error) {
        console.error('Error updating order from webhook:', error);
      }
      break;

    case 'payment_intent.payment_failed':
      break;

    default:
      break;
  }

  res.json({ received: true });
};


export const createPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: userId.toString()
        }
      });
      customerId = customer.id;

      await User.findByIdAndUpdate(userId, {
        stripeCustomerId: customerId,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency || "usd",
      customer: customerId,
      payment_method_types: ['card'],
      automatic_tax: {
        enabled: false
      }
    });

    return res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create payment intent",
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};
