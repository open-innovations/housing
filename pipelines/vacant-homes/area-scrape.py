import json
import requests

URL = "https://open-innovations.github.io/council-website-emissions/data/index.json"

if __name__ == '__main__':
    r = requests.get(URL)
    # Check if the request was successful
    if r.status_code == 200:
        print('Request was sucessful')
        raw = r.json() # Parse as JSON
        clean = {} # Set an empty dict for the clean data

        for key, value in raw['orgs'].items():
            value.pop('urls', None) # Remove the URL key-value pair as we don't use it
            clean[key] = value # Append the data to the clean dict
        
        # Write to file
        with open('src/visualisations/vacant-homes/_data/areas.json', 'w') as o_file:
            json.dump(clean, o_file, indent=4)
            print(f'Successfully dumped the contents to "{o_file.name}"')
