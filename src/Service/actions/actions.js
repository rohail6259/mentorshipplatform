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
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                intro: "",
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
            localStorage.setItem("userId", data._id);
            Object.assign(user, {
                id: data._id,
                isAuthValid: data.isAuthValid,
                email: data.email,
                firstName: "",
                lastName: "",
                intro: "",
            });
        }
    } catch (error) {
        if (error.response.status === 400)
            alert("Email or Password do not match!");
    }
}

export async function getUserInfo(user, id) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/${id}`
        );
        if (data) {
            Object.assign(user, {
                id: data._id,
                isAuthValid: true,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                intro: data.intro,
            });
        }
    } catch (error) {
        if (error.response.status === 400) alert("User not found!");
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
        if (error.response.status === 400)
            alert("Oops! Something went wrong, Unable to save Intro.");
    }
}

export async function getMentors(mentors) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/mentors`
        );
        if (data) data.forEach((e) => mentors.push(e));
    } catch (error) {
        if (error.response.status === 400) alert("No Mentors Found!");
    }
}

export async function saveAppointment(schedulingData, setIsSuccessful) {
    try {
        let { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/appointment`,
            schedulingData
        );
        if (data.status === 1) setIsSuccessful(true);
    } catch (error) {
        if (error.response.status === 400) alert("Unable to save Appointment!");
    }
}

export async function updateAppointment(schedulingData, id, setIsSuccessful) {
    try {
        let { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/appointment/${id}`,
            schedulingData
        );
        if (data.status === 1) setIsSuccessful(true);
    } catch (error) {
        if (error.response.status === 400)
            alert("Unable to update Appointment!");
    }
}

export async function getAppointments(appointments) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/appointment`
        );
        if (data) data.forEach((e) => appointments.push(e));
    } catch (error) {
        if (error.response.status === 400) alert("No Appointment Found!");
    }
}