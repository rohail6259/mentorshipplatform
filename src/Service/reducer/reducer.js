import { initialState } from "../context/context";
import { signup, login } from "../actions/actions";

export const reducer = (contextData = initialState, { type, payload }) => {
    let user = {};

    switch (type) {
        case "SIGN_UP":
            signup(user, payload.signUpData, payload.history);
            return { ...contextData, user };

        case "LOGIN":
            login(user, payload.loginData, payload.history);
            return { ...contextData, user };

        default:
            return contextData;
    }
};
