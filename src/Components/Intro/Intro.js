import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "rsuite";
import { MPContext } from "../../Service/context/context";

const Intro = () => {
    const { dispatch } = useContext(MPContext);
    const history = useHistory();

    const [introData, setIntroData] = useState("");

    const handleIntroButton = () => {
        dispatch({ type: "SAVE_USER_INTRO", payload: { intro: introData } });
        setTimeout(() => history.push("/"), 300);
    };

    return (
        <section className="intro pt-5 pt-lg-0">
            <div className="container-fluid container-lg">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-lg-center">
                        <div className="col-12">
                            <h1 className="title">Introduce yourself</h1>
                            <Input
                                className="mt-4"
                                componentClass="textarea"
                                rows={14}
                                placeholder="Hi there! My goal is to learn new and exciting stuff. I’m looking to join a brand new company and hone my own personal skills."
                                value={introData}
                                onChange={(value) => setIntroData(value)}
                            />
                            <Button
                                className="mt-3"
                                appearance="primary"
                                size="lg"
                                block
                                onClick={handleIntroButton}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;
