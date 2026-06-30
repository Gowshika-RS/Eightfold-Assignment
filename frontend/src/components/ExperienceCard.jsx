import React from 'react';

const ExperienceCard = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <div className="card mt-4 animate-fade-in delay-200">
      <h3 className="card-title">
        <svg className="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Experience
      </h3>
      <div className="timeline">
        {experience.map((exp, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '1rem', height: '1rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="timeline-content">
              <div className="timeline-title">{exp.title}</div>
              <div className="timeline-subtitle">{exp.company}</div>
              {(exp.start || exp.end) && (
                <div className="timeline-date">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '0.9rem', height: '0.9rem'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {exp.start || 'Unknown'} - {exp.end || 'Present'}
                </div>
              )}
              {exp.summary && (
                <div className="mt-2 text-muted" style={{ fontSize: '0.9rem' }}>{exp.summary}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
