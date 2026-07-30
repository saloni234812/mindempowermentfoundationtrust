export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  longDescription: string;
  keyHighlights: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: "completed" | "ongoing" | "upcoming";
  budget: number;
  raised: number;
  location: string;
  beneficiaries: string;
  reportUrl?: string;
  image: string;
  gallery: string[];
  description: string;
}

export interface TransparencyDoc {
  id: string;
  title: string;
  category: "certificate" | "audit" | "annual";
  fileUrl: string;
  year: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
  registrationCount: number;
}

// Data structures
export const mockImpactStats: ImpactStat[] = [
  { id: "1", label: "Minds Trained", value: 5200, suffix: "+", icon: "Users" },
  { id: "2", label: "Trees Planted", value: 12000, suffix: "+", icon: "HeartHandshake" },
  { id: "3", label: "Training Sessions", value: 180, suffix: "+", icon: "Calendar" },
  { id: "4", label: "Villages Reached", value: 45, suffix: "+", icon: "MapPin" },
  { id: "5", label: "Active Volunteers", value: 320, suffix: "+", icon: "TrendingUp" },
  { id: "6", label: "Plantation Drives", value: 60, suffix: "", icon: "Briefcase" },
];

export const mockPrograms: Program[] = [
  {
    id: "p1",
    slug: "mind-programming-classes",
    title: "Mind Programming Classes",
    tagline: "Unlocking human potential through structured mental empowerment.",
    description: "Structured classes teaching mindfulness, focus, stress management, and positive thinking to individuals and communities.",
    image: "/images/activity_5.jpg",
    icon: "BrainCircuit",
    longDescription: "Our Mind Programming Classes are the core of what we do. We offer structured, accessible programs that teach practical mental empowerment techniques — including mindfulness meditation, focus building, emotional resilience, stress management, and positive thinking. Sessions are conducted in community halls, schools, and corporate venues. Our trained facilitators work with participants of all ages and backgrounds to help them achieve clarity, confidence, and inner calm.",
    keyHighlights: [
      "5,200+ individuals trained across 45+ villages.",
      "Weekly group sessions and one-on-one coaching available.",
      "Special programs for students, women, and working professionals.",
      "Certified trainers with expertise in mindfulness and NLP techniques."
    ]
  },
  {
    id: "p2",
    slug: "plantation-drives",
    title: "Tree Plantation Drives",
    tagline: "Healing the earth, one tree at a time.",
    description: "Organized plantation drives that engage communities in growing and nurturing trees for a greener, healthier tomorrow.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    icon: "Flame",
    longDescription: "Our Plantation Drives bring communities together to restore green cover in degraded areas. We organize large-scale and local plantation events — planting native trees, fruit-bearing trees, and medicinal herbs. Each drive includes environmental awareness sessions and follow-up care training so the saplings actually survive and thrive. We partner with local schools, municipalities, and volunteers to maximize our green footprint.",
    keyHighlights: [
      "12,000+ trees planted across 60 organized drives.",
      "Focus on native, fruit-bearing, and medicinal species.",
      "School and college plantation awareness programs.",
      "Community-led tree care and adoption programs."
    ]
  },
  {
    id: "p3",
    slug: "mindfulness-for-youth",
    title: "Mindfulness for Youth",
    tagline: "Building mentally strong, focused, and resilient young leaders.",
    description: "Age-appropriate mindfulness and focus training designed specifically for school and college students.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    icon: "GraduationCap",
    longDescription: "Young people today face immense academic, social, and digital pressure. Our Mindfulness for Youth program brings certified trainers directly into schools and colleges to teach breathing techniques, concentration methods, exam stress management, and emotional intelligence. The goal is to equip the next generation with inner tools they carry for life.",
    keyHighlights: [
      "Programs active in 30+ schools and colleges.",
      "Curriculum-aligned mindfulness workshops for students.",
      "Anti-anxiety and exam confidence sessions.",
      "Youth leadership and community service modules."
    ]
  },
  {
    id: "p4",
    slug: "green-community-initiative",
    title: "Green Community Initiative",
    tagline: "Connecting environmental responsibility with mental wellness.",
    description: "Combining nature therapy with plantation to build greener, calmer, and more connected communities.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    icon: "Cpu",
    longDescription: "Our Green Community Initiative merges our two core pillars — mind training and plantation — into a unified experience. Participants engage in nature-based mindfulness sessions held in green spaces, followed by hands-on planting activities. Research shows that spending time in nature and nurturing living things significantly reduces stress and boosts mental clarity. This program brings that science to local communities in a practical, engaging way.",
    keyHighlights: [
      "Nature therapy + planting combined into single sessions.",
      "Regular green walks and mindfulness-in-nature events.",
      "Community garden projects in urban and rural areas.",
      "Partnership with environmental NGOs and local municipalities."
    ]
  },
  {
    id: "p5",
    slug: "sustainable-agriculture",
    title: "Sustainable Agriculture",
    tagline: "Empowering rural farmers with organic farming & sustainable practices.",
    description: "Hands-on training, resource sharing, and organic farming workshops to support rural livelihoods and green ecosystems.",
    image: "/images/activity_11.jpg",
    icon: "Sprout",
    longDescription: "Our Sustainable Agriculture program empowers farmers and rural communities with modern organic farming practices, soil health management, rainwater harvesting, and native crop diversification. By integrating eco-agriculture with community-led green initiatives, we help smallholder farmers boost their income, achieve food security, and practice climate-resilient farming.",
    keyHighlights: [
      "Training workshops conducted in 20+ rural villages.",
      "Distribution of organic seeds and bio-fertilizers.",
      "Setting up community kitchen gardens.",
      "Empowering farmers to practice organic composting and water conservation."
    ]
  }
];


export const mockProjects: Project[] = [
  {
    id: "proj1",
    slug: "rural-mental-health-camps",
    title: "Rural Mental Health Clinics 2026",
    category: "Mental Wellness",
    status: "ongoing",
    budget: 350000,
    raised: 245000,
    location: "Khurda & Cuttack districts, Odisha",
    beneficiaries: "1,500 villagers",
    reportUrl: "/documents/sample_report.pdf",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Establishing weekly mobile psychiatric consultations and group therapy sessions across 15 remote villages to identify and treat chronic mental health conditions."
  },
  {
    id: "proj2",
    slug: "shakti-sewing-centers",
    title: "Shakti Women Sewing Center Startup",
    category: "Women Empowerment",
    status: "completed",
    budget: 200000,
    raised: 200000,
    location: "Purba Medinipur, West Bengal",
    beneficiaries: "60 rural women entrepreneurs",
    reportUrl: "/documents/sample_report.pdf",
    image: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Equipped 2 new centers with sewing machines, raw fabrics, and trained women in tailoring, cutting, and quality control. All 60 participants now earn regular income from bulk uniform orders."
  },
  {
    id: "proj3",
    slug: "village-digital-classroom",
    title: "Village Digital Classrooms",
    category: "Education Support",
    status: "upcoming",
    budget: 450000,
    raised: 120000,
    location: "Sundargarh, Odisha",
    beneficiaries: "400 tribal school children",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    gallery: [],
    description: "Aiming to build 3 solar-powered digital classrooms with internet connectivity and tablet PCs to offer modern science and language learning to tribal students."
  }
];

export const mockTransparencyDocs: TransparencyDoc[] = [
  {
    id: "t1",
    title: "80G Income Tax Exemption Certificate",
    category: "certificate",
    fileUrl: "/documents/dummy_80G.pdf",
    year: "Permanent",
    description: "Enables Indian donors to claim 50% tax exemption on donations made to our trust under Section 80G of the Income Tax Act."
  },
  {
    id: "t2",
    title: "12A Registration Certificate",
    category: "certificate",
    fileUrl: "/documents/dummy_12A.pdf",
    year: "Permanent",
    description: "Official registration certificate of the Mind Empowerment Foundation Trust under section 12A of the Income Tax Act, certifying non-profit status."
  },
  {
    id: "t3",
    title: "CSR-1 Registration Certificate",
    category: "certificate",
    fileUrl: "/documents/dummy_CSR1.pdf",
    year: "Permanent",
    description: "Registration with the Ministry of Corporate Affairs, enabling us to receive Corporate Social Responsibility (CSR) funding from corporate companies."
  },
  {
    id: "t4",
    title: "NGO Darpan Unique ID Certificate",
    category: "certificate",
    fileUrl: "/documents/dummy_Darpan.pdf",
    year: "Permanent",
    description: "Unique Registration ID (OR/2024/0411234) issued by NITI Aayog, Government of India, for government grants and credibility tracking."
  },
  {
    id: "t5",
    title: "Annual Audit Report FY 2024-25",
    category: "audit",
    fileUrl: "/documents/dummy_Audit_2024.pdf",
    year: "2024-2025",
    description: "Complete financial statement audited by chartered accountants, reflecting transparency of all income, expenditures, and balance sheet."
  },
  {
    id: "t6",
    title: "Annual Activity & Impact Report 2024-25",
    category: "annual",
    fileUrl: "/documents/dummy_Annual_Report_2024.pdf",
    year: "2024-2025",
    description: "A comprehensive breakdown of all social welfare camps, programs run, and verified impact statements for the past fiscal year."
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "breaking-mental-health-taboo",
    title: "Breaking the Silence: Addressing Mental Health in Rural India",
    summary: "How community awareness camps and clinical support are changing attitudes towards psychological problems in villages.",
    content: `<p>In rural areas across India, mental health issues are often wrapped in stigma, superstition, or simply dismissed due to lack of understanding. Individuals experiencing depression, anxiety, or cognitive differences are frequently isolated or denied care. </p>
    <p>Through our 'Swasth Mann' camps, we encountered families who believed that psychological disorders were caused by negative spirits. Over months of regular outreach, community storytelling, and involving trusted local leaders, we have begun to see a paradigm shift. Today, families are proactively visiting our clinics, asking for counseling, and recognizing that mental health is a fundamental component of physical well-being.</p>
    <p>Educating children in schools has been particularly impactful. When we teach kids how to recognize and speak about stress, bullying, or sadness, they take these lessons back to their parents. This child-led community awareness is the key to lasting change.</p>`,
    image: "/images/activity_3.jpg",
    category: "Mental Wellness",
    author: "Dr. Saloni Mohanty (Trustee & Psychologist)",
    date: "July 10, 2026",
    readTime: "4 min read"
  },
  {
    id: "b2",
    slug: "empowering-women-financial-literacy",
    title: "Empowering Rural Women: Why Sewing Machines Are Only Part of the Answer",
    summary: "Vocational skills must be paired with financial independence, banking support, and self-belief to bring true empowerment.",
    content: `<p>When we give a woman a sewing machine, we give her a tool. But tools alone cannot break long-standing socioeconomic barriers. True empowerment happens when that tool is combined with three elements: professional designs skill, financial literacy, and a support network.</p>
    <p>Through the 'Shakti' initiative, we teach women how to compute profit margins, negotiate raw material costs, maintain bank accounts, and form self-help groups. In groups, women support each other's micro-credit needs, removing their reliance on exploitative local moneylenders.</p>
    <p>In our newest center in West Bengal, we saw a group of 30 women pool their savings to buy bulk materials directly from wholesale distributors, instantly doubling their profit margins. That is financial literacy in action.</p>`,
    image: "/images/activity_11.jpg",
    category: "Women Empowerment",
    author: "Mrs. Reena Sen (Program Director)",
    date: "June 25, 2026",
    readTime: "5 min read"
  }
];

export const mockEvents: EventItem[] = [
  {
    id: "e1",
    title: "Community Mental Health & Stress Management Camp",
    date: "August 12, 2026",
    time: "09:30 AM - 04:30 PM",
    location: "Community Center, Cuttack Sadar, Odisha",
    description: "A free public camp featuring group counseling sessions, individual psychiatric checkups, and interactive stress relief activities led by professional psychologists.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    category: "Mental Wellness",
    registrationCount: 145
  },
  {
    id: "e2",
    title: "Women's Entrepreneurship & Craft Exhibition",
    date: "September 05, 2026",
    time: "11:00 AM - 08:00 PM",
    location: "Exhibition Ground, Bhubaneswar, Odisha",
    description: "An exhibition showing handicrafts, clothes, and organic goods produced by our Self-Help Groups, providing them direct market access and networking.",
    image: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=800",
    category: "Women Empowerment",
    registrationCount: 92
  }
];

// Helper database services simulation
export class MockDatabase {
  static getImpactStats() {
    return Promise.resolve(mockImpactStats);
  }

  static getPrograms() {
    return Promise.resolve(mockPrograms);
  }

  static getProgramBySlug(slug: string) {
    const item = mockPrograms.find((p) => p.slug === slug);
    return Promise.resolve(item || null);
  }

  static getProjects() {
    return Promise.resolve(mockProjects);
  }

  static getProjectBySlug(slug: string) {
    const item = mockProjects.find((p) => p.slug === slug);
    return Promise.resolve(item || null);
  }

  static getTransparencyDocs() {
    return Promise.resolve(mockTransparencyDocs);
  }

  static getBlogPosts() {
    return Promise.resolve(mockBlogPosts);
  }

  static getBlogPostBySlug(slug: string) {
    const item = mockBlogPosts.find((p) => p.slug === slug);
    return Promise.resolve(item || null);
  }

  static getEvents() {
    return Promise.resolve(mockEvents);
  }

  // Client forms simulation
  static registerVolunteer(data: {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    availability: string;
    location: string;
    resumeUrl?: string;
  }) {
    console.log("Saving volunteer application:", data);
    return Promise.resolve({ success: true, id: Math.random().toString(36).substring(2, 11) });
  }

  static submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    console.log("Saving contact message:", data);
    return Promise.resolve({ success: true });
  }

  static submitNewsletter(email: string) {
    console.log("Saving newsletter subscription:", email);
    return Promise.resolve({ success: true });
  }

  static registerDonation(data: {
    payment_id: string;
    amount: number;
    donor_name: string;
    donor_email: string;
    donor_phone?: string;
    campaign_id?: string;
    status: string;
    is_anonymous: boolean;
  }) {
    console.log("Saving donation registration:", data);
    return Promise.resolve({ success: true, receiptId: `MEFT-${Date.now()}` });
  }
}
