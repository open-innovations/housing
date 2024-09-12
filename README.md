# Summary

A collection of open housing data processed into standardised format and presented visually using OI Lume Viz.

## Serving the site locally

Ensure you have a working version of `deno` AND `duckDB` installed. Then you can run `deno task serve` for the full site, `deno task dev` for a smaller version for development purposes. Additionally, you can specify `N_PAGES` (e.g. `deno task dev N_PAGES=50`) for a specific number of `area` pages to be built.

## `pipelines`

### Running code

To run code in the pipelines directory, set-up your local environment using `pipenv sync`. You will need to install `pipenv` globally using `pip install pipenv`, if you haven't already. You can then run the jupyter notebooks using the kernel created by the pipenv environment with the required packages.

### Orchestration

Pipelines are split by dataset. Each pipeline is split into stages:

`extract` - get a copy of the data from the source.

`transform` - responsible for validating, sanitising and transforming the data produced from the `extract` stage.

* Note that pipelines haven't been automated because most housing data is released annually, so it is simpler to manually update once a year.

You can read more about how we build reproducible pipelines on the [Open Innovations platform website](https://open-innovations.github.io/platform/components/pipelines/).

## `metadata`

Various lookup tables and metadat on UK geographies to help generate the site. These are taken from [ONS Geoportal](https://geoportal.statistics.gov.uk/), or hand-curated.

## `data`

Split by dataset/topic. Each sub-folder contains a `site` and `standard` directory.

`standard` data are stored in a standardised format. These always include the `geography_code`, `geography_name`, `date`, `Measure` and `value` columns.

`site` data are stored in `parquet` files in the correct shape they need to be in to power a visualisation. This is usually a wide (pivoted) version of the `standard` files. In the case where there is only one "Measure", this is equivalent to the long-format table with the "value" column renamed with the name of the measure.

In some cases, for example a `headlines.csv` file, these are in a unique format to drive a particular visualisation type, e.g. an OI Lume `dashboard`.

The logic behind including both CSV and parquet files was two-fold: parquet files are used on the site to reduce build-tim, and CSV files are included for accessibility - not everyone has a way to load and view the contents of a parquet file.

## `src`

The folder containing the website itself.

## `raw`

All raw data files extracted into this directory. The structure is maintained using empty `.gitkeep` files but no actual raw data files are checked into the repo as we don't need them to build the site, and we don't want to make unnecessary copies.

## Contributing

We welcome contributions to, and suggestions for, this site. If there is something you want to add, clone the site, add the changes and make a pull request. If you have a suggestion for an exploration or dataset we should include, please contact <hello@open-innovations.org> or <luke.strange@open-innovations.org>
