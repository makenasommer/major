import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyApbDoxRevZu0bvft6V9ebjU0tNm7IhO-I",
  authDomain: "major-f50ed.firebaseapp.com",
  projectId: "major-f50ed",
  storageBucket: "major-f50ed.firebasestorage.app",
  messagingSenderId: "625332384505",
  appId: "1:625332384505:web:f392544deb5ac64a6b6828",
};

// Avoid re-initializing on every hot reload in dev
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// App Check only runs in the browser — guard against SSR/build-time execution
if (typeof window !== "undefined") {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6Lct6KgtAAAAAAUWfjEorPz2AHTrCTGsDofrBGW3"),
    isTokenAutoRefreshEnabled: true,
  });
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
