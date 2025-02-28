export interface ConfigAgency {
    exclude?: string[];
    url?: string;
    path?: string;
    headers?: Record<string, string>;
    realtimeAlerts?: {
        url: string;
        headers?: Record<string, string>;
    };
    realtimeTripUpdates?: {
        url: string;
        headers?: Record<string, string>;
    };
    realtimeVehiclePositions?: {
        url: string;
        headers?: Record<string, string>;
    };
    prefix?: string;
}

export interface Config {
    // db?: Database;
    sqlitePath?: string;
    gtfsRealtimeExpirationSeconds?: number;
    downloadTimeout?: number;
    // csvOptions?: Options;
    exportPath?: string;
    ignoreDuplicates?: boolean;
    ignoreErrors?: boolean;
    // agencies: ConfigAgency[];
    verbose?: boolean;
    logFunction?: (message: string) => void;
}

export interface GtfsImportTask {
    url?: string;
    headers?: Record<string, string>;
    downloadDir: string;
    downloadTimeout?: number;
    path?: string;
    currentTimestamp: number;
    // log: (message: string, newLine?: boolean) => void;
    // logWarning: (message: string) => void;
    // logError: (message: string) => void;
}
