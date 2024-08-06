SELECT *
FROM read_parquet("data/vacant-homes/percentages.parquet")
WHERE "geography_code" == ?;