import path from 'node:path';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function getConfig(): Promise<Record<string, any>> {
    let config;
    let data;

    try {
        if (existsSync(path.resolve('./config.json'))) {
            console.log('Found config.json, reading');
            data = await readFile(path.resolve('./config.json'), 'utf8');
            config = Object.assign(JSON.parse(data));

            // log(config)('Using configuration from ./config.json');
        } else {
            throw new Error(
                'Cannot find configuration file. Use config-sample.json as a starting point, pass --configPath option.'
            );
        }

        return config;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(
                `Cannot parse configuration file. Check to ensure that it is valid JSON. Error: ${error.message}`
            );
        }
        throw error;
    }
}
