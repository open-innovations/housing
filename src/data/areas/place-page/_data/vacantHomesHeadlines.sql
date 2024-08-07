SELECT 
    *
FROM 
    read_parquet("data/vacant-homes/site/headlines.parquet")
WHERE 
    "geography_code" == ?;