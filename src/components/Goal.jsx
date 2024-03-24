

export default function Goal({ goalData }) {

    return <li>
        <div>name: {goalData.name}</div>
        <div>streak: {goalData.streak}</div>
        <div>last completion date: {goalData.lastdate}</div>
    </li>
}