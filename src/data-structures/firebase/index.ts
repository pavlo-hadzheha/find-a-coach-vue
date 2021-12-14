import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

export  interface Firebase {
  db: Firestore;
  auth: Auth;
  API: {
    coaches: string;
    requests: string;
  }
}


