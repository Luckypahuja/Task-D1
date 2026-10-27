// ============================================================
// context/AuthContext.jsx
// Stores the "who is logged in" state ONCE and shares it with
// every component (Navbar, Login, Signup ...) using React Context.
// ============================================================
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

// 1) Create the context object
const AuthContext = createContext(null);

// 2) Provider component: wraps the whole app (see main.jsx)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // logged-in Firebase user (or null)
  const [authLoading, setAuthLoading] = useState(true); // true until Firebase tells us the state

  useEffect(() => {
    // Firebase calls this function every time the user logs in or out
    // (and once when the page first loads, to restore an old session).
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    // Cleanup: stop listening when the provider is removed
    return unsubscribe;
  }, []);

  // Logout helper used by the Navbar's Logout button
  function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3) Small custom hook so components can simply write: const { user } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
