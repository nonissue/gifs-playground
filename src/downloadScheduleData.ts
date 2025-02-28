import { cp, readdir, rename, readFile, rm, writeFile } from 'node:fs/promises';
import { GtfsImportTask } from './task';

const downloadScheduleData = async (task: GtfsImportTask): Promise<void> => {
    if (!task.url) {
        throw new Error('No `url` specified in config');
    }

    // task.log(`Downloading GTFS from ${task.url}`);

    task.path = `${task.downloadDir}/gtfs.zip`;

    const response = await fetch(task.url, {
        method: 'GET',
        headers: task.headers || {},
        signal: task.downloadTimeout ? AbortSignal.timeout(task.downloadTimeout) : undefined,
    });

    if (response.status !== 200) {
        throw new Error(`Unable to download GTFS from ${task.url}. Got status ${response.status}.`);
    }

    const buffer = await response.arrayBuffer();

    await writeFile(task.path, Buffer.from(buffer));
    // task.log('Download successful');
};

export default downloadScheduleData;
