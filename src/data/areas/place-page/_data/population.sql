SELECT 
    *
FROM 
    read_parquet("data/population/site/all_ages.parquet")
WHERE 
    "geography_code" == ?;