import requests
import os

def download_file(url:str, path:str, fname:str):
    '''
    Wrapper function to download a remote file from a URL.

    Inputs
    ------
    url: str
        The URL of the file.
    path: str
        The path to the location of where you want to save the downloaded file.
    fname: str
        Name for the downloaded file including the file ending.
        
    Returns
    -------
    response.status_code: int
    '''
    # Send a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Ensure directory exists
        os.makedirs(path, exist_ok=True)
        # MAke the full file path
        OUT = os.path.join(path, fname)
        # Write the content of the response to a local file
        with open(OUT, 'wb') as file:
            file.write(response.content)
        print(f'File {fname} downloaded successfully')
    else:
        print('Failed to download file. Status code:', response.status_code)
    
    return response.status_code