SELECT 
    *
FROM read_parquet("data/vacant-homes/absolute.parquet")
WHERE "AreaCode" == ?;
-- AND "Year" <= (
--     SELECT 
--         MAX("Year") 
--     FROM 
--         read_parquet("data/vacant-homes/absolute.parquet")
-- );
