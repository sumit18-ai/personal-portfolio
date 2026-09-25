export interface Certification {
  id: string;
  title: string;
  provider: string;
  domain: string;
  code: string;
  pdfPath: string;
  issueDate?: string;
}

export const certifications: Certification[] = [
  {
    id: 'cisco-modern-ai',
    title: 'Introduction to Modern AI',
    provider: 'Cisco Networking Academy',
    domain: 'Artificial Intelligence',
    code: 'CISCO // 5402EEB2',
    pdfPath: '/certificates/cisco_modern_ai.pdf',
    issueDate: 'August 2026',
  },
  {
    id: 'infosys-ai',
    title: 'Artificial Intelligence',
    provider: 'Infosys Springboard',
    domain: 'Machine Learning & AI',
    code: 'INFOSYS // SPRINGBOARD-AI',
    pdfPath: '/certificates/infosys_certificate.png',
    issueDate: 'September 2026',
  },
  {
    id: 'cisco-os-basics',
    title: 'Operating Systems Basics',
    provider: 'Cisco Networking Academy',
    domain: 'Systems & Infrastructure',
    code: 'CISCO // 15671052',
    pdfPath: '/certificates/cisco_operating_systems.pdf',
    issueDate: 'August 2026',
  },
  {
    id: 'hackerrank-java',
    title: 'Java (Basic)',
    provider: 'HackerRank',
    domain: 'Core Software Engineering',
    code: 'HACKERRANK // JAVA-CERT',
    pdfPath: '/certificates/hackerrank_java_basic.pdf',
    issueDate: '2026',
  },
  {
    id: 'hackerrank-sql',
    title: 'SQL (Basic)',
    provider: 'HackerRank',
    domain: 'Databases & Query Optimization',
    code: 'HACKERRANK // SQL-CERT',
    pdfPath: '/certificates/hackerrank_sql_basic.pdf',
    issueDate: '2026',
  },
];
