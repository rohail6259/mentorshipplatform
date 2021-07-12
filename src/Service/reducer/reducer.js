import { initialState } from "../context/context";
import { login } from "../actions/actions";

export const reducer = (contextData = initialState, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            let user = {};
            login(user);
            return { ...contextData, user };

        default:
            return contextData;
    }
};
