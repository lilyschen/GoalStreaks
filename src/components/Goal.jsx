

export default function Goal({ goalData, isEditable }) {

    // Compute if the goal is complete today
    const currentDate = new Date()
    const lastCompletionDate = new Date(goalData.lastdate)
    const isComplete =
        currentDate.getFullYear() === lastCompletionDate.getFullYear() &&
        currentDate.getMonth() === lastCompletionDate.getMonth() &&
        currentDate.getDate() === lastCompletionDate.getDate();

    // Set the goal's lastdate to right now (makes it complete)
    const completeGoal = () => {

    }

    const deleteGoal = () => {

    }

    return <li style={{backgroundColor: isComplete ? "green" : "red"}}>
        <div>name: {goalData.name}</div>
        <div>streak: {goalData.streak}</div>
        <div>last completion date: {goalData.lastdate}</div>
        {isEditable ?
            <button onClick={completeGoal}>Complete</button>
        : null}
        {isEditable ?
            <button onClick={deleteGoal}>Delete</button>
            : null}
    </li>
}