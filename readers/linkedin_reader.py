import json

def read_linkedin(path):
    with open(path,"r") as f:
        return json.load(f)