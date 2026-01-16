export type Locale = 'ko' | 'en';

export interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export interface LocaleData {
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    home: string;
    destinations: string;
    magazine: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    linkText: string;
    scrollDown: string;
  };
  features: {
    title: string;
    subtitle: string;
  };
  destinations: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  process: {
    title: string;
    subtitle: string;
  };
  faq: {
    title: string;
    subtitle: string;
  };
  sections: {
    family: {
      title: string;
      imageAlt: string;
    };
    cards: {
      left: {
        date: string;
        title: string;
        description: string;
        imageAlt: string;
      };
      right: {
        date: string;
        title: string;
        description: string;
        imageAlt: string;
      };
    };
    slides: Array<{
      title: string;
      description: string;
      imageAlt: string;
    }>;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    description: string;
    copyright: string;
    links: {
      privacy: string;
      terms: string;
    };
    sections: {
      company: string;
      support: string;
      social: string;
    };
  };
  a11y: {
    skipToContent: string;
    toggleTheme: string;
    toggleLanguage: string;
    menuOpen: string;
    menuClose: string;
    loading: string;
    scrollToTop: string;
    externalLink: string;
  };
  common: {
    learnMore: string;
    getStarted: string;
    viewDetails: string;
    close: string;
    previous: string;
    next: string;
  };
  notFound: {
    title: string;
    errorCode: string;
    heading: string;
    description: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      badge: string;
      title: string;
      description: string;
    };
    company: {
      year: string;
      title: string;
      description: string;
      team: Array<{
        role: string;
        name: string;
        description: string;
      }>;
    };
    process: {
      number: string;
      title: string;
      subtitle: string;
      steps: Array<{
        number: string;
        title: string;
        description: string;
      }>;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
    contactForm: {
      title: string;
      name: string;
      namePlaceholder: string;
      breed: string;
      breedPlaceholder: string;
      concept: string;
      conceptPlaceholder: string;
      conceptOptions: Array<{
        value: string;
        label: string;
      }>;
      email: string;
      emailPlaceholder: string;
      submit: string;
      successTitle: string;
      successMessage: string;
      close: string;
    };
  };
  magazine: {
    pageTitle: string;
    pageSubtitle: string;
    metaTitle: string;
    metaDescription: string;
    notFound: string;
    backToList: string;
    items: {
      'jeju-pet-tour': MagazineItem;
      'gangwon-healing-camping': MagazineItem;
      'seoul-pet-cafe': MagazineItem;
      'busan-beach-walk': MagazineItem;
      'pet-friendly-pension': MagazineItem;
      'forest-trekking': MagazineItem;
    };
  };
}

interface MagazineContentBlock {
  type: 'text' | 'image' | 'quote';
  content?: string;
  caption?: string;
}

interface MagazineItem {
  title: string;
  subtitle: string;
  date: string;
  category: string;
  content?: MagazineContentBlock[];
}
