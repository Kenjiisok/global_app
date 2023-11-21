import {initializeApp} from "firebase/app"
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN,FIREBASE_PROJECT_ID,FIREBASE_STORAGE_BUCKET, FIREBASE_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID} from "@env"

const firebaseConfig = {
  apiKey: "AIzaSyCSt_ciWbmNOW4mTuRgr_FWBbixN2eIuNE",
  authDomain: "global-app-eaf77.firebaseapp.com",
  projectId: "global-app-eaf77",
  storageBucket: "global-app-eaf77.appspot.com",
  messagingSenderId: "166767021098",
  appId: "1:166767021098:web:d8f25deadd8252b0524753",
  measurementId: "G-W99LEQXPTL"
};


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)