SELECT "AreaCode", "AreaName", "Year", "LongTermVacants_pct", "AllVacants_pct"
FROM read_csv("data/vacant-homes/percentages.csv",
    columns = {
        'AreaCode': 'VARCHAR',
        'AreaName': 'VARCHAR',
        'Year': 'INTEGER',
        'LongTermVacants_pct': 'DOUBLE',
        'AllVacants_pct': 'DOUBLE'
        },
    ignore_errors = true
    )
WHERE "AreaName" IN (?, 'England')
AND "Year" == ?;