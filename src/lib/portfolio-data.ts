// portfolio-data.ts
export interface SocialLink {
  id: string;
  label: string;
  href: string;
  brandColor: string;
}
export interface StatItem {
  id: string;
  value: string;
  label: string;
}
export interface NavItem {
  id: string;
  label: string;
  shortLabel?: string;
}
export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  detail: string;
  year: string;
}
export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  basis?: string;
}
export interface ResearchProject {
  id: string;
  title: string;
  funder: string;
  amount: string;
  period: string;
  description: string;
  status: 'Ongoing' | 'Completed' | 'Submitted';
}
export interface AwardItem {
  id: string;
  year: string;
  title: string;
  organization: string;
}
export type PublicationType = 'Journal' | 'Conference' | 'Patent';
export interface Publication {
  id: string;
  year: string;
  authors: string;
  title: string;
  venue: string;
  type: PublicationType;
  doi?: string;
}
export interface TextListSection {
  id: string;
  title: string;
  eyebrow: string;
  items: string[];
  intro?: string;
}
export const profile = {
  name: 'Dr. Kalpana Sunil Thakre',
  formalName: 'Dr. Mrs. Kalpana Sunil Thakre',
  title: 'Dean – Research & Development, Computer Engineering',
  qualification: 'Ph.D. in Computer Science & Engineering',
  institution: 'Marathwada Mitra Mandal College of Engineering, Pune',
  emails: ['kalpana_sunil@yahoo.com', 'ksthakre@ieee.org'],
  image: '/profile.png',
  summary:
    'Dean – Research & Development at MMCOE, previously Professor & Head of the Computer Engineering Department with three decades of teaching, research, and academic leadership across video retrieval, machine learning, and database systems. SPPU-recognized Ph.D. guide, published author of 60+ works, and named IEEE, ISTE, and CSI professional member.',
};
export const socialLinks: SocialLink[] = [
  {
    id: 'orcid',
    label: 'ORCID',
    href: 'https://orcid.org/0000-0002-8830-9509',
    brandColor: '#A6CE39',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dr-kalpana-thakre-1a809616/',
    brandColor: '#0A66C2',
  },
  {
    id: 'scopus',
    label: 'Scopus',
    href: 'https://www.scopus.com/authid/detail.uri?authorId=37102832900',
    brandColor: '#E9711C',
  },
  {
    id: 'wos',
    label: 'Web of Science',
    href: 'https://www.webofscience.com/wos/author/record/Q-9333-2016',
    brandColor: '#8B0000',
  },
  {
    id: 'scholar',
    label: 'Google Scholar',
    href: 'https://scholar.google.co.in/citations?user=iY3D3IIAAAAJ',
    brandColor: '#4285F4',
  },
  { id: 'email', label: 'Email', href: 'mailto:kalpana_sunil@yahoo.com', brandColor: '#111111' },
];
export const navItems: NavItem[] = [
  { id: 'home', label: 'Overview' },
  { id: 'stats', label: 'Statistics', shortLabel: 'Stats' },
  { id: 'education', label: 'Academic Qualification', shortLabel: 'Education' },
  { id: 'experience', label: 'Academic Experience', shortLabel: 'Experience' },
  { id: 'research-projects', label: 'Research Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'awards', label: 'Awards' },
  { id: 'pg-ug-guidance', label: 'PG / UG Guidance' },
  { id: 'pc-member', label: 'PC Member / Editor / Reviewer' },
  { id: 'university-services', label: 'University Services' },
  { id: 'courses-taught', label: 'Courses Taught' },
  { id: 'technical-skills', label: 'Technical Skills' },
  { id: 'fdp-organized', label: 'FDP / Workshops Organized' },
  { id: 'expert-lectures', label: 'Invited Expert Lectures' },
  { id: 'fdp-attended', label: 'FDP / SDP / STTP Attended' },
  { id: 'area-of-interest', label: 'Area of Interest' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'patents', label: 'Patents' },
  { id: 'research-grants', label: 'Research Grants' },
  { id: 'research-participation', label: 'Research Participation' },
  { id: 'professional-membership', label: 'Professional Membership' },
  { id: 'roles', label: 'Roles & Responsibilities' },
];
// Add a mapping from stat id to section id for navigation
export const statToSectionMap: Record<string, string> = {
  experience: 'experience',
  publications: 'publications',
  patents: 'patents',
  grants: 'research-projects',
  students: 'pg-ug-guidance',
  phd: 'pg-ug-guidance',
};
// Removed SSC and HSSC from education
export const education: EducationItem[] = [
  {
    id: 'phd',
    degree: 'Ph.D., Computer Science & Engineering',
    institution:
      "Shri Ramanand Tirth Marathwada University, Nanded — research carried out at Shri Guru Govind Singh Institute of Engineering & Technology and MGM's College of Engineering, Nanded",
    detail: 'Awarded 1 February 2016',
    year: '2016',
  },
  {
    id: 'mtech',
    degree: 'M.Tech., Computer Science & Engineering',
    institution: 'G. H. Raisoni College of Engineering, Nagpur University',
    detail: 'First Division',
    year: '2006',
  },
  {
    id: 'be',
    degree: 'B.E., Computer Technology',
    institution: 'KaviKulguru Institute of Science and Technology, Ramtek, Nagpur',
    detail: 'First Division',
    year: '1993',
  },
];
// Updated experience with Dean role as current, HOD preserved as previous
export const experience: ExperienceItem[] = [
  {
    id: 'mmcoe-dean',
    role: 'Dean – Research & Development, Computer Engineering',
    organization: 'Marathwada Mitra Mandal College of Engineering, Pune',
    period: 'July 2026 — Present',
  },
  {
    id: 'mmcoe-hod',
    role: 'Professor & Head of Department, Computer Engineering',
    organization: 'Marathwada Mitra Mandal College of Engineering, Pune',
    period: '24 Jan 2022 — July 2026',
  },
  {
    id: 'scoe-prof',
    role: 'Professor, Department of Information Technology',
    organization: 'Sinhgad College of Engineering (Vadgaon Bk.), Pune',
    period: 'Feb 2016 — Jan 2022',
  },
  {
    id: 'scoe-assoc',
    role: 'Associate Professor, Department of Information Technology',
    organization: 'Sinhgad College of Engineering (Vadgaon Bk.), Pune',
    period: '15 Sept 2006 — 24 Jan 2022',
  },
  {
    id: 'pcea',
    role: 'Lecturer, Department of Computer Technology',
    organization: 'Priyadarshini College of Engineering and Architecture, Nagpur',
    period: '24 Jul 1996 — 10 Sept 2006',
  },
];
// Updated research projects - removed "Submitted" entry for ASPIRE
// Updated research projects - removed "Submitted" entry for ASPIRE, added AICTE-RPS 2025
export const researchProjects: ResearchProject[] = [
  {
    id: 'aicte-rps-2025',
    title:
      'AI driven Assistive Technologies for Enhancing Accessibility and Communication among Differently Abled Marathi Speaker',
    funder: 'AICTE — Research Promotion Scheme (RPS)',
    amount: '₹29,00,000',
    period: '2025-27',
    description:
      'Funded project under AICTE Research Promotion Scheme 2025. Principal Investigator: Dr. Kalpana Thakre. Co-PIs: Dr. Smita Chaudhari, Dr. Girija Chiddarwar. Research Fellow: Ms. Madhuri Kumbhar.',
    status: 'Completed',
  },
  {
    id: 'bcud-2016',
    title:
      'Flexible Video Surveillance and Retrieval of Content-Based Video using Moving Object Detection',
    funder: 'BCUD, Pune',
    amount: '₹53,000',
    period: '2016-18',
    description: 'Research proposal submitted to and funded by BCUD, Pune.',
    status: 'Completed',
  },
  {
    id: 'bcud-2010',
    title: 'Content-Based Video Retrieval System: An Application to the Education Field',
    funder: 'BCUD, Pune',
    amount: '₹2,00,000',
    period: '2010-12',
    description: 'Research proposal submitted to and funded by BCUD, Pune.',
    status: 'Completed',
  },
];
export const awards: AwardItem[] = [
  {
    id: 'uttam-adhyapika',
    year: '2021',
    title: 'Uttam Adhyapika Award',
    organization: 'Bharat Education Excellence Awards, Education & Research',
  },
  {
    id: 'pcocare-best-paper',
    year: '2020',
    title:
      'Best Paper Award — "PCOcare: PCOS Detection and Prediction using Machine Learning Algorithms"',
    organization: 'ICIDC-2020, Helix Scientific Publisher',
  },
  {
    id: 'viwa',
    year: '2018',
    title: 'VIWA Award — Distinguished Women in Information Technology',
    organization: 'VIWA',
  },
  {
    id: 'video-partition-best-paper',
    year: '2015',
    title:
      'Best Paper Award (Ph.D. Category) — "Video Partitioning and Secured Keyframe Extraction of MPEG Video"',
    organization:
      '1st International Conference on Information Security & Privacy, Procedia Computer Science, Elsevier',
  },
];
export const patents: Publication[] = [
  {
    id: 'patent-skincare',
    year: '2021',
    authors: 'Narsimha Banothu, Kalpana Sunil Thakare',
    title: 'Optimised Skin Care Product Recommendation System based on SVM-based Machine Learning',
    venue: 'Indian Patent Office Journal · Application No. 202141035032 A',
    type: 'Patent',
  },
  {
    id: 'patent-social-delusion',
    year: '2017',
    authors: 'Dipali Dawande, K. S. Thakre',
    title:
      'Identifying Social Network Delusion to Investigate Addiction Ratio by Mining Social Media Data',
    venue: 'Indian Patent Office Journal · Application ID 201721027114',
    type: 'Patent',
  },
  {
    id: 'patent-anomaly',
    year: '2017',
    authors: 'Sujeet Suryavanshi, Kalpana Thakre',
    title: 'Online Anomaly Detection based on Ensemble of Heterogeneous Classifiers',
    venue: 'Indian Patent Journal · Application No. 201721035142',
    type: 'Patent',
  },
];
export const journals: Publication[] = [
  {
    id: 'j-2025-genai',
    year: '2025',
    authors: 'Shafiq, M., Thakre, K., Pandurangan, R., Lalitha, R.V.S.',
    title: 'Generative AI designs the next generation of smart materials from pixels to products',
    venue: 'The International Journal of Advanced Manufacturing Technology',
    type: 'Journal',
  },
  {
    id: 'j-2024-sentiment',
    year: '2024',
    authors: 'Kulkarni, P.V., Thakre, K.S.',
    title: 'Developing sentiment lexicon for Marathi: A comprehensive survey and analysis',
    venue: 'Journal of Information and Optimization Sciences, Vol. 45(4), 1141-1152',
    type: 'Journal',
  },
  {
    id: 'j-2024-privacy',
    year: '2024',
    authors: 'Narule, Y.S., Thakre, K.S.',
    title: 'Privacy preservation using optimized Federated Learning: A critical survey',
    venue: 'Intelligent Decision Technologies, Vol. 18(1), 135-149',
    type: 'Journal',
  },
  {
    id: 'j-2023-quality',
    year: '2023',
    authors: 'Shafiq, M., Thakre, K., Krishna, K.R., Robert, N.J., Kuruppath, A., Kumar, D.',
    title:
      'Continuous quality control evaluation during manufacturing using supervised learning algorithm for Industry 4.0',
    venue: 'The International Journal of Advanced Manufacturing Technology, 1-10',
    type: 'Journal',
  },
  {
    id: 'j-2023-hidden',
    year: '2023',
    authors: 'Umadevi, K.S., Thakare, K.S., Patil, S., Raut, R., Dwivedi, A.K., Haldorai, A.',
    title: 'Dynamic hidden feature space detection of noisy image set by weight binarization',
    venue: 'Signal, Image and Video Processing, Vol. 17(3), 761-768',
    type: 'Journal',
  },
  {
    id: 'j-2022',
    year: '2022',
    authors: 'Umadevi, K.S., Thakare, K.S., Patil, S., et al., Dwivedi, A.K., Haldorai, A.',
    title: 'Dynamic Hidden Feature Space Detection of Noisy Image Set by Weight Binarization',
    venue: 'Signal, Image and Video Processing',
    type: 'Journal',
  },
  {
    id: 'j-pcocare',
    year: '2020',
    authors: 'Vaidehi Thakre, Shreyas Vedpathak, Kalpana Thakre',
    title: 'PCOcare: PCOS Detection and Prediction using Machine Learning Algorithms',
    venue: 'Bioscience Biotechnology Research Communications, Vol. 13(12) · Web of Science',
    type: 'Journal',
  },
  {
    id: 'j-heart',
    year: '2020',
    authors: 'K. S. Thakre, Viraj Varale',
    title: 'Prediction of Heart Disease using Machine Learning Algorithm',
    venue: 'Bioscience Biotechnology Research Communications, Vol. 13(12) · Web of Science',
    type: 'Journal',
  },
  {
    id: 'j-social-delusion',
    year: '2020',
    authors: 'K. S. Thakre, Deepali Dawande, Vaidehi Thakre',
    title: 'Identifying Social Network Delusion to Investigate Addiction Ratio using Data Mining',
    venue: 'ACM Digital Library · ISBN 978-1-4503-7685-3',
    type: 'Journal',
  },
  {
    id: 'j-community-qa',
    year: '2020',
    authors: 'Sayali Sonawane, K.S. Thakare, Vaishnavi Kolte, Pranita Jejurkar, Ashwini Dhavare',
    title: 'Predicting Best Answer in Community Question',
    venue: 'Test Engineering and Management Journal, Vol. 83 · ISSN 0193-4120',
    type: 'Journal',
  },
  {
    id: 'j-elearning',
    year: '2020',
    authors: 'Vaibhavi Pawar, K.S. Thakre, Abhishek Pujari, Pranali Wagh, Yash Pawar',
    title: 'E-learning on Cloud using Advanced Encryption Standard',
    venue: 'International Journal of Embedded Systems and Emerging Technologies, 6(1), 17–27',
    type: 'Journal',
  },
  {
    id: 'j-mmdata',
    year: '2017',
    authors: 'Prachi Kohade, K. S. Thakare',
    title: 'Multimedia Data Mining — A Survey',
    venue:
      'International Journal of Innovative Research in Computer and Communication Engineering, Vol. 5(12)',
    type: 'Journal',
    doi: '10.15680/IJIRCCE.2017.0512057',
  },
  {
    id: 'j-online-exam-survey',
    year: '2018',
    authors: 'Nikita Modi, Neeral Bhalgat, K. S. Thakare',
    title: 'Online Examination System: A Survey',
    venue: 'CiiT International Journal of Software Engineering and Technology, Vol. 10, No. 6',
    type: 'Journal',
  },
  {
    id: 'j-shot-boundary',
    year: '2016',
    authors: 'K. S. Thakre, A. M. Rajurkar',
    title: 'Shot Boundary Detection of MPEG Video using Biorthogonal Wavelet Transform',
    venue: 'International Journal of Pure and Applied Mathematics, Vol. 118, No. 7, 405–413',
    type: 'Journal',
  },
  {
    id: 'j-video-partition',
    year: '2016',
    authors: 'K. S. Thakre, A. M. Rajurkar, R. R. Manthalkar',
    title: 'Video Partitioning and Secured Keyframe Extraction of MPEG Video',
    venue: 'Procedia Computer Science, Vol. 78, 790–798 · Elsevier · Scopus',
    type: 'Journal',
    doi: '10.1016/j.procs.2016.02.058',
  },
  {
    id: 'j-mining-social-media',
    year: '2016',
    authors: 'Dipali R. Dawande, K.S. Thakre',
    title: 'Mining Online Social Media Data: A Survey',
    venue: 'International Journal of Applied Engineering and Technology, Vol. 6(4), 1–8',
    type: 'Journal',
  },
  {
    id: 'j-network-anomaly',
    year: '2017',
    authors: 'Sujeet Raosaheb Suryawanshi, Kalpana Thakre',
    title: 'Network Anomaly Detection System Using Machine Learning Technique: A Proposed Model',
    venue: 'International Journal of Applied Engineering and Technology, Vol. 7(1), 32–40',
    type: 'Journal',
  },
  {
    id: 'j-cbvr-lsi',
    year: '2012',
    authors: 'Kalpana S. Thakare, Archana M. Rajurkar, R. R. Manthalkar',
    title:
      'Content-Based Video Retrieval using Latent Semantic Indexing and Color, Motion and Edge Features',
    venue: 'International Journal of Computer Applications, 54(12), 42–48',
    type: 'Journal',
    doi: '10.5120/8621-2486',
  },
  {
    id: 'j-spatiotemporal',
    year: '2011',
    authors: 'Kalpana S. Thakare, Archana M. Rajurkar, R. R. Manthalkar',
    title:
      'A Comprehensive System Based on Spatiotemporal Features such as Motion, Quantized Color and Edge Features',
    venue: 'International Journal of Wireless and Microwave Technologies, Vol. 1, No. 3',
    type: 'Journal',
    doi: '10.5815/ijwmt',
  },
  {
    id: 'j-effective-cbvr',
    year: '2011',
    authors: 'Kalpana S. Thakare, Archana M. Rajurkar, R. R. Manthalkar',
    title: 'An Effective CBVR System based on Motion, Quantized Color and Edge Density Features',
    venue: 'International Journal of Computer Science & Information Technology, Vol. 3, No. 2',
    type: 'Journal',
    doi: '10.5121/ijcsit.2011.3206',
  },
  {
    id: 'j-singing-humming',
    year: '2015',
    authors: 'Vyankatesh Kharat, Kalpana Thakare',
    title: 'A Survey on Query by Singing / Humming',
    venue: 'International Journal of Computer Applications, Vol. 111, No. 14, 39–42',
    type: 'Journal',
  },
  {
    id: 'j-text-extraction',
    year: '2013',
    authors: 'Suvarna Baheti, K.S. Thakare',
    title: 'A Novel Based Text Extraction, Recognition from Digital E-Videos',
    venue:
      'International Journal of Innovative Research in Computer and Communication Engineering, Vol. 1(5)',
    type: 'Journal',
  },
  {
    id: 'j-visual-crypto',
    year: '2014',
    authors: 'Nagesh Soradge, K. S. Thakare',
    title: 'A Short Review on Various Visual Cryptography Schemes',
    venue: 'International Journal of Computer Science and Business Informatics, Vol. 12',
    type: 'Journal',
  },
  {
    id: 'j-shot-boundary-review',
    year: '2014',
    authors: 'Arun Hattarge, K.S. Thakare',
    title: 'Analysis and Review of Formal Approaches to Automatic Video Shot Boundary Detection',
    venue:
      'International Journal of Advanced Research in Computer and Communication Engineering, Vol. 3(1)',
    type: 'Journal',
  },
  {
    id: 'j-invariant-moments',
    year: '2011',
    authors: 'Kalpana Thakre, Meenakshi Thalor',
    title: 'Video Retrieval System using Invariant Moments',
    venue: 'International Journal on Computer Science and Application, Sinhgad IBAR, Kondhwa',
    type: 'Journal',
  },
  {
    id: 'j-video-streaming',
    year: '2010',
    authors: 'Nitin Talhar, Kalpana Thakre',
    title:
      'Video Streaming Techniques for Reliable Video Conferencing Application over Communication Framework Architecture',
    venue: 'International Journal of Computer Science and Application (ITCSA-2010)',
    type: 'Journal',
  },
  {
    id: 'j-video-match',
    year: '2010',
    authors: 'Shimna Balkrishnan, Kalpana Thakre',
    title: 'Video Match Analysis: A Comprehensive Content-Based Video Retrieval System',
    venue: 'International Journal of Computer Science and Application (ITCSA-2010)',
    type: 'Journal',
  },
];
export const conferences: Publication[] = [
  {
    id: 'c-pcocare',
    year: '2020',
    authors: 'Vaidehi Thakre, Shreyas Vedpathak, Kalpana Thakre',
    title: 'PCOcare: PCOS Detection and Prediction using Machine Learning Algorithms',
    venue: 'ICIDC-2020, Helix Scientific Publisher',
    type: 'Conference',
  },
  {
    id: 'c-heart',
    year: '2020',
    authors: 'K. S. Thakre, Viraj Varale',
    title: 'Prediction of Heart Disease using Machine Learning Algorithm',
    venue: 'ICIDC-2020, Helix Scientific Publisher',
    type: 'Conference',
  },
  {
    id: 'c-elearning-aes',
    year: '2020',
    authors: 'Vaibhavi Pawar, Yash Pawar, Pranali Wagh, Abhishek Pujari, K. S. Thakre',
    title: 'E-learning on Cloud using Advanced Encryption Standards',
    venue: 'ICPC 2020 — International Conference on Pervasive Computing',
    type: 'Conference',
  },
  {
    id: 'c-cross-media',
    year: '2018',
    authors: 'Prachi Kohade, K. S. Thakare',
    title: 'Cross Media Retrieval using Mixed Generative Hashing Method',
    venue: 'iPGCON 2018, 9th PG Conference of Information Technology',
    type: 'Conference',
  },
  {
    id: 'c-online-exam-adaptive',
    year: '2018',
    authors: 'Tanvi Mehta, Simran Jain, K. S. Thakare',
    title: 'Android and Web-based Online Examination System using Smart Adaptive Algorithms',
    venue: 'IC3SE 2018, Zeal College of Engineering and Research, Pune',
    type: 'Conference',
  },
  {
    id: 'c-online-exam-survey',
    year: '2018',
    authors: 'Nikita Modi, Neeral Bhalgat, K. S. Thakare',
    title: 'Online Examination System: A Survey',
    venue: 'NCPC 2018, Sinhgad College of Engineering, Pune',
    type: 'Conference',
  },
  {
    id: 'c-social-delusion',
    year: '2017',
    authors: 'Dipali R. Dawande, K.S. Thakre',
    title:
      'Identifying Social Network Delusion to Investigate Addiction Ratio by Mining Social Media Data',
    venue: 'iPGCON-2017, 8th PG Conference of Information Technology',
    type: 'Conference',
  },
  {
    id: 'c-nsl-kdd',
    year: '2017',
    authors: 'Sujeet Raosaheb Suryawanshi, Kalpana Thakre',
    title:
      'Experimenting with NSL-KDD Cup 99 Dataset for Anomaly Detection using Machine Learning Technique: Random Forest',
    venue: 'iPGCON-2017, 8th PG Conference of Information Technology',
    type: 'Conference',
  },
  {
    id: 'c-text-preprocessing',
    year: '2017',
    authors: 'Dipali R. Dawande, K.S. Thakre',
    title: 'Text Preprocessing for Social Data Analysis',
    venue: 'NCRTACCS-2017',
    type: 'Conference',
  },
  {
    id: 'c-network-anomaly-model',
    year: '2017',
    authors: 'Sujeet Raosaheb Suryawanshi, Kalpana Thakre',
    title: 'Network Anomaly Detection System using Machine Learning Technique: A Proposed Model',
    venue: 'NCRTACCS-2017',
    type: 'Conference',
  },
  {
    id: 'c-video-partition-elsevier',
    year: '2015',
    authors: 'Kalpana S. Thakare, Archana M. Rajurkar, Ramchandra Manthalkar',
    title: 'Video Partitioning and Secured Keyframe Extraction of MPEG Video',
    venue:
      '1st International Conference on Information Security & Privacy, Procedia Computer Science, Elsevier',
    type: 'Conference',
  },
  {
    id: 'c-singing-humming-ranking',
    year: '2015',
    authors: 'Vyankatesh Kharat, Kalpana Thakare',
    title: 'Productive Outcome Ranking for Mobile Query by Singing / Humming',
    venue: 'IPGCON-2015, University of Pune, Amrutvahini College of Engg., Sangamner',
    type: 'Conference',
  },
  {
    id: 'c-forest-fire-auth',
    year: '2015',
    authors: 'Anwaya Patil, Kalpana Thakare, Kishor Sadafale',
    title: 'Securing Real Social Authentication System from Forest Fire Attacks',
    venue: 'IPGCON-2015, University of Pune, Amrutvahini College of Engg., Sangamner',
    type: 'Conference',
  },
  {
    id: 'c-social-trustee',
    year: '2015',
    authors: 'Anwaya Patil, Kalpana Thakare, Kishor Sadafale',
    title: 'A Survey on Real Social Trustee Based Authentication',
    venue: 'NCTR, Vol. 7, Issue 1, Anantrao Pawar College of Engg. & Research, Pune',
    type: 'Conference',
  },
  {
    id: 'c-cbvr-personalization',
    year: '2015',
    authors: 'Pradeep Chivadshetty, Kishor Sadafale, Kalpana Thakre',
    title:
      'Content-Based Video Retrieval using Integrated Feature Extraction and Personalization Results',
    venue: 'IEEE ICIP 2015',
    type: 'Conference',
    doi: '10.1109/INFOP.2015.7489372',
  },
  {
    id: 'c-anti-phishing',
    year: '2014',
    authors: 'Nagesh Soradge, K. S. Thakare',
    title: 'A Novel Anti-Phishing Framework on Cloud based on Visual Cryptography',
    venue: '12th IRF International Conference, Pune',
    type: 'Conference',
  },
  {
    id: 'c-cbvr-svd',
    year: '2012',
    authors: 'Kalpana S. Thakare, Archana M. Rajurkar, R. R. Manthalkar',
    title:
      'Content-Based Video Retrieval using Latent Semantic Indexing and Singular Value Decomposition',
    venue: 'ICCICT-2012, Sardar Vallabhbhai College of Engineering, Mumbai · IEEE',
    type: 'Conference',
    doi: '10.1109/ICCICT.2012.6398229',
  },
  {
    id: 'c-text-extraction-video',
    year: '2013',
    authors: 'Kalpana S. Thakare, Suwarna Baheti',
    title: 'A Key Feature as Text Extraction from Video',
    venue:
      'IEEE International Conference Advances in Research Engineering and Technology, KL University',
    type: 'Conference',
  },
  {
    id: 'c-football-events',
    year: '2011',
    authors: 'B.S. Khade, K.S. Thakre',
    title:
      'A Hierarchical Framework for Event Detection and Classification in Football Sports Video',
    venue: 'iCOST 2011, SSVPS B.S. Deore College of Engineering, Dhule',
    type: 'Conference',
  },
  {
    id: 'c-closeup-soccer',
    year: '2011',
    authors: 'B.S. Khade, K.S. Thakre',
    title: 'Close-up Detection based on Feature Analysis and Edge Detection for Soccer Video',
    venue: 'INCON 2011, ASM Group of Institutes, Pune',
    type: 'Conference',
  },
  {
    id: 'c-color-feature-integration',
    year: '2011',
    authors: 'Kalpana Thakre, Meenakshi Tholar',
    title: 'Integration of Color Feature Extraction Methods in Video Search System',
    venue: 'International Conference on Intelligent Systems and Data Processing, Gujarat',
    type: 'Conference',
  },
  {
    id: 'c-video-segmentation-novel',
    year: '2012',
    authors: 'Kalpana S. Thakare, Archana M. Rajurkar, R. R. Manthalkar',
    title: 'A Novel Approach to Video Segmentation for Video Data Organization and Retrieval',
    venue: 'NCIPET-2012',
    type: 'Conference',
  },
  {
    id: 'c-comprehensive-cbvr',
    year: '2011',
    authors: 'Kalpana S. Thakre, Archana M. Rajurkar',
    title: 'A Comprehensive CBVR System based on Spatiotemporal Features',
    venue: 'NSWCTC 2011, Wuhan, China · IEEE',
    type: 'Conference',
  },
  {
    id: 'c-effective-cbvr-conf',
    year: '2010',
    authors: 'Kalpana S. Thakre, Archana M. Rajurkar, R. R. Manthalkar',
    title: 'An Effective CBVR System based on Motion, Quantized Color and Edge Density Features',
    venue: "IITM '10, ACM, New York",
    type: 'Conference',
    doi: '10.1145/1963564.1963589',
  },
  {
    id: 'c-cbir-medical-review',
    year: '2010',
    authors: 'Kalpana S. Thakre, Archana M. Rajurkar',
    title: 'CBIR / CBVR in Medical Applications: A Critical Review',
    venue: '1st IFIP International Conference on Bioinformatics, SVNIT, Surat',
    type: 'Conference',
  },
  {
    id: 'c-video-segmentation-review',
    year: '2010',
    authors: 'Kalpana S. Thakre, Archana M. Rajurkar',
    title: 'Video Segmentation and Identification in Compressed Domain: A Review',
    venue: 'ICEI2K10, Panjab',
    type: 'Conference',
  },
  {
    id: 'c-cbir-medical-app',
    year: '2010',
    authors: 'Smita Sakhare, Kalpana Thakre',
    title: 'CBIR System: A Medical Application',
    venue: 'National Conference on Pervasive Computing',
    type: 'Conference',
  },
  {
    id: 'c-video-streaming-isccc',
    year: '2009',
    authors: 'Nitin Talhar, Kalpana Thakre',
    title:
      'Video Streaming Techniques for Reliable Video Conferencing Application over Communication Framework Architecture',
    venue: 'ISCCC 2009, Singapore',
    type: 'Conference',
  },
  {
    id: 'c-video-segmentation-indexing',
    year: '2008',
    authors: 'Kalpana Thakre, Sonali Potdar',
    title: 'Video Segmentation and Indexing in Compressed Domain: A Critical Review',
    venue: 'ICEMC2-2008, Infosys, Mysore',
    type: 'Conference',
  },
  {
    id: 'c-iris-low-far',
    year: '2007',
    authors: 'Archana Mire, Kalpana Thakre',
    title: 'Iris Recognition with Low False Acceptance Rate using Low Threshold Histogram Analysis',
    venue: 'IICT-2007, Dehradun Institute of Technology',
    type: 'Conference',
  },
  {
    id: 'c-iris-recognition',
    year: '2007',
    authors: 'Archana Mire, Kalpana Thakre',
    title: 'Iris Recognition',
    venue: 'NCET-2007, Institute of Technology and Science, Ghaziabad',
    type: 'Conference',
  },
  {
    id: 'c-cbir-color-shape',
    year: '2006',
    authors: 'Kalpana Thakre, Preeti Vodital',
    title: 'Content-Based Image Retrieval using Color and Shape',
    venue: 'IFToMM-2006, PCEA, Nagpur',
    type: 'Conference',
  },
];
export const publications: Publication[] = [...patents, ...journals, ...conferences];
export const publicationTypeOrder: PublicationType[] = ['Journal', 'Conference', 'Patent'];
export const pgUgProjects: string[] = [
  'Network anomaly detection system using machine learning algorithms',
  'Identifying social delusion to investigate addiction ratio by mining social data',
  "Mining social media data for understanding students' learning experiences",
  'Productive outcome ranking for mobile query by singing and humming',
  'Securing real social authentication',
  'A novel anti-phishing framework on cloud based on visual cryptography',
  'Performance evaluation of shot boundary detection algorithms',
  'Performance evaluation of video retrieval techniques',
  'Hierarchical event detection and classification for outdoor sports',
  'Sandboxing of suspicious Android software via static and dynamic analysis',
  'Novel e-learning approach using video segmentation',
  'Video Match: a video retrieval system',
  'Real-time, object-based video streaming for communication systems',
];
export const pcMemberRoles: string[] = [
  'Reviewer, APIT-2021, Bangkok, Thailand',
  'Reviewer, ICIDC-2020, Nagpur (27–28 Nov 2020)',
  'Speaker, APIT-2020, Bali, Indonesia',
  'Technical Co-Chair, ICPC-2020, SCOE, Pune',
  'Session Chair, ICCET 2020, MGM COE, Nanded',
  'Reviewer, IEEE Access, IEEE Digital Library (Jan 2020)',
  'External Examiner / Panel Member, Ph.D. Examination, MIT WPU, Kothrud',
  'Resource Person, "G Suite Components", Sant Gadge Baba Amravati University (Jun 2020)',
  'Judge, Tech-Pro International Project Competition, MIT Aurangabad (Jun 2020)',
  'TPC Member, IEEE INDIACom-2019, Mumbai',
  "PC Member & Reviewer, Springer 2nd Int'l Conf. on Image Processing & Pattern Recognition, 2018",
  "Reviewer, Journal of Engineering Science and Technology, Taylor's University (Scopus, 2018)",
  'Reviewer & Session Chair, Springer ICICC-2017, MIT, Pune',
  'Reviewer, IEEE ICISIM-2017, JNEC Aurangabad',
  'Registered Reviewer, International Journal for IJDBTM, Inderscience Publications (2016)',
  'Reviewer, ICCUBEA-2016, Pune (IEEE Digital Explore)',
  'Reviewer, Fuzzy Systems and Data Mining (FSDM-2017), Malaysia',
  'Reviewer & Session Chair, ICUC-2017, SCOE, Pune',
  'Session Chair & Reviewer, 7th iPGCON-2017, PCCOE, Pune',
  'Session Chair & Reviewer, 7th iPGCON-2016, SCOE, Pune',
  'Reviewer, RICE-2016, Nagpur (McGraw-Hill Publication)',
  'Chair of Session, ICISP-2015, Nagpur (McGraw-Hill Publication)',
  'Reviewer, ICCUBEA 2015, Pune (IEEE Digital Explore)',
  'Best Paper Award, "Video Partitioning and Secured Keyframe Extraction", ICISP-2015, Nagpur',
];
export const universityServices: string[] = [
  'Approved Ph.D. Guide, Savitribai Phule Pune University (SPPU)',
  'Chairman & paper setter — DBMS, BAI, Multimedia Technology (2018–2021)',
  'Asst. CAP Director, In-Sem Examination, SCOE, Pune (Aug 2017)',
  'Chairman, Database Management System & Software Laboratory-VI, BOS Pune',
  'External Senior Supervisor, Winter Examination 2016, JSPM Rajarshi Sahu College of Engineering',
  'Internal Senior Supervisor, Winter Examination 2016, Sinhgad College of Engineering, Vadgaon',
  'Chairman, Third Year Engineering — Multimedia Technologies (2012 Course)',
  'Paper setting, PG — Applied Algorithm (2008 Course)',
  'Paper setting, PG — Advanced Database Systems (2012 Course)',
  'Paper setting, UG — Database Management System (2008 Course)',
  'Paper setting, UG — Multimedia Technologies (2012 Course)',
  'Paper setting, UG — Management Information System (2008 Course)',
  'Paper assessment, PG — Applied Algorithm (2008 Course)',
  'Paper assessment, PG — Advanced Database Systems (2012 Course)',
  'Paper assessment, UG — Database Management System (2008 Course)',
  'Paper assessment, UG — Multimedia Technologies (2012 Course)',
  'Paper assessment, UG — Management Information System (2008 Course)',
  'Senior Supervisor, Winter Examination 2014, Cummins College of Engineering',
  'Coordinator, In-Semester CAP, Semester 1 (2014-15)',
];
export const coursesUG: string[] = [
  'Database Management Systems',
  'Data Mining and Warehousing',
  'Design and Analysis of Algorithms',
  'Artificial Intelligence',
  'Neural Networks and Expert Systems',
  'Software Architecture',
  'Management Information Systems',
  'Advanced Database Management Systems',
];
export const coursesPG: string[] = [
  'Applied Algorithms',
  'Advanced Distributed Systems',
  'Business Analytics and Intelligence',
];
export const technicalSkills: string[] = [
  'C++',
  'Java',
  'Oracle',
  'MySQL',
  'MongoDB',
  'Cassandra',
  'Amazon DynamoDB',
  'Visual Basic',
  'Python',
];
export const fdpOrganized: string[] = [
  'International Conference on Pervasive Computing (ICPC-2020), SCOE, Pune (13–14 Feb 2020)',
  'One-day workshop, "Project Design using MySQL/JAVA", SCOE (Sep 2019, ~100 students)',
  'One-day workshop, "Project Design using MongoDB/JAVA", SCOE (Oct 2018, ~98 students)',
  'International Conference on Ubiquitous Computing (ICUC-2017), SCOE, Pune (21–22 Jul 2017)',
  'Post Graduate Conference in coordination with SPPU, SCOE (Feb 2016)',
  'One-day workshop, "Android Application Development and Basics", SCOE (Mar 2016, ~100 students)',
  'One-day workshop, "Project Design using MongoDB/JAVA", SCOE (Sep 2016, ~100 students)',
  'Guest lecture, "Multimedia Technologies: 3D Animation" (Mar 2016, ~100 attendees)',
  'Two-day FDP with BOS (IT), Pune University — Elective-III Software Lab V & VI (Dec 2015, ~140 attendees)',
  'Two-day workshop, "Internet Security and Ethical Hacking", SCOE (Feb 2014, ~80 attendees)',
  'One-day workshop, "Project Design using MongoDB/JAVA", SCOE (Sep 2015, ~110 students)',
  'One-day workshop, "Project Design using MongoDB/JAVA", SCOE (Sep 2014, ~90 students)',
  'One-day workshop, "Oracle / VB.NET", SCOE (Jul 2013)',
  "Organizing committee member, iPGCON'11 Conference, Dept. of IT (Apr 2011)",
];
export const expertLectures: string[] = [
  'Resource person, Advanced Databases session, PICT (Jan 2022)',
  'Resource person, "Demo — POJO Class", STES training placement cell (Jan 2021)',
  'Speaker, APIT-2020, Bali, Indonesia',
  'Resource person, "G Suite Components", Sant Gadge Baba Amravati University (Jun 2020)',
  'Resource person, "GATE — Exam Database Systems", STES training placement cell (Apr 2020)',
  'Guest speaker, DBMS syllabus & lab (SL-VI), Maharshi Karve Cummins College of Engineering (Mar 2017)',
  'Trainer, 4-day FDP "Train the Trainer" on Database Management Systems (Jun 2016)',
  'Guest lecture, Video Processing, G. H. Raisoni College of Engineering, Nagpur (Jun 2015, PG)',
  'Guest lecture, Distributed Databases: Query Processing, RMD Sinhgad College of Engineering (Mar 2014, PG)',
  'Guest lecture, Normalization of Databases and Project Design, RMD Sinhgad College of Engineering (Feb 2014, UG)',
  'Lecture, Database Management System, "Train the Trainer" FDP, Sinhgad Institute of Technology, Lonavala',
  'Lecture, Feature Extraction of Color Images, FDP on Information Retrieval, Dept. of IT, SCOE, Vadgaon',
];
export const fdpAttended: string[] = [
  'One-week FDP, R-Language for Analytics Data Science, SCOE / IIT Bombay Chapter (Apr–May 2020)',
  'One-week FDP, Research Methodology and Tools, Sandip Institute of Technology, Nashik (May 2020)',
  'One-week FDP, Recent Trends in Database Technology, ACM Chapter & Shri Ramdeobaba College of Engineering, Nagpur (Jun 2020)',
  'Two-week STTP (ISTE), Advanced Materials and Latest Trends in Computer Technology, PCEA, Nagpur (Oct–Nov 2001)',
  'Two-week STTP (ISTE), Mechatronics and Its Industrial Exposure to IT Industry, PCEA, Nagpur (Oct 2001)',
  'One-week STTP (AICTE-ISTE), GNU/Linux at Work, PCEA, Nagpur (May 2004)',
  'FDP (TEQIP), Distributed Systems and Information Retrieval, SCOE, Pune (Feb 2012)',
  'One-week training, Microsoft Technologies, Persistent Systems Ltd. (Jun 2008)',
  'Four-day training, OOAD using UML with Rational Software Architect, IBM Software Education Ltd. (Oct 2009)',
  'Three-day training, GOF Design Patterns: Software Architecture, Persistent Systems Ltd. (Sep 2015)',
  'Two-day FDP, Big Data and Business Intelligence, Persistent Systems Ltd. (Jun 2012)',
  "One-day FDP, Database Management System, JSPM's RSCOE (Jul 2014)",
  'One-day workshop, Restructuring of TE-IT Syllabus 2008 Course, PCCCOE, Pune (Feb 2010)',
];
export const areasOfInterest: string[] = [
  'Advanced Databases',
  'NoSQL Databases',
  'Business Analytics & Intelligence',
  'Data Science & Data Mining',
  'Advanced Algorithms',
  'Machine Learning',
  'Image / Video Processing & Retrieval',
];
export const achievements: string[] = [
  'VIWA-2018 Award — Distinguished Women in Information Technology',
  'Best Paper Award (Ph.D. Category) — "Video Partitioning and Secured Keyframe Extraction of MPEG Video", 1st International Conference on Information Security & Privacy, Procedia Computer Science, Elsevier, 2015',
];
export const researchGrants: string[] = [
  'BCUD, Pune: ₹53,000 grant (2016-18) — "Flexible Video Surveillance and Retrieval of Content-Based Video using Moving Object Detection"',
  'BCUD, Pune: ₹2,00,000 grant (2010-12) — "Content-Based Video Retrieval System: An Application to the Education Field"',
  'AICTE: Summer/Winter School proposal on Information Retrieval (2017), in progress',
];
export const researchParticipation: string[] = [
  'TPC Member, IEEE INDIACom-2019, Mumbai',
  "PC Member & Reviewer, Springer 2nd Int'l Conf. on Image Processing & Pattern Recognition, 2018",
  "Reviewer, Journal of Engineering Science and Technology, Taylor's University (Scopus, 2018)",
  'Reviewer & Session Chair, Springer ICICC-2017, MIT, Pune',
  'Reviewer, IEEE ICISIM-2017, JNEC Aurangabad',
  'Registered Reviewer, IJDBTM, Inderscience Publications (2016)',
  'Reviewer, ICCUBEA-2016, Pune (IEEE Digital Explore)',
  'Reviewer, Fuzzy Systems and Data Mining (FSDM-2017), Malaysia',
  'Reviewer & Session Chair, ICUC-2017, SCOE, Pune',
  'Session Chair & Reviewer, 7th iPGCON-2017, PCCOE, Pune',
  'Session Chair & Reviewer, 7th iPGCON-2016, SCOE, Pune',
  'Reviewer, RICE-2016, Nagpur (McGraw-Hill Publication)',
  'Chair of Session, ICISP-2015, Nagpur (McGraw-Hill Publication)',
  'Reviewer, ICCUBEA 2015, Pune (IEEE Digital Explore)',
  'Best Paper Award, "Video Partitioning and Secured Keyframe Extraction", ICISP-2015, Nagpur',
];
export const professionalMemberships: string[] = [
  'IEEE Professional Member — 80612094',
  'ISTE (Indian Society for Technical Education) — LM27925',
  'CSI (Computer Society of India) — LM 001 480-39',
];
export const rolesAndResponsibilities: string[] = [
  'Technical Chair, International Conference on Pervasive Computing 2019',
  'Coordinator, Student Development Committee (2017, 2019)',
  'Coordinator, Monitoring and Coordination Committee (2018)',
  'Member, Internal Academic Monitoring Committee (2016–2019)',
  'Registered Reviewer, Elsevier Journal (2017 onwards)',
  'Senior Supervisor, SPPU Examination (2016, 2017, 2018)',
  'Chairman, Multimedia Technologies (2015–2019)',
  'Chairman, Business Intelligence and Analytics (2017–2019)',
  'Adjunct Professor, CSE, MGMCOE Nanded (2017–19)',
  'Member, Anti-Ragging Committee (2016-17)',
  'Member, Women Harassment Cell (2016)',
  'Subject Chairman, Question Paper Audit Committee (2013–2019)',
  'Core Committee Member, NBA Preparation Work — UG & PG (2007)',
  'Member, NAAC Committee (2016-17)',
  'PG Coordinator / Co-coordinator, M.Tech. CSE (2007), ME IT (2010, 2014, 2016)',
  'Coordinator, Train the Trainer Workshops (2014–2018)',
  'Coordinator, Workshop on Project Design (2009–2019)',
  'Coordinator, Sinhgad Karandak (2017–2019)',
  'Coordinator, Techtonic (2017–2019)',
  'AICTE R&D Funding Proposal Committee (2017, 2019)',
  'Member, Examination Committee (2012)',
  'Member, Board of Studies, CSE (2005–2006)',
  'Member, R&D Committee (2007–2009)',
];
export const textListSections: TextListSection[] = [
  {
    id: 'university-services',
    title: 'University Services',
    eyebrow: 'Institutional Service',
    items: universityServices,
  },
  { id: 'technical-skills', title: 'Technical Skills', eyebrow: 'Toolkit', items: technicalSkills },
  {
    id: 'fdp-organized',
    title: 'FDP / Seminars / Workshops Organized',
    eyebrow: 'Organized',
    items: fdpOrganized,
  },
  {
    id: 'expert-lectures',
    title: 'Invited Expert Lectures',
    eyebrow: 'Invited Talks',
    items: expertLectures,
  },
  {
    id: 'fdp-attended',
    title: 'FDP / SDP / STTP Attended',
    eyebrow: 'Continuing Education',
    items: fdpAttended,
    intro: 'TEQIP / AICTE / ISTE sponsored programs — 60+ attended; selected highlights below.',
  },
  {
    id: 'area-of-interest',
    title: 'Area of Interest',
    eyebrow: 'Focus Areas',
    items: areasOfInterest,
  },
  { id: 'achievements', title: 'Achievements', eyebrow: 'Recognition', items: achievements },
  {
    id: 'research-grants',
    title: 'Research Grants',
    eyebrow: 'Funded Research',
    items: researchGrants,
  },
  {
    id: 'research-participation',
    title: 'Research Participation',
    eyebrow: 'Editorial & Review Service',
    items: researchParticipation,
  },
  {
    id: 'professional-membership',
    title: 'Professional Membership',
    eyebrow: 'Affiliations',
    items: professionalMemberships,
  },
  {
    id: 'roles',
    title: 'Roles & Responsibilities',
    eyebrow: 'Institutional Roles',
    items: rolesAndResponsibilities,
  },
];
function calculateTotalYears(experienceItems: ExperienceItem[]): string {
  let earliestStart: Date | null = null;
  let latestEnd: Date | null = new Date();
  experienceItems.forEach((item) => {
    const parts = item.period.split(' — ');
    if (parts.length !== 2) return;
    const startStr = parts[0].trim();
    const endStr = parts[1].trim();
    const startDate = parseDateString(startStr);
    const endDate = endStr.toLowerCase() === 'present' ? new Date() : parseDateString(endStr);
    if (startDate) {
      if (!earliestStart || startDate < earliestStart) {
        earliestStart = startDate;
      }
    }
    if (endDate) {
      if (!latestEnd || endDate > latestEnd) {
        latestEnd = endDate;
      }
    }
  });
  if (!earliestStart || !latestEnd) {
    earliestStart = new Date('24-07-1997');
  }
  const months =
    (latestEnd.getFullYear() - earliestStart.getFullYear()) * 12 +
    (latestEnd.getMonth() - earliestStart.getMonth());
  const years = Math.floor(months / 12);
  return `${years}+`;
}
function parseDateString(dateStr: string): Date | null {
  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  // Clean the string
  const clean = dateStr.trim();
  // Try format: "24 Jan 2022"
  const parts = clean.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  // Try format: "Feb 2016" or "Jul 1996"
  if (parts.length === 2) {
    const month = months[parts[0]];
    const year = parseInt(parts[1]);
    if (month !== undefined && !isNaN(year)) {
      return new Date(year, month, 1);
    }
  }
  // Try format: "2026"
  if (parts.length === 1) {
    const year = parseInt(parts[0]);
    if (!isNaN(year)) {
      return new Date(year, 0, 1);
    }
  }
  // Try parsing as Date directly (for "July 2026" format)
  const date = new Date(clean);
  if (!isNaN(date.getTime())) {
    return date;
  }
  return null;
}
export const stats: StatItem[] = [
  { id: 'experience', value: calculateTotalYears(experience), label: 'Years in Academia' },
  { id: 'publications', value: `${publications.length}`, label: 'Publications' },
  { id: 'patents', value: `${patents.length}`, label: 'Patents Filed' },
  {
    id: 'grants',
    value: `${researchProjects.filter((p) => p.status === 'Completed' || p.status === 'Ongoing').length}`,
    label: 'Research Grants',
  },
  { id: 'students', value: '90+', label: 'Students Guided' },
  { id: 'phd', value: '6', label: 'Current Ph.D. Scholars' },
];
