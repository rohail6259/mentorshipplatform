import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MPContext } from "../Service/context/context";
import { Icon, Button } from "rsuite";
import Appointment from "../Components/Scheduling/Appointment";

const MentorProfile = ({ match }) => {
    const {
        params: { id, reschedule },
    } = match;

    const { contextData } = useContext(MPContext);
    const { mentors } = contextData;

    const history = useHistory();

    const [profileData, setProfileData] = useState({});
    const [isSchedulingCompReady, setIsSchedulingCompReady] = useState(false);

    useEffect(() => {
        if (reschedule) setIsSchedulingCompReady(true);
    }, [reschedule]);

    useEffect(() => {
        if (mentors.length > 0) setMentorData();
        else setTimeout(() => setMentorData(), 500);

        function setMentorData() {
            for (let i = 0; i < mentors.length; i++) {
                if (mentors[i]._id === id) {
                    setProfileData(mentors[i]);
                    break;
                }
            }
        }
    }, [mentors, id]);

    const handleScheduling = () => {
        setIsSchedulingCompReady(true);
    };

    return (
        <>
            {/* APPOINTMENT */}
            {isSchedulingCompReady && (
                <Appointment
                    mentorId={id}
                    scheduleId={reschedule}
                    setAppointmentState={setIsSchedulingCompReady}
                />
            )}
            {/* MENTOR INFO / PROFILE */}
            {!isSchedulingCompReady && (
                <section className="mentor-profile position-relative">
                    <div className="container-fluid container-lg">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                                <div
                                    className="back-btn d-flex align-items-center"
                                    onClick={() => history.push("/")}
                                >
                                    <Icon icon="back-arrow" />
                                    <h6 className="pl-2">Back</h6>
                                </div>
                                {profileData.picture && (
                                    <img
                                        src={profileData.picture}
                                        alt={profileData.firstName || "mentor"}
                                    />
                                )}
                                {!profileData.picture && (
                                    <svg
                                        width="100"
                                        height="100"
                                        viewBox="0 0 45.532 45.532"
                                    >
                                        <path
                                            d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765
		S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53
		c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012
		c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592
		c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"
                                        />
                                    </svg>
                                )}
                                <h3 className="my-3">{`${
                                    profileData.firstName || "Mentor"
                                } ${profileData.lastName || ""}`}</h3>
                                <Button
                                    appearance="primary"
                                    block
                                    onClick={handleScheduling}
                                >
                                    Schedule a call
                                </Button>
                                <div className="w-100 text-left mt-5">
                                    <p className="title mb-3">About me</p>
                                    <p className="intro">
                                        {profileData.intro || "No Intro Found!"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default MentorProfile;
