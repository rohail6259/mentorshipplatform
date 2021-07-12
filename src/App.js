import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MPContext, initialState } from "./Service/context/context";
import { reducer } from "./Service/reducer/reducer";
import ProtectedRoute from "./Components/Global/ProtectedRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const App = () => {
    // REACT USEREDUCER - REDUX PATTERN
    const [contextData, dispatch] = useReducer(reducer, initialState);

    return (
        <MPContext.Provider value={{ contextData, dispatch }}>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/" exact component={Home} />
                </Switch>
            </Router>
        </MPContext.Provider>
    );
};

export default App;
