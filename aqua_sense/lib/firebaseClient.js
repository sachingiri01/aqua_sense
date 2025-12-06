// lib/firebaseClient.js
// Minimal Firestore-only client SDK for Next.js frontend
// No Auth, No Storage — only database read/write.

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your client-safe Firebase config (from .env.local)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,  // optional
};

// Prevent re-initialization (important for Next.js)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Export Firestore instance
export const db = getFirestore(app);
