import { initialState } from "../context/context";
import { signup, login, saveUserIntro, getMentors } from "../actions/actions";

export const reducer = (contextData = initialState, { type, payload }) => {
    let user = {};

    switch (type) {
        case "SIGN_UP":
            signup(user, payload.signUpData);
            return { ...contextData, user };

        case "LOGIN":
            login(user, payload.loginData);
            return { ...contextData, user };

        case "SAVE_USER_INTRO":
            saveUserIntro(contextData, payload.intro);
            return { ...contextData };

        case "GET_MENTORS":
            let mentors = [];
            getMentors(mentors);
            return { ...contextData, mentors };
        default:
            return contextData;
    }
};
