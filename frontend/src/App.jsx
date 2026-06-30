import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UploadCard from './components/UploadCard';
import CandidateCard from './components/CandidateCard';
import ExperienceCard from './components/ExperienceCard';
import EducationCard from './components/EducationCard';
import ProvenanceTable from './components/ProvenanceTable';
import './App.css';

function syntaxHighlight(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'json-number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
      } else {
        cls = 'json-string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json-boolean';
    } else if (/null/.test(match)) {
      cls = 'json-null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000); // hide success banner after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [success]);

  const handleGenerate = async (csvFile, jsonFile) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setResult(null);

    const formData = new FormData();
    formData.append('recruiter', csvFile);
    formData.append('linkedin', jsonFile);

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate profile');
      }

      const data = await response.json();
      setResult(data);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.location.href = 'http://localhost:5000/download';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setResult(null);
    setSuccess(false);
    setError(null);
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        {!result ? (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="hero-section">
              <svg style={{width: '64px', height: '64px', color: 'var(--primary-color)', margin: '0 auto 1rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h1 className="hero-title">Candidate Profile Transformer</h1>
              <p className="hero-subtitle">
                Merge candidate information from multiple structured and unstructured sources into one canonical profile with confidence scoring and provenance tracking.
              </p>
            </div>

            {error && (
              <div className="error-banner animate-slide-up">
                <svg style={{width:'24px', height:'24px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Error:</strong> {error}</span>
              </div>
            )}

            {/* Empty State / Upload Section */}
            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              <div className="text-center mb-4 text-muted">
                <p>Upload recruiter CSV and LinkedIn JSON to generate a unified candidate profile.</p>
              </div>
              <UploadCard onGenerate={handleGenerate} loading={loading} />
            </div>
          </div>
        ) : (
          <div className="results-container animate-fade-in">
            {success && (
              <div className="success-banner animate-slide-up">
                <svg style={{width:'24px', height:'24px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Candidate profile generated successfully.</span>
              </div>
            )}

            <div className="results-header">
              <h2 className="text-2xl font-bold">Generated Profile</h2>
              <div className="flex gap-3">
                <button onClick={handleReset} className="btn-secondary">
                  <svg style={{width:'20px', height:'20px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start Over
                </button>
              </div>
            </div>

            <div className="cards-grid">
              <div className="left-column">
                <CandidateCard data={result} />
                <ExperienceCard experience={result.experience} />
                <EducationCard education={result.education} />
              </div>
              
              <div className="right-column">
                <ProvenanceTable provenance={result.provenance} />
                
                {/* JSON Viewer */}
                <div className="card mt-4 animate-fade-in delay-300" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="json-header">
                    <div className="flex gap-2">
                      <button onClick={handleCopy} className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>
                        {copied ? 'Copied!' : (
                          <>
                            <svg style={{width:'16px', height:'16px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy JSON
                          </>
                        )}
                      </button>
                      <button onClick={handleDownload} className="btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem', width: 'auto' }}>
                        <svg style={{width:'16px', height:'16px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download JSON
                      </button>
                    </div>
                  </div>
                  <div className="json-viewer-container">
                    <pre 
                      className="json-viewer"
                      dangerouslySetInnerHTML={{ __html: syntaxHighlight(result) }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
