# DESIGN.md

## Architecture

The project follows a clean architecture pattern with distinct layers for readers, normalizers, merging logic, and validation.
- **Readers**: Extract data from various sources (CSV, JSON).
- **Normalizers**: Standardize formats for specific data types (Emails, Phones, Dates, Skills).
- **Merger**: Central logic to combine data and resolve conflicts.
- **Validator**: Ensures the final candidate profile meets structural and business requirements.

## Merge Strategy & Conflict Resolution

When a candidate has data from multiple sources, conflicts are resolved based on a priority list defined in `config/config.json`.
The default priority is `recruiter_csv` > `linkedin_json`.
If the highest priority source doesn't have the field, the system falls back to the next available source.

## Confidence Scoring

Confidence is calculated per field based on the source.
- Recruiter CSV data is highly trusted (1.0).
- LinkedIn JSON data is slightly less trusted (0.8).
Overall confidence is the average confidence of all present fields.

## Provenance

Every top-level field includes provenance tracking.
Provenance data records:
- The source of the data
- The transformation applied (raw vs normalized)
- The confidence score for that specific field

## Assumptions
- The candidate can be uniquely identified despite coming from disparate sources (currently generates a new UUID).
- LinkedIn JSON and Recruiter CSV structures are consistent with the provided samples.
- Empty fields do not overwrite populated fields during conflict resolution.
