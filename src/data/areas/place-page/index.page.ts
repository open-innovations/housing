export const layout = "template/areas.vto";
export const tags = ["area"];

const SMALL_SITE = Deno.env.get('SMALL_SITE') !== undefined;
const N_PAGES = parseInt(Deno.env.get('N_PAGES') || '10');

import { smallSiteAreas } from "../../../../dev.ts";

export default function* ({areas, vacantHomesHeadlines, affordableHomes, medianHousePrice, pctVacantHomes, householdProjections, population, properties, additionalDwellings}) {
    if (SMALL_SITE === true) {
        areas = smallSiteAreas(areas, N_PAGES);
    }
    for (const [key, value] of Object.entries(areas)){
        yield {
            url: `/data/areas/${key}/`,
            title: value['content']['nm'],
            areacode: key,
            ...value['content'],
            vhHeadline: vacantHomesHeadlines(key),
            affordableHomes: affordableHomes(key),
            medianHousePrice: medianHousePrice(key),
            pctVacantHomes: pctVacantHomes(key),
            pop: population(key),
            n_of_properties: properties(key),
            additionalDwellings: additionalDwellings(key),
            householdProjections: householdProjections(key),
            areas: null, // mask the areas data from other pages.
            key: null,
            value: null
            };
    }
}

