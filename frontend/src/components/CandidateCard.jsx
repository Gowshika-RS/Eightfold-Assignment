import React from 'react';
import SkillChip from './SkillChip';

const CandidateCard = ({ data }) => {
  if (!data) return null;

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const confidenceScore = data.overall_confidence ? Math.round(data.overall_confidence * 100) : 0;
  const isGreen = confidenceScore >= 90;
  const strokeColor = isGreen ? '#10b981' : '#f59e0b';
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidenceScore / 100) * circumference;

  return (
    <div className="card animate-fade-in delay-100">
      <div className="profile-header-top">
        <div className="avatar-container">
          <div className="avatar">
            {getInitials(data.full_name)}
          </div>
          <div>
            <h2 className="profile-name">{data.full_name || 'Unknown Name'}</h2>
            <p className="profile-headline">{data.headline}</p>
          </div>
        </div>

        {data.overall_confidence && (
          <div className="progress-ring" title={`Overall Confidence: ${confidenceScore}%`}>
            <svg>
              <circle cx="35" cy="35" r="30" stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
              <circle 
                className="progress-ring-circle"
                cx="35" cy="35" r="30" 
                stroke={strokeColor} 
                strokeWidth="6" 
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="progress-text" style={{ color: strokeColor }}>{confidenceScore}%</span>
          </div>
        )}
      </div>

      <div className="contact-info-grid">
        <div className="contact-item">
          <svg className="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {data.emails && data.emails.length > 0 ? data.emails.join(', ') : 'N/A'}
        </div>
        <div className="contact-item">
          <svg className="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {data.phones && data.phones.length > 0 ? data.phones.join(', ') : 'N/A'}
        </div>
        {data.location && (
          <div className="contact-item">
            <svg className="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.location}
          </div>
        )}
      </div>

      {data.skills && data.skills.length > 0 && (
        <>
          <h3 className="card-title mt-4">
            <svg className="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Skills
          </h3>
          <div className="skills-container">
            {data.skills.map((skill, idx) => (
              <SkillChip key={idx} skill={skill} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateCard;
