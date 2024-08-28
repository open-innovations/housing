import areas from "./src/data/areas/place-page/_data/areas.json";

export function smallSiteAreas(obj, n) {
    const result = {};
    const keys = [
        ...Object.keys(obj).slice(0, n),
        // Add in some areas of interest
        'E06000028',
    ];
    
    keys.forEach((key) => {
        result[key] = obj[key];
    });
    return result;
}