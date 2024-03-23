import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAkYGCz6hWPuJuTneuyVXsKmZmzKMqAAYE",
    authDomain: "goal-streaks.firebaseapp.com",
    databaseURL: "https://goal-streaks-default-rtdb.firebaseio.com",
    projectId: "goal-streaks",
    storageBucket: "goal-streaks.appspot.com",
    messagingSenderId: "393631451711",
    appId: "1:393631451711:web:590b18f2789fa98acf468a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);