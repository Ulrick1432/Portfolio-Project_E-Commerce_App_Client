/**
 * Checkout API module.
 * Handles payment processing via Stripe payment intents.
 */
import { api } from './index';

/**
 * Creates a Stripe payment intent for the current cart total.
 * @returns {Promise<string>} The Stripe client secret for completing payment
 */
export const createPaymentIntent = async () => {
  try {
    const response = await fetch(`${api}/checkout/create_payment_intent`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      credentials: 'include'
    });
    const data = await response.json();
    return data.clientSecret;
  } catch(err) {
    console.log('Error Creating payment intent: ', err);
  }
};