const { DateTime } = require('luxon');

export const isOnDay = (arrivalTimestamp: number, date: string): boolean => {
    const arrivalDate = DateTime.fromMillis(arrivalTimestamp * 1000, {
        zone: 'America/Edmonton',
    }).toISODate();
    return arrivalDate === date;
};
