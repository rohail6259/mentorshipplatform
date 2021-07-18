import React from "react";
import { Button } from "rsuite";

const Join = ({ mentors, mentorId, handleJoinButton }) => {
    const getMentorInfo = (id, type) => {
        for (let i = 0; i < mentors.length; i++) {
            if (mentors[i]._id === id) {
                if (type === "name")
                    return `${mentors[i].firstName} ${mentors[i].lastName}`;
                else if (type === "picture") return mentors[i].picture;
            }
        }
    };

    return (
        <section className="join">
            <div className="container-fluid container-lg">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <img
                            className="user-img mb-4"
                            src={`https://avatars.dicebear.com/api/human/sample.svg`}
                            alt="sample"
                        />
                        <h2 className="my-3">Ready to join the room.</h2>
                        {getMentorInfo(mentorId, "picture") && (
                            <img
                                className="mentor-img mt-3 mb-2"
                                src={getMentorInfo(mentorId, "picture")}
                                alt={getMentorInfo(mentorId, "name")}
                            />
                        )}
                        {!getMentorInfo(mentorId, "picture") && (
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
                        {/* {!false && <p>No one is the room</p>} */}
                        {getMentorInfo(mentorId, "name") && (
                            <p className="mentor-name">
                                <span>{`${getMentorInfo(
                                    mentorId,
                                    "name"
                                )}`}</span>{" "}
                                is in the room
                            </p>
                        )}
                        <div className="w-100 d-flex flex align-items-end justify-content-around mt-2">
                            <Button
                                href="/sessions"
                                appearance="default"
                                block
                                className="mr-2"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleJoinButton}
                                appearance="primary"
                                block
                            >
                                Join
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Join;
