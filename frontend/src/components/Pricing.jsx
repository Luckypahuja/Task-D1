// Pricing.jsx
// Simple membership page for the D1 demonstration.
// Payments are simulated. This code does not charge money.

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Pricing() {
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();

  const [plan, setPlan] = useState("Free");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [method, setMethod] = useState("upi");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const upiId = "luckypahuja36@okhdfcbank";

  // Read the current plan from Firestore.
  useEffect(() => {
    async function loadPlan() {
      if (!user) {
        setPlan("Free");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);
        setPlan(snapshot.exists() ? snapshot.data().plan || "Free" : "Free");
      } catch {
        setError("Could not load your membership plan.");
      }
    }

    loadPlan();
  }, [user]);

  // Copy the UPI ID to the clipboard.
  async function copyUpiId() {
    try {
      await navigator.clipboard.writeText(upiId);
      setMessage("UPI ID copied.");
      setError("");
    } catch {
      setError("Copy failed. Please copy the UPI ID manually.");
    }
  }

  // Save Paid status in Firestore.
  async function upgradePlan(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!name.trim()) {
      setError("Enter your name.");
      return;
    }

    // Validate card fields only when Card is selected.
    if (method === "card") {
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        setError("Enter a 16-digit card number.");
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        setError("Enter expiry as MM/YY, for example 12/29.");
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        setError("Enter a 3 or 4 digit CVV.");
        return;
      }
    }

    setSaving(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);
      const userData = {
        fullName: name.trim(),
        email: user.email,
        plan: "Paid",
        planUpdatedAt: new Date().toISOString(),
      };

      if (snapshot.exists()) {
        await updateDoc(userRef, {
          plan: "Paid",
          planUpdatedAt: userData.planUpdatedAt,
        });
      } else {
        await setDoc(userRef, userData);
      }

      setPlan("Paid");
      setShowModal(false);
      setMessage("Demo upgrade complete. Your plan is now Paid.");
      setName("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    } catch {
      setError("Could not update the plan. Check your Firestore rules.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="pricing-page">
      <section className="pricing-intro">
        <p className="pricing-eyebrow">DEV@Deakin MEMBERSHIP</p>
        <h1>Choose your learning plan</h1>
        <p>Pick the plan that suits your learning journey.</p>
        {user && <p className="current-plan">Your current plan: <strong>{plan}</strong></p>}
      </section>

      {message && <p className="pricing-success" role="status">{message}</p>}
      {error && !showModal && <p className="pricing-error" role="alert">{error}</p>}

      <section className="pricing-cards">
        <article className="pricing-card">
          <h2>Free</h2>
          <p className="price">$0 <span>/ forever</span></p>
          <p>For learners getting started.</p>
          <ul>
            <li>Read public articles and tutorials</li>
            <li>Publish up to 3 posts per month</li>
            <li>Upload images up to 2 MB</li>
            <li>Community learning resources</li>
          </ul>
          <button className="plan-button secondary-plan" disabled>
            {plan === "Free" ? "Your current plan" : "Free plan"}
          </button>
        </article>

        <article className="pricing-card featured-plan">
          <span className="plan-tag">RECOMMENDED</span>
          <h2>Paid</h2>
          <p className="price">$9.99 <span>/ month</span></p>
          <p>For learners who want more flexibility.</p>
          <ul>
            <li>Access to all demonstration content</li>
            <li>Publish up to 20 posts per month</li>
            <li>Upload images up to 10 MB</li>
            <li>Priority learning resources</li>
          </ul>
          <button
            className="plan-button"
            disabled={authLoading || plan === "Paid"}
            onClick={() => {
              if (!user) navigate("/login");
              else if (plan === "Paid") setMessage("You already have the Paid plan.");
              else {
                setError("");
                setShowModal(true);
              }
            }}
          >
            {plan === "Paid" ? "Already on Paid" : "Upgrade Plan"}
          </button>
          {!user && <small>Log in to upgrade your plan.</small>}
        </article>
      </section>

      {showModal && (
        <div className="modal-backdrop" onClick={(event) => {
          if (event.target === event.currentTarget) setShowModal(false);
        }}>
          <section className="upgrade-modal" role="dialog" aria-modal="true">
            <button className="modal-close" type="button" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2>Upgrade to Paid</h2>
            <p>Choose a method. This is a classroom demo; no payment is processed.</p>

            <form onSubmit={upgradePlan}>
              <label htmlFor="member-name">Name</label>
              <input
                id="member-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <fieldset className="payment-methods">
                <legend>Payment method</legend>
                <label>
                  <input type="radio" name="method" value="upi"
                    checked={method === "upi"} onChange={() => setMethod("upi")} />
                  Google Pay / UPI (demo)
                </label>
                <label>
                  <input type="radio" name="method" value="applepay"
                    checked={method === "applepay"} onChange={() => setMethod("applepay")} />
                  Apple Pay (demo)
                </label>
                <label>
                  <input type="radio" name="method" value="card"
                    checked={method === "card"} onChange={() => setMethod("card")} />
                  Card (demo)
                </label>
              </fieldset>

              {method === "card" ? (
                <>
                  <label htmlFor="card-number">Card number</label>
                  <input id="card-number" inputMode="numeric" maxLength={19}
                    placeholder="1234567812345678" value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)} required />

                  <label htmlFor="card-expiry">Expiry (MM/YY)</label>
                  <input id="card-expiry" placeholder="12/29" maxLength={5}
                    value={expiry} onChange={(event) => setExpiry(event.target.value)} required />

                  <label htmlFor="card-cvv">CVV</label>
                  <input id="card-cvv" inputMode="numeric" maxLength={4}
                    value={cvv} onChange={(event) => setCvv(event.target.value)} required />
                </>
              ) : (
                <div className="upi-payment">
                  <h3>{method === "upi" ? "Google Pay / UPI" : "Apple Pay demo"}</h3>
                  <p><strong>UPI ID:</strong> {upiId}</p>
                  <button type="button" className="plan-button secondary-plan" onClick={copyUpiId}>
                    Copy UPI ID
                  </button>
                  <div className="upi-qr">
                    <QRCodeSVG value={upiId} size={170} includeMargin />
                  </div>
                  <p className="payment-note">
                    Demo only. The QR contains the UPI ID as text and does not start a payment.
                    Apple Pay does not use UPI IDs; this is displayed for demonstration only.
                  </p>
                </div>
              )}

              {error && <p className="pricing-error" role="alert">{error}</p>}

              <button className="plan-button" type="submit" disabled={saving}>
                {saving ? "Updating..." : "Confirm demo upgrade"}
              </button>
              <small>No real payment is processed. Do not enter real card details.</small>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
