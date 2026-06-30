import React, { useState, useRef, useEffect } from 'react';

const UploadCard = ({ onGenerate, loading }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  
  const [csvDrag, setCsvDrag] = useState(false);
  const [jsonDrag, setJsonDrag] = useState(false);

  const [loadingText, setLoadingText] = useState('Generating final profile...');
  const loadingSteps = [
    'Reading recruiter data...',
    'Reading LinkedIn profile...',
    'Normalizing fields...',
    'Merging candidate...',
    'Calculating confidence...',
    'Generating final profile...'
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      let stepIndex = 0;
      setLoadingText(loadingSteps[0]);
      interval = setInterval(() => {
        stepIndex++;
        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex]);
        }
      }, 600); // cycle through steps somewhat fast
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleDragOver = (e, setDrag) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e, setDrag) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDrop = (e, setDrag, setFile, type) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(type)) {
        setFile(droppedFile);
      } else {
        alert(`Please upload a valid ${type} file.`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (csvFile && jsonFile) {
      onGenerate(csvFile, jsonFile);
    }
  };

  return (
    <div className="upload-card animate-slide-up">
      <h2 className="upload-title">Data Sources</h2>
      <form onSubmit={handleSubmit}>
        <div className="upload-zones-container mb-4">
          
          {/* CSV Zone */}
          <div 
            className={`upload-zone ${csvDrag ? 'drag-active' : ''} ${csvFile ? 'has-file' : ''}`}
            onDragOver={(e) => handleDragOver(e, setCsvDrag)}
            onDragLeave={(e) => handleDragLeave(e, setCsvDrag)}
            onDrop={(e) => handleDrop(e, setCsvDrag, setCsvFile, '.csv')}
          >
            <input 
              type="file" 
              accept=".csv" 
              className="file-input"
              title=""
              onChange={(e) => { if(e.target.files[0]) setCsvFile(e.target.files[0]) }}
            />
            {!csvFile ? (
              <>
                <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3>Upload Recruiter CSV</h3>
                <p>Drag and drop or click to browse</p>
                <p className="mt-1">Supported format: .csv</p>
              </>
            ) : (
              <>
                <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>CSV Uploaded</h3>
                <div className="file-name">{csvFile.name}</div>
              </>
            )}
          </div>

          {/* JSON Zone */}
          <div 
            className={`upload-zone ${jsonDrag ? 'drag-active' : ''} ${jsonFile ? 'has-file' : ''}`}
            onDragOver={(e) => handleDragOver(e, setJsonDrag)}
            onDragLeave={(e) => handleDragLeave(e, setJsonDrag)}
            onDrop={(e) => handleDrop(e, setJsonDrag, setJsonFile, '.json')}
          >
            <input 
              type="file" 
              accept=".json" 
              className="file-input"
              title=""
              onChange={(e) => { if(e.target.files[0]) setJsonFile(e.target.files[0]) }}
            />
            {!jsonFile ? (
              <>
                <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <h3>Upload LinkedIn JSON</h3>
                <p>Drag and drop or click to browse</p>
                <p className="mt-1">Supported format: .json</p>
              </>
            ) : (
              <>
                <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>JSON Uploaded</h3>
                <div className="file-name">{jsonFile.name}</div>
              </>
            )}
          </div>

        </div>

        <button 
          type="submit" 
          className="btn-primary mt-4"
          disabled={loading || !csvFile || !jsonFile}
        >
          {loading ? (
            <><span className="spinner"></span> <span className="loading-text">{loadingText}</span></>
          ) : (
            <>
              <svg style={{width:'20px', height:'20px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Candidate Profile
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadCard;
