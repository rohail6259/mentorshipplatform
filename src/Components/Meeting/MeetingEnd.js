import React from "react";
import { useHistory } from "react-router-dom";

import * as Chime from "amazon-chime-sdk-js";
import { Button } from "rsuite";

const MeetingEnd = ({ meetingData, attendeeData }) => {
    const history = useHistory();

    const handleEndSession = () => {
        const logger = new Chime.ConsoleLogger(
            "ChimeMeetingLogs",
            Chime.LogLevel.INFO
        );
        const deviceController = new Chime.DefaultDeviceController(logger);

        const configuration = new Chime.MeetingSessionConfiguration(
            meetingData,
            attendeeData
        );
        const meetingSession = new Chime.DefaultMeetingSession(
            configuration,
            logger,
            deviceController
        );

        const observer = {
            audioVideoDidStop: (sessionStatus) => {
                const sessionStatusCode = sessionStatus.statusCode();
                if (
                    sessionStatusCode ===
                    new Chime.MeetingSessionStatusCode.Left()
                ) {
                    /*
                  - You called meetingSession.audioVideo.stop().
                  - When closing a browser window or page, Chime SDK attempts to leave the session.
                */
                    console.log("You left the session");
                } else {
                    console.log(
                        "Stopped with a session status code: ",
                        sessionStatusCode
                    );
                }
            },
        };

        meetingSession.audioVideo.addObserver(observer);

        meetingSession.audioVideo.stop();

        history.push("/");
    };

    return (
        <section>
            <div className="container-fluid container-lg">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <h2>You’ve exited the room.</h2>
                        <div className="w-100 d-flex flex align-items-end justify-content-around mt-2">
                            <Button appearance="default" block className="mr-2">
                                Rejoin
                            </Button>
                            <Button
                                onClick={handleEndSession}
                                appearance="primary"
                                block
                            >
                                End Session
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetingEnd;
