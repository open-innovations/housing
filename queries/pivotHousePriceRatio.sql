PIVOT (
  SELECT
    *
  FROM read_parquet(
    'data/house-prices/site/hp_to_wage_ratio.parquet'
  )
)
ON "date"
USING sum(value);
