import React from 'react';

const colors = [
  { bg: '#fee2e2', text: '#991b1b' }, // red
  { bg: '#fef3c7', text: '#92400e' }, // yellow
  { bg: '#d1fae5', text: '#065f46' }, // green
  { bg: '#dbeafe', text: '#1e40af' }, // blue
  { bg: '#f3e8ff', text: '#6b21a8' }, // purple
  { bg: '#ffedd5', text: '#9a3412' }, // orange
  { bg: '#fce7f3', text: '#9d174d' }, // pink
];

const SkillChip = ({ skill }) => {
  // Simple hash function to pick a consistent color for the skill string
  let hash = 0;
  for (let i = 0; i < skill.length; i++) {
    hash = skill.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  const color = colors[colorIndex];

  return (
    <span 
      className="skill-chip" 
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      {skill}
    </span>
  );
};

export default SkillChip;
