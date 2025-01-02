import React from "react";
import ReactDOM from "react-dom";
import gmeet from '../assets/images/gmeet.png'
export const Modal = ({ selectedCard, closeModal }) => {

    return ReactDOM.createPortal(

        <div className="modal-overlay">
            <div className="modal-content">
                <div className="close-button-container">
                    <button onClick={closeModal} className="modal-close">
                        x
                    </button>
                </div>
                <div className="modal-body">

                    <div className="meet-detials">

                        <p>Interview With: {selectedCard.user_det.candidate.candidate_firstName}</p>
                        <p>Position: {selectedCard.user_det.job_id.jobRequest_Title}</p>
                        <p>Interview Date: {new Date(selectedCard?.start).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}</p>
                        <p>Interview Time: {`${new Date(selectedCard?.start).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                        })} - ${new Date(selectedCard?.end).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                        })}`}</p>
                        <p>Interview Via: Google Meet</p>

                        <div className="button-container">

                            <button className="icon-button">
                                <p>Resume.docx</p>

                                <span className="icons">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>

                                </span>
                            </button>

                            <button className="icon-button">
                                <p>Aadhar Card</p>

                                <span className="icons">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>

                                </span>
                            </button>
                        </div>
                    </div>
                    <hr></hr>

                    <div className="meet-join">
                        <img src={gmeet} />

                        <button>Join</button>
                    </div>

                </div>
            </div>
        </div>,
        document.body

    );
};
