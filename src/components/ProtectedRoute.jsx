import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
    return (
        <>
            {localStorage.getItem("token") ? (
                props.children
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}
