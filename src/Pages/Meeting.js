import React, { useState, useEffect, useContext, useRef } from "react";
import Join from "../Components/Meeting/Join";
import { MPContext } from "../Service/context/context";
import axios from "axios";
import * as Chime from "amazon-chime-sdk-js";
import MeetingEnd from "../Components/Meeting/MeetingEnd";

const Meeting = ({ match }) => {
    const {
        params: { id },
    } = match;

    const { contextData } = useContext(MPContext);
    const { mentors } = contextData;

    const [joinMeeting, setJoinMeeting] = useState(false);
    const [meetingEnded, setMeetingEnded] = useState(false);
    const [meetingData, setMeetingData] = useState();
    const [attendeeData, setAttendeeData] = useState();

    let videoElement = useRef();

    useEffect(() => {
        async function getMeetingData() {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/meeting`
            );
            let { Meeting, Attendee } = data;
            setMeetingData(Meeting);
            setAttendeeData(Attendee);
        }
        getMeetingData();
    }, []);

    const startMeeting = async () => {
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
            audioVideoDidStart: () => {
                meetingSession.audioVideo.startLocalVideoTile();
            },
            videoTileDidUpdate: (tileState) => {
                meetingSession.audioVideo.bindVideoElement(
                    tileState.tileId,
                    videoElement.current
                );
            },
        };

        meetingSession.audioVideo.addObserver(observer);

        const firstVideoDeviceId = (
            await meetingSession.audioVideo.listVideoInputDevices()
        )[0].deviceId;

        await meetingSession.audioVideo.chooseVideoInputDevice(
            firstVideoDeviceId
        );
        meetingSession.audioVideo.start();
    };

    const handleJoin = () => {
        setJoinMeeting(true);
        setTimeout(() => startMeeting(), 2000);
    };

    const handleEndCall = () => {
        videoElement.current.classList.add("d-none");
        setJoinMeeting(false);
        setMeetingEnded(true);
    };

    return (
        <>
            {!joinMeeting && !meetingEnded && (
                <Join
                    mentors={mentors}
                    mentorId={id}
                    handleJoinButton={handleJoin}
                />
            )}
            {joinMeeting && (
                <div className="meeting position-relative">
                    <video ref={videoElement}></video>
                    <div className="controller">
                        <div className="wrapper d-flex align-items-center justify-content-around">
                            {/* VIDEO */}
                            <svg height="28" width="28" viewBox="0 -87 472 472">
                                <path d="m467.101562 26.527344c-3.039062-1.800782-6.796874-1.871094-9.898437-.179688l-108.296875 59.132813v-35.480469c-.03125-27.601562-22.398438-49.96875-50-50h-248.90625c-27.601562.03125-49.96875 22.398438-50 50v197.421875c.03125 27.601563 22.398438 49.96875 50 50h248.90625c27.601562-.03125 49.96875-22.398437 50-50v-34.835937l108.300781 59.132812c3.097657 1.691406 6.859375 1.625 9.894531-.175781 3.039063-1.804688 4.898438-5.074219 4.898438-8.601563v-227.816406c0-3.53125-1.863281-6.796875-4.898438-8.597656zm-138.203124 220.898437c-.015626 16.5625-13.4375 29.980469-30 30h-248.898438c-16.5625-.019531-29.980469-13.4375-30-30v-197.425781c.019531-16.558594 13.4375-29.980469 30-30h248.90625c16.558594.019531 29.980469 13.441406 30 30zm123.101562-1.335937-103.09375-56.289063v-81.535156l103.09375-56.285156zm0 0" />
                            </svg>
                            {/* MUTE */}
                            <svg
                                height="28"
                                width="28"
                                viewBox="-90 1 511 511.99899"
                            >
                                <path d="m332.464844 275.082031c0-8.429687-6.835938-15.265625-15.269532-15.265625-8.433593 0-15.269531 6.835938-15.269531 15.265625 0 74.6875-60.757812 135.445313-135.445312 135.445313-74.683594 0-135.441407-60.757813-135.441407-135.445313 0-8.429687-6.835937-15.265625-15.269531-15.265625-8.433593 0-15.269531 6.835938-15.269531 15.265625 0 86.378907 66.320312 157.539063 150.710938 165.273438v41.105469h-56.664063c-8.433594 0-15.269531 6.835937-15.269531 15.269531 0 8.433593 6.835937 15.269531 15.269531 15.269531h143.871094c8.429687 0 15.265625-6.835938 15.265625-15.269531 0-8.433594-6.835938-15.269531-15.265625-15.269531h-56.667969v-41.105469c84.394531-7.730469 150.714844-78.894531 150.714844-165.273438zm0 0" />
                                <path d="m166.480469 372.851562c53.910156 0 97.769531-43.859374 97.769531-97.769531v-177.316406c0-53.90625-43.859375-97.765625-97.769531-97.765625-53.90625 0-97.765625 43.859375-97.765625 97.765625v177.316406c0 53.910157 43.859375 97.769531 97.765625 97.769531zm-67.230469-275.085937c0-37.070313 30.160156-67.226563 67.230469-67.226563 37.070312 0 67.230469 30.15625 67.230469 67.226563v177.316406c0 37.070313-30.160157 67.230469-67.230469 67.230469-37.070313 0-67.230469-30.160156-67.230469-67.230469zm0 0" />
                            </svg>
                            {/* END CALL */}
                            <svg
                                viewBox="0 0 512 512"
                                width="28"
                                height="28"
                                onClick={handleEndCall}
                            >
                                <path
                                    d="M502.72,253.163c-66.944-63.445-154.581-98.389-246.72-98.389S76.224,189.717,9.067,253.355
			C3.2,259.2,0,267.029,0,275.413c0,8.448,3.371,16.491,9.067,21.845l50.688,50.709c11.712,11.669,32.747,11.328,43.627,0.491
			c15.851-14.677,33.323-26.816,51.776-36.053c11.435-5.525,15.509-19.051,15.509-29.845v-56.021
			c27.2-7.317,58.133-7.979,85.333-7.979c28.821,0,58.965,0.661,85.333,7.915v56.085c0,14.165,5.717,25.387,15.189,29.995
			c19.285,9.643,36.821,21.76,52.032,36.032c5.803,5.483,13.696,8.64,21.632,8.64c8.384,0,16.213-3.2,22.059-9.045l50.688-50.688
			c5.845-5.845,9.067-13.675,9.067-22.08C512,267.029,508.8,259.2,502.72,253.163z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
            {meetingEnded && (
                <MeetingEnd
                    meetingData={meetingData}
                    attendeeData={attendeeData}
                />
            )}
        </>
    );
};

export default Meeting;
