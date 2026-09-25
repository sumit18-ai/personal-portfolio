export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  current: boolean;
  refCode?: string;
  skills?: string[];
  description: string[];
}

export const experiences: Experience[] = [
  {
    id: 'singh-classes',
    company: 'Singh Classes',
    role: 'Web Development Intern',
    period: 'April 2026 – May 2026',
    current: false,
    refCode: 'INTERN // SC-01',
    skills: ['Full-Stack', 'Role-Based Dashboards', 'Workflow Automation', 'Database Architecture', 'Education Tech'],
    description: [
      'Engineered an education management platform featuring multi-role dashboards for students, faculty, and administrators.',
      'Automated question paper generation pipeline, significantly reducing repetitive manual examination preparation for teachers.',
      'Developed core software modules for attendance tracking, timetable management, student performance analytics, and test management.',
      'Translated educational operational requirements into structured, database-driven web features with optimized usability.',
    ],
  },
  {
    id: 'mayank-tutorials',
    company: 'Mayank Tutorials',
    role: 'Teaching Faculty',
    period: 'June 2025 – April 2026',
    current: false,
    refCode: 'ACAD // MT-02',
    skills: ['ICSE Curriculum', 'Physics & Chemistry', 'Problem Decomposition', 'Diagnostic Assessment', 'Mentorship'],
    description: [
      'Delivered Physics and Chemistry instruction to ICSE secondary students focusing on first-principles conceptual clarity.',
      'Designed structured study materials, comprehensive worksheets, and diagnostic practice tests tailored to board exam standards.',
      'Mentored students to cultivate systematic problem-solving habits, scientific reasoning, and structured exam strategies.',
      'Conducted personalized doubt-clearing sessions and monitored individual student progress metrics to elevate academic performance.',
    ],
  },
];
