import json
import logging
import sys

from readers.csv_reader import read_csv
from readers.linkedin_reader import read_linkedin
from merger.merge import merge_candidate
from validator.validator import validate_candidate

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def main():
    logger.info("Starting Candidate Merging Process...")

    try:
        # Read config
        with open("config/config.json", "r") as f:
            config = json.load(f)
        logger.info("Configuration loaded successfully.")
    except Exception as e:
        logger.error(f"Failed to load config: {e}")
        sys.exit(1)

    try:
        # Read input files
        csv_data = read_csv("input/recruiter.csv")
        linkedin_data = read_linkedin("input/linkedin.json")
    except Exception as e:
        logger.error(f"Error reading input files: {e}")
        sys.exit(1)

    try:
        # Merge candidate data
        candidate = merge_candidate(csv_data, linkedin_data, config)
    except Exception as e:
        logger.error(f"Error merging candidate data: {e}")
        sys.exit(1)

    try:
        # Validate candidate
        errors = validate_candidate(candidate)
        
        if errors:
            logger.warning("Validation Errors Found:")
            for error in errors:
                logger.warning(f"- {error}")
            # Depending on strictness, we might sys.exit(1) here. Assuming soft fail for now.
    except Exception as e:
        logger.error(f"Error validating candidate: {e}")
        sys.exit(1)

    # Filter output based on config
    try:
        result = {}
        for field in config.get("fields", candidate.keys()):
            if field in candidate:
                result[field] = candidate.get(field)
                
        # Save output
        with open("output/result.json", "w") as f:
            json.dump(result, f, indent=4)
        logger.info("Output saved to output/result.json")
    except Exception as e:
        logger.error(f"Error saving output: {e}")
        sys.exit(1)

    logger.info("✅ Candidate profile generated successfully!")
    print(json.dumps(result, indent=4))

if __name__ == "__main__":
    main()