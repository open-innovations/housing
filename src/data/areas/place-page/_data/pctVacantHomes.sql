SELECT *
FROM read_parquet("data/vacant-homes/site/percentages.parquet")
WHERE "geography_code" == ?;