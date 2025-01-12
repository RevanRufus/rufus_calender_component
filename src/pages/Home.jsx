import {  useMemo, useState } from "react";
import { MONTH_NAMES, WEEK_NAMES } from "../common/constants";
import { DayChildrenCard, MonthChildrenCard, TimeSlotContainer, WeekChildrenCard, WeekHeaderCard, YearChildrenCard } from "../components/HomeComponents";
import {  getCurrentWeekDays, getHourlyTimeValuesWithMeridian, getLastDateOfPreviousMonth, getPreviousMonthDaysInCurrentMonthWeek, getTotalDaysInMonth, subtractOneDay } from "../common/functions"
import { useFetch } from "../hooks/fetch";
import { FETCH_FROM_TO_END_DATE, FETCH_MEETING } from "../common/api";

export const Home = () => {

    const VIEWS_ITEMS = ['Day', 'Week', 'Month', 'Year'];

    const [selectedView, setselectedView] = useState('Day');
    const { getdata: getMeetingData } = useFetch(FETCH_MEETING);
    const { getdata: eventData } = useFetch(FETCH_FROM_TO_END_DATE);

    const [selectedDate, setSelectedDate] = useState({
        date: new Date(2024, 7, 29).getDate(),
        month: new Date(2024, 7, 29).getMonth(),
        year: new Date(2024, 7, 29).getFullYear(),
    })
    const timeSlot = useMemo(() => getHourlyTimeValuesWithMeridian(), []);
    const currentWeekDays = useMemo(() => getCurrentWeekDays(new Date(selectedDate.year, selectedDate.month, selectedDate.date)), [selectedDate]);

    const onButtonHanlder = (item) => {
        setselectedView(item);
    }

    const renderSubHeading = () => {

        switch (selectedView) {
            case 'Day':
                return selectedDate.date + " " + MONTH_NAMES[selectedDate.month] + " " + selectedDate.year;
            case 'Week':
                return new Date(currentWeekDays[0]).getDate() + " " + MONTH_NAMES[new Date(currentWeekDays[0]).getMonth()] + " " + new Date(currentWeekDays[0]).getFullYear() + " to " + new Date(currentWeekDays[currentWeekDays.length - 1]).getDate() + " " + MONTH_NAMES[new Date(currentWeekDays[currentWeekDays.length - 1]).getMonth()] + " " + new Date(currentWeekDays[currentWeekDays.length - 1]).getFullYear()

            case 'Month':
                return MONTH_NAMES[selectedDate.month] + " " + selectedDate.year;
            case 'Year':
                return selectedDate.year;

            default:
                break;
        }

    }

    const renderGridHeaderView = () => {

        switch (selectedView) {
            case 'Day':
            case 'Week':
                return currentWeekDays.map((item, index) => {
                    return <WeekHeaderCard key={index} date={item.getDate()} month={MONTH_NAMES[item.getMonth()]} weekName={WEEK_NAMES[item.getDay()]} />
                })
            case 'Month':
                return WEEK_NAMES.map((item, index) => {
                    return <WeekHeaderCard key={index} weekName={item} />
                })
            case 'Year':

            default:
                break;
        }
    }

    const renderGridChildrenView = () => {

        switch (selectedView) {
            case 'Day':
                return timeSlot.map((item, index) => {
                    return <DayChildrenCard
                        key={index}
                        hour={item.hour - 1}
                        selectedDate={selectedDate}
                        eventData={eventData}
                    />
                })
            case "Week":
                return currentWeekDays.map((day) =>
                    timeSlot.map((slot, index) => (
                        <WeekChildrenCard
                            key={`${day.getDate()}-${index}`}
                            selectedDate={{
                                date: day.getDate(),
                                month: day.getMonth(),
                                year: day.getFullYear(),
                            }}
                            hour={slot.hour - 1}
                            eventData={eventData}
                        />
                    ))
                );
            case 'Month':
                return (
                    <MonthChildrenCard
                        totalDaysOfPreviousMonth={getLastDateOfPreviousMonth(selectedDate.year, selectedDate.month)}
                        previousMonthDays={getPreviousMonthDaysInCurrentMonthWeek(selectedDate.year, selectedDate.month, false)}
                        currentMonthDays={getTotalDaysInMonth(selectedDate.year, selectedDate.month)}
                        selectedDate={selectedDate}
                        eventData={eventData}
                    />
                );

            case 'Year':
                return (
                    <YearChildrenCard
                        selectedDate={selectedDate}
                        eventData={eventData}
                    />
                )

            default:
                break;
        }
    }

    const onLeftArrowHandler = () => {
        const currentDate = new Date(selectedDate.year, selectedDate.month, selectedDate.date);

        if (selectedView === 'Day') {
            currentDate.setDate(currentDate.getDate() - 1)
        } else if (selectedView === 'Week') {
            currentDate.setDate(currentDate.getDate() - 7)
        } else if (selectedView === 'Month') {
            currentDate.setMonth(currentDate.getMonth() - 1)
        }else if (selectedView === 'Year') {
            currentDate.setFullYear(currentDate.getFullYear() - 1)
        }

        setSelectedDate({
            date: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
        });
    };

    const onRightArrowHandler = () => {
        const currentDate = new Date(selectedDate.year, selectedDate.month, selectedDate.date);

        if (selectedView === 'Day') {
            currentDate.setDate(currentDate.getDate() + 1)
        } else if (selectedView === 'Week') {
            currentDate.setDate(currentDate.getDate() + 7)
        } else if (selectedView === 'Month') {
            currentDate.setMonth(currentDate.getMonth() + 1)
        }else if (selectedView === 'Year') {
            currentDate.setFullYear(currentDate.getFullYear() + 1)
        }

        setSelectedDate({
            date: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
        });
    };


    return <div className="home-container">

        <section className="header">

            <div className="arrows-holder">
                <svg onClick={onLeftArrowHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>


                <svg onClick={onRightArrowHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>

            <div className="sub-header">
                <p>{renderSubHeading()}</p>
            </div>


            <div className="buttons-container">
                {
                    VIEWS_ITEMS.map((item, index) => {
                        return <button key={index} className={`btn1 ${(selectedView === item) ? "active" : ''}`}
                            onClick={() => onButtonHanlder(item)}>{item}</button>
                    })
                }
            </div>
        </section>

        <section className="table-container">

            {
                (selectedView !== "Month") &&(selectedView !== "Year")&& <div className={`time-container ${selectedView.toLocaleLowerCase()}-time-container`}>
                    {
                        timeSlot.map((item, index) => {

                            if ((timeSlot.length - 1) === index) return;
                            return <TimeSlotContainer time={item.hour} meridian={item.meridian} />
                        })
                    }
                </div>
            }


            <div className={`grid-view ${selectedView.toLowerCase()}-grid`}>
                {
                    (selectedView !== 'Day') &&  (selectedView !== "Year") &&<div className="week-header-holder">
                        {renderGridHeaderView()}
                    </div>
                }

                <div className={`${selectedView.toLocaleLowerCase()}-children-holder`} >
                    {renderGridChildrenView()}
                </div>

            </div>

        </section>
    </div>

}