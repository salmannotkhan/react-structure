import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
    const { currentUser } = useSelector((state) => state);

    return (
        <div>
            <div>Home Page</div>
            <Link to="/login">Login</Link>
            <pre>{JSON.stringify(currentUser, null, 4)}</pre>
        </div>
    );
}
