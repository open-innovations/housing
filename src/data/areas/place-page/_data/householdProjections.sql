SELECT 
    *
FROM read_parquet("data/vacant-homes/absolute.parquet")
WHERE "geography_code" == ?;
-- AND "Year" <= (
--     SELECT 
--         MAX("Year") 
--     FROM 
--         read_parquet("data/vacant-homes/absolute.parquet")
-- );
