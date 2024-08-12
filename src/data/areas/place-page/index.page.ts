export const layout = "template/areas.vto";
export const tags = ["area"];

const SMALL_SITE = Deno.env.get('SMALL_SITE') !== undefined;
var N_PAGES = Deno.env.get('N_PAGES');
// import { smallSiteAreas } from "../../../../dev.ts";
import smallSiteAreas from "../../../../dev.ts";

export default function* ({areas, vacantHomesHeadlines, affordableHomes, medianHousePrice, pctVacantHomes, householdProjections, population, properties}) {
    if (SMALL_SITE === true) {
        if (!N_PAGES) {
            N_PAGES=10
        }
        areas = smallSiteAreas(areas, N_PAGES);
    }
    for (const [key, value] of Object.entries(areas)){
        // Kludge fixing duckDB converting nulls to 0.
        var hp = householdProjections(key);
        for(let i = 0; i < hp.length; i++){
            for(const col of ['AllVacants', 'LongTermVacants', 'Dwellings', 'HouseholdProjection']){
                if(hp[i][col]==0){
                    hp[i][col] = null;
                }
            }
        }
        yield {
            url: `/data/areas/${key}/`,
            title: value['geography_name'],
            areacode: key,
            ...value,
            vhHeadline: vacantHomesHeadlines(key),
            affordableHomes: affordableHomes(key),
            medianHousePrice: medianHousePrice(key),
            pctVacantHomes: pctVacantHomes(key),
            pop: population(key),
            n_of_properties: properties(key),
            householdProjections: hp,
            areas: null, // mask the areas data from other pages.
            key: null,
            value: null
            };
    }
}

