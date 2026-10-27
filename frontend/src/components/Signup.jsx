import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import GoogleButton from "./GoogleButton";

// Signup.jsx - registration form. Name is REQUIRED (a single first name is enough;
// the last name is optional).
export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();
    setError("");

    // Name is required, but one word (first name only) is accepted.
    const fullName = name.trim();

    // Show an error if the name is empty
    if (!fullName) {
      setError("Please enter your name.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Save the name (it is guaranteed to exist now)
      await updateProfile(credential.user, { displayName: fullName });

      // Store extra details in Firestore. If this fails the account still
      // exists, so we don't block the user because of it.
      try {
        await setDoc(doc(db, "users", credential.user.uid), {
          fullName, // may be an empty string
          email: credential.user.email,
          createdAt: new Date().toISOString(),
          plan: "Free", // Every new account starts on the Free plan.
        });
      } catch (dbError) {
        console.warn("Could not save profile in Firestore:", dbError);
      }

      // The user is now signed in automatically, so go to the home page.
      // The Navbar will show the account icon + Logout button.
      navigate("/", { replace: true });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Choose a stronger password.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create a DEV@Deakin Account</h1>
        <p>Register to access your account.</p>

        <form onSubmit={handleSignup}>
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (last name is optional)"
            required
          />

          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <label htmlFor="signup-confirm-password">
            Confirm password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Second option: continue with a Google account */}
        <div className="auth-divider"><span>or</span></div>
        <GoogleButton />

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
