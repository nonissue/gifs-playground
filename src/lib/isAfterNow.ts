const { DateTime } = require('luxon');

export const isAfterNow = (arrivalTimestamp: number): boolean => {
    const now = DateTime.now().setZone('Europe/Berlin').toMillis() / 1000;

    return arrivalTimestamp > now; // Check
};
