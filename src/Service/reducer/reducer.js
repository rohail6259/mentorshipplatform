import { initialState } from "../context/context";
import {
    signup,
    login,
    saveUserIntro,
    getUserInfo,
    getMentors,
    getAppointments,
    saveAppointment,
    updateAppointment,
} from "../actions/actions";

export const reducer = (contextData = initialState, { type, payload }) => {
    let user = {};

    switch (type) {
        case "SIGN_UP":
            signup(user, payload.signUpData);
            return { ...contextData, user };

        case "LOGIN":
            login(user, payload.loginData);
            return { ...contextData, user };

        case "GET_USER_INFO":
            getUserInfo(user, payload.id);
            return { ...contextData, user };

        case "SAVE_USER_INTRO":
            saveUserIntro(contextData, payload.intro);
            return { ...contextData };

        case "GET_MENTORS":
            let mentors = [];
            getMentors(mentors);
            return { ...contextData, mentors };

        case "SAVE_APPOINTMENT":
            saveAppointment(payload.schedulingData, payload.setIsSuccessful);
            return { ...contextData };

        case "UPDATE_APPOINTMENT":
            updateAppointment(
                payload.schedulingData,
                payload.scheduleId,
                payload.setIsSuccessful
            );
            return { ...contextData };

        case "GET_APPOINTMENTS":
            let appointments = [];
            getAppointments(appointments);
            return { ...contextData, appointments };
        default:
            return contextData;
    }
};
