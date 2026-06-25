import * as admin from "firebase-admin";

let db: admin.firestore.Firestore | null = null;
let isMock = false;

const hasCredentials =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

if (hasCredentials) {
  if (!admin.apps.length) {
    try {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
      db = admin.firestore();
    } catch (error) {
      console.error("Firebase admin initialization error:", error);
      isMock = true;
    }
  } else {
    db = admin.firestore();
  }
} else {
  isMock = true;
}

export { db, isMock };
