import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDo_E4xMRPzSMky0LkjmD2NW9uqJEDC3T8",
  authDomain: "swiggy-clone-98f0a.firebaseapp.com",
  projectId: "swiggy-clone-98f0a",
  storageBucket: "swiggy-clone-98f0a.firebasestorage.app",
  messagingSenderId: "296687147701",
  appId: "1:296687147701:web:779aab0441a0209345bcfc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;