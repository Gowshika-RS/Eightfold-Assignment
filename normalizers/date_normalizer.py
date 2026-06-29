from dateutil import parser

def normalize_date(date):
    if date is None:
        return None

    try:
        return parser.parse(date).strftime("%Y-%m")
    except:
        return date