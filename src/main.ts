import downloadScheduleData from './downloadScheduleData';
import { GtfsImportTask } from './task';

/**
 * Example usage
 */
async function main() {
    const testTask: GtfsImportTask = {
        url: 'https://gtfs.edmonton.ca/TMGTFSRealTimeWebService/GTFS/GTFS.zip',
        downloadDir: 'data/gtfs',
        currentTimestamp: Math.floor(Date.now() / 1000),
    };

    try {
        await downloadScheduleData(testTask);
    } catch (error) {
        console.error('Failed to download GTFS data:', error);
    }
}

main();
