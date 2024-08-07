SELECT
  "date", "Median"
FROM
  read_parquet("data/house-prices/site/median_house_prices.parquet")
WHERE
  "geography_code" == ?;