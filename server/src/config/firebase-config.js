import { initializeApp, cert } from "firebase-admin/app";
import dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, "../../../client/.env") });
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


const admin = initializeApp({
  credential: cert(serviceAccount),
});

export default admin;
