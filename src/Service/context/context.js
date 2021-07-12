import { createContext } from "react";

const initialState = {
    user: {},
};

const MPContext = createContext();

export { MPContext, initialState };
