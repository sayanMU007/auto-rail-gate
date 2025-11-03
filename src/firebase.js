import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD2dBbK8HMAiAZf-FF1Bc5rtQfSUYcz1wk",
  authDomain: "railway-c8909.firebaseapp.com",
  databaseURL: "https://railway-c8909-default-rtdb.firebaseio.com",
  projectId: "railway-c8909",
  storageBucket: "railway-c8909.firebasestorage.app",
  messagingSenderId: "135340384569",
  appId: "1:135340384569:web:2cfb87e142df154ac3c8e8",
  measurementId: "G-4CZBGR6S2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Export everything
export { app, database, auth, ref, onValue, set, get };
export default database;