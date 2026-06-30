import os
import json
import logging
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from readers.csv_reader import read_csv
from readers.linkedin_reader import read_linkedin
from merger.merge import merge_candidate
from validator.validator import validate_candidate

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Ensure input and output directories exist
os.makedirs("input", exist_ok=True)
os.makedirs("output", exist_ok=True)

@app.route("/generate", methods=["POST"])
def generate_profile():
    if 'recruiter' not in request.files or 'linkedin' not in request.files:
        return jsonify({"error": "Missing 'recruiter' or 'linkedin' file in the request"}), 400
        
    recruiter_file = request.files['recruiter']
    linkedin_file = request.files['linkedin']
    
    recruiter_path = "input/recruiter.csv"
    linkedin_path = "input/linkedin.json"
    
    recruiter_file.save(recruiter_path)
    linkedin_file.save(linkedin_path)
    
    try:
        with open("config/config.json", "r") as f:
            config = json.load(f)
    except Exception as e:
        logger.error(f"Failed to load config: {e}")
        return jsonify({"error": f"Failed to load config: {str(e)}"}), 500

    try:
        csv_data = read_csv(recruiter_path)
        linkedin_data = read_linkedin(linkedin_path)
    except Exception as e:
        logger.error(f"Error reading input files: {e}")
        return jsonify({"error": f"Error reading input files: {str(e)}"}), 400

    try:
        candidate = merge_candidate(csv_data, linkedin_data, config)
    except Exception as e:
        logger.error(f"Error merging candidate data: {e}")
        return jsonify({"error": f"Error merging candidate data: {str(e)}"}), 500

    try:
        errors = validate_candidate(candidate)
        if errors:
            logger.warning("Validation Errors Found:")
            for error in errors:
                logger.warning(f"- {error}")
    except Exception as e:
        logger.error(f"Error validating candidate: {e}")
        return jsonify({"error": f"Error validating candidate: {str(e)}"}), 500

    try:
        result = {}
        for field in config.get("fields", candidate.keys()):
            if field in candidate:
                result[field] = candidate.get(field)
                
        with open("output/result.json", "w") as f:
            json.dump(result, f, indent=4)
    except Exception as e:
        logger.error(f"Error saving output: {e}")
        return jsonify({"error": f"Error saving output: {str(e)}"}), 500

    return jsonify(result)

@app.route("/download", methods=["GET"])
def download_result():
    try:
        return send_file("output/result.json", as_attachment=True, download_name="result.json")
    except Exception as e:
        return jsonify({"error": f"Failed to download result: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
