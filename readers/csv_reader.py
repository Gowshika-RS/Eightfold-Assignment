import pandas as pd

def read_csv(path):
    df = pd.read_csv(path)
    return df.iloc[0].to_dict()