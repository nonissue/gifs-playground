import { Config, GtfsImportTask } from './types';
import downloadScheduleData from './downloadScheduleData';
import { getConfig } from './lib/config';

async function attemptDownload() {
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

async function readConfigFile() {
    const config: Config = await getConfig();
    console.log(config);
}

async function main() {
    await attemptDownload();
    await readConfigFile();
}

main();
