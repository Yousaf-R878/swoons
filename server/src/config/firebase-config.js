import { initializeApp, cert } from "firebase-admin/app";
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

const admin = initializeApp({
  credential: cert(serviceAccount),
});

export default admin;
