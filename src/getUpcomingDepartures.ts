const readCsv = require('gtfs-utils/read-csv');
const computeStopovers = require('gtfs-utils/compute-stopovers');
import { isAfterNow } from './lib/isAfterNow';
import { isOnDay } from './lib/isOnDay';

const debug = true;
/*
┌───────────────────────┬───────────────────────────────┐
│ function:             │ getUpcomingDepartures         │
├───────────────────────┴───────────────────────────────┤
│ params                                                │
├───────────────────────┬───────────────────────────────┤
│ stopId                │  string                       │
├───────────────────────┼───────────────────────────────┤
│ limit*                │  number                       │
└───────────────────────┴───────────────────────────────┘
    *: passing 0 to limit removes the limit altogether
*/
export const getUpcomingDepartures = async (stopId: string, limit: number = 5) => {
    if (!stopId) {
        throw new Error('stopId is required');
    }

    if (debug) {
        const initMessage = `\nFunction: getUpcomingDepartures\nParams:\nstopId: ${stopId}\t|\tlimit: ${limit}`;
        console.log(initMessage);
    }

    const readFile = (file: string) => {
        return readCsv(require.resolve(`../data/gtfs_sorted/${file}.txt`));
    };

    const stopovers = computeStopovers(readFile, 'America/Edmonton'); // Adjusted to America/Edmonton
    const upcomingStopovers: any[] = [];
    // let counter = 0;

    for await (const stopover of stopovers) {
        // counter = counter + 1;
        // console.log(counter);
        if (stopover.stop_id !== stopId) {
            continue; // Filter by stop_id
        }

        // console.log('stopId match! checking day...');

        // if (isOnDay(stopover.arrival, '2025-02-28')) {
        //     console.log('date is today!');
        // } else {
        //     continue;
        // }

        // if (isOnDay(stopover.arrival, '2025-02-28')) {
        //     console.log('YUP');
        //     upcomingStopovers.push(stopover);
        //     break;
        // }
        // if (isAfterNow(stopover.arrival) && isOnDay(stopover.start_of_trip, '2025-02-28')) {
        // console.log('stopId match!');

        // Check if the stopover is after the current time

        // if (isOnDay(stopover.arrival, '2025-02-28')) {
        // if (isAfterNow(stopover.arrival)) {
        //     upcomingStopovers.push(stopover);
        // }

        // if (isAfterNow(stopover.arrival)) {
        //     console.log('is after current time!');
        //     upcomingStopovers.push(stopover);
        // }

        if (limit && upcomingStopovers.length >= limit) {
            break;
        } else {
            console.log('no limit!');
        }
        // Stop collecting once the limit is reached
    }

    // Sort the upcoming stopovers by arrival time (ascending)
    // upcomingStopovers.sort((a, b) => a.arrival - b.arrival);

    return upcomingStopovers;
};

(async () => {
    const res = await getUpcomingDepartures('2113', 0);
    console.log(res);
})();
