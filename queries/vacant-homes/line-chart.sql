PIVOT (
    SELECT "AreaCode", "Measure", "Year", "Value"
    FROM read_csv(
        "data/vacant-homes/AllCombined_Cleaned_2024.csv",
        columns = {
            'AreaCode': 'VARCHAR',
            'AreaName': 'VARCHAR',
            'Measure': 'VARCHAR',
            'Year': 'INTEGER',
            'Value': 'DOUBLE'
            },
        ignore_errors = true
    )
    WHERE 
        "AreaCode" == ?::VARCHAR
)
ON "Measure" IN ('Dwellings', 'HouseholdProjection')
USING sum(value)
ORDER BY "Year" DESC;
