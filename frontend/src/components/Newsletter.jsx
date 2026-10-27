// Newsletter.jsx - "Sign up for our daily insider" box (id="newsletter").
// P5 change: instead of just showing a fake "Thanks!" message, this now
// sends the email to our ExpressJS backend, which sends the email via Resend.
import React, { useState } from "react";

// Address of our backend. It comes from the frontend .env file (VITE_API_URL).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Newsletter() {
  // email     -> what the user typed in the input box
  // message   -> text shown under the form (success or error)
  // isError   -> true if the message is an error (so we can colour it red)
  // isLoading -> true while we wait for the backend (disables the button)
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Runs when the user clicks "Subscribe"
  async function handleSubscribe(event) {
    event.preventDefault(); // stop the page from reloading

    // Quick check on the frontend first (the backend also validates properly)
    if (!email.trim()) {
      setIsError(true);
      setMessage("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Send an HTTP POST request to the backend with the email as JSON
      const response = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Read the JSON the backend sent back: { success, message }
      const data = await response.json();

      // response.ok is true for status 200-299 (success)
      if (response.ok) {
        setIsError(false);
        setMessage(data.message);
        setEmail(""); // clear the input box
      } else {
        // 400, 403, 500 ... show the reason the backend gave us
        setIsError(true);
        setMessage(data.message || "Subscription failed.");
      }
    } catch (error) {
      // This runs if the request never reached the backend (e.g. server is off)
      console.error("Subscribe request failed:", error);
      setIsError(true);
      setMessage("Cannot reach the server. Is the backend running?");
    } finally {
      setIsLoading(false); // always re-enable the button at the end
    }
  }

  return (
    <section className="newsletter" id="newsletter">
      <div>
        <p className="eyebrow">Stay updated</p>
        <h2>Sign up for our daily insider</h2>
        <p>Get useful development articles and tutorials in your inbox.</p>
      </div>

      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Subscribe"}
        </button>
      </form>

      {/* Show the message; add "error" class when something went wrong */}
      {message && (
        <p className={`newsletter-message ${isError ? "error" : ""}`}>{message}</p>
      )}
    </section>
  );
}
