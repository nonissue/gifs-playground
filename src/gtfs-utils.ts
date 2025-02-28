'use strict';

const { async: AsyncZipArchive } = require('node-stream-zip'); // node-stream-zip@1
const { PassThrough, pipeline } = require('stream');
const readCsv = require('gtfs-utils/read-csv');
const computeStopovers = require('gtfs-utils/compute-stopovers');

// const ZIP_PATH = require.resolve('sample-gtfs-feed/gtfs.zip')
const ZIP_PATH = require.resolve('/Users/apw/code/gtfs-playground/data/gtfs/gtfs.zip');

interface ZipEntry {
    name: string; // The name of the file or directory inside the archive
    size: number; // The size of the file (if it's a file, not a directory)
    isDirectory: boolean; // Whether the entry is a directory or a file
}

(async () => {
    const zip = new AsyncZipArchive({ file: ZIP_PATH });

    console.log(zip);

    // const entries: Record<string, ZipEntry> = await zip.entries();

    // for (const entry of Object.values(entries)) {
    //     const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
    //     console.log(`Entry ${entry.name}: ${desc}`);
    // }

    const readFile = (name: any) => {
        console.log('Name param: ' + name);
        // todo [breaking]: make readFile async, simplify here
        const stream = new PassThrough({ highWaterMark: 0 });

        zip.stream(name + '.txt')
            .then((file: any) => {
                console.log(file);
                return new Promise<void>((resolve, reject) => {
                    pipeline(file, stream, (err: Error) => {
                        if (err) {
                            console.log('ERROR IN PIPELINE');
                            reject(err);
                        } else resolve();
                    });
                });
            })
            .catch((err: Error) => {
                console.log('ERROR');
                console.log(err);
                stream.destroy(err);
            });

        return readCsv(stream);
    };

    const stopovers = computeStopovers(readFile, 'America/Edmonton');

    for await (const stopover of stopovers) console.log(stopover);

    await zip.close(); // We're done reading data, close .zip archive.
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
