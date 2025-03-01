const { DateTime } = require('luxon');

// Function you want to test
const isOnDate = (arrivalTimestamp: number, date: string): boolean => {
    const arrivalDate = DateTime.fromMillis(arrivalTimestamp * 1000, {
        zone: 'Europe/Berlin',
    }).toISODate();
    return arrivalDate === date;
};

// Unit tests
describe('isOnDate', () => {
    it('should return true for a timestamp on the specified date', () => {
        const timestamp = 1740744900; // 2025-02-28 in Unix seconds
        const date = '2025-02-28';
        expect(isOnDate(timestamp, date)).toBe(true);
    });

    it('should return false for a timestamp not on the specified date', () => {
        const timestamp = 1740744900; // 2025-02-28 in Unix seconds
        const date = '2025-02-27';
        expect(isOnDate(timestamp, date)).toBe(false);
    });

    it('should return false for a timestamp on a different year', () => {
        const timestamp = 1740744900; // 2025-02-28 in Unix seconds
        const date = '2024-02-28'; // different year
        expect(isOnDate(timestamp, date)).toBe(false);
    });
});
