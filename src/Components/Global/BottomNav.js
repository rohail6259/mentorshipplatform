import React from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
    return (
        <div className="py-3 bottom-nav d-flex align-items-center justify-content-around">
            <NavLink to="/" exact activeClassName="nav-active">
                <svg width="22" height="18" viewBox="0 0 22 18">
                    <path
                        d="M11 3.05208L16.2083 7.73958V15.875H14.125V9.625H7.87498V15.875H5.79165V7.73958L11 3.05208ZM11 0.25L0.583313 9.625H3.70831V17.9583H9.95831V11.7083H12.0416V17.9583H18.2916V9.625H21.4166L11 0.25Z"
                        fill="#575757"
                    />
                </svg>
            </NavLink>
            <NavLink to="/sessions" activeClassName="nav-active">
                <svg width="19" height="22" viewBox="0 0 19 22">
                    <path
                        d="M4.29167 9.58333H6.375V11.6667H4.29167V9.58333ZM18.875 4.375V18.9583C18.875 20.1042 17.9375 21.0417 16.7917 21.0417H2.20833C1.05208 21.0417 0.125 20.1042 0.125 18.9583L0.135417 4.375C0.135417 3.22916 1.05208 2.29166 2.20833 2.29166H3.25V0.208328H5.33333V2.29166H13.6667V0.208328H15.75V2.29166H16.7917C17.9375 2.29166 18.875 3.22916 18.875 4.375ZM2.20833 6.45833H16.7917V4.375H2.20833V6.45833ZM16.7917 18.9583V8.54166H2.20833V18.9583H16.7917ZM12.625 11.6667H14.7083V9.58333H12.625V11.6667ZM8.45833 11.6667H10.5417V9.58333H8.45833V11.6667Z"
                        fill="#575757"
                    />
                </svg>
            </NavLink>
        </div>
    );
};

export default BottomNav;
