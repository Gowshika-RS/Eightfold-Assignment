# Candidate Profile Transformer

**Eightfold Engineering Internship Assignment**

A full-stack application that transforms candidate information from multiple data sources into a unified canonical profile. The application reads recruiter CSV and LinkedIn JSON files, normalizes the data, resolves conflicts, validates the output, calculates confidence scores, tracks provenance, and presents the results through a modern React-based web interface.

---

## Features

### Backend
- Reads candidate information from:
  - Recruiter CSV
  - LinkedIn JSON
- Normalizes:
  - Email addresses
  - Phone numbers (E.164 format)
  - Skills
  - Dates
- Merges candidate profiles into a canonical structure.
- Configurable conflict resolution using `config/config.json`.
- Calculates field-level and overall confidence scores.
- Tracks provenance (source, transformation, confidence) for every field.
- Schema validation before generating output.
- Comprehensive logging and exception handling.
- Unit tests using Pytest.

### Frontend
- Modern React + Vite user interface.
- Upload Recruiter CSV.
- Upload LinkedIn JSON.
- Generate Candidate Profile.
- Displays:
  - Candidate Information
  - Skills
  - Experience
  - Education
  - Confidence Score
  - Provenance
  - Raw JSON Output
- Download generated JSON profile.
- Responsive and user-friendly interface.

---

## Tech Stack

### Backend
- Python 3
- Flask

### Frontend
- React
- Vite
- CSS

### Testing
- Pytest

---

## Project Structure

```
Eightfold-Assignment/
│
├── frontend/                 # React frontend
│
├── config/
│   └── config.json
│
├── input/
│   ├── recruiter.csv
│   └── linkedin.json
│
├── merger/
│   └── merge.py
│
├── normalizers/
│   ├── email_normalizer.py
│   ├── phone_normalizer.py
│   ├── skill_normalizer.py
│   └── date_normalizer.py
│
├── readers/
│   ├── csv_reader.py
│   └── linkedin_reader.py
│
├── validator/
│   └── validator.py
│
├── output/
│   └── result.json
│
├── tests/
│   └── test_merge.py
│
├── app.py
├── main.py
├── requirements.txt
├── README.md
└── DESIGN.md
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Gowshika-RS/Eightfold-Assignment.git
cd Eightfold-Assignment
```

---

### 2. Install Backend Dependencies

```bash
python -m pip install -r requirements.txt
```

---

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Running the Application

### Start the Flask Backend

```bash
python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

### Start the React Frontend

Open a new terminal.

```bash
cd frontend
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Running the Backend Pipeline

To generate the canonical candidate profile directly:

```bash
python main.py
```

Generated output:

```
output/result.json
```

---

## Running Tests

```bash
python -m pytest tests/
```

---

## Sample Input Files

Use the sample files located in:

```
input/recruiter.csv
input/linkedin.json
```

---

## Output

The generated candidate profile contains:

- Candidate ID
- Full Name
- Email
- Phone
- Headline
- Skills
- Experience
- Education
- Overall Confidence Score
- Provenance Metadata

---

## Design Highlights

- Clean Architecture
- Modular Components
- Configurable Merge Strategy
- Dynamic Conflict Resolution
- Data Normalization
- Confidence Scoring
- Provenance Tracking
- Schema Validation
- React-Based User Interface
- Comprehensive Logging
- Unit Testing

---

## Future Improvements

- Support additional candidate sources (Resume PDF, GitHub, etc.)
- Authentication and user management
- Database integration
- REST API documentation (Swagger/OpenAPI)
- Bulk candidate processing
- Docker deployment
- Cloud deployment (AWS/Azure/GCP)

---

## Author

**Gowshika R. S.**

Final Year  
Computer Science and Engineering

---

## License

This project was developed as part of the **Eightfold Engineering Internship Assignment**.
