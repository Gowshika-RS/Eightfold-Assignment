import React from 'react';

const EducationCard = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <div className="card mt-4 animate-fade-in delay-300">
      <h3 className="card-title">
        <svg className="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
        Education
      </h3>
      <div className="timeline">
        {education.map((edu, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '1rem', height: '1rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="timeline-content">
              <div className="timeline-title">{edu.degree} {edu.field && `in ${edu.field}`}</div>
              <div className="timeline-subtitle">{edu.institution}</div>
              {edu.end_year && (
                <div className="timeline-date">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '0.9rem', height: '0.9rem'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Class of {edu.end_year}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationCard;
