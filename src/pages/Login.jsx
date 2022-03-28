import aes from "crypto-js/aes";
import { Field, Form, Formik } from "formik";
import http from "config/http";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "store/actions";

export default function Login() {
    const [authError, setAuthError] = useState("");
    const { currentUser } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await http.post(
                "integration/customer/token",
                JSON.stringify(values)
            );
            if (response.status === 200) {
                const token = response.data.replaceAll('"', "");
                const encryptedToken = aes.encrypt(
                    token,
                    process.env.REACT_APP_SECRET_KEY
                );
                localStorage.setItem("token", encryptedToken.toString());
                const userProfile = await http.get("customers/me");
                dispatch(setUser(userProfile.data));
                navigate("/dashboard");
            } else {
                setAuthError(response.data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        if (currentUser) {
            navigate("/dashboard");
        }
    }, [currentUser, navigate]);

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            onSubmit={handleSubmit}>
            <Form>
                <Field type="text" name="username" />
                <Field type="password" name="password" />
                <button type="submit">Login</button>
                {authError && <div>{authError}</div>}
            </Form>
        </Formik>
    );
}
