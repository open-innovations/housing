SELECT
  "date", "Median (£)"
FROM
  read_csv("data/house-prices/median_house_prices.csv")
WHERE
  "geography_code" == ?;