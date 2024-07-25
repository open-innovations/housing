SELECT "AreaCode", "Year", "AllVacants", "Dwellings", "HouseholdProjection", "LongTermVacants"
FROM read_csv("data/vacant-homes/absolute.csv",
    columns = {
        'AreaCode': 'VARCHAR',
        'Year': 'INTEGER',
        'AllVacants': 'DOUBLE',
        'Dwellings': 'DOUBLE',
        'HouseholdProjection': 'DOUBLE',
        'LongTermVacants': 'DOUBLE'
        },
    ignore_errors = true
    )
WHERE "AreaCode" == ?
AND "Year" <= ?;
