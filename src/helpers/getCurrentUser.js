import aes from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";
import http from "./http";

export const getCurrentUser = async () => {
    const userToken = localStorage.getItem("token");
    if (!userToken) return null;
    const userData = localStorage.getItem("userData");
    if (userData) {
        const decryptedData = aes.decrypt(
            userData,
            process.env.REACT_APP_SECRET_KEY
        );
        try {
            const data = JSON.parse(decryptedData.toString(encUtf8));
            return data;
        } catch (err) {
            console.log(err);
        }
        return null;
    }
    try {
        const response = await http.get("customers/me");
        const encryptedData = aes.encrypt(
            JSON.stringify(response.data),
            process.env.REACT_APP_SECRET_KEY
        );
        if (response.status === 200) {
            localStorage.setItem("userData", encryptedData.toString());
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
    return null;
};
