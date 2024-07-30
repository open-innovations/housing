export const layout = "template/areas.vto";
export const tags = ["area"];

export default function* ({areas}) {
    for (const [key, value] of Object.entries(areas)){
        yield {
            url: `/data/areas/${key}/`,
            title: value['name'],
            areacode: key,
            ...value,
            areas: null, // mask the areas data from other pages.
            key: null,
            value: null,
            };
    }
}

