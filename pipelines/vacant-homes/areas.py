import json
import requests
import pandas as pd
URL = "https://open-innovations.github.io/council-website-emissions/data/index.json"

def filter_to_dict(data, active_status, og_frame=pd.read_csv('housingengland/AllCombined_Cleaned_2024_update.csv')):
    codes = data['AreaCode']
    names = data['AreaName']
    my_dict = {}
    for code, name in zip(codes, names):
        last_published = og_frame[(og_frame["AreaCode"]==code) & (og_frame['Measure']=='Dwellings') & (og_frame['Value'].notna())]['Year'].max()
        my_dict.update({f"{code}": {'name': f'{name}', 'active': f'{active_status}', 'lastPublished': f'{last_published}'}})
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
    data = pd.read_csv('housingengland/AllCombined_Cleaned_2024_update.csv')
    active = data[(data['Year']==max(data['Year'])) & (data['Value'].notna()) & (data['Measure']=='Dwellings')]
    inactive = data[(data['Year']==max(data['Year'])) & (data['Value'].isna()) & (data['Measure']=='Dwellings')]
    
    active_dict = filter_to_dict(data=active, active_status='true')
    inactive_dict = filter_to_dict(data=inactive, active_status='false')

    combined_dict = {**active_dict, **inactive_dict}
    with open('src/visualisations/vacant-homes/_data/areas.json', 'w') as o_file:
        json.dump(combined_dict, o_file, indent=4)
    print(f'Successfully dumped JSON to {o_file.name}')    
        