export function minutesToHumanTime(totalMinutes: number) {
    if (totalMinutes === 0) {
        return '0 minutes';
    }

    function withPlurality(quantity: number, unit: string) {
        const singular = quantity % 100 !== 11 && Math.floor(quantity % 10) === 1;
        return singular ? unit : unit + 's';
    }

    function optionallyAppend(quantity: number, unit: string) {
        let result = '';
        if (quantity > 0) {
            result += quantity + withPlurality(quantity, ' ' + unit);
            result += ' ';
        }
        return result;
    }

    let time = '';
    const hours = Math.floor(totalMinutes / 60);
    time += optionallyAppend(hours, 'hour');

    const minutes = totalMinutes % 60;
    time += optionallyAppend(minutes, 'minute');

    return time.trim();
}