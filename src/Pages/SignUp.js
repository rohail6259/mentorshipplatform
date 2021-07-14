import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MPContext } from "../Service/context/context";
import { Input, Button, ControlLabel } from "rsuite";
import Intro from "../Components/Intro/Intro";

const SignUp = () => {
    const { contextData, dispatch } = useContext(MPContext);
    const { user } = contextData;

    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        intro: "",
    });
    const [isIntroCompReady, setIsIntroCompReady] = useState(false);

    useEffect(() => {
        let isDataAvailable = false;

        if (!user.isAuthValid) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (user.isAuthValid) {
                    isDataAvailable = true;
                    setIsIntroCompReady(true);
                } else fetchData();
            }, 500);
        }
    }, [user]);

    const handleFormInputOnChange = (value, event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: value,
        });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        dispatch({
            type: "SIGN_UP",
            payload: {
                signUpData,
            },
        });
    };

    return (
        <>
            {isIntroCompReady && <Intro />}
            <section className="signup pt-5 pt-lg-0">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-lg-center">
                            <div className="col-12">
                                {/* TITLE & SUBTITLE */}
                                <h1 className="title">Getting Started</h1>
                                <p className="mt-2 mb-4">
                                    Lorem ipsum dolor sit amet
                                </p>
                                {/* SIGNUP FORM  */}
                                <form onSubmit={(event) => handleSignUp(event)}>
                                    <div className="form-row mb-3">
                                        <div className="col">
                                            <ControlLabel>
                                                First Name
                                            </ControlLabel>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={signUpData.firstName}
                                                onChange={(value, event) =>
                                                    handleFormInputOnChange(
                                                        value,
                                                        event
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <ControlLabel>
                                                Last Name
                                            </ControlLabel>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={signUpData.lastName}
                                                onChange={(value, event) =>
                                                    handleFormInputOnChange(
                                                        value,
                                                        event
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <ControlLabel>Email</ControlLabel>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={signUpData.email}
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
                                            value={signUpData.password}
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
                                        Sign Up
                                    </Button>
                                </form>
                                {/* LOGIN LINK */}
                                <p className="my-2 text-center">
                                    Already have an account?{" "}
                                    <Link to="/login">Login</Link>
                                </p>
                                {/* T&C */}
                                <p className="mt-3 text-center">
                                    By creating an account, you agree to
                                    FutureLab's{" "}
                                    <Link to="#">terms and conditions</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
