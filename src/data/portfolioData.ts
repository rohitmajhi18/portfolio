export interface CapabilityItem {
  id: string;
  opBadge: string;
  team: 'red-team' | 'blue-team';
  title: string;
  description: string;
  icon: string;
  tags: { name: string; accent?: 'cyan' | 'emerald' | 'crimson' | 'red-soft' }[];
}

export interface ProjectArchNode {
  id: string;
  title: string;
  sub: string;
  width?: number;
}

export interface ProjectItem {
  id: string;
  tag: string;
  date: string;
  badge: string;
  liveUrl: string;
  liveLabel: string;
  title: string;
  description: string;
  architectureTitle: string;
  architectureStatusIdle: string;
  architectureStatusActive: string;
  nodes: ProjectArchNode[];
  techTags: { name: string; accent?: 'cyan' | 'emerald' | 'crimson' | 'red-soft' }[];
  primaryCta: { label: string; url: string };
  secondaryCta: { label: string; url: string };
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'security-ops' | 'tools-platforms' | 'core-domains' | 'programming-auto';
  categoryLabel: string;
  indicator: 'cyan' | 'red' | 'emerald';
}

export interface SimulationItem {
  id: string;
  company: string;
  date: string;
  title: string;
  description: string;
  techTags: { name: string; accent?: 'cyan' | 'emerald' | 'crimson' | 'red-soft' }[];
  certTitle: string;
  certIssuer: string;
  certType: 'pdf' | 'img' | 'image';
  certSrc: string;
  certGrade: string;
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  score: string;
  hasCert?: boolean;
  certSrc?: string;
  certTitle?: string;
}

export interface CertificationItem {
  id: string;
  issuer: string;
  period: string;
  title: string;
  score: string;
  certType: 'pdf' | 'img' | 'image';
  certSrc: string;
  certGrade: string;
}

export const OPERATOR_PROFILE = {
  name: "Rohit Majhi",
  handle: "rohitmajhi18",
  headline: "Rohit Majhi",
  tagline: "Securing Networks, Cloud Infrastructure & AI-Driven Defense.",
  summary: "Cybersecurity professional specializing in penetration testing, vulnerability assessment, and AI-driven intrusion detection systems. Skilled in network defense, cloud security, Python, Kali Linux and Risk Assessment.",
  location: "Hooghly, West Bengal, India 712405",
  availability: "Open to Cybersecurity Analyst & Penetration Tester Roles",
  operatorId: "OPERATOR: RM-712405",
  clearance: "CLEARANCE: LEVEL 4",
  email: "rohit629510@gmail.com",
  phone: "+91 6295103573",
  github: "https://github.com/rohitmajhi18",
  linkedin: "https://linkedin.com/in/rohit-majhi18/",
  stats: [
    { num: "10+", label: "Enterprise Job Simulations" },
    { num: "02", label: "Flagship Architectures" },
    { num: "10+", label: "Verified Credentials" },
    { num: "12+", label: "Core Security Tools" }
  ]
};

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: "cap-pentest",
    opBadge: "RED TEAM // OFFENSIVE",
    team: "red-team",
    title: "Penetration Testing & Ethical Hacking",
    description: "Conducting systematic network penetration testing and web application vulnerability exploitation aligned with the OWASP Top 10 framework. Leveraging Kali Linux, Metasploit, Burp Suite, and Nmap to discover vulnerabilities, evaluate attack vectors, and strengthen infrastructure defenses.",
    icon: "ShieldAlert",
    tags: [
      { name: "Kali Linux", accent: "crimson" },
      { name: "Metasploit" },
      { name: "Burp Suite" },
      { name: "Nmap" },
      { name: "OWASP Top 10" }
    ]
  },
  {
    id: "cap-vulnerability",
    opBadge: "BLUE TEAM // AUDIT",
    team: "blue-team",
    title: "Vulnerability Assessment & Risk Management",
    description: "Executing vulnerability assessments using Nessus and specialized network scanners. Mapping discovered exposures against enterprise risk matrices, applying CVSS scoring, and engineering risk-mitigated remediation roadmaps to safeguard sensitive digital assets.",
    icon: "Search",
    tags: [
      { name: "Nessus", accent: "cyan" },
      { name: "Risk Matrix" },
      { name: "Cryptography" },
      { name: "CVSS Scoring" }
    ]
  },
  {
    id: "cap-ai-ids",
    opBadge: "HYBRID // DEFENSE AI",
    team: "blue-team",
    title: "AI-Powered Intrusion Detection (AI-IDS)",
    description: "Architecting machine-learning threat classification pipelines that ingest live PCAP telemetry and network flow logs. Harnessing Scikit-learn algorithms to distinguish anomalous traffic from benign flows with high precision and low false-positive rates.",
    icon: "Cpu",
    tags: [
      { name: "Scikit-learn", accent: "emerald" },
      { name: "Python" },
      { name: "Wireshark" },
      { name: "PCAP Telemetry" }
    ]
  },
  {
    id: "cap-cloud-soc",
    opBadge: "BLUE TEAM // CLOUD SEC",
    team: "blue-team",
    title: "Cloud SOC & Automated Incident Response",
    description: "Engineering event-driven security architectures on AWS. Ingesting GuardDuty alerts, CloudTrail events, and VPC Flow Logs through EventBridge into Lambda functions for automated threat normalization, S3 JSON auditing, and rapid EC2 security group isolation.",
    icon: "Cloud",
    tags: [
      { name: "AWS GuardDuty", accent: "cyan" },
      { name: "AWS Lambda" },
      { name: "Terraform (IaC)" },
      { name: "EventBridge" }
    ]
  },
  {
    id: "cap-threat-hunting",
    opBadge: "BLUE TEAM // HUNTING",
    team: "blue-team",
    title: "SIEM Monitoring & Cyber Threat Hunting",
    description: "Continuous telemetry correlation and APT threat hunting across distributed IT environments. Proficient in querying SIEM platforms including Splunk and Microsoft Sentinel to uncover persistent threat actors, decode command-and-control beacons, and isolate rogue processes.",
    icon: "Crosshair",
    tags: [
      { name: "Splunk", accent: "emerald" },
      { name: "Microsoft Sentinel" },
      { name: "APT Analysis" },
      { name: "Log Correlation" }
    ]
  },
  {
    id: "cap-iam-defense",
    opBadge: "GOVERNANCE // IAM",
    team: "blue-team",
    title: "IAM Architecture & Phishing Defense",
    description: "Evaluating enterprise Identity & Access Management architectures, enforcing Least Privilege access controls, configuring Active Directory permissions, and engineering deceptive phishing simulations to assess corporate security readiness.",
    icon: "Key",
    tags: [
      { name: "Active Directory", accent: "cyan" },
      { name: "IAM Strategy" },
      { name: "Phishing Simulation" },
      { name: "Social Engineering" }
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-netsentinel",
    tag: "PROJECT 01 // AI-IDS",
    date: "Jun 2026",
    badge: "Team Size: 2",
    liveUrl: "https://netsentinelai.rohitmajhi.in/",
    liveLabel: "LIVE DEMO: netsentinelai.vercel.app",
    title: "NetSentinel AI — AI-Based Network Intrusion Detection System",
    description: "Engineered an AI-powered Network Intrusion Detection System trained on the NSL-KDD dataset to classify network traffic as normal or malicious across Denial of Service (DoS), Probe, R2L, and U2R attack vectors. Built an interactive Flask web dashboard for real-time PCAP and tabular data analysis, delivering deep network observability with threat-level metrics.",
    architectureTitle: "INTERACTIVE ARCHITECTURE FLOW // NetSentinel Engine",
    architectureStatusIdle: "System Idle // Ready for Packet Injection",
    architectureStatusActive: "Packet Injected // Flow Normalized -> Threat Classified: DOS_ATTACK_BLOCK",
    nodes: [
      { id: "p1-n1", title: "PCAP Ingestion", sub: "Wireshark / Flow", width: 120 },
      { id: "p1-n2", title: "Flow Extraction", sub: "TTL / Protocol / Byte", width: 125 },
      { id: "p1-n3", title: "Scikit-learn Model", sub: "Random Forest / Neural", width: 135 },
      { id: "p1-n4", title: "Flask API Engine", sub: "Telemetry Broker", width: 125 },
      { id: "p1-n5", title: "SOC Dashboard", sub: "Real-Time Alerting", width: 115 }
    ],
    techTags: [
      { name: "Python", accent: "cyan" },
      { name: "Scikit-learn", accent: "emerald" },
      { name: "Flask" },
      { name: "Machine Learning" },
      { name: "Network Security" },
      { name: "GitHub" }
    ],
    primaryCta: { label: "Launch Live Application", url: "https://netsentinelai.rohitmajhi.in/" },
    secondaryCta: { label: "View Source Code on GitHub", url: "https://github.com/rohitmajhi18/NetSentinel-AI" }
  },
  {
    id: "project-aws-soc",
    tag: "PROJECT 02 // CLOUD SOC & IR",
    date: "2026",
    badge: "Terraform Automated IaC",
    liveUrl: "https://aws-soc.vercel.app/",
    liveLabel: "LIVE DEMO: aws-soc.vercel.app",
    title: "AWS Cloud Intrusion Detection & Automated Incident Response Platform",
    description: "Built a serverless, Free-Tier-conscious AWS SOC platform covering the full security lifecycle: threat detection, event normalization, incident creation, and automated response. Ingested threat findings from GuardDuty, CloudTrail, and VPC Flow Logs, routing them through EventBridge to a Lambda function that normalizes each finding and stores it as a JSON incident record in S3. Automated containment with a second Lambda that isolates compromised EC2 instances by applying a restrictive isolation Security Group, deploying the entire stack as Infrastructure as Code using Terraform.",
    architectureTitle: "INTERACTIVE ARCHITECTURE FLOW // AWS Automated SOC Pipeline",
    architectureStatusIdle: "Perimeter Active // Monitoring AWS Telemetry",
    architectureStatusActive: "Incident Triggered // GuardDuty -> EventBridge -> Isolation Lambda Executed",
    nodes: [
      { id: "p2-n1", title: "GuardDuty / Logs", sub: "CloudTrail / Flow", width: 120 },
      { id: "p2-n2", title: "EventBridge Bus", sub: "Pattern Matcher", width: 120 },
      { id: "p2-n3", title: "Normalizer Lambda", sub: "Python Parser", width: 125 },
      { id: "p2-n4", title: "S3 Audit Vault", sub: "Encrypted JSON Logs", width: 125 },
      { id: "p2-n5", title: "Quarantine Lambda", sub: "EC2 Security Group Iso", width: 125 }
    ],
    techTags: [
      { name: "AWS GuardDuty", accent: "cyan" },
      { name: "AWS CloudTrail" },
      { name: "VPC Flow Logs" },
      { name: "Amazon EventBridge", accent: "emerald" },
      { name: "AWS Lambda", accent: "cyan" },
      { name: "Amazon S3" },
      { name: "Terraform (IaC)", accent: "crimson" },
      { name: "Python" }
    ],
    primaryCta: { label: "Launch Live Application", url: "https://aws-soc.vercel.app/" },
    secondaryCta: { label: "View Infrastructure Code on GitHub", url: "https://github.com/rohitmajhi18/aws-soc" }
  }
];

export const ARSENAL_SKILLS: SkillItem[] = [
  { id: "s1", name: "Ethical Hacking", category: "security-ops", categoryLabel: "SecOps", indicator: "red" },
  { id: "s2", name: "Penetration Testing", category: "security-ops", categoryLabel: "SecOps", indicator: "red" },
  { id: "s3", name: "Network Penetration Testing", category: "security-ops", categoryLabel: "SecOps", indicator: "red" },
  { id: "s4", name: "Vulnerability Assessment", category: "security-ops", categoryLabel: "SecOps", indicator: "cyan" },
  { id: "s5", name: "Risk Management", category: "security-ops", categoryLabel: "SecOps", indicator: "cyan" },
  { id: "s6", name: "Cryptography Fundamentals", category: "security-ops", categoryLabel: "SecOps", indicator: "cyan" },
  { id: "s7", name: "Cyber Threat Hunting", category: "security-ops", categoryLabel: "SecOps", indicator: "emerald" },

  { id: "s8", name: "Kali Linux", category: "tools-platforms", categoryLabel: "Tools", indicator: "red" },
  { id: "s9", name: "Cloud Security", category: "tools-platforms", categoryLabel: "Platforms", indicator: "cyan" },
  { id: "s10", name: "GitHub", category: "tools-platforms", categoryLabel: "Platforms", indicator: "cyan" },
  { id: "s11", name: "Nmap", category: "tools-platforms", categoryLabel: "Tools", indicator: "cyan" },
  { id: "s12", name: "Burp Suite", category: "tools-platforms", categoryLabel: "Tools", indicator: "red" },
  { id: "s13", name: "Wireshark", category: "tools-platforms", categoryLabel: "Tools", indicator: "emerald" },
  { id: "s14", name: "Metasploit", category: "tools-platforms", categoryLabel: "Tools", indicator: "red" },
  { id: "s15", name: "Nessus", category: "tools-platforms", categoryLabel: "Tools", indicator: "cyan" },
  { id: "s16", name: "OWASP Top 10", category: "tools-platforms", categoryLabel: "Framework", indicator: "red" },
  { id: "s17", name: "SIEM (Splunk / Sentinel)", category: "tools-platforms", categoryLabel: "Tools", indicator: "emerald" },

  { id: "s18", name: "Network Security", category: "core-domains", categoryLabel: "Domains", indicator: "emerald" },
  { id: "s19", name: "Intrusion Detection Systems (IDS)", category: "core-domains", categoryLabel: "Domains", indicator: "emerald" },
  { id: "s20", name: "Information Security Management", category: "core-domains", categoryLabel: "Domains", indicator: "cyan" },
  { id: "s21", name: "APT Breach Analysis", category: "core-domains", categoryLabel: "Domains", indicator: "emerald" },

  { id: "s22", name: "Python", category: "programming-auto", categoryLabel: "Code", indicator: "cyan" },
  { id: "s23", name: "Flask", category: "programming-auto", categoryLabel: "Code", indicator: "cyan" },
  { id: "s24", name: "Scikit-learn", category: "programming-auto", categoryLabel: "AI/ML", indicator: "emerald" },
  { id: "s25", name: "Terraform (IaC)", category: "programming-auto", categoryLabel: "DevOps", indicator: "red" },
  { id: "s26", name: "Git", category: "programming-auto", categoryLabel: "Tools", indicator: "cyan" },
  { id: "s27", name: "Active Directory", category: "programming-auto", categoryLabel: "IAM", indicator: "cyan" }
];

export const SIMULATIONS_DATA: SimulationItem[] = [
  {
    id: "sim-datacom",
    company: "DATACOM",
    date: "Aug 2025",
    title: "Cyber Security Job Simulation",
    description: "Evaluated a simulated Advanced Persistent Threat (APT) breach scenario, mapped malicious lateral movement, evaluated critical asset exposure, and delivered an actionable executive risk remediation strategy.",
    techTags: [
      { name: "APT Breach Analysis", accent: "emerald" },
      { name: "Risk Assessment" },
      { name: "InfoSec Mgmt" }
    ],
    certTitle: "DATACOM — Cyber Security Job Simulation",
    certIssuer: "Datacom & Forage",
    certType: "pdf",
    certSrc: "/Certifications/DATACOM%20Cyber%20Security%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // APT Breach Analysis"
  },
  {
    id: "sim-deloitte-cyber",
    company: "DELOITTE",
    date: "Aug 2025",
    title: "Cyber Job Simulation",
    description: "Investigated simulated enterprise security incidents, prioritized vulnerabilities based on business impact, and formulated an incident communication plan for C-level leadership.",
    techTags: [
      { name: "Incident Response", accent: "crimson" },
      { name: "Risk Management" },
      { name: "Advisory" }
    ],
    certTitle: "Deloitte — Cyber Job Simulation",
    certIssuer: "Deloitte & Forage",
    certType: "pdf",
    certSrc: "/Certifications/Deloitte.%20Cyber%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // Cyber Threat Analysis"
  },
  {
    id: "sim-mastercard",
    company: "MASTERCARD",
    date: "Aug 2025",
    title: "Cybersecurity Job Simulation",
    description: "Designed a multi-stage security awareness campaign, engineered phishing simulation scenarios to assess organizational susceptibility, and interpreted engagement metrics to recommend targeted controls.",
    techTags: [
      { name: "Phishing Simulation", accent: "cyan" },
      { name: "Security Training" },
      { name: "Telemetry" }
    ],
    certTitle: "Mastercard — Cybersecurity Job Simulation",
    certIssuer: "Mastercard & Forage",
    certType: "pdf",
    certSrc: "/Certifications/MasterCard%20Cyber%20Security%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // Social Engineering Defense"
  },
  {
    id: "sim-tata",
    company: "TATA",
    date: "Aug 2025",
    title: "Cybersecurity Analyst Job Simulation",
    description: "Assessed current IAM posture against Least Privilege standards, designed custom role-based access control (RBAC) frameworks, and crafted business-aligned IAM transformation blueprints.",
    techTags: [
      { name: "IAM Strategy", accent: "cyan" },
      { name: "Access Controls" },
      { name: "RBAC" }
    ],
    certTitle: "TATA — Cybersecurity Analyst Job Simulation",
    certIssuer: "Tata & Forage",
    certType: "pdf",
    certSrc: "/Certifications/TATA%20Cybersecurity%20Analyst%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // IAM Architecture Design"
  },
  {
    id: "sim-aws",
    company: "AWS",
    date: "Aug 2025",
    title: "Solutions Architecture Job Simulation",
    description: "Architected scalable, highly available cloud hosting solutions on AWS. Evaluated cloud networking, compute rightsizing, and cost optimization while enforcing AWS security best practices.",
    techTags: [
      { name: "AWS Architecture", accent: "emerald" },
      { name: "Cloud Security" },
      { name: "Well-Architected" }
    ],
    certTitle: "AWS — Solutions Architecture Job Simulation",
    certIssuer: "Amazon Web Services & Forage",
    certType: "pdf",
    certSrc: "/Certifications/AWS%20Solutions%20Architechture%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // Cloud Architecture"
  },
  {
    id: "sim-accenture",
    company: "ACCENTURE",
    date: "Aug 2025",
    title: "Strategy Consulting Job Simulation",
    description: "Conducted market research, profitability analysis, and strategic risk-informed decision-making to optimize client operations and digital transformation strategies.",
    techTags: [
      { name: "Market Research" },
      { name: "Strategic Analysis" },
      { name: "Risk Advisory" }
    ],
    certTitle: "Accenture — Strategy Consulting Job Simulation",
    certIssuer: "Accenture & Forage",
    certType: "pdf",
    certSrc: "/Certifications/Accenture%20Strategy%20Consulting%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // Strategic Advisory"
  },
  {
    id: "sim-commbank",
    company: "COMMONWEALTH BANK",
    date: "Aug 2025",
    title: "Introduction to Cyber Security Simulation",
    description: "Evaluated organizational cybersecurity controls, security policy enforcement, threat surface mitigation, and defensive incident mitigation procedures.",
    techTags: [
      { name: "Cyber Controls", accent: "cyan" },
      { name: "Network Defense" },
      { name: "Policy Audit" }
    ],
    certTitle: "Commonwealth Bank — Introduction to Cyber Security Job Simulation",
    certIssuer: "Commonwealth Bank of Australia & Forage",
    certType: "pdf",
    certSrc: "/Certifications/Commonwealth%20Introduction%20To%20Cyber%20Security%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // Defensive Security Mitigation"
  },
  {
    id: "sim-telstra",
    company: "TELSTRA",
    date: "Aug 2025",
    title: "Cybersecurity Job Simulation",
    description: "Executed network security triage, analyzed malicious telemetry patterns, audited firewall filtering rules, and formulated incident response strategies for telecom infrastructure.",
    techTags: [
      { name: "Incident Triage", accent: "emerald" },
      { name: "Malware Analysis" },
      { name: "Firewall Audit" }
    ],
    certTitle: "Telstra — Cybersecurity Job Simulation",
    certIssuer: "Telstra & Forage",
    certType: "pdf",
    certSrc: "/Certifications/Telstra%20Cybersecurity%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // Security Operations & Triage"
  },
  {
    id: "sim-deloitte-analytics",
    company: "DELOITTE",
    date: "Aug 2025",
    title: "Data Analytics Job Simulation",
    description: "Conducted statistical data exploration, forensic telemetry pattern extraction, anomaly classification, and strategic data visualization for client decision makers.",
    techTags: [
      { name: "Data Forensics", accent: "cyan" },
      { name: "Telemetry Analytics" },
      { name: "Pattern Detection" }
    ],
    certTitle: "Deloitte — Data Analytics Job Simulation",
    certIssuer: "Deloitte & Forage",
    certType: "pdf",
    certSrc: "/Certifications/Deloitte.%20Data%20Analytics%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // Forensic Analytics"
  },
  {
    id: "sim-deloitte-tech",
    company: "DELOITTE",
    date: "Aug 2025",
    title: "Technology Job Simulation",
    description: "Designed enterprise cloud architecture blueprints, conducted system resilience testing, and planned technology modernization transformations for mission-critical services.",
    techTags: [
      { name: "Tech Strategy", accent: "cyan" },
      { name: "Resilience Testing" },
      { name: "Cloud Transformation" }
    ],
    certTitle: "Deloitte — Technology Job Simulation",
    certIssuer: "Deloitte & Forage",
    certType: "pdf",
    certSrc: "/Certifications/Deloitte.%20Techniology%20Job%20Simulation.pdf",
    certGrade: "Verified Completion // Technology Architecture"
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-msc",
    period: "2025 — PRESENT",
    degree: "M.Sc. Cyber Security Forensic (PICA)",
    institution: "Parul University, Vadodara, Gujarat",
    score: "CGPA: 7.13 / 10"
  },
  {
    id: "edu-bsc",
    period: "2022 — 2025",
    degree: "B.Sc. Advanced Networking & Cyber Security",
    institution: "Brainware University, Kolkata, West Bengal",
    score: "CGPA: 6.42 / 10",
    hasCert: true,
    certTitle: "B.Sc. Advanced Networking & Cyber Security — Degree Certificate",
    certSrc: "/Certifications/Graduation%20Cretificate.pdf"
  },
  {
    id: "edu-12th",
    period: "2020 — 2022",
    degree: "Higher Secondary (12th Standard — WBSCVET)",
    institution: "Jamaibati High School, Hooghly, West Bengal",
    score: "Score: 63.20%"
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "c-isoeh-eh",
    issuer: "ISOEH (Indian School of Ethical Hacking)",
    period: "Aug 2024",
    title: "Value Added Course on Ethical Hacking",
    score: "Grade: 73.00%",
    certType: "image",
    certSrc: "/Certifications/ISOEH%20Value%20Added%20Course%20On%20Ethical%20Hacking.jpeg",
    certGrade: "Score: 73.00% // Verified Practical Lab Assessment"
  },
  {
    id: "c-isoeh-pt",
    issuer: "ISOEH (Indian School of Ethical Hacking)",
    period: "Aug 2024",
    title: "Industrial Training On Network Penetration Testing Level 1",
    score: "Verified Practical Completion",
    certType: "image",
    certSrc: "/Certifications/ISOEH%20Industrial%20Traning%20On%20Network%20Penetration%20Testing%20Level%201.jpeg",
    certGrade: "Verified Industrial Practical Training"
  },
  {
    id: "c-secrisk",
    issuer: "Google / Coursera",
    period: "Aug 2024",
    title: "Security Risk Management & Cryptography Fundamentals",
    score: "Verified Academic Record",
    certType: "pdf",
    certSrc: "/Certifications/Security%20Risk%20Management%20%26%20Cryptography%20Fundamentals.pdf",
    certGrade: "Score: Verified // Cryptographic Control & Risk Analysis"
  },
  {
    id: "c-google-foundation",
    issuer: "Google / Coursera",
    period: "Jul 2024",
    title: "Google Foundation Of Cybersecurity",
    score: "Grade: 94.75%",
    certType: "pdf",
    certSrc: "/Certifications/Google%20Foundation%20Of%20CyberSecurity.pdf",
    certGrade: "Score: 94.75% // Verified Academic Record"
  },
  {
    id: "c-ibm-careers",
    issuer: "IBM / Coursera",
    period: "Jul 2024",
    title: "IBM Introduction To Cyber Security Careers",
    score: "Grade: 100.00%",
    certType: "pdf",
    certSrc: "/Certifications/IBM%20Introduction%20To%20Cyber%20Security%20Careers.pdf",
    certGrade: "Score: 100.00% // Verified Academic Record"
  },
  {
    id: "c-eh-principles",
    issuer: "SkillUp / Simplilearn",
    period: "Feb 2024",
    title: "Introduction to Ethical Hacking Principles",
    score: "Score: 100%",
    certType: "pdf",
    certSrc: "/Certifications/Introduction%20to%20Ethical%20Hacking%20Principles.pdf",
    certGrade: "Score: 100% // Verified Industry Assessment"
  },
  {
    id: "c-salesforce",
    issuer: "Salesforce / Coursera",
    period: "2024",
    title: "Salesforce Sales And CRM Overview",
    score: "Verified Completion",
    certType: "pdf",
    certSrc: "/Certifications/Salesforce%20Sales%20And%20CRM%20Overview.pdf",
    certGrade: "Enterprise CRM & Cloud Security Architecture"
  },
  {
    id: "c-kali",
    issuer: "Simplilearn",
    period: "Aug 2023",
    title: "Introduction to Kali Linux",
    score: "Verified Practical Completion",
    certType: "pdf",
    certSrc: "/Certifications/Simplilearn%20Introduction%20To%20Kali%20Linux.pdf",
    certGrade: "Verified Practical Lab Completion"
  },
  {
    id: "c-ds-c",
    issuer: "Simplilearn",
    period: "Jul 2023",
    title: "Fundamentals of Data Structure in C",
    score: "Verified Completion",
    certType: "pdf",
    certSrc: "/Certifications/Simplilearn%20Fundamentals%20Of%20Data%20Structure%20in%20C.pdf",
    certGrade: "Verified Computer Science Foundations"
  },
  {
    id: "c-db",
    issuer: "Simplilearn",
    period: "Jul 2023",
    title: "Fundamentals of Database Systems",
    score: "Verified Completion",
    certType: "pdf",
    certSrc: "/Certifications/Simplilearn%20Fundamentals%20Of%20Database.pdf",
    certGrade: "SQL & Relational Database Architecture"
  },
  {
    id: "c-java",
    issuer: "Simplilearn",
    period: "Jul 2023",
    title: "Java Programming Beginners",
    score: "Verified Completion",
    certType: "pdf",
    certSrc: "/Certifications/Simplilearn%20Java%20Programming%20Biginners.pdf",
    certGrade: "Object-Oriented Architecture & Secure Coding"
  },
  {
    id: "c-kaggle",
    issuer: "Kaggle",
    period: "2024",
    title: "Kaggle Community Member Badge",
    score: "Verified Community Contributor",
    certType: "image",
    certSrc: "/Certifications/Kaggle%20Community%20Member.png",
    certGrade: "Verified Machine Learning & Data Science Contributor"
  }
];

export const DIRECT_CHANNELS = [
  {
    label: "Direct Email Address",
    value: "rohit629510@gmail.com",
    href: "mailto:rohit629510@gmail.com",
    copyValue: "rohit629510@gmail.com",
    icon: "Mail"
  },
  {
    label: "Direct Contact Phone",
    value: "+91 6295103573",
    href: "tel:+916295103573",
    copyValue: "+916295103573",
    icon: "Phone"
  },
  {
    label: "Base of Operations",
    value: "Hooghly, West Bengal, India 712405",
    copyValue: "Hooghly, West Bengal, India 712405",
    icon: "MapPin"
  }
];
