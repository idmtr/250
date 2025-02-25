export interface Dictionary {
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  header: {
    mission: string;
    services: string;
    workshops: string;
    education: string;
    speakingEvents: string;
    getFeedback: string;
    communityRetreats: string;
    language: string;
    getInTouch: string;
    coworkingConsultancy: string;
    closeMenu: string;
    openMenu: string;
  };
  footer: {
    linkedin: string;
    twitter: string;
    contact: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    learnMore: string;
    getInTouch: string;
    members?: {
      name: string;
      role: string;
      image: string;
      linkedin: string;
    }[];
  };
  consulting: {
    title: string;
    subtitle: string;
    description: string;
    learnMore: string;
  };
  education: {
    title: string;
    subtitle: string;
    description: string;
    discoverMore: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  clientLogos: {
    title: string;
    subtitle: string;
  };
  fieldsOfWork: {
    title: string;
    consulting: {
      title: string;
      description: string;
    };
    communityBuilding: {
      title: string;
      description: string;
    };
    eventsContent: {
      title: string;
      description: string;
    };
  };
  ourStory: {
    title: string;
    subtitle: string;
    points: string[];
    getInTouch: string;
  };
  bookShowcase: {
    title: string;
    description: string;
    orderNow: string;
  };
  otherProjects: {
    title: string;
    coworkingJobBoard: string;
    coworkingPodcast: string;
    coworkingHackathon: string;
    communityManagersGroup: string;
    book: string;
  };
  workshops: {
    title: string;
    description: string;
  };
  speakingEvents: {
    title: string;
    description: string;
  };
  getFeedback: {
    title: string;
    description: string;
  };
  blog: {
    title: string;
    readMore: string;
    latestPosts: string;
    allPosts: string;
    publishedOn: string;
    byAuthor: string;
    tags: string;
    noPostsFound: string;
    subtitle?: string;
    description?: string;
    viewAll?: string;
  };
  contact: {
    title: string;
    description: string;
    getInTouch: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  retreats: {
    title: string;
    description: string;
    learnMore: string;
  };
  mission: {
    title: string;
    description: string;
  };
  about: AboutSection;
  blog?: {
    title: string;
    subtitle: string;
    description: string;
    viewAll: string;
  };
}

export interface AboutSection {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  story: {
    title: string;
    content: string;
    background: string;
  };
  team: {
    title: string;
    members: Array<{
      name: string;
      role: string;
      image: string;
      linkedin: string;
    }>;
  };
  projects: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      image: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

export interface BlogDictionary {
  title: string;
  subtitle: string;
  featuredPost: string;
  latestPosts: string;
  readMore: string;
  publishedOn: string;
  byAuthor: string;
  tags: string;
  noPostsFound: string;
}
export interface Dictionary {
  title: string;
  description: string;
  hero: {
    title: string;
    subtitle: string;
    members: {
      name: string;
      role: string;
      image: string;
      linkedin: string;
    }[];
  };
  story: {
    title: string;
    content: string;
    background: string;
  };
  meta: {
    title: string;
    description: string;
  };
}
