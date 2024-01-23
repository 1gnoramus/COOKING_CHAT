import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXU7X2MNdJ88MVyf9r_LGNBe7YiAfVDSM",
  authDomain: "cookingapp-34e53.firebaseapp.com",
  projectId: "cookingapp-34e53",
  storageBucket: "cookingapp-34e53.appspot.com",
  messagingSenderId: "1071146868184",
  appId: "1:1071146868184:web:e367de61dc4ac3169a66ad",
  measurementId: "G-EC0ECE91VN",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
