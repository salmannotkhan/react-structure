import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "store/actions";

export default function DashboardLayout() {
    const { currentUser } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setUser(null));
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <>
            <nav>
                This is admin nav bar Welcome, {currentUser?.firstname}{" "}
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <Outlet />
        </>
    );
}
