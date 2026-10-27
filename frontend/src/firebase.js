import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These values must come from Firebase Console > Project settings > Your apps.
// A syntactically valid but incorrect API key causes auth/invalid-api-key.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
};

const requiredFields = Object.entries(firebaseConfig);
const missingFields = requiredFields
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingFields.length) {
  console.error(
    `Firebase configuration is incomplete. Set these values in frontend/.env: ${missingFields.join(", ")}`
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
