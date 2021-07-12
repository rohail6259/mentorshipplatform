import React from "react";
import { Input, Button, ControlLabel } from "rsuite";

const Login = () => {
    return (
        <section className="login">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="title">Getting Started</h1>
                        <p>Lorem ipsum dolor sit amet</p>
                        <form>
                            <div className="form-group">
                                <ControlLabel>Email</ControlLabel>
                                <Input type="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <ControlLabel>Password</ControlLabel>
                                <Input type="password" placeholder="Password" />
                            </div>
                            <Button appearance="primary" className="w-100">
                                Sign Up
                            </Button>
                        </form>
                        <p>
                            By creating an account, you agree to FutureLab's
                            terms and conditions
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
