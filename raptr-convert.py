import csv
import json

with open('raptr-performance-export.json') as json_file:
    data = json.load(json_file)

with open('raptr_data.csv', 'w', newline='') as csvfile:
    data_headers = []
    for n in range(500):
        data_headers.extend([f'd{n}', f'x{n}', f'p{n}'])
    fieldnames = ['name', 'user_run', 'date',
                  'distance', 'maxPower'] + data_headers

    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    users = data["users"]

    # print(users["Grace Moore"]['-MKMm4flpTAWRE_-BvO8'].keys())
    for user in users.keys():
        user_data = users[user]
        if "date" not in user_data.keys():
            for i, run in enumerate(user_data):
                run_data = user_data[run]
                data_dict = {}
                for idx, moment in enumerate(run_data["data"]):
                    data_dict[f'd{idx}'] = moment["dist"]
                    data_dict[f'x{idx}'] = moment["x"]
                    data_dict[f'p{idx}'] = moment["y"]
                writer.writerow(
                    {**{'name': user, "user_run": i, "maxPower": run_data["maxPower"], "date": run_data["date"], "distance": run_data["distance"]}, **data_dict})
