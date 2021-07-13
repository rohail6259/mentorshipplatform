import { createContext } from "react";

const initialState = {
    user: {
        id: "",
        isAuthValid: false,
        email: "",
        firstName: "",
        lastName: "",
        intro: ""
    },
};

const MPContext = createContext();

export { MPContext, initialState };
