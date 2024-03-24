

export default function Goal({ goalData }) {

    return <li>
        <div>name: {goalData.name}</div>
        <div>target: {goalData.target}</div>
    </li>
}