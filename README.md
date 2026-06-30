# Candidate Profile Transformer

This project is my solution for the Eightfold Engineering Internship Assignment. It transforms candidate information from multiple sources (Recruiter CSV and LinkedIn JSON) into a single canonical profile by normalizing, merging, validating, and tracking data provenance with confidence scores.

## Features

- Reads Recruiter CSV and LinkedIn JSON
- Normalizes emails, phone numbers, and skills
- Merges candidate data with configurable conflict resolution
- Calculates confidence scores
- Tracks provenance for each field
- Validates output schema
- React frontend with Flask backend
- Downloads generated JSON profile

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/Gowshika-RS/Eightfold-Assignment.git
cd Eightfold-Assignment
```

### 2. Install backend dependencies

```bash
python -m pip install -r requirements.txt
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Start the backend

```bash
python app.py
```

Backend:

```
http://127.0.0.1:5000
```

### 5. Start the frontend

Open another terminal.

```bash
cd frontend
npm run dev
```

Frontend:

```
http://localhost:5173
```

### 6. Using the application

1. Upload **recruiter.csv**
2. Upload **linkedin.json**
3. Click **Generate Candidate Profile**
4. View the generated profile
5. Download the generated JSON

## Run the Backend Pipeline

```bash
python main.py
```

Generated output:

```
output/result.json
```

## Run Tests

```bash
python -m pytest tests/
```

## Sample Input

```
input/recruiter.csv
input/linkedin.json
```

## Output

The generated candidate profile includes:

- Candidate ID
- Full Name
- Emails
- Phone Numbers
- Headline
- Skills
- Experience
- Education
- Overall Confidence
- Provenance

---
Developed by **Gowshika R. S.**
