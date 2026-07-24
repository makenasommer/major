"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { isEduEmail, campusFromEmail } from "@/lib/campusFromEmail";

const AuthContext = createContext(null);

/**
 * Wrap the whole app in <AuthProvider> (done in app/layout.js) so every
 * page/component reads the exact same auth state, instead of each one
 * running its own independent "is anyone logged in?" check that may
 * still be loading when a child component needs it.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsVerified(false);
        setReady(true);
        return;
      }

      // Refresh emailVerified in case they just clicked the link in another tab.
      await firebaseUser.reload();
      setIsVerified(firebaseUser.emailVerified);

      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);
      const correctCampus = campusFromEmail(firebaseUser.email);

      if (snap.exists()) {
        const existing = snap.data();
        if (existing.campus !== correctCampus) {
          // Self-heal: campus lookup table improved since they signed up, so re-save the corrected value.
          const updated = { ...existing, campus: correctCampus };
          await setDoc(userRef, updated);
          setUser(updated);
        } else {
          setUser(existing);
        }
      } else {
        const profile = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.email.split("@")[0],
          campus: correctCampus,
        };
        await setDoc(userRef, profile);
        setUser(profile);
      }
      setReady(true);
    });

    return () => unsubscribe();
  }, []);

  async function signUp(email, password) {
    if (!isEduEmail(email)) {
      throw new Error("Please use your campus (.edu) email address.");
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(cred.user);
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function resendVerificationEmail() {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function saveStripeAccountId(accountId) {
    if (!auth.currentUser || !accountId) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    const updated = { ...user, stripeAccountId: accountId };
    await setDoc(userRef, updated);
    setUser(updated);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isVerified,
        ready,
        signUp,
        login,
        logout,
        resendVerificationEmail,
        saveStripeAccountId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider> (check app/layout.js)");
  }
  return ctx;
}
