import phonenumbers

def normalize_phone(phone):
    try:
        phone = str(phone)
        if not phone.startswith("+"):
            phone = "+91" + phone

        number = phonenumbers.parse(phone, None)
        return phonenumbers.format_number(
            number,
            phonenumbers.PhoneNumberFormat.E164
        )
    except:
        return None