import React from "react";
import { Button } from "rsuite";
import { useHistory } from "react-router-dom";

const Success = () => {
    const history = useHistory();
    
    return (
        <section>
            <div className="container-fluid container-lg">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <h3 className="text-center mb-4">
                            Your appointment request has been sent to your
                            mentor.
                        </h3>
                        <Button
                            appearance="primary"
                            block
                            onClick={() => history.push("/")}
                        >
                            Return to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Success;
