import axios from "axios";
import aes from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";

const http = axios.create({
    baseURL: "https://admin.thebig.deals/rest/V1",
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => status >= 200 && status < 500,
});

http.interceptors.request.use((request) => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
        const decryptedToken = aes
            .decrypt(userToken, process.env.REACT_APP_SECRET_KEY)
            .toString(encUtf8);
        request.headers["Authorization"] = `Bearer ${decryptedToken}`;
    }
    return request;
}, console.log);

export default http;
