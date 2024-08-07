SELECT 
    *
FROM 
    read_parquet("data/affordable-homes/site/by_tenure.parquet")
WHERE 
    "geography_code" == ?
ORDER BY 
    "date" DESC;