import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MPContext, initialState } from "./Service/context/context";
import { reducer } from "./Service/reducer/reducer";
import ProtectedRoute from "./Components/Global/ProtectedRoute";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Sessions from "./Pages/Sessions";
import MentorProfile from "./Pages/MentorProfile";
import BottomNav from "./Components/Global/BottomNav";

const App = () => {
    // REACT USEREDUCER - REDUX PATTERN
    const [contextData, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "GET_MENTORS" });
    }, [dispatch]);

    // TODO:: ON REFRESH GET THE USER DATA

    return (
        <MPContext.Provider value={{ contextData, dispatch }}>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <ProtectedRoute path="/" exact component={Dashboard} />
                    <ProtectedRoute path="/sessions" component={Sessions} />
                    <ProtectedRoute
                        path="/mentor/:id"
                        component={MentorProfile}
                    />
                </Switch>
                {/* TODO:: HIDE ON MENTOR & APPOINTMENT COMPONENT */}
                <BottomNav />
            </Router>
        </MPContext.Provider>
    );
};

export default App;
