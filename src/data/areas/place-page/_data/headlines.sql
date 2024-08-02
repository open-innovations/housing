SELECT 
    "AreaCode", "title", "value", "footnote"
FROM 
    read_parquet("data/vacant-homes/headlines.parquet")
WHERE 
    "AreaCode" == ?;