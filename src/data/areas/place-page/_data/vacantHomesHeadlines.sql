SELECT 
    *
FROM 
    read_parquet("data/vacant-homes/headlines.parquet")
WHERE 
    "geography_code" == ?;