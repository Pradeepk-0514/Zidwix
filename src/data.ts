export const img = (n: string) => `/img/${n}${n.endsWith('-hd') ? '.webp' : '.jpg'}`
export const SV = [
  { slug: 'digital-products-software', icon: 'code', title: 'Digital Products & Software', desc: 'Websites, web apps and custom software designed to solve real problems.', short: 'Websites, web apps and custom software', img: 's1', items: ['Business websites', 'Web apps', 'Custom software'] },
  { slug: 'ai-business-automation', icon: 'cpu', title: 'AI & Business Automation', desc: 'Intelligent workflows and automation that reduce repetitive work and improve operations.', short: 'Smarter workflows and task automation', img: 's2', items: ['Workflow automation', 'AI-powered tools', 'Process integration'] },
  { slug: 'data-intelligence', icon: 'chart', title: 'Data & Intelligence', desc: 'Analytics, dashboards and data-driven tools that help businesses make informed decisions.', short: 'Analytics, dashboards and useful insights', img: 's3', items: ['Power BI dashboards', 'Data analytics', 'Reports'] },
]
export const WHY = [
  { icon: 'target', t: 'Built around your needs', d: 'Every project starts with understanding your business problem and goals.' },
  { icon: 'shield', t: 'Practical, transparent solutions', d: 'Clear project scope, agreed deliverables and pricing before development begins.' },
  { icon: 'gear', t: 'The right tools for the problem', d: 'From a simple website to an automated workflow, we choose an approach that fits the requirement.' },
  { icon: 'users', t: 'A collaborative process', d: 'Stay involved through feedback, testing and delivery.' },
]
export type Project = { cat: string; title: string; desc: string; tags: string[]; filter: string; img: string }
export const PR: Project[] = [
  { cat: 'Digital Products', title: 'Builstry – Business Website', desc: 'A modern, responsive website for a growing business brand with a clean and minimal design.', tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind'], filter: 'Websites', img: 'w1' },
  { cat: 'Data & Intelligence', title: 'Google Play Store Analytics Dashboard', desc: 'An interactive dashboard to analyze app performance, user behaviour and key metrics using real data.', tags: ['Python', 'Pandas', 'Excel', 'Power BI'], filter: 'Dashboards', img: 'w2' },
  { cat: 'AI & Automation', title: 'Power BI AI Agent', desc: 'An AI-powered agent that creates editable dashboards from datasets and prompts.', tags: ['Power BI', 'Python', 'DAX', 'AI'], filter: 'AI Tools', img: 'w3' },
  { cat: 'Data & Intelligence', title: 'Visualizing Traffic Patterns', desc: 'A data visualization project that shows traffic flow, patterns and peak hours using real-time data.', tags: ['Python', 'Pandas', 'Plotly'], filter: 'Dashboards', img: 'w4' },
  { cat: 'AI & Automation', title: 'Survey_Sentiment_Analyzer', desc: 'Analyzes survey responses and visualizes sentiment using NLP and data analysis techniques.', tags: ['Python', 'Flask', 'NLP', 'Chart.js'], filter: 'AI Tools', img: 'w5' },
  { cat: 'IoT & Hardware', title: 'TerraWatch', desc: 'An Arduino-based water level monitoring system with SIM800C and sensors for real-time alerts.', tags: ['Arduino', 'SIM800C', 'Sensors', 'C++'], filter: 'Web Apps', img: 'w6' },
  { cat: 'Full Stack Development', title: 'Angadiq – E-commerce Platform', desc: 'A Spring Boot e-commerce platform with AR try-on feature (in development).', tags: ['Spring Boot', 'PostgreSQL', 'React', 'AR'], filter: 'Web Apps', img: 'w7' },
  { cat: 'Mobile App', title: 'Classmatex', desc: 'A student community platform with Django and PostgreSQL for learning and collaboration.', tags: ['Django', 'PostgreSQL', 'React Native'], filter: 'Mobile Apps', img: 'w8' },
  { cat: 'API & Backend', title: 'SentimentIQ API', desc: 'A REST API service for sentiment analysis with CSV support and offline NLP processing.', tags: ['Flask', 'Python', 'CSV', 'NLP'], filter: 'Web Apps', img: 'w9' },
]
