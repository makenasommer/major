/**
 * lib/firebaseAdmin.js
 *
 * NEW FILE — no server-side Admin SDK existed anywhere in the repo before
 * this. Needed so API routes can (a) verify a user's ID token server-side
 * — never trust a client-supplied user ID for anything — and (b) write
 * Firestore documents (like orders) with trusted, elevated privileges
 * that bypass firestore.rules entirely (appropriate ONLY in trusted
 * server code like this, never in client code).
 *
 * REQUIRES three new environment variables (Vercel/hosting dashboard +
 * .env.local for local dev) — get these from Firebase Console > Project
 * Settings > Service Accounts > Generate New Private Key:
 *
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY   (keep the \n escapes — see below)
 *
 * The private key from Firebase's downloaded JSON has literal newlines;
 * when pasted into a single-line env var they need to be escaped as
 * "\n" and un-escaped here at runtime (the .replace below).
 */

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();

/**
 * Verifies a Firebase ID token from an Authorization: Bearer <token>
 * header and returns the authenticated uid, or null if missing/invalid.
 * Use this in every API route that needs to know WHO is calling —
 * never trust a buyerId/userId field sent in the request body itself.
 */
export async function verifyRequestAuth(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch (error) {
    console.error("ID token verification failed:", error.message);
    return null;
  }
}
