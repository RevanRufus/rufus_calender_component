export const getCurrentWeekDays = (currentDate) => {
    const dayOfWeek = currentDate.getDay(); 

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - dayOfWeek);

    const weekdays = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        weekdays.push(date); 
    }

    return weekdays;
}

export const getTotalDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
}

export const getPreviousMonthDaysInCurrentMonthWeek = (year, month, weekStartsOnMonday = false) => {
    const firstDayOfCurrentMonth = new Date(year, month, 1);
    let dayOfWeek = firstDayOfCurrentMonth.getDay();

    if (weekStartsOnMonday) {
        dayOfWeek = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
    }
    if (dayOfWeek === 0) return 0;
    return dayOfWeek;
}

export const getLastDateOfPreviousMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
}

export const getHourlyTimeValuesWithMeridian = () => {
    const times = [];
    const meridians = ['AM', 'PM'];

    for (let meridian of meridians) {
        for (let hour = 1; hour <= 12; hour++) {
            let formattedHour = hour;
            if (hour === 12) meridian = "PM";
            if (meridian === 'PM' && hour !== 12) {
                formattedHour += 12; 
            }
            times.push({ hour: formattedHour, meridian });
        }
    }

    return times;
}

export const subtractOneDay = (currentDate) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
}

export const addOneDay = (currentDate) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
}