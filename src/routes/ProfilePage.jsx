import {useLoaderData} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import {useEffect} from "react";
import { auth, database } from "../FirebaseConfig.js";
import'./ProfilePage.css';

/**
 * Function to get the userID from the URL
 * @param params
 * @return {Promise<{userId: *}>}
 */
export async function loader({ params }) {
    const userId = params.userId;
    return { userId };
}

/**
 * ProfilePage that displays the habit/goal information for a user
 *
 * @param isEditable Boolean - Whether the page is editable or not
 *                   (only if the user is authenticated and logged in)
 * @return {JSX.Element}
 * @constructor
 */
export default function ProfilePage({ isEditable }) {
    const { userId } = useLoaderData();

    useEffect(() => {
        const userDatabaseRef = ref(database, "users/" + userId);

        onValue(userDatabaseRef, (snapshot) => {
            console.log("SNAPSHOT");
            console.log(snapshot.val());
            console.log(snapshot.exists());
            console.log(snapshot.key);
        })
    })

    // useEffect(() => {
    //     alert("UID: " + userId);
    // })

    // useEffect(()=>{
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             const email = user.email;
    //             // ...
    //             alert("logged in user: " + email);
    //         } else {
    //             // User is signed out
    //             // ...
    //             alert("user is logged out")
    //         }
    //     });
    //
    // }, [])

    return <>
        <div>
            <h1>
                GoalStreak
            </h1>
        </div>
        <div>userId: {userId}</div>

        {isEditable ? <p>Editable!</p> : <p>NOT Editable!</p>}
    </>
}