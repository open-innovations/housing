Data files are grouped by their topic / dataset e.g. Affordable homes.
Each topic contains two directories: `site` and `standard`.
In `standard`, data are stored in a standardised format. These always include the `geography_code`, `geography_name`, `date`, `Measure` and `value` columns. These files are used to generate metadata and for manually checking what is in the file, if needed.
In `site`, data are stored in `parquet` files in the correct shape they need to be in to power a visualisation. This is usally a wide (or pivoted) version of the `standard` files.
In some cases, for example a `headlines.csv` file, these arae in a unique format to drive a particular visualisation type, e.g. an OI Lume `dashboard`.

Any questions, suggestions, or improvements - let me know!