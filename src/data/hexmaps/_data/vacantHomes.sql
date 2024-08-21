SELECT 
    AllVacants_pct, geography_code 
FROM 
    read_parquet("data/vacant-homes/site/percentages.parquet") 
WHERE 
    date == 2023 
AND 
    geography_code[0:3] IN ('E06', 'E07', 'E08', 'E09');