import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "assets/css/App.css";
import Dashboard from "pages/Dashboard";
import DashboardLayout from "components/DashboardLayout";
import Home from "pages/Home";
import ProtectedRoute from "components/ProtectedRoute";
import Login from "pages/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "store/actions";
import { getCurrentUser } from "helpers/getCurrentUser";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        getCurrentUser().then((user) => dispatch(setUser(user)));
    }, [dispatch]);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
