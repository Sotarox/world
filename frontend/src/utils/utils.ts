export const continentCodeToName = (continentCode: string) => {
    switch (continentCode) {
        case "AF":
            return "Africa";
        case "AN":
            return "Antarctica";
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