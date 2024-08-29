SELECT 
    *
FROM 
    read_parquet("data/misc/vh_hp_ratio_by_local_authority.parquet")
WHERE 
    date == ?;