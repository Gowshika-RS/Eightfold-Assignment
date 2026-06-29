import re
import logging

logger = logging.getLogger(__name__)

def is_valid_email(email):
    if not email:
        return False
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(pattern, email))

def is_valid_phone(phone):
    if not phone:
        return False
    return phone.startswith("+") and len(phone) >= 12

def validate_candidate(candidate):
    logger.info("Validating candidate schema.")
    errors = []

    if not candidate.get("full_name"):
        errors.append("Missing full name")

    for email in candidate.get("emails", []):
        if not is_valid_email(email):
            errors.append(f"Invalid email: {email}")

    for phone in candidate.get("phones", []):
        if not is_valid_phone(phone):
            errors.append(f"Invalid phone: {phone}")

    # Validate provenance
    provenance = candidate.get("provenance", [])
    if not provenance:
        errors.append("Missing provenance data")
    else:
        for prov in provenance:
            if "field" not in prov or "source" not in prov or "confidence" not in prov:
                errors.append(f"Invalid provenance entry: {prov}")

    if errors:
        logger.warning(f"Candidate validation failed with {len(errors)} errors.")
    else:
        logger.info("Candidate validation passed.")

    return errors