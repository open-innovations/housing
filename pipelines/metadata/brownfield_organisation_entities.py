from pathlib import Path
import pandas as pd
import requests


ROOT = Path('./')
ROOT.resolve()

if __name__ == "__main__":
    # Read the data file
    b = pd.read_csv(ROOT / "raw/brownfield/brownfield-land.csv")

    # We only need this column
    orgs = b["organisation-entity"]

    # Get the unique values
    unique_orgs = orgs.unique()

    # Empty list to add the data to
    data = []

    for id in unique_orgs:
        # Convert the org to an int
        try:
            id = int(id)
        except Exception:
            continue

        # Set the URL for the current org ID
        url = f"https://www.planning.data.gov.uk/entity/{id}.json"

        # Submit the GET request to the API
        response = requests.get(url)
        if response.status_code == 200:
            json_blob = response.json()

            LAD24CD = json_blob.get("local-authority-district")
            data.append((LAD24CD, id))
        else:
            print(f"Error: {response.status_code}")
    
    # Create dataframe
    df = pd.DataFrame(data, columns=['LAD24CD', 'organisation-entity'])

    # Write to csv
    df.to_csv(ROOT / "metadata/lookups/organisation_entity_to_LAD.csv", index=False)
    print("Got CSV of organisation entities to LADs. Done")
