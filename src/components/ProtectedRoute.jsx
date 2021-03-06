import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
    const { currentUser } = useSelector((state) => state);
    return <>{currentUser ? props.children : <Navigate to="/login" />}</>;
}
