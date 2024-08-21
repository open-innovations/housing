SELECT 
    geography_code, value
FROM 
    read_parquet("data/house-prices/site/hp_to_wage_ratio.parquet") 
WHERE 
    date == 2023 
AND 
    geography_code[0:3] IN ('E06', 'E07', 'E08', 'E09');