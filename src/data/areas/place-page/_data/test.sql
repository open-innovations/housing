SELECT 
    *
FROM 
    read_csv("data/affordable-homes/by_tenure_local_authority.csv")
WHERE 
    "LA code 202223" == ?
ORDER BY 
    "Year" desc;