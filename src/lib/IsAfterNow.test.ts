import { isAfterNow } from './isAfterNow'; // Adjust to your file path
const { DateTime } = require('luxon');

// Mock DateTime.now() to return a fixed time for tests
jest.mock('luxon', () => {
    const originalModule = jest.requireActual('luxon');
    return {
        ...originalModule,
        DateTime: {
            ...originalModule.DateTime,
            now: jest.fn(() =>
                // this was set to 12:00:00 PM aka noon but it was confusing so im setting it to 00:00 aka midnight
                originalModule.DateTime.fromISO('2025-02-28T00:00:00', { zone: 'America/Edmonton' })
            ),
            fromMillis: jest.fn((milliseconds: number) =>
                originalModule.DateTime.fromMillis(milliseconds, { zone: 'America/Edmonton' })
            ),
        },
    };
});

describe('isAfterNow', () => {
    it('should return true if the timestamp is after the current time', () => {
        const futureTimestamp = DateTime.now().plus({ minutes: 10 }).toMillis() / 1000; // 10 minutes after current time

        expect(isAfterNow(futureTimestamp)).toBe(true);
    });

    it('should return false if the timestamp is exactly the same as the current time', () => {
        const currentTimestamp = DateTime.now().toMillis() / 1000; // Exactly the current time
        expect(isAfterNow(currentTimestamp)).toBe(false);
    });

    it('should return false if the timestamp is before the current time', () => {
        const pastTimestamp = DateTime.now().minus({ minutes: 10 }).toMillis() / 1000; // 10 minutes before current time
        expect(isAfterNow(pastTimestamp)).toBe(false);
    });

    it('should return false if the timestamp time is later than the current time but from a day in the past', () => {
        const pastTimestamp = DateTime.now().minus({ hours: 23 }).toMillis() / 1000;

        expect(isAfterNow(pastTimestamp)).toBe(false);
    });
});
