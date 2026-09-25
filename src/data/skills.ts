export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C', 'C++'],
  },
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'React', 'Angular', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Backend',
    skills: ['Spring Boot', 'Node.js', 'Maven'],
  },
  {
    category: 'Database',
    skills: ['MySQL', 'PostgreSQL'],
  },
  {
    category: 'AI / ML',
    skills: ['Machine Learning', 'XGBoost', 'LightGBM', 'SHAP', 'Scikit-learn', 'YOLO', 'EasyOCR'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'Postman', 'Swagger', 'VS Code'],
  },
];
