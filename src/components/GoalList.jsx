import Goal from "./Goal.jsx";


// goals is an array of Goal objects: {name, target, completion array}
export default function GoalList({ goals, uid, isEditable }) {

    console.log("GOALS");
    console.log(goals);

    return <ul>
        {goals.map((goal, index) => {
            return <Goal goalData={goal} uid={uid} index={index} isEditable={isEditable} />
        })}
    </ul>
}