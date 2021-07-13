import axios from "axios";

export async function signup(user, signUpData) {
    try {
        let { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/signup`,
            {
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                email: signUpData.email,
                password: signUpData.password,
                intro: "",
            }
        );
        if (data) {
            let userInfo = {
                email: signUpData.email,
                password: signUpData.password,
            };
            login(user, userInfo);
        }
    } catch (error) {
        if (error.response.status === 400) alert("User already exits!");
    }
}

export async function login(user, userInfo) {
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
                id: data._id,
                isAuthValid: data.isAuthValid,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                intro: data.intro || "",
            });
        }
    } catch (error) {
        if (error.response.status === 400)
            alert("Email or Password do not match!");
    }
}

export async function saveUserIntro(contextData, intro) {
    try {
        let { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/user/${contextData.user.id}`,
            { intro }
        );
        if (data) contextData.user.intro = intro;
    } catch (error) {
        if (error.response.status === 400) alert("Oops! Something went wrong.");
    }
}
