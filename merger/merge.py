import uuid
import logging
from normalizers.email_normalizer import normalize_email
from normalizers.phone_normalizer import normalize_phone
from normalizers.skill_normalizer import normalize_skills
from normalizers.date_normalizer import normalize_date

logger = logging.getLogger(__name__)

def resolve_conflict(field_name, sources, priorities):
    """
    Resolve conflicts based on priority.
    sources is a dict of {source_name: value}
    """
    for priority_source in priorities:
        if priority_source in sources and sources[priority_source]:
            return sources[priority_source], priority_source
    
    # Fallback to the first available source if priorities don't match
    for source_name, value in sources.items():
        if value:
            return value, source_name
    
    return None, None

def calculate_confidence(source, field_name, value):
    """
    Calculate confidence based on source and presence of value.
    This can be customized per field and source.
    """
    if not value:
        return 0.0
    
    # Base confidence scores per source
    source_confidence_map = {
        "recruiter_csv": 1.0,
        "linkedin_json": 0.8
    }
    
    # Adjust confidence if needed based on the field
    confidence = source_confidence_map.get(source, 0.5)
    return confidence

def merge_candidate(csv_data, linkedin_data, config):
    logger.info("Merging candidate data from CSV and LinkedIn.")
    
    conflict_priority = config.get("conflict_resolution", {}).get("default_priority", ["recruiter_csv", "linkedin_json"])
    
    # Mapping sources to a standard format for resolution
    sources = {
        "full_name": {
            "recruiter_csv": csv_data.get("Name"),
            "linkedin_json": linkedin_data.get("name")
        },
        "emails": {
            "recruiter_csv": [normalize_email(csv_data.get("Email"))] if csv_data.get("Email") else [],
            "linkedin_json": [] # Assuming linkedin JSON doesn't have email in our sample
        },
        "phones": {
            "recruiter_csv": [normalize_phone(csv_data.get("Phone"))] if csv_data.get("Phone") else [],
            "linkedin_json": [] 
        },
        "headline": {
            "recruiter_csv": csv_data.get("Title"),
            "linkedin_json": linkedin_data.get("headline")
        },
        "skills": {
            "recruiter_csv": [],
            "linkedin_json": normalize_skills(linkedin_data.get("skills", []))
        },
        "experience": {
            "recruiter_csv": [],
            "linkedin_json": linkedin_data.get("experience", [])
        },
        "education": {
            "recruiter_csv": [],
            "linkedin_json": linkedin_data.get("education", [])
        }
    }
    
    candidate = {
        "candidate_id": str(uuid.uuid4())
    }
    provenance = []
    total_confidence = 0.0
    field_count = 0
    
    for field, field_sources in sources.items():
        resolved_value, resolved_source = resolve_conflict(field, field_sources, conflict_priority)
        candidate[field] = resolved_value
        
        if resolved_value:
            confidence = calculate_confidence(resolved_source, field, resolved_value)
            provenance.append({
                "field": field,
                "source": resolved_source,
                "transformation": "normalized" if field in ["emails", "phones", "skills"] else "raw",
                "confidence": confidence
            })
            total_confidence += confidence
            field_count += 1
    
    candidate["provenance"] = provenance
    candidate["overall_confidence"] = round(total_confidence / field_count, 2) if field_count > 0 else 0.0
    
    logger.info(f"Merged candidate successfully with overall confidence {candidate['overall_confidence']}.")
    
    return candidate