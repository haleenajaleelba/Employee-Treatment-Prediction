- first install all the libraries that are mentioned in requirements.txt
- then run generatetable.py from command line using command:> python generatetable.py
- now run app.py (> python app.py)
- api server will start suuccessfully on http://localhost:4500/
- try the above url in browser

- API endpoints are:
#   /registeremployee - set header Content-Type: application/json and send data as 'raw' JSON
#   /adminlogin - set header Content-Type: application/json and send  credentials in 'raw' json, for example:
    {
        'username': 'haleena.jaleel',
        'password': 'haleena123'
    }
 - It will return accesss_token, refresh_token 
#   /getallemployee - set header Authorization: Bearer <access_token>
 - it will return all the data of employees

# /refreshtoken - to get new access_token if access_token expires
 - send header Authorization: Bearer <refresh_token>
