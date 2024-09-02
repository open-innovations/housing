PIVOT (
    SELECT 
        AllVacants_pct, geography_code, date
    FROM 
        read_parquet("data/vacant-homes/site/percentages.parquet") 
    WHERE
        geography_code[0:3] IN ('E06', 'E07', 'E08', 'E09')
)
ON date
USING sum("AllVacants_pct");