// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Firebase Helper Functions
export const FirebaseHelper = {
  // Add a new user to Firestore
  addUser: async (userData) => {
    try {
      const docRef = await addDoc(collection(db, 'stationMasters'), {
        ...userData,
        registeredAt: new Date().toISOString()
      });
      console.log('User registered with ID: ', docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding user: ', error);
      return { success: false, error: error.message };
    }
  },

  // Check if user is registered
  isUserRegistered: async (stationMasterId, stationCode) => {
    try {
      const q = query(
        collection(db, 'stationMasters'),
        where('stationMasterId', '==', stationMasterId),
        where('stationCode', '==', stationCode)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking registration: ', error);
      return false;
    }
  },

  // Validate user credentials
  validateUser: async (stationMasterId, stationCode, password) => {
    try {
      const q = query(
        collection(db, 'stationMasters'),
        where('stationMasterId', '==', stationMasterId),
        where('stationCode', '==', stationCode),
        where('password', '==', password)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Error validating user: ', error);
      return null;
    }
  },

  // Get total registered users count
  getTotalUsersCount: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'stationMasters'));
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting user count: ', error);
      return 0;
    }
  },

  // Get all registered users (optional - for admin panel)
  getAllUsers: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'stationMasters'));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    } catch (error) {
      console.error('Error getting users: ', error);
      return [];
    }
  }
};

export default db;