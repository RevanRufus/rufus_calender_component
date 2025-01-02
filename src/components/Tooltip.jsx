import React, { useState } from "react";
import { Tooltip } from "react-tippy";
import { TooltipContent } from "./TooltipContent";


export const ToolTipComp = ({ calendarData,leftval }) => {

    const [isTooltipOpen, setTooltipOpen] = useState(true);

    const event = calendarData[0]

    const handleClose = () => {
        setTooltipOpen(false);
    };


    return (
        <div className="tooltip-container" >

            <div className="badge-container">
                <p>{calendarData.length}</p>
            </div>
            <Tooltip
                position="right"
                interactive
                trigger="click"
                theme="light"
                // open={isTooltipOpen}
                // hideOnClick={()=>setTooltipOpen(false)}
                html={(

                    <TooltipContent onClose={handleClose} eventdata={calendarData} />
                )}

            >
                <div className="" onMouseEnter={() => setTooltipOpen(true)} >
                    <p>{event?.job_id?.jobRequest_Title}</p>
                    <p>{event?.user_det?.handled_by?.firstName}</p>

                    <p>
                        {new Date(event.start).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        -
                        {new Date(event.end).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
            </Tooltip>
        </div>
    )

}
