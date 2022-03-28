import { useSelector } from "react-redux";

export default function Dashboard() {
    const { currentUser } = useSelector((state) => state);
    return (
        <div>
            <pre>{JSON.stringify(currentUser, null, 4)}</pre>
        </div>
    );
}
