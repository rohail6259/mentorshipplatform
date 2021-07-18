import React, { useState, useEffect, useContext } from "react";
import { Button } from "rsuite";
import { MPContext } from "../Service/context/context";

const Sessions = () => {
    const { contextData, dispatch } = useContext(MPContext);
    const { appointments, mentors } = contextData;

    const [sessionsData, setSessionsData] = useState([]);
    // const [isSessionReady, setIsSessionReady] = useState(false);

    useEffect(() => {
        dispatch({ type: "GET_APPOINTMENTS" });
    }, [dispatch]);

    useEffect(() => {
        let isDataAvailable = false;

        if (appointments) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (appointments.length > 0) {
                    isDataAvailable = true;
                    setSessionsData(appointments);
                } else fetchData();
            }, 500);
        }
    }, [appointments]);

    const getMentorInfo = (id, type) => {
        for (let i = 0; i < mentors.length; i++) {
            if (mentors[i]._id === id) {
                if (type === "name")
                    return `${mentors[i].firstName} ${mentors[i].lastName}`;
                else if (type === "picture") return mentors[i].picture;
            }
        }
    };

    const getAppointmentDate = (date) => {
        return new Date(date).toDateString();
    };

    const getAppointmentTime = (time) => {
        let target = new Date(time);
        let hours = target.getHours();
        let minutes = target.getMinutes();

        let ampm = hours >= 12 ? "pm" : "am";

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        let result = `${hours}:${minutes} ${ampm}`;
        return result;
    };

    return (
        <section className="sessions">
            <div className="container-fluid container-lg">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-start justify-content-start">
                        <h3 className="mt-5 mb-4">Upcoming sessions</h3>
                        {sessionsData.map((appointment, idx) => (
                            <div
                                key={`appointment-${idx}`}
                                className="session-info w-100 mb-3"
                            >
                                <div className="mentor-info p-3 w-100 d-flex align-items-center">
                                    {getMentorInfo(
                                        appointment.mentorId,
                                        "picture"
                                    ) && (
                                        <img
                                            className="img-luid pictue"
                                            src={getMentorInfo(
                                                appointment.mentorId,
                                                "picture"
                                            )}
                                            alt={"mentor"}
                                        />
                                    )}
                                    {!getMentorInfo(
                                        appointment.mentorId,
                                        "picture"
                                    ) && (
                                        <svg
                                            width="40"
                                            height="40"
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
                                    <div className="pl-3">
                                        <h6>
                                            {getMentorInfo(
                                                appointment.mentorId,
                                                "name"
                                            )}
                                        </h6>
                                        <small>
                                            {`${getAppointmentDate(
                                                appointment.date
                                            )} - ${getAppointmentTime(
                                                appointment.time
                                            )}`}
                                        </small>
                                    </div>
                                </div>
                                <div className="join p-3 d-flex align-items-center justify-content-around">
                                    <Button appearance="subtle" href={`/mentor/${appointment.mentorId}/${appointment._id}`}>
                                        Reschedule
                                    </Button>
                                    <Button appearance="primary">
                                        Join Room
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sessions;
