SELECT "AreaCode", "Year", "LongTermVacants_pct", "AllVacants_pct"
FROM read_csv("data/vacant-homes/percentages.csv",
    columns = {
        'AreaCode': 'VARCHAR',
        'Year': 'INTEGER',
        'LongTermVacants_pct': 'DOUBLE',
        'AllVacants_pct': 'DOUBLE'
        },
    ignore_errors = true
    )
WHERE "AreaCode" == ?;