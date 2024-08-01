import areas from "./src/data/areas/place-page/_data/areas.json";

export default function smallSiteAreas(obj, n) {
    const result = {};
    const keys = Object.keys(obj).slice(0, n);
    
    keys.forEach((key) => {
        result[key] = obj[key];
    });
    return result;
}