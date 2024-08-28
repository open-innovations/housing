---
title: Housing affordability
section: data
colour: c7-bg
desc: Top 5 most and least affordable places to live in England
---
We want to explore which local authorities are the most/least expensive to buy homes in, relative to wages. For this, we wll use the median house price to residence based earning ratio.


```python
from pathlib import Path
import pandas as pd
ROOT = Path("../").resolve()
```


```python
# Load the house price to wage ratio data
d = pd.read_parquet(ROOT/"data/house-prices/site/hp_to_wage_ratio.parquet")

# Load the geocodes
codes = pd.read_csv(ROOT / "metadata/lookups/Local_Authority_Districts_(April_2023)_Names_and_Codes_in_the_United_Kingdom.csv", usecols=['LAD23NM', 'LAD23CD'])
codes.rename(columns={'LAD23CD': 'geography_code'}, inplace=True)

# Load the house prices data
hp = pd.read_parquet(ROOT / "data/house-prices/site/median_house_prices.parquet")
hp.reset_index(inplace=True)
# Filter so we only have one date per year. We'll choose the latest which is march.
hp = hp[hp['date'].str.contains('Mar')]
# Get tht year only
hp['date'] = hp['date'].apply(lambda s: s[-4::])

# Merge the dataframes
d = d.merge(codes, on='geography_code').merge(hp, on=['geography_code', 'date']).set_index('geography_code')
d
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>date</th>
      <th>value</th>
      <th>LAD23NM</th>
      <th>geography_name</th>
      <th>Median</th>
    </tr>
    <tr>
      <th>geography_code</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>E06000001</th>
      <td>2002</td>
      <td>2.86</td>
      <td>Hartlepool</td>
      <td>Hartlepool</td>
      <td>48997.5</td>
    </tr>
    <tr>
      <th>E06000002</th>
      <td>2002</td>
      <td>2.83</td>
      <td>Middlesbrough</td>
      <td>Middlesbrough</td>
      <td>46000.0</td>
    </tr>
    <tr>
      <th>E06000003</th>
      <td>2002</td>
      <td>2.83</td>
      <td>Redcar and Cleveland</td>
      <td>Redcar and Cleveland</td>
      <td>53150.0</td>
    </tr>
    <tr>
      <th>E06000004</th>
      <td>2002</td>
      <td>3.33</td>
      <td>Stockton-on-Tees</td>
      <td>Stockton-on-Tees</td>
      <td>60000.0</td>
    </tr>
    <tr>
      <th>E06000005</th>
      <td>2002</td>
      <td>3.42</td>
      <td>Darlington</td>
      <td>Darlington</td>
      <td>56500.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>W06000020</th>
      <td>2023</td>
      <td>5.84</td>
      <td>Torfaen</td>
      <td>Torfaen</td>
      <td>180000.0</td>
    </tr>
    <tr>
      <th>W06000021</th>
      <td>2023</td>
      <td>8.99</td>
      <td>Monmouthshire</td>
      <td>Monmouthshire</td>
      <td>320000.0</td>
    </tr>
    <tr>
      <th>W06000022</th>
      <td>2023</td>
      <td>6.64</td>
      <td>Newport</td>
      <td>Newport</td>
      <td>215000.0</td>
    </tr>
    <tr>
      <th>W06000023</th>
      <td>2023</td>
      <td>7.17</td>
      <td>Powys</td>
      <td>Powys</td>
      <td>242997.5</td>
    </tr>
    <tr>
      <th>W06000024</th>
      <td>2023</td>
      <td>4.55</td>
      <td>Merthyr Tydfil</td>
      <td>Merthyr Tydfil</td>
      <td>135000.0</td>
    </tr>
  </tbody>
</table>
<p>6908 rows × 5 columns</p>
</div>



Let's look at the most recent year's data, which is for 2023. We'll also drop any places that don't have data for 2023.


```python
d = d[d.date == '2023']
d = d.dropna()
least_affordable = d.sort_values(by='value', ascending=False).head(5)
least_affordable
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>date</th>
      <th>value</th>
      <th>LAD23NM</th>
      <th>geography_name</th>
      <th>Median</th>
    </tr>
    <tr>
      <th>geography_code</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>E09000020</th>
      <td>2023</td>
      <td>25.36</td>
      <td>Kensington and Chelsea</td>
      <td>Kensington and Chelsea</td>
      <td>1357500.0</td>
    </tr>
    <tr>
      <th>E09000033</th>
      <td>2023</td>
      <td>19.11</td>
      <td>Westminster</td>
      <td>Westminster</td>
      <td>965000.0</td>
    </tr>
    <tr>
      <th>E09000007</th>
      <td>2023</td>
      <td>17.12</td>
      <td>Camden</td>
      <td>Camden</td>
      <td>770000.0</td>
    </tr>
    <tr>
      <th>E09000013</th>
      <td>2023</td>
      <td>17.03</td>
      <td>Hammersmith and Fulham</td>
      <td>Hammersmith and Fulham</td>
      <td>770000.0</td>
    </tr>
    <tr>
      <th>E09000005</th>
      <td>2023</td>
      <td>15.30</td>
      <td>Brent</td>
      <td>Brent</td>
      <td>565000.0</td>
    </tr>
  </tbody>
</table>
</div>



Unsurprisingly, they are all Boroughs of London. We'll do the same thing but ignore London Boroughs (E09 codes).


```python
d = d[~d.index.str.startswith('E09')]
least_affordable_not_london = d.sort_values(by='value', ascending=False).head(5)
least_affordable_not_london
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>date</th>
      <th>value</th>
      <th>LAD23NM</th>
      <th>geography_name</th>
      <th>Median</th>
    </tr>
    <tr>
      <th>geography_code</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>E07000210</th>
      <td>2023</td>
      <td>14.70</td>
      <td>Mole Valley</td>
      <td>Mole Valley</td>
      <td>580000.0</td>
    </tr>
    <tr>
      <th>E07000098</th>
      <td>2023</td>
      <td>14.57</td>
      <td>Hertsmere</td>
      <td>Hertsmere</td>
      <td>565000.0</td>
    </tr>
    <tr>
      <th>E07000102</th>
      <td>2023</td>
      <td>14.21</td>
      <td>Three Rivers</td>
      <td>Three Rivers</td>
      <td>580000.0</td>
    </tr>
    <tr>
      <th>E07000240</th>
      <td>2023</td>
      <td>13.43</td>
      <td>St Albans</td>
      <td>St Albans</td>
      <td>633500.0</td>
    </tr>
    <tr>
      <th>E07000207</th>
      <td>2023</td>
      <td>13.36</td>
      <td>Elmbridge</td>
      <td>Elmbridge</td>
      <td>665000.0</td>
    </tr>
  </tbody>
</table>
</div>



Finally, where are the 5 most affordable (lowest house price to earnings ratio) places?


```python
most_affordable = d.sort_values(by='value', ascending=False).tail(5)
most_affordable
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>date</th>
      <th>value</th>
      <th>LAD23NM</th>
      <th>geography_name</th>
      <th>Median</th>
    </tr>
    <tr>
      <th>geography_code</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>E06000008</th>
      <td>2023</td>
      <td>4.28</td>
      <td>Blackburn with Darwen</td>
      <td>Blackburn with Darwen</td>
      <td>137000.0</td>
    </tr>
    <tr>
      <th>E06000001</th>
      <td>2023</td>
      <td>4.16</td>
      <td>Hartlepool</td>
      <td>Hartlepool</td>
      <td>130000.0</td>
    </tr>
    <tr>
      <th>E06000047</th>
      <td>2023</td>
      <td>4.00</td>
      <td>County Durham</td>
      <td>County Durham</td>
      <td>125000.0</td>
    </tr>
    <tr>
      <th>E07000120</th>
      <td>2023</td>
      <td>3.92</td>
      <td>Hyndburn</td>
      <td>Hyndburn</td>
      <td>127000.0</td>
    </tr>
    <tr>
      <th>E07000117</th>
      <td>2023</td>
      <td>3.39</td>
      <td>Burnley</td>
      <td>Burnley</td>
      <td>116000.0</td>
    </tr>
  </tbody>
</table>
</div>


