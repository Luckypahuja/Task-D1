import "dotenv/config";
import express from "express";
import cors from "cors";
import crypto from "node:crypto";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const subscribeSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

// POST /api/subscribe


app.post("/api/subscribe", async (req, res) => {
  try {
    // STEP 1: Validate incoming data.

    const validationResult = subscribeSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.error.issues[0].message,
      });
    }

    const { email } = validationResult.data;

    // STEP 2: Check required configuration.

    if (!process.env.BYTEMAIL_KEY || !process.env.EMAIL_FROM) {
      console.error(
        "Missing BYTEMAIL_KEY or EMAIL_FROM in backend/.env"
      );

      return res.status(500).json({
        success: false,
        message: "Email service is not configured correctly.",
      });
    }

    // STEP 3: Send the email through ByteLabs.

    const response = await fetch(
      "https://api.bytelabs.co.in/mail/api/v1/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BYTEMAIL_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `newsletter-${crypto.randomUUID()}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: [email],
          subject: "Welcome to DEV@Deakin Daily Insider!",
          html: `
            <h2>Thanks for subscribing!</h2>
            <p>You are now signed up for the
            <strong>DEV@Deakin Daily Insider</strong>.</p>
            <p>You will receive useful development articles
            and tutorials in your inbox.</p>
          `,
          text:
            "Thanks for subscribing to DEV@Deakin Daily Insider! " +
            "You will receive useful development articles and tutorials.",
        }),
      }
    );

    // STEP 4: Read and parse the provider response.

    const responseText = await response.text();

    let apiResult = {};

    try {
      apiResult = responseText ? JSON.parse(responseText) : {};
    } catch {
      apiResult = { detail: responseText };
    }

    // STEP 5: Handle provider errors.


    if (!response.ok) {
     console.error(
  "ByteLabs API error:",
  JSON.stringify(
    {
      status: response.status,
      response: apiResult,
    },
    null,
    2
  )
);   

      const message =
        typeof apiResult.detail === "string"
          ? apiResult.detail
          : "The email could not be sent. Please try again later.";

      return res.status(502).json({
        success: false,
        message,
      });
    }

    // STEP 6: Log the provider response.

    console.log("ByteLabs email request accepted:", {
      providerStatus: response.status,
      emailId: apiResult.id || "Not returned",
      emailStatus: apiResult.status || "Not returned",
    });

    // HTTP 200 is returned by YOUR Express backend.
    // ByteLabs may return HTTP 201 or HTTP 202.

    return res.status(200).json({
      success: true,
      message:
        "Your subscription request was accepted. Please check your inbox.",
      emailId: apiResult.id || null,
      emailStatus: apiResult.status || null,
    });

  } catch (err) {
    // Handles network failures and unexpected server errors.

    console.error("Server error:", err);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong on the server. Please try again.",
    });
  }
});

// START SERVER

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
