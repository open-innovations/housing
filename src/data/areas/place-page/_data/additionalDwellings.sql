SELECT 
    *
FROM 
    read_parquet("data/additional-dwellings/parquet/by_local_authority.parquet")
WHERE 
    "geography_code" == ?
ORDER BY 
    "date" ASC;