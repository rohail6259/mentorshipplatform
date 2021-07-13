import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Input, Button, ControlLabel } from "rsuite";
import { MPContext } from "../Service/context/context";

const Login = () => {
    const { dispatch } = useContext(MPContext);
    const history = useHistory();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleFormInputOnChange = (value, event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: value,
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch({
            type: "LOGIN",
            payload: {
                loginData,
                history,
            },
        });
    };

    return (
        <section className="login">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-lg-center">
                        <div className="col-12">
                            <h1 className="title">Welcome to FutureLab</h1>
                            <p className="mt-2 mb-4">
                                Lorem ipsum dolor sit amet
                            </p>
                            <form onSubmit={(event) => handleLogin(event)}>
                                <div className="form-group">
                                    <ControlLabel>Email</ControlLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={loginData.email}
                                        onChange={(value, event) =>
                                            handleFormInputOnChange(
                                                value,
                                                event
                                            )
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <ControlLabel>Password</ControlLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={loginData.password}
                                        onChange={(value, event) =>
                                            handleFormInputOnChange(
                                                value,
                                                event
                                            )
                                        }
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    appearance="primary"
                                    className="w-100"
                                >
                                    Login
                                </Button>
                            </form>
                            <p className="mt-3 text-center">
                                Not a member? <Link to="/signup">Signup</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
