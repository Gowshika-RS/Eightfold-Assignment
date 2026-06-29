def normalize_email(email):
    if not email:
        return None
    return email.strip().lower()