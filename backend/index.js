const express = require('express');
// const mongoose = require("mongoose");
const  cors = require('cors');




const stripe = require("stripe")(process.env.REACT_APP_STRIPE_KEY);
const app = express();
app.use(express.json());
app.use(cors());



app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    
   
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Payble Amount",
          },
          unit_amount: products * 100,
        },

        quantity: 1
      },
    ],
    mode: "payment",
    success_url: "https://stripefrontend.vercel.app/success",
    cancel_url: "https://stripefrontend.vercel.app/fail",
  })

  res.json({ id: session.id })
})





app.listen(3002, () => {
  console.log("success");
})
