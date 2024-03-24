import {useState} from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {set, get, ref} from "firebase/database";
import {auth, database} from "../FirebaseConfig.js";
import {useNavigate} from "react-router-dom";
import'./LoginPage.css';


export default function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    /**
     * Signs a user in or up using firebase, redirects them to their profile page
     * @return {Promise<void>} Unused promise
     */
    const signInOrUp = async (isSignUp) => {
        if (!validateFields()) {
            return
        }

        let fakeEmail = username.trim() + "@goalstreaks.com";
        let func = isSignUp ? createUserWithEmailAndPassword : signInWithEmailAndPassword;

        await func(auth, fakeEmail, password.trim())
            .then(async (userCredential) => {
                // signed in!
                const user = userCredential.user
                console.log(user);
                await makeInitialDatabaseEntry(user, username.trim())
                navigate(username.trim() + "/edit");
            }).catch((error) => {
                alert("Error: " + error.message);
            })
    };

    const makeInitialDatabaseEntry = async (user, userId) => {
        // Only make initial entry if nothing exists first
        const userDatabaseRef = ref(database, "users/" + userId);
        const snapshot = await get(userDatabaseRef);
        if (snapshot.exists()) {
            console.log("USER ALREADY EXISTS");
            return
        }

        await set(userDatabaseRef, user.uid);
        const dataDatabaseRef = ref(database, "data/" + user.uid);
        await set(dataDatabaseRef, {
            name: "Unnamed"
        })
    }

    /**
     * Validates the username and password fields
     * @return {boolean} True if both fields are valid
     */
    const validateFields = () => {
        let usernamePattern = /^[a-zA-Z0-9_-]+$/;
        if (!usernamePattern.test(username.trim())) {
            setUsernameError("Username must only contain only letters, numbers, hyphens, or underscores.");
            return false
        }

        let passwordPattern = /^.{6,}$/;
        if (!passwordPattern.test(password.trim())) {
            setPasswordError("Password must be more than 6 characters.");
            return false
        }

        return true
    }

    return <>
        <header className="LoginPage-header">
            <p>GoalStreak Login</p>
            <div>
                <input
                    value={username}
                    type={"text"}
                    placeholder={"Enter username"}
                    onChange={(ev) => setUsername(ev.target.value)}></input>
                <label>{usernameError}</label>
            </div>
            <div>
                <input
                    value={password}
                    type={"password"}
                    placeholder={"Enter password"}
                    onChange={(ev) => setPassword(ev.target.value)}></input>
                <label>{passwordError}</label>
            </div>
            <button onClick={() => {
                signInOrUp(true)
            }}>Sign Up
            </button>
            <button onClick={() => {
                signInOrUp(false)
            }}>Sign In
            </button>
        </header>

    </>
}