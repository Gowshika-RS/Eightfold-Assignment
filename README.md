# Eightfold Assignment

This project processes, normalizes, and merges candidate profiles from multiple sources (Recruiter CSV and LinkedIn JSON) into a canonical candidate format with dynamic configuration, validation, and provenance tracking.

## Features
- **Clean Architecture**: Separated concerns across readers, normalizers, and merging logic.
- **Normalization**: Standardizes emails, E.164 phone numbers, dates, and skills.
- **Dynamic Merging & Conflict Resolution**: Prioritizes fields based on `config/config.json`.
- **Provenance & Confidence**: Tracks the source, transformation, and confidence score for every merged field.
- **Validation**: Strict schema validation ensures missing or malformed fields are caught.
- **Robust Exception Handling & Logging**: Added for production readiness.

## Getting Started

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Run the processor**:
   ```bash
   python main.py
   ```
3. **Run tests**:
   ```bash
   pytest tests/
   ```

## Design Document
Please see `DESIGN.md` for architectural details.
