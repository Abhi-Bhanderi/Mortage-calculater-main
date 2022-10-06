import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkGhAQYPPFPvIv14dlzO_229jFe9hWdMU",
  authDomain: "mortagecalculater3.firebaseapp.com",
  projectId: "mortagecalculater3",
  storageBucket: "mortagecalculater3.appspot.com",
  messagingSenderId: "339390855358",
  appId: "1:339390855358:web:f499ca2349e9694f0306ef"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
