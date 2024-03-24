import Goal from "./Goal.jsx";


// goals is an array of Goal objects: {name, target, completion array}
export default function GoalList({ goals, isEditable }) {

    console.log("GOALS");
    console.log(goals);

    return <ul>
        {goals.map((goal) => {
            return <Goal goalData={goal} isEditable={isEditable} />
        })}
    </ul>
}