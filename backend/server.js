require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

// =========================
// GET TOKEN
// =========================
async function getToken() {
  const res = await axios.post(
    "https://pay.pesapal.com/v3/api/Auth/RequestToken",
    {
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
    }
  );

  return res.data.token;
}

// =========================
// PAYMENT ROUTE
// =========================
app.post("/pay", async (req, res) => {
  try {
    const { amount, description } = req.body;

    const token = await getToken();

    const order = {
      id: "ORDER_" + Date.now(),
      currency: "UGX",
      amount: amount,
      description: description,

      callback_url: "http://127.0.0.1:5500/frontend/success.html",
      notification_id: "test",

      billing_address: {
        email_address: "test@example.com",
        country_code: "UG",
        first_name: "Book",
        last_name: "Buyer",
      },
    };

    const response = await axios.post(
      "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🔥 FULL PESAPAL RESPONSE:");
    console.dir(response.data, { depth: null });

    const redirectUrl =
      response.data?.redirect_url ||
      response.data?.data?.redirect_url ||
      response.data?.links?.redirect_url;

    if (!redirectUrl) {
      return res.status(400).json({
        error: "No redirect URL returned from Pesapal",
        full_response: response.data,
      });
    }

    res.json({ redirect_url: redirectUrl });

  } catch (error) {
  console.error("🔥 FULL ERROR DETAILS:");
  console.dir(error.response?.data || error, { depth: null });

  res.status(500).json({
    error: "Payment failed",
    details: error.response?.data || error.message
  });
}
});

// =========================
// START SERVER
// =========================
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});