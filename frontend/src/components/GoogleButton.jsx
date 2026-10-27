// ============================================================
// GoogleButton.jsx - "Continue with Google" for Login AND Signup.
// Step 1: Google popup signs the user in (Google itself has no password for us).
// Step 2: if the account is NEW, we ask the user to create a password and link it
//         to the Google account, so they can later log in with email + password too.
// ============================================================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function GoogleButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password step (only shown for brand-new Google accounts)
  const [askPassword, setAskPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ---------- Step 1: sign in with the Google popup ----------
  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Is this the first time this Google account is used on our site?
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

      if (isNewUser) {
        // Save profile in Firestore (failure here must not block the user)
        try {
          await setDoc(doc(db, "users", result.user.uid), {
            fullName: result.user.displayName || "",
            email: result.user.email,
            createdAt: new Date().toISOString(),
          });
        } catch (dbError) {
          console.warn("Could not save profile in Firestore:", dbError);
        }
        // New account -> ask for a password before continuing
        setAskPassword(true);
      } else {
        // Existing account -> just go to the home page
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request"
      ) {
        // user closed the popup: not an error, show nothing
      } else if (err.code === "auth/popup-blocked") {
        setError("Popup was blocked. Please allow popups and try again.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Google sign-in is not enabled in Firebase yet.");
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // ---------- Step 2: create a password and link it to the Google account ----------
  async function handleSetPassword(event) {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      // Build an email+password credential and attach it to the Google user
      const credential = EmailAuthProvider.credential(user.email, password);
      await linkWithCredential(user, credential);
      navigate("/", { replace: true });
    } catch (err) {
      if (err.code === "auth/provider-already-linked") {
        navigate("/", { replace: true }); // password already exists, nothing to do
      } else {
        setError(err.message || "Could not set the password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* The Google button */}
      <button
        type="button"
        className="google-button"
        onClick={handleGoogle}
        disabled={loading}
      >
        <span className="google-g">G</span>
        {loading && !askPassword ? "Please wait..." : "Continue with Google"}
      </button>

      {!askPassword && error && (
        <p className="auth-error" role="alert">{error}</p>
      )}

      {/* Pop-up box asking for a password (new Google accounts only) */}
      {askPassword && (
        <div className="modal-backdrop">
          <div className="auth-card">
            <h1>Create a password</h1>
            <p>
              Your Google account is connected. Create a password so you can
              also log in with your email.
            </p>

            <form onSubmit={handleSetPassword}>
              <label htmlFor="google-password">Password</label>
              <input
                id="google-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />

              <label htmlFor="google-confirm-password">Confirm password</label>
              <input
                id="google-confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {error && <p className="auth-error" role="alert">{error}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
