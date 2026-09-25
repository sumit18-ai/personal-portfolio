/**
 * Centralized Contact and Social Profile Information
 * Extracted directly from official ATS Resume (Placement File).
 */
export const CONTACT_INFO = {
  name: 'Sumit Singh',
  title: 'Computer Engineering Student · Full-Stack Developer · AI/ML Enthusiast',
  college: 'Thakur College of Engineering and Technology (TCET), Mumbai',
  degree: 'B.E. Computer Engineering (2023 – 2027)',
  cgpa: '9.32 / 10',
  location: 'Mumbai, Maharashtra, India',
  phone: '+91 9326366679',
  email: 'singhsumitas200905@gmail.com',
  github: 'https://github.com/sumit18-ai',
  linkedin: 'https://www.linkedin.com/in/singhsumit200905/',
  resumeUrl: '/Sumit_Singh_ATS_Resume.pdf',
  resumeFilename: 'Sumit_Singh_ATS_Resume.pdf',
} as const;

export const SOCIAL_LINKS = [
  { label: 'GitHub',   href: CONTACT_INFO.github,   icon: 'GH' },
  { label: 'LinkedIn', href: CONTACT_INFO.linkedin, icon: 'IN' },
  { label: 'Email',    href: `mailto:${CONTACT_INFO.email}`, icon: '@' },
] as const;
