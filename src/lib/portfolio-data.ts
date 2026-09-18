// src/lib/portfolio-data.ts
// [HANDOFF] Minimal-diff, zero-data-loss consolidation.

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
export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  organization?: string;
}
export type PublicationType = 'Journal' | 'Conference' | 'Book Chapter';
export interface Publication {
  id: string;
  year: string;
  authors: string;
  title: string;
  venue: string;
  type: PublicationType;
  doi?: string;
  citations?: number;
  sources?: string[];
}
export interface TextListSection {
  id: string;
  title: string;
  eyebrow: string;
  items: string[];
  intro?: string;
}
export interface CoAuthor {
  id: string;
  name: string;
  affiliation: string;
  verifiedEmail: string;
  scholarId: string;
}
export interface PatentItem {
  id: string;
  year: string;
  authors: string;
  title: string;
  venue: string;
}

export const profile = {
  name: 'Dr. Kalpana Sunil Thakre',
  formalName: 'Dr. Mrs. Kalpana Sunil Thakre',
  title: 'Dean – Research & Development, Computer Engineering',
  qualification: 'Ph.D. in Computer Science & Engineering',
  institution: 'Marathwada Mitra Mandal College of Engineering, Pune',
  emails: ['kalpana_sunil@yahoo.com', 'ksthakre@ieee.org', 'kalpanathakre@ieee.org'],
  image: '/profile.png',
  summary:
    'Dean – Research & Development at MMCOE, previously Professor & Head of the Computer Engineering Department with three decades of teaching, research, and academic leadership across video retrieval, machine learning, and database systems. SPPU-recognized Ph.D. guide, published author of 70+ works, and named IEEE, ISTE, and CSI professional member.',
  researchInterests: [
    'Advanced Databases',
    'Algorithms',
    'Applied Algorithms',
    'Automation & Control Systems',
    'Business Analytics & Intelligence',
    'Computer Vision',
    'Data Mining & Warehousing',
    'Data Science',
    'Database Management',
    'Image/Video Processing',
    'Imaging Science & Photographic Technology',
    'Machine Learning',
    'Multimedia Technology',
    'NoSQL Databases',
    'Software Architecture',
  ],
};

export const socialLinks: SocialLink[] = [
  { id: 'email', label: 'Email', href: 'mailto:kalpana_sunil@yahoo.com', brandColor: '#111111' },
  {
    id: 'google-scholar',
    label: 'Google Scholar',
    href: 'https://scholar.google.co.in/citations?user=iY3D3IIAAAAJ',
    brandColor: '#4285F4',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dr-kalpana-thakre-1a809616/',
    brandColor: '#0A66C2',
  },
  {
    id: 'orcid',
    label: 'ORCID',
    href: 'https://orcid.org/0000-0002-8830-9509',
    brandColor: '#A6CE39',
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
    id: 'vidwan',
    label: 'Vidwan',
    href: 'https://vidwan.inflibnet.ac.in/profile/416635',
    brandColor: '#1E6B52',
  },
];

export const navItems: NavItem[] = [
  { id: 'home', label: 'Overview' },
  { id: 'stats', label: 'Statistics', shortLabel: 'Stats' },
  { id: 'education', label: 'Academic Qualification', shortLabel: 'Education' },
  { id: 'experience', label: 'Academic Experience', shortLabel: 'Experience' },
  { id: 'research-grants', label: 'Research Grants' },
  { id: 'patents', label: 'Patents' },
  { id: 'publications', label: 'Publications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'fdp-organized', label: 'FDP / Workshops Organized' },
  { id: 'co-authors', label: 'Co-authors' },
  { id: 'pg-ug-guidance', label: 'PG / UG Guidance' },
  { id: 'pc-member', label: 'PC Member / Editor / Reviewer' },
  { id: 'university-services', label: 'University Services' },
  { id: 'courses-taught', label: 'Courses Taught' },
  { id: 'expert-lectures', label: 'Invited Expert Lectures' },
  { id: 'fdp-attended', label: 'FDP / SDP / STTP Attended' },
  { id: 'professional-membership', label: 'Professional Membership' },
  { id: 'roles', label: 'Roles & Responsibilities' },
];

export const statToSectionMap: Record<string, string> = {
  experience: 'experience',
  publications: 'publications',
  patents: 'patents',
  grants: 'research-grants',
  students: 'pg-ug-guidance',
  phd: 'pg-ug-guidance',
};

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
    year: '1989-1993',
  },
];

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
    id: 'scoe-assoc',
    role: 'Associate Professor, Department of Information Technology',
    organization: 'Sinhgad College of Engineering (Vadgaon Bk.), Pune',
    period: '15 Sept 2006 — 24 Jan 2022',
  },
  {
    id: 'scoe-prof',
    role: 'Professor, Department of Information Technology',
    organization: 'Sinhgad College of Engineering (Vadgaon Bk.), Pune',
    period: 'Feb 2016 — Jan 2022',
  },
  {
    id: 'pcea',
    role: 'Assistant Professor, Department of Computer Technology',
    organization: 'Priyadarshini College of Engineering and Architecture, Nagpur',
    period: '24 Jul 1996 — 10 Sept 2006',
  },
  {
    id: 'temple',
    role: 'Visiting Researcher',
    organization: 'Temple University',
    period: '2018 — 2019',
  },
  {
    id: 'rto',
    role: 'Research Scholar',
    organization: 'Rabindranath Tagore University',
    period: '2016 — 2020',
  },
];

export const coAuthors: CoAuthor[] = [
  {
    id: 'bhute',
    name: 'Avinash N Bhute',
    affiliation: 'Associate Professor',
    verifiedEmail: 'Verified email at sakec.ac.in',
    scholarId: 'zkNv9GsAAAAJ',
  },
  {
    id: 'rajurkar',
    name: 'Dr. Archana Milind Rajurkar',
    affiliation: 'Professor and Head, Department of CSE',
    verifiedEmail: 'Verified email at mgmcen.ac.in',
    scholarId: 'HySW_cUAAAAJ',
  },
  {
    id: 'thalor',
    name: 'Dr. Meenakshi A. Thalor',
    affiliation: 'Information Technology AISSMS IOIT',
    verifiedEmail: 'Verified email at aissmsioit.org',
    scholarId: 'rFZjNxcAAAAJ',
  },
  {
    id: 'sadafale',
    name: 'Kishor Sadafale',
    affiliation: 'Assistant Professor, Government College of Engineering and Research, Avasari',
    verifiedEmail: 'Verified email at gcoeara.ac.in',
    scholarId: 'PC7HOBkAAAAJ',
  },
  {
    id: 'talhar',
    name: 'Nitin Talhar',
    affiliation: 'SPPU, Assistant Professor AISSMS College of Engineering',
    verifiedEmail: 'Verified email at aissmscoe.com',
    scholarId: 'EUzN7qAAAAAJ',
  },
  {
    id: 'manthalkar',
    name: 'Ramchandra Manthalkar',
    affiliation: 'SGGSIET, Vishnupuri Nanded',
    verifiedEmail: 'Verified email at sggs.ac.in',
    scholarId: 'VNYCr_QAAAAJ',
  },
  {
    id: 'vthakre',
    name: 'Vaidehi Thakre',
    affiliation: 'MIT World Peace University',
    verifiedEmail: 'Verified email at mitwpu.edu.in',
    scholarId: 'PlVJ0GoAAAAJ',
  },
];

export const researchGrants: ResearchProject[] = [
  {
    id: 'bcud-2010',
    title: 'Content-Based Video Retrieval System: An Application to the Education Field',
    funder: 'BCUD, Pune',
    amount: '₹2,00,000',
    period: '2010-12',
    description: 'Research proposal submitted to and funded by BCUD, Pune.',
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
    id: 'aicte-rps-2025',
    title:
      'AI driven Assistive Technologies for Enhancing Accessibility and Communication among Differently Abled Marathi Speaker',
    funder: 'AICTE — Research Promotion Scheme (RPS)',
    amount: '₹29,00,000',
    period: '2025-27',
    description:
      'Funded project under AICTE Research Promotion Scheme 2025. Principal Investigator: Dr. Kalpana Thakre. Co-PIs: Dr. Smita Chaudhari, Dr. Girija Chiddarwar. Research Fellow: Ms. Madhuri Kumbhar.',
    status: 'Ongoing',
  },
];

export const achievements: AchievementItem[] = [
  {
    id: 'video-partition-best-paper',
    year: '2015',
    title:
      'Best Paper Award (Ph.D. Category) — "Video Partitioning and Secured Keyframe Extraction of MPEG Video"',
    organization:
      '1st International Conference on Information Security & Privacy, Procedia Computer Science, Elsevier',
  },
  {
    id: 'viwa',
    year: '2018',
    title: 'VIWA Award — Distinguished Women in Information Technology',
    organization: 'VIWA',
  },
  {
    id: 'pcocare-best-paper',
    year: '2020',
    title:
      'Best Paper Award — "PCOcare: PCOS Detection and Prediction using Machine Learning Algorithms"',
    organization: 'ICIDC-2020, Helix Scientific Publisher',
  },
  {
    id: 'uttam-adhyapika',
    year: '2021',
    title: 'Uttam Adhyapika Award',
    organization: 'Bharat Education Excellence Awards, Education & Research',
  },
];

export const patents: PatentItem[] = [
  {
    id: 'patent-social-delusion',
    year: '2017',
    authors: 'Dipali Dawande, K. S. Thakre',
    title:
      'Identifying Social Network Delusion to Investigate Addiction Ratio by Mining Social Media Data',
    venue: 'Indian Patent Office Journal · Application ID 201721027114',
  },
  {
    id: 'patent-anomaly',
    year: '2017',
    authors: 'Sujeet Suryavanshi, Kalpana Thakre',
    title: 'Online Anomaly Detection based on Ensemble of Heterogeneous Classifiers',
    venue: 'Indian Patent Journal · Application No. 201721035142',
  },
  {
    id: 'patent-skincare',
    year: '2021',
    authors: 'Narsimha Banothu, Kalpana Sunil Thakare',
    title: 'Optimised Skin Care Product Recommendation System based on SVM-based Machine Learning',
    venue: 'Indian Patent Office Journal · Application No. 202141035032 A',
  },
];

// =========================================================================
// Publication deduplication.
// =========================================================================

type RawPublication = Publication & { sources: string[] };

const journalPublications: RawPublication[] = [
  { id: 'j-2025-tido', year: '2025', authors: 'S. Patra, A. Chatterjee, K. Thakre, et al.', title: 'Development of Effective Analysis of a High Gain Triad Input Dual Output DC-DC Converter for Microgrid Application', venue: 'International Journal of Engineering, 38(8), pp.1809-1813', type: 'Journal', citations: 1, sources: ['journal'] },
  { id: 'j-2025-genai', year: '2025', authors: 'M. Shafiq, K. Thakre, R. Pandurangan, R.V.S. Lalitha', title: 'Generative AI designs the next generation of smart materials from pixels to products', venue: 'The International Journal of Advanced Manufacturing Technology (Early Access)', type: 'Journal', citations: 24, sources: ['journal'] },
  { id: 'j-2024-sentiment', year: '2024', authors: 'P.V. Kulkarni, K.S. Thakre', title: 'Developing sentiment lexicon for Marathi: A comprehensive survey and analysis', venue: 'Journal of Information and Optimization Sciences, Vol. 45(4), pp.1141-1152', type: 'Journal', citations: 3, doi: '10.47974/JIOS-1698', sources: ['journal'] },
  { id: 'j-2024-privacy', year: '2024', authors: 'Y.S. Narule, K.S. Thakre', title: 'Privacy preservation using optimized Federated Learning: A critical survey', venue: 'Intelligent Decision Technologies, Vol. 18(1), pp.135-149', type: 'Journal', citations: 5, sources: ['journal'] },
  { id: 'j-2024-heart-disease', year: '2024', authors: 'P. Nancy, P.R. Mutkule, K.S. Thakre, A.S. Ladkat, S.B.G.T. Babu, S.L. Bangare, et al.', title: 'Machine learning and feature selection-enabled optimized technique for heart disease classification and prediction', venue: 'Computer Assisted Methods in Engineering and Science, 31(4), pp.419-429', type: 'Journal', citations: 17, sources: ['journal'] },
  { id: 'j-2024-jestr', year: '2024', authors: 'M. Kumbhar, K. Thakre', title: 'Jestr r', venue: 'Journal of Engineering Science and Technology Review, 17(1), pp.63-70', type: 'Journal', citations: 12, sources: ['journal'] },
  { id: 'j-2023-quality', year: '2023', authors: 'M. Shafiq, K. Thakre, K.R. Krishna, N.J. Robert, A. Kuruppath, D. Kumar', title: 'Continuous quality control evaluation during manufacturing using supervised learning algorithm for Industry 4.0', venue: 'The International Journal of Advanced Manufacturing Technology, pp.1-10', type: 'Journal', citations: 35, sources: ['journal'] },
  { id: 'j-2023-hidden', year: '2023', authors: 'K.S. Umadevi, K.S. Thakare, S. Patil, R. Raut, A.K. Dwivedi, A. Haldorai', title: 'Dynamic hidden feature space detection of noisy image set by weight binarization', venue: 'Signal, Image and Video Processing, Vol. 17(3), pp.761-768', type: 'Journal', citations: 17, sources: ['journal'] },
  { id: 'j-2023-epileptic-review', year: '2023', authors: 'A.G. Ghule, K.S. Thakre, S. Chudhari, G. Chiddarwar', title: 'Detection of neurological disorder epileptic seizures using various approaches: A review', venue: 'International Journal of Intelligent Systems and Applications in Engineering', type: 'Journal', citations: 2, sources: ['journal'] },
  { id: 'j-2022-cardiac-mri', year: '2022', authors: 'A.D.K. Thakre', title: 'Detection of Cardiac Abnormalities in MRI using Generative Adversarial Network', venue: 'Industrial Engineering Journal, 15(12)', type: 'Journal', sources: ['journal'] },
  { id: 'j-2022-autism-survey', year: '2022', authors: 'S. Kumbhar, V. Torawane, K. Thakre, T. Landge', title: 'A Survey on Detection and Prediction of Autism disorder using Machine learning approaches', venue: 'International Journal of Research and Analytical Reviews, 4(9)', type: 'Journal', sources: ['journal'] },
  { id: 'j-2022-bi-healthcare', year: '2022', authors: '', title: 'Business Intelligence and its use in the Health care sector', venue: 'International Journal of Enterprise Computing and Business Systems, 2(12)', type: 'Journal', sources: ['journal'] },
  { id: 'j-2021-digital-india-bct', year: '2021', authors: 'P. Deshmukh, G. Kulkarni, V.T. Meezan Shaikh, K.S. Thakare', title: 'Digital India Digital Economy using BCT', venue: 'International Journal, 6(6)', type: 'Journal', citations: 1, sources: ['journal'] },
  { id: 'j-pcocare', year: '2020', authors: 'K. Thakre, V. Thakre, S. Vedpathak, S. Sonawani', title: 'PCOcare: PCOS Detection and Prediction using Machine Learning Algorithms', venue: 'Bioscience Biotechnology Research Communications, 13(14), pp.240-244', type: 'Journal', citations: 115, sources: ['journal'] },
  { id: 'j-heart', year: '2020', authors: 'V.S. Varale, K.S. Thakre', title: 'Prediction of Heart Disease using Machine Learning Algorithm', venue: 'Bioscience Biotechnology Research Communications, 13(14), pp.287-290', type: 'Journal', citations: 2, sources: ['journal'] },
  { id: 'j-community-qa', year: '2020', authors: 'S. Sonawane, K.S. Thakare, V. Kolte, P. Jejurkar', title: 'Predicting Best Answer in Community Question', venue: 'Test Engineering and Management Journal, 83, pp.200-209', type: 'Journal', sources: ['journal'] },
  { id: 'j-elearning-cloud', year: '2020', authors: 'V. Pawar, K.S. Thakre, A. Pujari, P. Wagh, Y. Pawar', title: 'E-learning on Cloud using Advanced Encryption Standard', venue: 'International Journal of Embedded Systems and Emerging Technologies, 6(1), pp.17-27', type: 'Journal', sources: ['journal'] },
  { id: 'j-online-exam-survey', year: '2018', authors: 'N. Modi, N. Bhalgat, K.S. Thakre', title: 'Online Examination System: A Survey', venue: 'CiiT International Journal of Software Engineering and Technology, 10(6)', type: 'Journal', sources: ['journal'] },
  { id: 'j-shot-boundary', year: '2017', authors: 'K.S. Thakre, A.M. Rajurkar', title: 'Shot Boundary Detection of MPEG Video using Biorthogonal Wavelet Transform', venue: 'International Journal of Pure and Applied Mathematics', type: 'Journal', citations: 3, sources: ['journal'] },
  { id: 'j-network-anomaly', year: '2017', authors: 'S.R. Suryawanshi, K.S. Thakre', title: 'Network Anomaly Detection System Using Machine Learning Technique: A Proposed Model', venue: 'International Journal of Applied Engineering and Technology, 7(1), pp.32-40', type: 'Journal', sources: ['journal'] },
  { id: 'j-mmdata', year: '2017', authors: 'P. Kohade, K.S. Thakre', title: 'Multimedia Data Mining — A Survey', venue: 'International Journal of Innovative Research in Computer and Communication Engineering, Vol. 5(12)', type: 'Journal', doi: '10.15680/IJIRCCE.2017.0512057', sources: ['journal'] },
  { id: 'j-video-partition', year: '2016', authors: 'K.S. Thakre, A.M. Rajurkar, R.R. Manthalkar', title: 'Video partitioning and secured keyframe extraction of MPEG video', venue: 'Procedia Computer Science, 78, pp.790-798', type: 'Journal', citations: 38, doi: '10.1016/j.procs.2016.02.058', sources: ['journal'] },
  { id: 'j-smart-parking', year: '2016', authors: 'V.D. Ichake, P.D. Shitole, M. Momin, K.S. Thakare', title: 'Smart car parking system based on IoT concept', venue: 'International Journal of Engineering Science Invention, 5(3), pp.48-54', type: 'Journal', citations: 12, sources: ['journal'] },
  { id: 'j-flexible-surveillance', year: '2016', authors: 'S. Anwekar, I. Walimbe, P. Suryagan, A. Gujarathi, K. Thakre', title: 'Flexible Content Based Video Surveillance System for crime Prevention based on moving object detection', venue: 'IJCSIT International Journal of Computer Science and Information Technology', type: 'Journal', citations: 3, sources: ['journal'] },
  { id: 'j-mining-social-media', year: '2016', authors: 'K.S. Thakre, D. Dawande', title: 'Mining Online Social Media Data: A Survey', venue: 'International Journal of Applied Engineering and Technology, 6(4), pp.1-8', type: 'Journal', sources: ['journal'] },
  { id: 'j-singing-humming', year: '2015', authors: 'V. Kharat, K. Thakare, K. Sadafale', title: 'A survey on query by singing/humming', venue: 'International Journal of Computer Applications, 111(14), pp.39-42', type: 'Journal', citations: 5, sources: ['journal'] },
  { id: 'j-visual-crypto', year: '2014', authors: 'N. Soradge, K.S. Thakre', title: 'A Short Review on Various Visual Cryptography Schemes', venue: 'International Journal of Computer Science and Business Informatics, 12(1)', type: 'Journal', citations: 6, sources: ['journal'] },
  { id: 'j-shot-boundary-review', year: '2014', authors: 'A. Hattarge, K.S. Thakre', title: 'Analysis and Review of Formal Approaches to Automatic Video Shot Boundary Detection', venue: 'International Journal of Advanced Research in Computer and Communication Engineering', type: 'Journal', citations: 3, sources: ['journal'] },
  // [RESTORED] Missing journal from source CV.
  { id: 'j-2013-text-extract', year: '2013', authors: 'Suvarna Baheti, K.S. Thakare', title: 'A Novel based text extraction, recognition from digital E-Videos', venue: 'International Journal of Innovative Research in Computer and Communication Engineering, Vol. 1, Issue 5', type: 'Journal', sources: ['journal'] },
  { id: 'j-cbvr-lsi', year: '2012', authors: 'K.S. Thakare, A.M. Rajurkar, R.R. Manthalkar', title: 'Content based Video Retrieval using Latent Semantic Indexing and Color, Motion and Edge Features', venue: 'International Journal of Computer Applications, 54(12), pp.42-48', type: 'Journal', citations: 1, doi: '10.5120/8621-2486', sources: ['journal'] },
  { id: 'j-effective-cbvr', year: '2011', authors: 'K.S. Thakre, A.M. Rajurkar, R. Manthalkar', title: 'An effective CBVR system based on Motion, Quantized color and edge density features', venue: 'International Journal of Computer Science & Information Technology, 3(2), pp.78-92', type: 'Journal', citations: 10, doi: '10.1145/1963564.1963589', sources: ['journal'] },
  { id: 'j-invariant-moments', year: '2011', authors: 'M.A. Thalor, A.N. Bhute, K.S. Thakre, V.C. Sanap', title: 'Video Retrieval System using Invariant Moments', venue: 'International Journal of Computer Science and Application, 10, pp.20-30', type: 'Journal', citations: 1, sources: ['journal'] },
  { id: 'j-spatiotemporal', year: '2011', authors: 'K.S. Thakre, A.M. Rajurkar, R.R. Manthalkar', title: 'A Comprehensive System Based on Spatiotemporal Features Such as Motion, Quantized Color and Edge Features', venue: 'International Journal of Wireless and Microwave Technologies (IJWMT)', type: 'Journal', sources: ['journal'] },
  { id: 'j-video-match', year: '2010', authors: 'S. Balkrishnan, K.S. Thakre', title: 'Video Match Analysis: A Comprehensive Content based Video Retrieval System', venue: 'International Journal of Computer Science and Application', type: 'Journal', citations: 5, sources: ['journal'] },
];

const conferencePublications: RawPublication[] = [
  { id: 'j-2026-sentiwordnet', year: '2026', authors: 'P.V. Kulkarni, K.S. Thakre, R. Joshi', title: 'SentiWordNet: Word Polarity Transfer', venue: 'Proceedings of International Conference on Communication and Computational Technologies', type: 'Conference', sources: ['conference'] },
  { id: 'j-2026-sports-polarity', year: '2026', authors: 'P. Kulkarni, K. Thakre, S. Borse, P. Raut', title: 'A Web Based Crowdsourcing System for Polarity Analysis in Marathi Sports News', venue: '2026 International Conference on Sustainable and Futuristic Technologies', type: 'Conference', sources: ['conference'] },
  { id: 'j-2026-autism', year: '2026', authors: 'S. Vanshiv, K. Thakre', title: 'A Systematic Review of Multimodal AI and Explainable Deep Learning Techniques for Autism Spectrum Disorder Detection', venue: '2026 International Conference on Sustainable and Futuristic Technologies', type: 'Conference', sources: ['conference'] },
  { id: 'j-2026-code-mixed', year: '2026', authors: 'M. Kumbhar, K. Thakre', title: 'Evaluating Machine Learning Models for Sentiment Analysis in Marathi–English Code-Mixed and Script-Mixed Text', venue: '2026 International Conference on Sustainable and Futuristic Technologies', type: 'Conference', sources: ['conference'] },
  { id: 'j-2026-os-automation', year: '2026', authors: 'L. Akhadkar, K. Thakre, A. Kulkarni, P. Kadam, V. Damle', title: 'A Distributed Framework for Cross-Device OS Automation using Multi-Agent Systems', venue: '2026 International Conference on Sustainable and Futuristic Technologies', type: 'Conference', sources: ['conference'] },
  { id: 'j-2026-xai-finance', year: '2026', authors: 'M.V. Kakde, S. Chaudhari, K.S. Thakre, G.G. Chiddarwar, R.V. Chaukate', title: 'A Systematic Review of Explainable AI Methods in Financial Decision-Making and Compliance-Driven Applications', venue: '2026 International Conference on Sustainable and Futuristic Technologies', type: 'Conference', sources: ['conference'] },
  { id: 'j-2025-marathi-dataset-conf', year: '2025', authors: 'M. Kumbhar, K. Thakre, R. Joshi', title: 'Marathi Code-Mixed and Script-Mixed Dataset: A Novel Resource for Language Processing with Evaluation', venue: 'International Conference on Artificial Intelligence and Networking, pp.32-43', type: 'Conference', sources: ['conference'] },
  { id: 'j-2025-learning-framework', year: '2025', authors: 'Y.S. Narule, K.S. Thakre', title: 'Learning Framework: Reducing Rounds via Adaptive Model Aggregation', venue: 'Innovations and Advances in Cognitive Systems: ICIACS 2025, Volume 2, pp.361', type: 'Conference', sources: ['conference'] },
  { id: 'j-2025-epileptic', year: '2025', authors: 'A.G. Ghule, K.S. Thakre', title: 'A Machine Learning and Deep Learning Approach for Epileptic Seizure Detection', venue: '1st International Conference on Lifespan Innovation (ICLI 2025), pp.126-134', type: 'Conference', sources: ['conference'] },
  { id: 'j-2025-kabuki', year: '2025', authors: 'N. Jagruti, K. Thakre, G. Chiddarwar, S. Chaudhary', title: 'Kabuki Syndrome Diagnosis and Analysis using PhenoBCBERT and PhenoGPT', venue: '1st International Conference on Lifespan Innovation (ICLI 2025), pp.101-109', type: 'Conference', sources: ['conference'] },
  { id: 'j-2025-federated', year: '2025', authors: 'Y.S. Narule, K.S. Thakre', title: 'Federated Learning with Weighted Averaging Enabled a Hybrid Deep Learning Model for Healthcare to Predict Patient Actions', venue: 'International Conference on Computing and Communication Networks, pp.327-338', type: 'Conference', sources: ['conference'] },
  { id: 'j-2025-communication-efficient', year: '2025', authors: 'Y.S. Narule, K.S. Thakre', title: 'A Communication-Efficient Federated Learning Framework: Reducing Rounds via Adaptive Model Aggregation', venue: 'International Conference on Innovations and Advances in Cognitive Systems', type: 'Conference', sources: ['conference'] },
  { id: 'j-2025-marathi-sentiwordnet', year: '2025', authors: 'P.V. Kulkarni, K.S. Thakre, R. Joshi', title: 'Toward a Multi-domain Marathi SentiWordNet: Word Polarity Transfer and Ensemble-Based Evaluation', venue: 'International Conference on Communication and Computational Technologies', type: 'Conference', sources: ['conference'] },
  { id: 'j-2025-pdf-extractor', year: '2025', authors: 'S. Kulkarni, K. Thakre, V. Kulkarni, A. Pandit, A. Naik', title: 'Artificial Intelligence Based PDF and Document Extractor Using Retrieval Augmented Generation', venue: '1st International Conference on Lifespan Innovation (ICLI 2025), pp.428-435', type: 'Conference', citations: 1, sources: ['conference'] },
  { id: 'j-2025-roman-marathi-conf', year: '2025', authors: 'M. Kumbhar, K. Thakre, R. Joshi', title: 'Enhancing Roman Marathi Transliteration with Phonetic Variations for Error Rectification', venue: 'International Conference on Computing and Communication Networks, pp.260-269', type: 'Conference', sources: ['conference'] },
  { id: 'j-social-delusion', year: '2020', authors: 'K.S. Thakre, D. Dawande, V.S. Thakre', title: 'Identifying Social Network Delusion to Investigate Addiction Ratio using Data Mining', venue: 'ACM International Conference Proceeding Series, DOI: 10.1145/3379310.3379321', type: 'Conference', citations: 3, doi: '10.1145/3379310.3379321', sources: ['conference'] },
  { id: 'j-cbvr-personalization', year: '2015', authors: 'P. Chivadshetti, K. Sadafale, K. Thakare', title: 'Content based video retrieval using integrated feature extraction and personalization of results', venue: '2015 IEEE International Conference on Information Processing (ICIP), pp.170-175', type: 'Conference', citations: 14, doi: '10.1109/INFOP.2015.7489372', sources: ['conference'] },
  { id: 'j-cbvr-svd', year: '2012', authors: 'K.S. Thakare, A.M. Rajurkar, R. Manthalkar, D. Deshpande', title: 'Video retrieval using singular value decomposition and latent semantic indexing', venue: '2012 IEEE International Conference on Communication, Information & Computing Technology (ICCICT)', type: 'Conference', citations: 2, doi: '10.1109/ICCICT.2012.6398229', sources: ['conference'] },
  { id: 'j-video-streaming', year: '2009', authors: 'N.R. Talhar, K.S. Thakare', title: 'Real-time and Object-based Video Streaming Techniques with Application to Communication System', venue: 'ISCCC', type: 'Conference', citations: 1, sources: ['conference'] },
  // [RESTORED] Missing conference publications from source CV.
  { id: 'c-2018-cross-media', year: '2018', authors: 'P. Kohade, K.S. Thakare', title: 'Cross Media retrieval using mixed generative hashing method', venue: '9th PG Conference of Information Technology (iPGCON 2018)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2018-android-exam', year: '2018', authors: 'T. Mehta, S. Jain, K.S. Thakare', title: 'Android and Web-based Online Examination System using Smart Adaptive Algorithms', venue: 'International Conference on Communication, Computing, Storage and Energy (IC3SE) 2018, Zeal College of Engineering and Research, Pune', type: 'Conference', sources: ['conference'] },
  { id: 'c-2018-online-exam-ncpc', year: '2018', authors: 'N. Modi, N. Bhalgat, K.S. Thakare', title: 'Online Examination System: A Survey', venue: 'National Conference on Pervasive Computing (NCPC) 2018, Sinhgad College of Engineering, Pune', type: 'Conference', sources: ['conference'] },
  { id: 'c-2017-social-delusion-ipgcon', year: '2017', authors: 'D.R. Dawande, K.S. Thakre', title: 'Identifying Social Network Delusion to Investigate Addiction Ratio by Mining Social Media Data', venue: 'iPGCON-2017, 8th Post Graduate Conference of Information Technology, 5 April 2017', type: 'Conference', sources: ['conference'] },
  { id: 'c-2017-nsl-kdd', year: '2017', authors: 'S.R. Suryawanshi, K. Thakre', title: 'Experimenting with NSL KDD Cup 99 dataset for Anomaly Detection using Machine Learning Technique: Proposed model using Random Forest', venue: 'iPGCON-2017, 8th Post Graduate Conference of Information Technology, 5 April 2017', type: 'Conference', sources: ['conference'] },
  { id: 'c-2017-text-preprocess', year: '2017', authors: 'D.R. Dawande, K.S. Thakre', title: 'Text Preprocessing For Social Data Analysis', venue: 'National Conference on Recent Trends and Advances in Computing Communication and Security (NCRTACCS-2017)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2017-network-anomaly-ncrtaccs', year: '2017', authors: 'S.R. Suryawanshi, K. Thakre', title: 'Network Anomaly Detection System using Machine Learning Technique: A Proposed Model', venue: 'National Conference on Recent Trends and Advances in Computing Communication and Security (NCRTACCS-2017)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2015-singing-ranking', year: '2015', authors: 'V. Kharat, K. Thakare', title: 'Productive outcome ranking for mobile query by singing/humming', venue: 'IPGCON-2015, 4th Post Graduate Conference, University of Pune, Amrutvahini College of Engineering, Sangamner, Nashik (24–25 March 2015)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2015-real-social-auth', year: '2015', authors: 'A. Patil, K. Thakare, K. Sadafale', title: 'Securing Real Social Authentication System from Forest Fire Attacks', venue: 'IPGCON-2015, 4th Post Graduate Conference, University of Pune, Amrutvahini College of Engineering, Sangamner, Nashik (24–25 March 2015)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2015-social-trustee', year: '2015', authors: 'A. Patil, K. Thakare, K. Sadafale', title: 'A Survey on Real Social Trustee Based Authentication', venue: 'National Conference on Technical Revolution (NCTR), Vol. 7, Issue 1, Anantrao Pawar College of Engineering & Research, Pune (9–10 January 2015)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2014-antiphishing', year: '2014', authors: 'N. Soradge, K.S. Thakare', title: 'A Novel Anti Phishing Framework on Cloud based on Visual Cryptography', venue: '12th IRF International Conference, Pune, 29 June 2014', type: 'Conference', sources: ['conference'] },
  { id: 'c-2013-text-extract-conf', year: '2013', authors: 'K.S. Thakare, S. Baheti', title: 'A key feature as Text Extraction from Video', venue: 'IEEE International Conference on Advances in Research in Engineering and Technology (ICARET), K L University, Vijaywada (8–9 February 2013)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2011-football-event', year: '2011', authors: 'B.S. Khade, K.S. Thakre', title: 'A Hierarchical Framework for Event Detection and Classification in Football Sports Video', venue: 'iCOST 2011, SSVPS B. S. Deore College of Engineering, Dhule (13–15 January 2011)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2011-closeup-detection', year: '2011', authors: 'B.S. Khade, K.S. Thakre', title: 'Close-up detection based on feature analysis and edge detection against skin color (like backgrounds) for soccer video', venue: 'INCON 2011, ASM Group of Institutes, Pune (12–13 March 2011)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2011-color-feature-integration', year: '2011', authors: 'K. Thakre, M. Tholar', title: 'Integration of Color Feature Extraction Methods in Video Search System', venue: 'International Conference on Intelligent Systems and Data Processing, G.H. Patel College of Engineering and Technology, Vallabh VidyaNagar, Gujarat (24–25 January 2011)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2011-color-texture-integration', year: '2011', authors: 'K. Thakre, et al.', title: 'Video Retrieval System using Integration of Color and Texture Feature Extraction Methods', venue: 'Ongoing Research in Management and IT, ASM Group of Institutes (12–13 March 2011)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2012-video-segmentation', year: '2012', authors: 'K.S. Thakre, A.M. Rajurkar, R.R. Manthalkar', title: 'A Novel Approach to Video Segmentation for Video Data Organization and Retrieval', venue: 'National Conference on Innovative Paradigms in Engineering and Technology (NCIPET-2012)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2010-hierarchical-event', year: '2010', authors: 'B.S. Khade, K.S. Thakre', title: 'Algorithms for Hierarchical Event Detection and Classification for Video', venue: 'National Conference on Pervasive Computing (NCPC) 2010, SCOE Pune (9–10 April 2010)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2011-nswctc', year: '2011', authors: 'K.S. Thakre, A.M. Rajurkar', title: 'A Comprehensive CBVR system based on Spatiotemporal Features such as Motion, Quantized color and Edge Density Features', venue: 'The 3rd International Conference on Networks Security, Wireless Communications and Trusted Computing (NSWCTC 2011), Wuhan, China (IEEE)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2010-cbir-cbvr-medical', year: '2010', authors: 'K.S. Thakre, A.M. Rajurkar', title: 'CBIR/CBVR In Medical Applications: A Critical Review', venue: 'Proceedings of the First IFIP International Conference on Bioinformatics, SVNIT, Surat (25–28 March 2010)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2010-video-seg-compressed', year: '2010', authors: 'K.S. Thakre, A.M. Rajurkar', title: 'Video Segmentation and Identification in Compressed Domain: A Review', venue: 'International Conference on Engineering Innovations — A Flip to Economics Development (ICEI2K10), Jalwera Campus, Punjab', type: 'Conference', sources: ['conference'] },
  { id: 'c-2010-cbir-medical', year: '2010', authors: 'S. Sakhare, K. Thakre', title: 'CBIR System: A Medical Application', venue: 'National Conference on Pervasive Computing (NCPC), 9–10 April 2010', type: 'Conference', sources: ['conference'] },
  { id: 'c-2010-hierarchical-detection', year: '2010', authors: 'B. Khade, K. Thakre', title: 'Algorithms for Hierarchical Event Detection and Classification for Video', venue: 'NCPC2010, SCOE Pune, 9–10 April 2010', type: 'Conference', sources: ['conference'] },
  { id: 'c-2008-video-seg-indexing', year: '2008', authors: 'K. Thakre, S. Potdar', title: 'Video Segmentation and Indexing in Compressed Domain: A Critical Review', venue: 'ICEMC2-2008, Third International Innovative Conference on Embedded Systems, Mobile Communication and Computing, Infosys, Mysore (11–14 August 2008)', type: 'Conference', sources: ['conference'] },
  { id: 'c-2007-iris-low-far', year: '2007', authors: 'A. Mire, K. Thakre', title: 'Iris recognition with low false acceptance rate using low threshold histogram analysis using Euler vector', venue: 'IICT-2007, International Conference on Information and Communication Technology, Dehradun Institute of Technology, Dehradun', type: 'Conference', sources: ['conference'] },
  { id: 'c-2007-iris-recognition', year: '2007', authors: 'A. Mire, K. Thakre', title: 'Iris recognition', venue: 'NCET-2007, National Conference on Emerging Technologies & Trends in IT, Institute of Technology and Science, Ghaziabad', type: 'Conference', sources: ['conference'] },
  { id: 'c-2006-cbir-color-shape', year: '2006', authors: 'K. Thakre, P. Vodital', title: 'Content based image retrieval using color and shape', venue: 'IFToMM-2006 International Conference on Recent Trends in Automation and its Application to Industries, PCEA, Nagpur', type: 'Conference', sources: ['conference'] },
];

const bookChapterPublications: RawPublication[] = [
  { id: 'j-2026-roman-marathi', year: '2026', authors: 'M. Kumbhar, K. Thakre, R. Joshi', title: 'Enhancing Roman Marathi Transliteration with Phonetic Variations for Error Rectification', venue: 'Book Chapter, DOI: 10.1007/978-3-032-14186-6_26', type: 'Book Chapter', doi: '10.1007/978-3-032-14186-6_26', sources: ['book-chapter'] },
  { id: 'j-2026-marathi-dataset', year: '2026', authors: 'M. Kumbhar, K. Thakre, R. Joshi', title: 'Marathi Code-Mixed and Script-Mixed Dataset: A Novel Resource for Language Processing with Evaluation', venue: 'Book Chapter, DOI: 10.1007/978-3-032-24926-5_4', type: 'Book Chapter', doi: '10.1007/978-3-032-24926-5_4', sources: ['book-chapter'] },
  { id: 'j-2022-blockchain', year: '2022', authors: 'K.S. Thakre, G. Kulkarni, P.S. Deshmukh', title: 'Digital India Digital Economy Using Blockchain Technology', venue: 'Blockchain for Smart Systems, pp.123-153', type: 'Book Chapter', citations: 5, sources: ['book-chapter'] },
];

const normalizeTitle = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const dedupePublications = (records: RawPublication[]): Publication[] => {
  const result: Publication[] = [];
  const byDoi = new Map<string, Publication>();

  for (const r of records) {
    if (r.doi) {
      const existing = byDoi.get(r.doi);
      if (existing) {
        existing.citations = Math.max(existing.citations ?? 0, r.citations ?? 0) || undefined;
        existing.sources = Array.from(new Set([...(existing.sources ?? []), ...r.sources]));
        if (!existing.authors && r.authors) existing.authors = r.authors;
        continue;
      }
      const merged: Publication = { ...r, sources: [...r.sources] };
      byDoi.set(r.doi, merged);
      result.push(merged);
      continue;
    }
    const normTitle = normalizeTitle(r.title);
    const key = `${normTitle}|${r.year}|${normalizeTitle(r.venue)}`;
    const existing = result.find(
      (x) => `${normalizeTitle(x.title)}|${x.year}|${normalizeTitle(x.venue)}` === key,
    );
    if (existing) {
      existing.citations = Math.max(existing.citations ?? 0, r.citations ?? 0) || undefined;
      existing.sources = Array.from(new Set([...(existing.sources ?? []), ...r.sources]));
      if (!existing.authors && r.authors) existing.authors = r.authors;
      continue;
    }
    result.push({ ...r, sources: [...r.sources] });
  }
  return result;
};

export const publications: Publication[] = dedupePublications([
  ...journalPublications,
  ...conferencePublications,
  ...bookChapterPublications,
]).sort((a, b) => Number(b.year) - Number(a.year));

export const publicationTypeOrder: PublicationType[] = ['Journal', 'Conference', 'Book Chapter'];

export const pgUgProjects: string[] = [
  'A novel anti-phishing framework on cloud based on visual cryptography',
  'Hierarchical event detection and classification for outdoor sports',
  'Identifying social delusion to investigate addiction ratio by mining social data',
  "Mining social media data for understanding students' learning experiences",
  'Network anomaly detection system using machine learning algorithms',
  'Novel e-learning approach using video segmentation',
  'Performance evaluation of shot boundary detection algorithms',
  'Performance evaluation of video retrieval techniques',
  'Productive outcome ranking for mobile query by singing and humming',
  'Real-time, object-based video streaming for communication systems',
  'Sandboxing of suspicious Android software via static and dynamic analysis',
  'Securing real social authentication',
  'Video Match: a video retrieval system',
];

export const pcMemberRoles: string[] = Array.from(
  new Set<string>([
    'Best Paper Award, "Video Partitioning and Secured Keyframe Extraction", ICISP-2015, Nagpur',
    'Chair of Session, ICISP-2015, Nagpur (McGraw-Hill Publication)',
    'External Examiner / Panel Member, Ph.D. Examination, MIT WPU, Kothrud',
    'Judge, Tech-Pro International Project Competition, MIT Aurangabad (Jun 2020)',
    "PC Member & Reviewer, Springer 2nd Int'l Conf. on Image Processing & Pattern Recognition, 2018",
    'Registered Reviewer, International Journal for IJDBTM, Inderscience Publications (2016)',
    'Resource Person, "G Suite Components", Sant Gadge Baba Amravati University (Jun 2020)',
    'Reviewer & Session Chair, ICUC-2017, SCOE, Pune',
    'Reviewer & Session Chair, Springer ICICC-2017, MIT, Pune',
    'Reviewer, APIT-2021, Bangkok, Thailand',
    'Reviewer, Fuzzy Systems and Data Mining (FSDM-2017), Malaysia',
    'Reviewer, ICCUBEA 2015, Pune (IEEE Digital Explore)',
    'Reviewer, ICCUBEA-2016, Pune (IEEE Digital Explore)',
    'Reviewer, ICIDC-2020, Nagpur (27–28 Nov 2020)',
    'Reviewer, IEEE Access, IEEE Digital Library (Jan 2020)',
    'Reviewer, IEEE ICISIM-2017, JNEC Aurangabad',
    "Reviewer, Journal of Engineering Science and Technology, Taylor's University (Scopus, 2018)",
    'Reviewer, RICE-2016, Nagpur (McGraw-Hill Publication)',
    'Session Chair & Reviewer, 7th iPGCON-2016, SCOE, Pune',
    'Session Chair & Reviewer, 7th iPGCON-2017, PCCOE, Pune',
    'Session Chair, ICCET 2020, MGM COE, Nanded',
    'Speaker, APIT-2020, Bali, Indonesia',
    'Technical Co-Chair, ICPC-2020, SCOE, Pune',
    'TPC Member, IEEE INDIACom-2019, Mumbai',
    'Registered Reviewer, IJDBTM, Inderscience Publications (2016)',
  ]),
);

export const universityServices: string[] = [
  'Approved Ph.D. Guide, Savitribai Phule Pune University (SPPU)',
  'Asst. CAP Director, In-Sem Examination, SCOE, Pune (Aug 2017)',
  'Chairman & paper setter — DBMS, BAI, Multimedia Technology (2018–2021)',
  'Chairman, Database Management System & Software Laboratory-VI, BOS Pune',
  'Chairman, Third Year Engineering — Multimedia Technologies (2012 Course)',
  'Coordinator, In-Semester CAP, Semester 1 (2014-15)',
  'External Senior Supervisor, Winter Examination 2016, JSPM Rajarshi Sahu College of Engineering',
  'Internal Senior Supervisor, Winter Examination 2016, Sinhgad College of Engineering, Vadgaon',
  'Paper assessment, PG — Advanced Database Systems (2012 Course)',
  'Paper assessment, PG — Applied Algorithm (2008 Course)',
  'Paper assessment, UG — Database Management System (2008 Course)',
  'Paper assessment, UG — Management Information System (2008 Course)',
  'Paper assessment, UG — Multimedia Technologies (2012 Course)',
  'Paper setting, PG — Advanced Database Systems (2012 Course)',
  'Paper setting, PG — Applied Algorithm (2008 Course)',
  'Paper setting, UG — Database Management System (2008 Course)',
  'Paper setting, UG — Management Information System (2008 Course)',
  'Paper setting, UG — Multimedia Technologies (2012 Course)',
  'Senior Supervisor, Winter Examination 2014, Cummins College of Engineering',
];

export const coursesUG: string[] = [
  'Advanced Database Management Systems',
  'Artificial Intelligence',
  'Data Mining and Warehousing',
  'Database Management Systems',
  'Design and Analysis of Algorithms',
  'Management Information Systems',
  'Neural Networks and Expert Systems',
  'Software Architecture',
];

export const coursesPG: string[] = [
  'Advanced Distributed Systems',
  'Applied Algorithms',
  'Business Analytics and Intelligence',
];

export const fdpOrganized: string[] = [
  'Guest lecture, Multimedia Technologies: 3D Animation (Mar 2016, ~100 attendees)',
  'International Conference on Pervasive Computing (ICPC-2020), SCOE, Pune (13–14 Feb 2020)',
  'International Conference on Ubiquitous Computing (ICUC-2017), SCOE, Pune (21–22 Jul 2017)',
  'One-day workshop, Android Application Development and Basics, SCOE (Mar 2016, ~100 students)',
  'One-day workshop, Internet Security and Ethical Hacking, SCOE (Feb 2014, ~80 attendees)',
  'One-day workshop, Oracle / VB.NET, SCOE (Jul 2013)',
  'One-day workshop, Project Design using MongoDB/JAVA, SCOE (Oct 2018, ~98 students)',
  'One-day workshop, Project Design using MongoDB/JAVA, SCOE (Sep 2014, ~90 students)',
  'One-day workshop, Project Design using MongoDB/JAVA, SCOE (Sep 2015, ~110 students)',
  'One-day workshop, Project Design using MongoDB/JAVA, SCOE (Sep 2016, ~100 students)',
  'One-day workshop, Project Design using MySQL/JAVA, SCOE (Sep 2019, ~100 students)',
  "Organizing committee member, iPGCON'11 Conference, Dept. of IT (Apr 2011)",
  'Post Graduate Conference in coordination with SPPU, SCOE (Feb 2016)',
  'Two-day FDP with BOS (IT), Pune University — Elective-III Software Lab V & VI (Dec 2015, ~140 attendees)',
];

export const expertLectures: string[] = [
  'Guest lecture, Distributed Databases: Query Processing, RMD Sinhgad College of Engineering (Mar 2014, PG)',
  'Guest lecture, Feature Extraction of Color Images, FDP on Information Retrieval, Dept. of IT, SCOE, Vadgaon',
  'Guest lecture, Normalization of Databases and Project Design, RMD Sinhgad College of Engineering (Feb 2014, UG)',
  'Guest lecture, Video Processing, G. H. Raisoni College of Engineering, Nagpur (Jun 2015, PG)',
  'Guest speaker, DBMS syllabus & lab (SL-VI), Maharshi Karve Cummins College of Engineering (Mar 2017)',
  'Lecture, Database Management System, Train the Trainer FDP, Sinhgad Institute of Technology, Lonavala',
  'Resource person, Advanced Databases session, PICT (Jan 2022)',
  'Resource person, "Demo — POJO Class", STES training placement cell (Jan 2021)',
  'Resource person, "G Suite Components", Sant Gadge Baba Amravati University (Jun 2020)',
  'Resource person, "GATE — Exam Database Systems", STES training placement cell (Apr 2020)',
  'Speaker, APIT-2020, Bali, Indonesia',
  'Trainer, 4-day FDP Train the Trainer on Database Management Systems (Jun 2016)',
];

export const fdpAttended: string[] = [
  'FDP (TEQIP), Distributed Systems and Information Retrieval, SCOE, Pune (Feb 2012)',
  'Four-day training, OOAD using UML with Rational Software Architect, IBM Software Education Ltd. (Oct 2009)',
  "One-day FDP, Database Management System, JSPM's RSCOE (Jul 2014)",
  'One-day workshop, Restructuring of TE-IT Syllabus 2008 Course, PCCCOE, Pune (Feb 2010)',
  'One-week FDP, R-Language for Analytics Data Science, SCOE / IIT Bombay Chapter (Apr–May 2020)',
  'One-week FDP, Recent Trends in Database Technology, ACM Chapter & Shri Ramdeobaba College of Engineering, Nagpur (Jun 2020)',
  'One-week FDP, Research Methodology and Tools, Sandip Institute of Technology, Nashik (May 2020)',
  'One-week STTP (AICTE-ISTE), GNU/Linux at Work, PCEA, Nagpur (May 2004)',
  'One-week training, Microsoft Technologies, Persistent Systems Ltd. (Jun 2008)',
  'Three-day training, GOF Design Patterns: Software Architecture, Persistent Systems Ltd. (Sep 2015)',
  'Two-day FDP, Big Data and Business Intelligence, Persistent Systems Ltd. (Jun 2012)',
  'Two-week STTP (ISTE), Advanced Materials and Latest Trends in Computer Technology, PCEA, Nagpur (Oct–Nov 2001)',
  'Two-week STTP (ISTE), Mechatronics and Its Industrial Exposure to IT Industry, PCEA, Nagpur (Oct 2001)',
];

export const professionalMemberships: string[] = [
  'CSI (Computer Society of India) — LM 001 480-39',
  'IEEE Professional Member — 80612094',
  'ISTE (Indian Society for Technical Education) — LM27925',
];

// [RESTORED] Roles & Responsibilities expanded back to full source list.
export const rolesAndResponsibilities: string[] = [
  'Adjunct Professor, CSE, MGMCOE Nanded (2017–19)',
  'AICTE R&D Funding Proposal Committee (2017, 2019)',
  'Chairman, Business Intelligence and Analytics (2017–2019)',
  'Chairman, Multimedia Technologies (2015–2019)',
  'Chairman for Software Laboratory-1 (2017, 2018)',
  'Coordinator, Sinhgad Karandak (2017–2019)',
  'Coordinator, Student Development Committee (2017, 2019)',
  'Coordinator, Techtonic (2017–2019)',
  'Coordinator, Train the Trainer Workshops (2014–2018)',
  'Coordinator, Workshop on Project Design (2009–2019)',
  'Coordinator, Monitoring and Coordination Committee (2018)',
  'Coordinator, Social Visit (2016–2019)',
  'Coordinator, Student Feedback (2015, 2018)',
  'Coordinator, Dead Stock Verification Committee (2014–2018)',
  'Core Committee Member, NBA Preparation Work — UG & PG (2007)',
  'External Senior Supervisor, SPPU Examination (2017)',
  'In-charge UG Projects (2007, 2008, 2009)',
  'Member, Advisory Committee / Technical Committee / Organizing Committee / Reviewer for various International Conferences (2015–2019)',
  'Member, Anti-Ragging Committee (2016-17)',
  'Member, Best Student Selection Committee (2015)',
  'Member, Board of Studies, CSE (2005–2006)',
  'Member, CEP Committee (2006–2009)',
  'Member, Examination Committee (2012)',
  'Member, Exam Flying Squad (2009, 2011)',
  'Member, Internal Academic Monitoring Committee (2016–2019)',
  'Member, NAAC Committee (2016-17)',
  'Member, Physical Stock Verification (2006–2009)',
  'Member, Procurement Committee (2007–2011)',
  'Member, R&D Committee (2007–2009)',
  'Member, Research Progress Committee, M.Tech. (CSE) (2008, 2015)',
  'Member, Student Feedback (2007-08)',
  'Member, UG Admission Committee, ARC (2007, 2008)',
  'Member, Women Harassment Cell (2016)',
  'PG Admission M.Tech. (CSE) & Interview Committee (2006–2007)',
  'PG Coordinator / Co-coordinator, M.Tech. CSE (2007), ME IT (2010, 2014, 2016)',
  'Registered Reviewer, Elsevier Journal (2017 onwards)',
  'Result Processing Committee (2010–2013)',
  'Senior Supervisor, SPPU Examination (2016, 2017, 2018)',
  'Subject Chairman, Question Paper Audit Committee (2013–2019)',
  'Technical Chair, International Conference on Pervasive Computing 2019',
];

export const textListSectionsTop: TextListSection[] = [
  {
    id: 'fdp-organized',
    title: 'FDP / Seminars / Workshops Organized',
    eyebrow: 'Organized',
    items: fdpOrganized,
  },
];

export const textListSectionsMiddle: TextListSection[] = [
  {
    id: 'pc-member',
    title: 'PC Member / Editor / Reviewer',
    eyebrow: 'Service',
    items: pcMemberRoles,
  },
  {
    id: 'university-services',
    title: 'University Services',
    eyebrow: 'Institutional Service',
    items: universityServices,
  },
];

export const textListSectionsBottom: TextListSection[] = [
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
      if (!earliestStart || startDate < earliestStart) earliestStart = startDate;
    }
    if (endDate) {
      if (!latestEnd || endDate > latestEnd) latestEnd = endDate;
    }
  });
  if (!earliestStart || !latestEnd) earliestStart = new Date('24-07-1997');
  const months =
    (latestEnd.getFullYear() - earliestStart.getFullYear()) * 12 +
    (latestEnd.getMonth() - earliestStart.getMonth());
  return `${Math.floor(months / 12)}+`;
}

function parseDateString(dateStr: string): Date | null {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const clean = dateStr.trim();
  const parts = clean.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) return new Date(year, month, day);
  }
  if (parts.length === 2) {
    const month = months[parts[0]];
    const year = parseInt(parts[1]);
    if (month !== undefined && !isNaN(year)) return new Date(year, month, 1);
  }
  if (parts.length === 1) {
    const year = parseInt(parts[0]);
    if (!isNaN(year)) return new Date(year, 0, 1);
  }
  const date = new Date(clean);
  return isNaN(date.getTime()) ? null : date;
}

export const stats: StatItem[] = [
  { id: 'experience', value: calculateTotalYears(experience), label: 'Years in Academia' },
  { id: 'publications', value: `${publications.length}`, label: 'Publications' },
  { id: 'patents', value: `${patents.length}`, label: 'Patents Filed' },
  {
    id: 'grants',
    value: `${researchGrants.filter((p) => p.status === 'Completed' || p.status === 'Ongoing').length}`,
    label: 'Research Grants',
  },
  { id: 'students', value: '90+', label: 'Students Guided' },
  { id: 'phd', value: '6', label: 'Current Ph.D. Scholars' },
  { id: 'citations', value: '347', label: 'Total Citations' },
  { id: 'hindex', value: '10', label: 'h-index' },
];