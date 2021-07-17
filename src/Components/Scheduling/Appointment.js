import React, { useState, useContext } from "react";
import { Button, Icon, ControlLabel, DatePicker } from "rsuite";
import { MPContext } from "../../Service/context/context";
import Success from "./Success";

const Appointment = ({ mentorId, scheduleId, setAppointmentState }) => {
    const { contextData, dispatch } = useContext(MPContext);
    const { user } = contextData;

    const [schedulingData, setSchedulingData] = useState({
        time: "",
        date: "",
        mentorId,
        userId: "",
    });
    const [isSuccessFul, setIsSuccessful] = useState(false);

    const handleBackButton = () => {
        setAppointmentState(false);
    };

    const handleFormInputOnChange = (value, type) => {
        setSchedulingData({
            ...schedulingData,
            [type]: value,
            userId: user.id,
        });
    };

    const handleAppointment = () => {
        const { time, date, mentorId, userId } = schedulingData;

        if (time && date && mentorId.length > 0 && userId.length > 0) {
            if (scheduleId)
                dispatch({
                    type: "UPDATE_APPOINTMENT",
                    payload: { schedulingData, scheduleId, setIsSuccessful },
                });
            else
                dispatch({
                    type: "SAVE_APPOINTMENT",
                    payload: { schedulingData, setIsSuccessful },
                });
        }
    };

    return (
        <>
            {isSuccessFul && <Success />}
            {!isSuccessFul && (
                <section className="appointment">
                    <div className="container-fluid container-lg">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-lg-center">
                                {/* BACK BUTTON */}
                                <div
                                    className="back-btn d-flex align-items-center"
                                    onClick={handleBackButton}
                                >
                                    <Icon icon="back-arrow" />
                                    <h6 className="pl-2">Back</h6>
                                </div>
                                {/* SCHEDULER */}
                                <div className="col-12">
                                    <div className="w-100 mt-5 pt-5 mt-lg-0 pt-lg-0">
                                        <div className="form-group">
                                            <ControlLabel>Time</ControlLabel>
                                            <DatePicker
                                                block
                                                format="HH:mm"
                                                name="time"
                                                placeholder="Now"
                                                onChange={(date) =>
                                                    handleFormInputOnChange(
                                                        date.valueOf(),
                                                        "time"
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <ControlLabel>Date</ControlLabel>
                                            <DatePicker
                                                block
                                                placeholder="Today"
                                                onChange={(date) =>
                                                    handleFormInputOnChange(
                                                        date.valueOf(),
                                                        "date"
                                                    )
                                                }
                                            />
                                        </div>
                                        <Button
                                            appearance="primary"
                                            block
                                            onClick={handleAppointment}
                                        >
                                            Schedule a call
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Appointment;
