export const TIMELINE = [
  {
    id: 'aic-jklu-internship',
    type: 'experience',
    icon: '💼',
    title: 'Full Stack Developer Intern',
    organization: 'AIC-JKLU Foundation, Jaipur',
    period: 'May 2025 — Jul 2025',
    current: false,
    link: '',
    bullets: [
      'Worked on GRiD, a full-stack career advancement platform for students.',
      'Built features for course discovery, mentorship matching, and progress tracking.',
      'Delivered the project within the internship timeline.',
      'Performance exceeded expectations during the 2-month programme.',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Full Stack'],
  },

  {
    id: 'jklu-education',
    type: 'education',
    icon: '🎓',
    title: 'B.Tech',
    organization: 'JK Lakshmipat University, Jaipur',
    period: '2023 — Present',
    current: true,
    link: 'https://jklu.edu.in',
    bullets: [],
    description:
      'Pursuing B.Tech while building full-stack web applications and contributing to real-world student and institutional tech projects.',
    tags: ['Web Development', 'Full Stack', 'Projects'],
  },

  {
    id: 'aic-jklu-certificate',
    type: 'certification',
    icon: '🏅',
    title: 'Internship Certificate — Web Development',
    organization: 'AIC-JKLU Foundation',
    period: '2025',
    current: false,
    link: '',
    bullets: [],
    description:
      'Completed a 2-month internship focused on full-stack development and delivery of the GRiD platform. Recognized for timely project completion and strong performance.',
    tags: ['Internship', 'Web Development', 'GRiD'],
  },
];

export const TYPE_COLORS = {
  experience: { bg: '#0891B2', label: 'Experience' },
  education: { bg: '#8B5CF6', label: 'Education' },
  certification: { bg: '#059669', label: 'Certification' },
};