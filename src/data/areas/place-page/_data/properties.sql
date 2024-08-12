SELECT 
    * 
FROM 
    read_parquet('data/properties/site/all_properties.parquet')
WHERE 
    "geography_code" ==?;