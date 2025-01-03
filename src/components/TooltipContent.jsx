import React, { useState } from "react";
import { Modal } from "./Modal";

export const TooltipContent = ({ onClose, eventdata }) => {


  const [selectedmeet, setSelectedMeet] = useState(null);
  const [modalmeet, setIsModalMeet] = useState(false);

  const handleCardClick = (item) => {
    setSelectedMeet(item);
    setIsModalMeet(true);
  };

  const handleClose = () => {
    setSelectedMeet(null);
    setIsModalMeet(false)
  }



  return (
    <div>

      <div className="tooltip-content-container">

        <div className="meet-header">
          <p>Meetings</p>
          <span onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{ width: "20px", color: "blue" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

          </span>
        </div>


        {
          eventdata.map((items, index) => {
            return (
              <div onClick={() => handleCardClick(items)} key={index}>
                <hr></hr>

                <div className="meet-card" >
                  <div className="blue-bar">
                  </div>

                  <div className="meet-content" >

                    <div className="content-header">
                      <h4>{items.job_id.jobRequest_Title} </h4>
                      <span className="icons">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ color: 'red' }}>
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>


                      </span>
                    </div>

                    <p>
                      {items.summary} | Interviewer:
                      {items.user_det.handled_by.firstName}
                    </p>

                    <p>
                      Date: {new Date(items.start).toLocaleDateString()}
                      | Time:

                      {new Date(items.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      -
                      {new Date(items.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
      {
        modalmeet && <Modal selectedCard={selectedmeet} closeModal={handleClose} />
      }
    </div>
  );
};
