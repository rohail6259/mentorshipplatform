import axios from "axios";

export async function signup(user, signUpData, history) {
    try {
        let { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/signup`,
            {
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                email: signUpData.email,
                password: signUpData.password,
            }
        );
        if (data) {
            let userInfo = {
                email: signUpData.email,
                password: signUpData.password,
            };
            login(user, userInfo, history);
        }
    } catch (error) {
        if (error.response.status === 400) alert("User already exits!");
    }
}

export async function login(user, userInfo, history) {
    try {
        let { data, headers } = await axios.post(
            `${process.env.REACT_APP_API_URL}/login`,
            {
                email: userInfo.email,
                password: userInfo.password,
            }
        );
        if (data) {
            localStorage.setItem("token", headers["x-auth-token"]);
            Object.assign(user, {
                isAuthValid: data.isAuthValid,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            });
            history.push("/");
        }
    } catch (error) {
        if (error.response.status === 400)
            alert("Email or Password do not match!");
    }
}
