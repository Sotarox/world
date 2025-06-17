export const convertContinentCodeToName = (continentCode: string) => {
    switch (continentCode) {
        case "AF":
            return "Africa";
        case "AN":
            return "Antarctica";
        case "AS":
            return "Asia";
        case "EU":
            return "Europe";
        case "NA":
            return "North America";
        case "OC":
            return "Oceania";
        case "SA":
            return "South America";
        default:
            return "N/A";
    }
}

// Format a number with commas as thousands separators e.g. 1234567 -> 1,234,567
export const formatNumberWithComma = (num: number) => {
    const numStr = num.toString();
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatCoordinate = (coordinate: number[]) => {
    const [lat, lng] = coordinate;
    const latDirection = lat >= 0 ? 'N' : 'S';
    const lngDirection = lng >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(2)}° ${latDirection}, ${Math.abs(lng).toFixed(2)}° ${lngDirection}`;
}