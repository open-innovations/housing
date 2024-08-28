import { assertEquals } from "jsr:@std/assert";
import { duckDbLoader } from "jsr:@dringtech/lume-duck@0.2.0";

Deno.test('nulls should be returned for householdProjections', async () => {
    const loader = duckDbLoader();
    const dataItem = await loader('src/data/areas/place-page/_data/householdProjections.sql');
    console.log(`${dataItem}`);
    let res = dataItem('E06000028').find(x => x.date === 2023)!;
    console.log(res);
    assertEquals(res.HouseholdProjection, 86936);
    assertEquals(res.AllVacants, null);
    assertEquals(res.Dwellings, null);
    assertEquals(res.LongTermVacants, null);

    res = dataItem('E06000028').find(x => x.date === 2023)!;
    console.log(res);
    assertEquals(res.HouseholdProjection, 86936);
    assertEquals(res.AllVacants, null);
    assertEquals(res.Dwellings, null);
    assertEquals(res.LongTermVacants, null);
})

Deno.test('nulls should be returned for householdProjections', async () => {
    const loader = duckDbLoader();
    const dataItem = await loader('src/data/hexmaps/_data/housepriceratio.sql');
    console.log(`${dataItem}`);
    let res = dataItem();
    assertEquals(res.find(x => x.geography_code === 'E09000001')!.value, null);
    assertEquals(res.find(x => x.geography_code === 'E06000053')!.value, null);

    res = dataItem();
    assertEquals(res.find(x => x.geography_code === 'E09000001')!.value, null);
    assertEquals(res.find(x => x.geography_code === 'E06000053')!.value, null);
})
