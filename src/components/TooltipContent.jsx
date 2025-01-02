import React, { useState } from "react";
import { Modal } from "./Modal";

export const TooltipContent = ({ onClose, eventdata }) => {


  const [selectedmeet, setSelectedMeet] = useState(null);
  const [modalmeet, setIsModalMeet] = useState(false);

  const handleCardClick = (item) => {
    setSelectedMeet(item);
    setIsModalMeet(true);
  };

  const handleClose=()=>{
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
                    <h4>{items.job_id.jobRequest_Title} </h4>

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
        modalmeet && <Modal selectedCard={selectedmeet} closeModal={handleClose}/>
      }
    </div>
  );
};
