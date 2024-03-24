import Goal from "./Goal.jsx";


// goals is an array of Goal objects: {name, target, completion array}
export default function GoalList({ goals }) {

    return <ul>
        {goals.map((goal) => {
            <Goal goal={goal} />
        })}
    </ul>
}