import pytest
from merger.merge import merge_candidate

@pytest.fixture
def sample_csv():
    return {
        "Name": "John",
        "Email": "john@gmail.com",
        "Phone": "9876543210",
        "Title": "Recruiter Title"
    }

@pytest.fixture
def sample_linkedin():
    return {
        "name": "John Doe",
        "headline": "LinkedIn Developer",
        "skills": ["python", "cpp"],
        "experience": [{"company": "Google"}],
        "education": [{"degree": "B.Tech"}]
    }

@pytest.fixture
def sample_config():
    return {
        "fields": ["full_name", "emails", "phones", "headline", "skills"],
        "conflict_resolution": {
            "default_priority": ["recruiter_csv", "linkedin_json"]
        }
    }

def test_merge_candidate_priority(sample_csv, sample_linkedin, sample_config):
    candidate = merge_candidate(sample_csv, sample_linkedin, sample_config)
    
    # Check that CSV took priority for full_name
    assert candidate["full_name"] == "John"
    assert candidate["emails"] == ["john@gmail.com"]
    assert candidate["phones"] == ["+919876543210"]
    assert candidate["headline"] == "Recruiter Title"
    assert "Python" in candidate["skills"]
    assert "C++" in candidate["skills"]

def test_merge_candidate_fallback(sample_csv, sample_linkedin, sample_config):
    # Remove title from CSV to test fallback to LinkedIn
    sample_csv["Title"] = None
    candidate = merge_candidate(sample_csv, sample_linkedin, sample_config)
    
    # Headline should now fallback to LinkedIn
    assert candidate["headline"] == "LinkedIn Developer"

def test_provenance(sample_csv, sample_linkedin, sample_config):
    candidate = merge_candidate(sample_csv, sample_linkedin, sample_config)
    provenance = candidate["provenance"]
    
    # Find full_name provenance
    name_prov = next((p for p in provenance if p["field"] == "full_name"), None)
    assert name_prov is not None
    assert name_prov["source"] == "recruiter_csv"
    assert name_prov["confidence"] == 1.0

def test_overall_confidence(sample_csv, sample_linkedin, sample_config):
    candidate = merge_candidate(sample_csv, sample_linkedin, sample_config)
    
    assert candidate["overall_confidence"] > 0