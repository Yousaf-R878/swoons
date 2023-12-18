import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const admin = initializeApp({
  credential: cert(serviceAccount)
});

export default admin;