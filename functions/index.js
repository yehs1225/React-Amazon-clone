const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");// provide middleware
const { useStripe } = require("@stripe/react-stripe-js");
const stripe = require("stripe")(`"sk_test_51KPi1CEnflWGK3MYjShVRHNb4V1UiJ
maIqZAqMObBhYIuTsOsQwUU0S0Z12SIdJKdEDNXHsCPKYBoMEy95bkQCqV00Wth4TAUJ"`);

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async(request,response)=>{
    const total = request.query.total;
    console.log("Payment Request Recieved SHIT for this amount>>>>",total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
    });
    // OK - created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    });
});
// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-21061/us-central1/api
