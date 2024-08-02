SELECT 
    *
FROM 
    read_parquet("data/affordable-homes/by_tenure.parquet")
WHERE 
    "geography_code" == ?
ORDER BY 
    "Year" DESC;