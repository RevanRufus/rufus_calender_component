import { ToolTipComp } from "./Tooltip"
import { MONTH_NAMES, WEEK_NAMES } from "../common/constants";
import { getLastDateOfPreviousMonth, getPreviousMonthDaysInCurrentMonthWeek, getTotalDaysInMonth } from "../common/functions";



export const WeekHeaderCard = ({ date, month, weekName }) => {

    return <div className="week-header">
        {(date && month) && <p>{`${date} ${month}`}</p>}
        {weekName && <p>{weekName}</p>}
    </div>
}

export const WeekChildrenCard = ({ selectedDate, hour, eventData }) => {



    const currentStartDate = new Date(selectedDate.year, selectedDate.month, selectedDate.date);
    currentStartDate.setHours(hour, 0, 0, 0);

    const currentEndDate = new Date(currentStartDate);
    currentEndDate.setHours(currentStartDate.getHours() + 1);

    const availableEvents = eventData.filter((item) => {
        const eventStart = new Date(item.start);
        const eventEnd = new Date(item.end);

        return (
            eventStart >= currentStartDate &&
            eventStart < currentEndDate &&
            eventStart.getDate() === currentStartDate.getDate() &&
            eventStart.getMonth() === currentStartDate.getMonth() &&
            eventStart.getFullYear() === currentStartDate.getFullYear()
        );
    });



    return (
        <div className="week-children" >
            {availableEvents.length > 0 ? <ToolTipComp calendarData={availableEvents} /> : null}
        </div>
    );
};


export const DayChildrenCard = ({ selectedDate, hour, eventData }) => {

    const currentStartDate = new Date(selectedDate.year, selectedDate.month, selectedDate.date);
    currentStartDate.setHours(hour, 0, 0, 0);
    const currentEndDate = new Date(currentStartDate);
    currentEndDate.setHours(currentStartDate.getHours() + 1);

    const availableEvents = eventData.filter((item) => {
        const eventDate = new Date(item.start);
        return eventDate >= currentStartDate && eventDate < currentEndDate;
    });

    return <div className="day-children">
        {
            availableEvents?.length ? <EventCard availableEvents={availableEvents} hour={hour} /> : ''
        }
    </div>
}

export const MonthChildrenCard = ({ totalDaysOfPreviousMonth, previousMonthDays, currentMonthDays, selectedDate, eventData }) => {

    const previousMonthElements = "x".repeat(previousMonthDays).split('').map((item, index) => {
        const day = (totalDaysOfPreviousMonth - previousMonthDays) + (index + 1)
        return <div className="previous-month-children" key={`prev-${index}`}>{day}</div>
    });

    const currentMonthElements = "x".repeat(currentMonthDays).split('').map((item, index) => {
        const dayDate = new Date(selectedDate.year, selectedDate.month, index + 1)

        const availableEvents = eventData.filter((item) => {
            const eventStart = new Date(item.start)
            return (
                eventStart.getDate() === dayDate.getDate() &&
                eventStart.getMonth() === dayDate.getMonth() &&
                eventStart.getFullYear() === dayDate.getFullYear()
            );
        });

        return (
            <div className="month-children" key={`current-${index}`}>
                {index + 1}
                {availableEvents.length > 0 && <ToolTipComp calendarData={availableEvents} />}
            </div>
        );
    });

    return (
        <>
            {previousMonthElements}
            {currentMonthElements}
        </>
    );
};


export const YearChildrenCard = ({ selectedDate,eventData }) => {

    return (
        MONTH_NAMES.map((items, index) => {
            const totalDaysOfPreviousMonth = getLastDateOfPreviousMonth(selectedDate.year, index)
            const previousMonthDays = getPreviousMonthDaysInCurrentMonthWeek(selectedDate.year, index , false)
            const currentMonthDays = getTotalDaysInMonth(selectedDate.year, index)
            
            return (
                <MTYCalendar
                    monthName={items}
                    totalDaysOfPreviousMonth={totalDaysOfPreviousMonth}
                    previousMonthDays={previousMonthDays}
                    currentMonthDays={currentMonthDays}
                    selectedDate={{ year: selectedDate.year, month: index }}
                    eventData={eventData} />
            )
        })
    )
}

const MTYCalendar = ({ monthName,
    totalDaysOfPreviousMonth,
    previousMonthDays,
    currentMonthDays,
    selectedDate,eventData }) => {

    const previousMonthElements = "x".repeat(previousMonthDays).split('').map((item, index) => {
        const day = (totalDaysOfPreviousMonth - previousMonthDays) + (index + 1)
        return <div className="previous-month-children" key={`prev-${index}`}>{day}</div>
    });

    const currentMonthElements = "x".repeat(currentMonthDays).split('').map((item, index) => {
        const dayDate = new Date(selectedDate.year, selectedDate.month, index + 1)

        const hasEvent = eventData.some((event) => {
            const eventStart = new Date(event.start);
            return (
                eventStart.getDate() === dayDate.getDate() &&
                eventStart.getMonth() === dayDate.getMonth() &&
                eventStart.getFullYear() === dayDate.getFullYear()
            );
        });

        return (
            <div className={`year-month-children ${hasEvent ? "highlighted-date" : ""}`} key={`current-${index}`}>
                {index + 1}
            </div>
        );
    });


    return (
        <div className="month-card">
            <h3 className="month-title">{monthName}</h3>
            <div className="month-weekdays">
                {WEEK_NAMES.map((weekday, index) => (
                    <div className="weekday" key={`weekday-${index}`}>
                        {weekday.charAt(0)}
                    </div>
                ))}
            </div>
            <div className="month-calendar-grid">
                {previousMonthElements}
                {currentMonthElements}
            </div>
        </div>
    );
};


export const TimeSlotContainer = ({ time, meridian }) => {
    return <div className="time-slot-item">
        <span>{time + " " + meridian}</span>
    </div>
}

export const EventCard = ({ availableEvents, hour }) => {

    return <ToolTipComp calendarData={availableEvents} />
}