import { api } from ".";

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