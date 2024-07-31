SELECT 
    *
FROM 
    read_csv("data/affordable-homes/by_tenure.csv")
WHERE 
    "geography_code" == ?
ORDER BY 
    "Year" DESC;