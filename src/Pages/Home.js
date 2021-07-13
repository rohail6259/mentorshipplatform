import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "rsuite";
import Logout from "../Utlis/Logout";

const Home = () => {
    const history = useHistory();
    return (
        <section className="home">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1 className="title">Home</h1>
                        <Button
                            appearance="default"
                            onClick={() => Logout(history)}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
