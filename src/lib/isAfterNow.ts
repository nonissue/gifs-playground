const { DateTime } = require('luxon');

export const isAfterNow = (arrivalTimestamp: number): boolean => {
    const now = DateTime.now().setZone('America/Edmonton');
    const arrivalTime = DateTime.fromMillis(arrivalTimestamp * 1000, { zone: 'America/Edmonton' });
    return arrivalTime > now; // Check
};
