const readCsv = require('gtfs-utils/read-csv');
const computeStopovers = require('gtfs-utils/compute-stopovers');
// Accepts a stop id as a param, computes N next upcoming stopovers at X stop

const getUpcomingDepartures = async (stop_id: string, limit: number = 5) => {
    if (!stop_id) {
        throw new Error('stop_id is required');
    }

    const readFile = (file: any) => {
        return readCsv(require.resolve('../data/gtfs_sorted/' + file + '.txt'));
    };

    // process.exit(1);
    const stopovers = computeStopovers(readFile, 'America/Edmonton', {
        stopTime: (s: any) => {
            if (s.stop_id === stop_id) {
                // console.log(s);
                console.log(Object.keys(s));
                console.log(s.departure_time);
                return s;
            }
        },
    });

    for await (const stopover of stopovers) {
        console.log(stopover);
    }
};
