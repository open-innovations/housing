# Summary

A collection of open housing data processed into standardised format and presented visually using OI Lume Viz.

## Site Structure

### Data

Areas: housing data for individual administrative area of England. The smallest geography is local authority district and we include everything above that up to England level.

Hex maps: Local authority district based hex maps to compare different parts of England.

Explorations: More detailed analysis of specific topics from data on this site.

### Blog Posts

A collection of blog posts associated with this website.

### Tools

Various housing tools we have helped build over the years.

### Resources

External resources like this GitHub repository and datasets used.
 
## `pipelines`

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

## Contributing

We welcome contributions to, and suggestions for, this site. If there is something you want to add, clone the site, add the changes and make a pull request. If you have a suggestion for an exploration or dataset we should include, please contact <hello@open-innovations.org> or <luke.strange@open-innovations.org>
