SELECT
  "date", "Median (£)"
FROM
  read_parquet("data/house-prices/median_house_prices.parquet")
WHERE
  "geography_code" == ?;