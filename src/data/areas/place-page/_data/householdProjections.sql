SELECT 
    *
FROM read_parquet("data/vacant-homes/site/absolute.parquet")
WHERE "geography_code" == ?;

