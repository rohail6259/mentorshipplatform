import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, InputGroup, Input, Icon } from "rsuite";
import { MPContext } from "../Service/context/context";
import Logout from "../Utlis/Logout";

const Dashboard = () => {
    const { contextData } = useContext(MPContext);
    const { mentors } = contextData;

    const history = useHistory();

    const [mentorsData, setMentorsData] = useState([]);

    useEffect(() => {
        let isDataAvailable = false;

        if (mentors) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (mentors.length > 0) {
                    isDataAvailable = true;
                    setMentorsData(mentors);
                } else fetchData();
            }, 500);
        }
    }, [mentors]);

    const handleMentorSearch = (value) => {
        let searchedValue = value.toLowerCase();
        let filteredMentors = mentors.filter((e) => {
            return (
                e.firstName.toLowerCase().search(searchedValue) !== -1 ||
                e.lastName.toLowerCase().search(searchedValue) !== -1
            );
        });
        setMentorsData(filteredMentors);
    };

    return (
        <section className="dashboard">
            <div className="container-fluid container-lg">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-8">
                        <div className="col-12">
                            {/* LOGOUT */}
                            <Button
                                className="logout"
                                appearance="default"
                                onClick={() => Logout(history)}
                            >
                                Logout
                            </Button>

                            {/* SEARCH INPUT */}
                            <InputGroup inside>
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                                <Input
                                    placeholder="Search"
                                    type="search"
                                    onChange={(value) =>
                                        handleMentorSearch(value)
                                    }
                                />
                            </InputGroup>

                            {/* MENTORS */}
                            <h6 className="mt-3 mb-4">Mentors for you</h6>
                            {mentorsData.length <= 0 && (
                                <h6 className="mt-5 text-center">
                                    No Mentor found!
                                </h6>
                            )}
                            {mentorsData.map((mentor, idx) => (
                                <div
                                    key={`mentors-${idx}`}
                                    className="mentors w-100 mt-1 p-2"
                                >
                                    <Link
                                        className="d-flex align-items-center"
                                        to={`/mentor/${mentor._id}`}
                                    >
                                        <img
                                            className="img-fluid picture"
                                            src={mentor.picture}
                                            alt={mentor.firstName}
                                        />
                                        <h6 className="pl-3">
                                            {`${mentor.firstName} ${mentor.lastName}`}
                                        </h6>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
