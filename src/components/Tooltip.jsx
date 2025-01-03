import React, { useState } from "react";
import { Tooltip } from "react-tippy";
import { TooltipContent } from "./TooltipContent";
import { Modal } from "./Modal";

export const ToolTipComp = ({ calendarData }) => {
    const [isTooltipOpen, setTooltipOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)

    const event = calendarData?.[0]

    const handleCardClick = () => {
        if (calendarData?.length === 1) {
            setSelectedEvent(event)
            setModalOpen(true)
        } else {
            setTooltipOpen(!isTooltipOpen);
        }
    };

    const handleCloseTooltip = () => {
        setTooltipOpen(false);
    };


    const handleCloseModal = () => {
        setSelectedEvent(null)
        setModalOpen(false)
    };

    return (
        <div className="tooltip-container">
            <div className="badge-container">
                <p>{calendarData?.length || 0}</p>
            </div>
            {calendarData?.length > 1 ? (
                <Tooltip
                    position="right"
                    interactive
                    trigger="manual"
                    theme="light"
                    open={isTooltipOpen}
                    onRequestClose={handleCloseTooltip}
                    html={<TooltipContent onClose={handleCloseTooltip} eventdata={calendarData} />}
                >
                    <div className="card-content" onClick={handleCardClick}>
                        <div className="card-header">
                            <p>{event?.job_id?.jobRequest_Title || "No Title"}</p>
                        </div>
                        <p>{event?.user_det?.handled_by?.firstName || "Unknown"}</p>
                        <p>
                            {event.start
                                ? new Date(event.start).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  })
                                : "Start Time"}
                            -
                            {event.end
                                ? new Date(event.end).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  })
                                : "End Time"}
                        </p>
                    </div>
                </Tooltip>
            ) : (
                <div className="card-content" onClick={handleCardClick}>
                    <div className="card-header">
                        <p>{event?.job_id?.jobRequest_Title || "No Title"}</p>
                    </div>
                    <p>{event?.user_det?.handled_by?.firstName || "Unknown"}</p>
                    <p>
                        {event.start
                            ? new Date(event.start).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : "Start Time"}
                        -
                        {event.end
                            ? new Date(event.end).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : "End Time"}
                    </p>
                </div>
            )}
            {isModalOpen && (
                <Modal selectedCard={selectedEvent} closeModal={handleCloseModal} />
            )}
        </div>
    );
};
