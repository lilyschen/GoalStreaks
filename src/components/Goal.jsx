import {ref, set} from "firebase/database";
import {database} from "../FirebaseConfig.js";



export default function Goal({ goalData, uid, index, isEditable }) {

    // Compute if the goal is complete today
    const currentDate = new Date()
    let previousDate = new Date();
    previousDate.setDate(currentDate.getDate() - 1)

    const lastCompletionDate = new Date(goalData.lastdate)
    const isComplete =
        currentDate.getFullYear() === lastCompletionDate.getFullYear() &&
        currentDate.getMonth() === lastCompletionDate.getMonth() &&
        currentDate.getDate() === lastCompletionDate.getDate();

    const month = lastCompletionDate.toLocaleString('default', {month: 'long'});
    const date = lastCompletionDate.getDate()
    const year = lastCompletionDate.getFullYear();

    let lastCompleteDateString =  month + " " + date + ", " + year;

    if (lastCompletionDate.toDateString() === new Date(0).toDateString()) {
        lastCompleteDateString = "Never";
    }

    // Streak is broken if NOT complete AND if NOT previous day
    const isStreakBroken = !isComplete &&
        !(previousDate.getFullYear() === lastCompletionDate.getFullYear() &&
        previousDate.getMonth() === lastCompletionDate.getMonth() &&
        previousDate.getDate() === lastCompletionDate.getDate());

    // Set the goal's lastdate to right now (makes it complete)
    const completeGoal = async () => {
        const dateRef = ref(database,
            "data/" + uid + "/goals/" + index + "/lastdate");
        const streakRef = ref(database,
            "data/" + uid + "/goals/" + index + "/streak");

        await set(dateRef, currentDate.getTime()).catch((e) => {
            alert("You are not authenticated to edit this!")
        })
        await set(streakRef, isStreakBroken ? 1 : goalData.streak + 1)
    }

    return <li style={{backgroundColor: isComplete ? "#C2E2C5" : "lightgray"}}>

        <header className="Goal-header">
            <div>Goal: {goalData.name}</div>
            <div>Streak: {goalData.streak}</div>
            <div>Last Completed: {lastCompleteDateString}</div>
            {isEditable && !isComplete ?
                <button type="button" className="btn btn-light" onClick={completeGoal}>Complete</button>
                : null}
        </header>
    </li>

}