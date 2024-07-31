export const layout = "template/areas.vto";
export const tags = ["area"];

const SMALL_SITE = Deno.env.get('SMALL_SITE') !== undefined;
import { smallSiteAreas } from "../../../../dev.ts";

export default function* ({areas}) {
    if (SMALL_SITE === true) {
        areas = smallSiteAreas;
    }
    for (const [key, value] of Object.entries(areas)){
        yield {
            url: `/data/areas/${key}/`,
            title: value['name'],
            areacode: key,
            ...value,
            areas: null, // mask the areas data from other pages.
            key: null,
            value: null,
            test: null,
            };
    }
}

