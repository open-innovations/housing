import json
# import requests
import pandas as pd
import numpy as np
# URL = "https://open-innovations.github.io/council-website-emissions/data/index.json"

def filter_to_dict(data):
    latest_year = data.Year.max()
    print(latest_year)
    my_dict = data.loc[(data['Measure']=='Dwellings') & (data['Value'].notna())]
    latest_years = my_dict.groupby(['AreaCode']).Year.max()
    print(latest_years)
    # for code in data.AreaCode[data.AreaCode.notna()].unique():
    #     # if row.AreaCode:
    #     #     # print(row.AreaCode)
    #     code_data = data.loc[(data["AreaCode"]==code) & (data['Measure']=='Dwellings') & (data['Value'].notna())]
    #     code_name = code_data.AreaName.unique()
    #     max_year_code_data = code_data.Year.astype(np.int32).max()
    #     if max_year_code_data == latest_year:
    #         active_status = 'true'
    #     else:
    #         active_status = 'false'    
    #     my_dict.update({f"{code}": {'name': f'{code_name}', 'active': f'{active_status}', 'lastPublished': str(max_year_code_data)}})
    
    return my_dict

if __name__ == '__main__':
    # r = requests.get(URL)
    # # Check if the request was successful
    # if r.status_code == 200:
    #     print('Request was sucessful')
    #     raw = r.json() # Parse as JSON
    #     clean = {} # Set an empty dict for the clean data

    #     for key, value in raw['orgs'].items():
    #         if key.startswith('E'):
    #             value.pop('urls', None) # Remove the URL key-value pair as we don't use it
    #             # value['name'] = value['name'].replace("\b[cC]ouncil", '')
    #             clean[key] = value # Append the data to the clean dict

    #     # Write to file
    #     with open('raw/areas.json', 'w') as o_file:
    #         json.dump(clean, o_file, indent=4)
    #         print(f'Successfully dumped the contents to "{o_file.name}"')
    data = pd.read_csv('data/vacant-homes/AllCombined_Cleaned_2024_update.csv')

    combined_dict = data.pipe(filter_to_dict)
    
    with open('src/visualisations/vacant-homes/_data/areas.json', 'w') as o_file:
        json.dump(combined_dict, o_file, indent=4)

    print(f'Successfully dumped JSON to {o_file.name}')    
        