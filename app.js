// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeDNc5rX1PU64qi_bIzAM3COK7axZ_1gA",
  authDomain: "githubsite-922e3.firebaseapp.com",
  projectId: "githubsite-922e3",
  storageBucket: "githubsite-922e3.appspot.com",
  messagingSenderId: "434404217253",
  appId: "1:434404217253:web:d7fbdd2c0138ae4870984c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Function to handle user registration
function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      // Save user data to Realtime Database
      set(ref(database, 'users/' + user.uid), {
        email: user.email,
        createdAt: new Date().toISOString()
      });

      console.log("User registered successfully:", user);
    })
    .catch((error) => {
      console.error("Error during registration:", error);
    });
}

// Example usage:
const email = "example@example.com";
const password = "securepassword";
registerUser(email, password);
