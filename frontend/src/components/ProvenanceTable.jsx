import React, { useEffect, useState } from 'react';

const ProvenanceTable = ({ provenance }) => {
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Small delay to allow the CSS transition to trigger after mount
    const timer = setTimeout(() => setShowProgress(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!provenance || provenance.length === 0) return null;

  return (
    <div className="card mt-4 animate-fade-in delay-200">
      <h3 className="card-title">
        <svg className="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Data Provenance
      </h3>
      <div className="provenance-table-wrapper">
        <table className="provenance-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Source</th>
              <th>Transformation</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {provenance.map((item, idx) => {
              const sourceLower = String(item.source).toLowerCase();
              let badgeClass = 'source-badge ';
              if (sourceLower.includes('linkedin')) badgeClass += 'source-linkedin';
              else if (sourceLower.includes('csv') || sourceLower.includes('recruiter')) badgeClass += 'source-csv';
              else badgeClass += 'source-csv';

              const confPercent = Math.round(item.confidence * 100);
              const barColor = confPercent >= 90 ? '#10b981' : confPercent >= 70 ? '#f59e0b' : '#ef4444';

              return (
                <tr key={idx}>
                  <td><strong>{item.field}</strong></td>
                  <td>
                    <span className={badgeClass}>{item.source}</span>
                  </td>
                  <td>
                    <span className="transform-badge">{item.transformation || 'raw'}</span>
                  </td>
                  <td style={{ minWidth: '120px' }}>
                    <div className="flex justify-between items-center mb-1 text-muted" style={{ fontSize: '0.75rem' }}>
                      <span>{confPercent}%</span>
                    </div>
                    <div className="conf-bar-bg">
                      <div 
                        className="conf-bar-fill" 
                        style={{ 
                          width: showProgress ? `${confPercent}%` : '0%',
                          backgroundColor: barColor 
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvenanceTable;
