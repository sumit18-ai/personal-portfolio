export interface Project {
  id: string;
  sysId: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  tech: string[];
  architecture?: string[];
  metrics?: { label: string; value: string }[];
  github?: string;
  live?: string;
  featured?: boolean;
  category: string;
  statusTag?: string;
}

export const projects: Project[] = [
  {
    id: 'fraudshieldai',
    sysId: 'SYS // FSAI-01',
    title: 'FraudShieldAI',
    subtitle: 'AI-Powered Fraud Detection Platform',
    description:
      'An AI-powered fraud detection platform using ensemble learning and advanced imbalance-handling techniques to identify fraudulent transactions with extreme precision.',
    longDescription:
      'Built with an ensemble of XGBoost and LightGBM models, FraudShieldAI employs SMOTE for class imbalance handling and SHAP for model explainability. The system processes transaction streams in real time and flags anomalies with sub-millisecond latency.',
    tech: ['Python', 'Machine Learning', 'XGBoost', 'LightGBM', 'SHAP', 'Docker'],
    metrics: [
      { label: 'Recall', value: '99.7%' },
      { label: 'F1 Score', value: '99.85%' },
      { label: 'ROC-AUC', value: '0.9993' },
    ],
    github: '#',
    live: '#',
    featured: true,
    category: 'AI / ML',
    statusTag: 'PRODUCTION_READY',
  },
  {
    id: 'employee-management',
    sysId: 'SYS // EMS-02',
    title: 'Employee Management System',
    subtitle: 'Enterprise-Grade HR & Workforce Platform',
    description:
      'A full-stack enterprise platform featuring real-time organizational dashboards, granular role-based access control (RBAC), and automated HR lifecycle workflows.',
    architecture: [
      'Role-Based Access Control (RBAC) & Spring Security',
      'Normalized PostgreSQL relational data architecture',
      'Responsive Angular component hierarchy with live states',
    ],
    tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'REST API'],
    github: '#',
    category: 'Full-Stack',
    statusTag: 'ENTERPRISE_ARCH',
  },
  {
    id: 'education-platform',
    sysId: 'SYS // EMP-03',
    title: 'Education Management Platform',
    subtitle: 'Smart Academic Operational Ecosystem',
    description:
      'Multi-tenant academic infrastructure integrating attendance monitoring, timetable scheduling algorithms, student performance analytics, and automated question paper synthesis.',
    architecture: [
      'Automated question paper generation engine',
      'Multi-role access for admin, faculty, and students',
      'Relational student performance schema & reporting',
    ],
    tech: ['React', 'Node.js', 'Express', 'MySQL'],
    github: '#',
    category: 'Full-Stack',
    statusTag: 'MULTI_TENANT',
  },
  {
    id: 'house-price',
    sysId: 'SYS // HPP-04',
    title: 'House Price Prediction',
    subtitle: 'Machine Learning Real Estate Valuation Engine',
    description:
      'Machine learning valuation pipeline deployed as a RESTful inference service that estimates residential market values across 80+ engineered spatial and structural features.',
    architecture: [
      'End-to-end regression & feature engineering pipeline',
      'Flask microservice serving model predictions via JSON API',
      'Cross-validation testing with Scikit-learn metrics',
    ],
    tech: ['Python', 'Flask', 'Scikit-learn', 'Pandas'],
    github: '#',
    category: 'AI / ML',
    statusTag: 'ML_INFERENCE_API',
  },
  {
    id: 'data-analytics',
    sysId: 'SYS // DSD-05',
    title: 'Data Science Analytics Dashboard',
    subtitle: 'Interactive Data Exploration & Visualisation Engine',
    description:
      'A browser-based computational analytics dashboard that processes large datasets in Python, computing statistical distributions and serving responsive interactive visualisations.',
    architecture: [
      'Asynchronous dataset processing & statistical profiling',
      'Dynamic chart rendering via Matplotlib backend',
      'Lightweight Flask routing with modular visualization endpoints',
    ],
    tech: ['Python', 'Flask', 'Matplotlib', 'NumPy'],
    github: '#',
    category: 'Data Science',
    statusTag: 'ANALYTICS_CORE',
  },
  {
    id: 'divashield',
    sysId: 'SYS // DVS-06',
    title: 'DivaShield',
    subtitle: "Real-Time Personal Safety Web Application",
    description:
      "A personal security platform combining instant SOS emergency dispatch, live GPS geolocation streaming, and safe-route navigation algorithms to enhance user safety in transit.",
    architecture: [
      'Instant SOS trigger with emergency broadcast pipeline',
      'Live location coordinate streaming & geolocation tracking',
      'Interactive route overlay utilizing Google Maps API',
    ],
    tech: ['React', 'Node.js', 'Maps API', 'WebSockets'],
    github: '#',
    category: 'Full-Stack',
    statusTag: 'REALTIME_SYSTEM',
  },
];
