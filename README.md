# RAPTR Performance App

### Installing App
*Section to be added later*

### Running Script to convert Firebase JSON to CSV
1. Go to firebase.gooogle.com and click **Go to console**
2. Click on the RAPTR Performance project
3. Click on Realtime Database in the left menu
4. Click on the 3 dots icon in the main window and then click export JSON
5. Check if the file is named `raptr-performance-export.json`, if not rename it to that
6. Move that file to this project directory (`raptr-app`)
7. Check if there is an installation of Python3 on the computer by running 
```python3 --version``` in the terminal. If nothing shows up, download the latest version of Python3 from https://www.python.org/downloads/ and follow the instructions to install it on your PATH.
8. Navigate to the project directory and run `python3 raptr-convert.py` in the terminal. 
9. The csv should up in this directory, ready to be opened in Excel!