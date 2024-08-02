export const layout = "template/areas.vto";
export const tags = ["area"];

const SMALL_SITE = Deno.env.get('SMALL_SITE') !== undefined;
var N_PAGES = Deno.env.get('N_PAGES');
// import { smallSiteAreas } from "../../../../dev.ts";
import smallSiteAreas from "../../../../dev.ts";

export default function* ({areas, headlines}) {
    if (SMALL_SITE === true) {
        if (!N_PAGES) {
            N_PAGES=10
        }
        areas = smallSiteAreas(areas, N_PAGES);
    }
    for (const [key, value] of Object.entries(areas)){
        yield {
            url: `/data/areas/${key}/`,
            title: value['name'],
            areacode: key,
            ...value,
            headlineTest: headlines(key),
            areas: null, // mask the areas data from other pages.
            key: null,
            value: null
            };
    }
}

