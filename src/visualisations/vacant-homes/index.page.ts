export const layout = "template/vacanthomes.vto";
export const tags = ["area"];

export default function* ({areas}) {
    for (const [key, value] of Object.entries(areas.orgs)){
        yield {
            url: `/visualisations/vacant-homes/${key}/`,
            title: value['name'],
            ...value,
            areas: null, // mask the areas data from other pages.
            };
    }
}

