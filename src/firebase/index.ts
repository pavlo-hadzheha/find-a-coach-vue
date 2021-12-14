import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Firebase } from '@/data-structures/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAFeAnAqKYZXPUc_IG2OP2I8Dt3nou8F6w",
  authDomain: "vue-course-346d6.firebaseapp.com",
  databaseURL: "https://vue-course-346d6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-course-346d6",
  storageBucket: "vue-course-346d6.appspot.com",
  messagingSenderId: "542227284121",
  appId: "1:542227284121:web:7060a2a4058b1d51687808"
};

const app = initializeApp(firebaseConfig);

export default {
  db: getFirestore(),
  auth: getAuth(),
  API: {
    coaches: 'https://vue-course-346d6-default-rtdb.europe-west1.firebasedatabase.app/coaches.json',
    requests: 'https://vue-course-346d6-default-rtdb.europe-west1.firebasedatabase.app/requests.json'
  }
} as Firebase

