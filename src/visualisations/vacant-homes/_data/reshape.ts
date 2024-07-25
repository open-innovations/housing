import { open } from "jsr:@divy/duckdb";

const db = open(":memory:");

const decoder = new TextDecoder("utf-8");
const sql = decoder.decode(await Deno.readFile("queries/vacant-homes/line-chart.sql"));

export default function (areacode) {
  const connection = db.connect();
  const prepared = connection.prepare(sql);
  const res = prepared.query(areacode);
  connection.close();
  return res;
}
