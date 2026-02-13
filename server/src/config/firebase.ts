import admin from 'firebase-admin';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error('FIREBASE_SERVICE_ACCOUNT is not valid JSON');
    process.exit(1);
  }
} 
else {
  try {
    serviceAccount = require(path.join(__dirname, '../../serviceAccountKey.json'));
  } catch (error) {
    console.error('Error: Could not find serviceAccountKey.json and FIREBASE_SERVICE_ACCOUNT env var is missing.');
    process.exit(1);
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;