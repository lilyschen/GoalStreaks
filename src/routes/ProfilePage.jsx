import {useLoaderData, useNavigate} from "react-router-dom";
import {ref, onValue, get, set, child} from "firebase/database";
import {useEffect, useState} from "react";
import {auth, database} from "../FirebaseConfig.js";
import'./ProfilePage.css';
import GoalList from "../components/GoalList.jsx";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon, EmailShareButton,
    EmailIcon, RedditShareButton, RedditIcon } from 'react-share';

/**
 * Function to get the userID from the URL
 * @param params
 * @return {Promise<{userId: *}>}
 */
export async function loader({ params }) {
    const userId = params.userId.toLowerCase();
    return { userId };
}

async function getUID(userId) {
    const userDatabaseRef = ref(database, "users/" + userId);
    const uidSnapshot = await get(userDatabaseRef);
    return uidSnapshot.val();
}

function getShareLink() {
    const link = window.location.href
    const lastSlashIndex = link.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
        return link.substring(0, lastSlashIndex);
    }
}

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getShareLink());
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy link to clipboard');
        }
    };

/**
 * ProfilePage that displays the habit/goal information for a user
 *
 * @param isEditable Boolean - Whether the page is editable or not
 *                   (only if the user is authenticated and logged in)
 * @return {JSX.Element}
 * @constructor
 */
export default function ProfilePage({ isEditable }) {
    const navigate = useNavigate();
    const { userId } = useLoaderData();
    const [userData, setUserData] = useState(null);

    // Update userData from firebase
    useEffect(() => {
        // Get UID
        getUID(userId).then((uid) => {
            // Nothing in user
            if (uid === null) {
                //TODO: have 404 page
                return
            }

            const dataDatabaseRef = ref(database, "data/" + uid);
            onValue(dataDatabaseRef, (snapshot) => {
                setUserData({
                    ...snapshot.val(),
                    uid: uid
                });
                console.log({
                    ...snapshot.val(),
                    uid: uid
                })
            })
        })
    }, []);

    const addNewGoal = async () => {
        // Get the name from the user
        let newGoalName = window.prompt("Enter the name for your goal");

        // Validate the name of the goal has at least one character
        if (newGoalName === null || !/^.+$/.test(newGoalName.trim())) {
            alert("Must enter a name for the goal");
            return
        }

        // Create new goal
        let yesterdaysDate = new Date();
        yesterdaysDate.setDate(yesterdaysDate.getDate() - 1)
        const goalObject = {
            name: newGoalName.trim(),
            lastdate: yesterdaysDate.getUTCMilliseconds(),
            streak: 0,
        }

        const goalRef = ref(database, "data/" + userData.uid + "/goals/");
        const goalSnapshot = await get(goalRef);
        let indexToInsert = 0;
        if (goalSnapshot.exists()) {
            indexToInsert = goalSnapshot.val().length;
        }

        await set(child(goalRef, "" + indexToInsert), goalObject).catch(() => {
            alert("You are not authenticated to add a new goal!")
            return
        })
    }

    const logOut = async () => {
        await auth.signOut();
        navigate("/")
    }

    return <>
        <div className="ProfilePage-header">
        <div>
            <h1>
                {userId.charAt(0).toUpperCase() + userId.substring(1)}'s GoalStreak
            </h1>
        </div>
        {/*<div>userId: {userId}</div>*/}

        {/*{isEditable ? <p>Editable!</p> : <p>NOT Editable!</p>}*/}
        {userData !== null ?
            <>
                {/*<p>Name: {userData.name}</p>*/}
                {userData.goals !== undefined ?
                    <GoalList goals={userData.goals} uid={userData.uid} isEditable={isEditable}/>
                : null}
                {isEditable ? <button type="button" className="btn btn-secondary btn-lg" onClick={addNewGoal}>Add new goal</button> : null}
            </>
        : null}
            {isEditable ? <>
                <p>Link to share: <a href={getShareLink()}>{getShareLink()}</a>
                    <button type="button" className="btn btn-outline-dark" onClick={handleCopy}>
                        <i className="bi bi-copy"></i>
                    </button>
                </p>
                <div>
                    <FacebookShareButton url={getShareLink()}>
                        <FacebookIcon size={32} round={true}/>
                    </FacebookShareButton>
                    <TwitterShareButton url={getShareLink()}>
                        <TwitterIcon size={32} round={true}/>
                    </TwitterShareButton>
                    <WhatsappShareButton url={getShareLink()}>
                        <WhatsappIcon size={32} round={true}/>
                    </WhatsappShareButton>
                    <EmailShareButton url={getShareLink()}>
                        <EmailIcon size={32} round={true}/>
                    </EmailShareButton>
                    <RedditShareButton url={getShareLink()}>
                        <RedditIcon size={32} round={true}/>
                    </RedditShareButton>
                </div>

            </> : null}
            {isEditable ? <button type="button" className="btn btn-secondary" onClick={logOut}>Log Out</button> : null}
        </div>
    </>
}

