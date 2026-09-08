export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bombay Restaurant',
  description: 'Authentic North Indian & Punjabi cuisine by Chef Surender Kumar Thakur since 2004. Three locations across Marrakech and Casablanca, Morocco.',
  url: 'https://www.bombaymaroc.com',
  image: 'https://www.bombaymaroc.com/images/web/hero_royal_lounge.jpg',
  telephone: '+212613727362',
  email: 'Indian.maroc@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
  },
  location: [
    {
      '@type': 'Place',
      name: 'Bombay Marrakech Gueliz',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7, Rue Ibn Zaidoun',
        addressLocality: 'Marrakech',
        addressRegion: 'Gueliz',
        postalCode: '40000',
        addressCountry: 'MA',
      },
    },
    {
      '@type': 'Place',
      name: 'Medina Rooftop',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Derb Dabachi, near Jemaa el-Fnaa',
        addressLocality: 'Marrakech',
        addressRegion: 'Medina',
        addressCountry: 'MA',
      },
    },
    {
      '@type': 'Place',
      name: 'Bombay Casablanca',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Boulevard Ghandi, Maârif',
        addressLocality: 'Casablanca',
        addressRegion: 'Maârif',
        addressCountry: 'MA',
      },
    },
  ],
  sameAs: [
    'https://instagram.com/bombay_marrakech',
    'https://facebook.com/bombaymarrakech',
  ],
};

export const guelizSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Bombay Marrakech Gueliz',
  branchCode: 'gueliz',
  description: 'Original flagship restaurant in Marrakech Ville Nouvelle. Art Deco lounge atmosphere with clay-pot biryani and tandoor grills.',
  url: 'https://www.bombaymaroc.com/locations/gueliz',
  image: 'https://www.bombaymaroc.com/images/web/hero_royal_lounge.jpg',
  telephone: '+212****7362',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7, Rue Ibn Zaidoun',
    addressLocality: 'Marrakech',
    addressRegion: 'Gueliz',
    postalCode: '40000',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.6345,
    longitude: -7.9998,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '12:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Monday',
      opens: '18:00',
      closes: '23:00',
    },
  ],
  hasMenu: 'https://www.bombaymaroc.com/locations/gueliz#menu',
  servesCuisine: ['North Indian', 'Punjabi', 'Indo-Chinese'],
  priceRange: '$$$',
  paymentAccepted: 'Cash',
  currenciesAccepted: 'MAD, EUR, USD',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    reviewCount: '428',
    bestRating: '5',
    worstRating: '1',
  },
};

export const medinaSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Medina Rooftop',
  branchCode: 'medina',
  description: 'Rooftop dining under the Marrakech stars near Jemaa el-Fnaa. Panoramic views of Koutoubia Mosque and Atlas Mountains with authentic Mughlai cuisine.',
  url: 'https://www.bombaymaroc.com/locations/medina',
  image: 'https://www.bombaymaroc.com/images/web/hero_medina_rooftop.jpg',
  telephone: '+212****7362',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Derb Dabachi, near Jemaa el-Fnaa',
    addressLocality: 'Marrakech',
    addressRegion: 'Medina',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.6295,
    longitude: -7.9811,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '12:30',
      closes: '23:30',
    },
  ],
  hasMenu: 'https://www.bombaymaroc.com/locations/medina#menu',
  servesCuisine: ['North Indian', 'Mughlai', 'Indo-Chinese'],
  priceRange: '$$$',
  paymentAccepted: 'Cash',
  currenciesAccepted: 'MAD, EUR, USD',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '312',
    bestRating: '5',
    worstRating: '1',
  },
};

export const casablancaSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Bombay Casablanca',
  branchCode: 'casablanca',
  description: 'Modern Indian dining in Casablanca Maârif. Atlantic coastal elegance with seafood curries, tandoor grills, and handcrafted mocktails. Card payments accepted.',
  url: 'https://www.bombaymaroc.com/locations/casablanca',
  image: 'https://www.bombaymaroc.com/images/web/hero_casablanca_interior.jpg',
  telephone: '+212****7362',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Boulevard Ghandi, Maârif',
    addressLocality: 'Casablanca',
    addressRegion: 'Maârif',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.5731,
    longitude: -7.5898,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '12:00',
      closes: '23:30',
    },
  ],
  hasMenu: 'https://www.bombaymaroc.com/locations/casablanca#menu',
  servesCuisine: ['North Indian', 'Punjabi', 'Seafood', 'Indo-Chinese'],
  priceRange: '$$$',
  paymentAccepted: 'Cash, Credit Card',
  currenciesAccepted: 'MAD, EUR, USD',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '187',
    bestRating: '5',
    worstRating: '1',
  },
};

export const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Chef Surender Kumar Thakur: 20+ Years of Authentic Indian Cuisine in Morocco',
  description: 'From Oberoi Udaivilas to Marrakech. Chef Surender Kumar Thakur\'s culinary journey, clay-pot traditions & catering for weddings across Morocco.',
  url: 'https://www.bombaymaroc.com/about',
  mainEntity: {
    '@type': 'Person',
    name: 'Chef Surender Kumar Thakur',
    jobTitle: 'Owner & Head Chef',
    worksFor: {
      '@type': 'Organization',
      name: 'Bombay Restaurant',
    },
    knowsAbout: ['North Indian Cuisine', 'Punjabi Cuisine', 'Tandoor Cooking', 'Clay-Pot Biryani', 'Mughlai Cuisine', 'Restaurant Management'],
    description: 'Chef Surender Kumar Thakur began his journey in 1998 with the prestigious Oberoi Group at Trident Udaipur and Oberoi Udaivilas. Following a defining tenure at Bombay Dreams in Hong Kong, he arrived in Morocco in 2004, introducing traditional clay-oven tandoor techniques and authentic home-style Indian cuisine to the kingdom for the very first time.',
  },
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Bombay Restaurant halal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all meat served at Bombay Restaurant is halal certified. We source our ingredients from trusted halal suppliers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you have vegetarian and vegan options?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our menu features extensive vegetarian options including paneer dishes, dal, vegetable curries, and vegan options like vegetable samosa, pakora, and salads. Look for the vegetarian (leaf) and vegan (seedling) icons on our menu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is parking available at the restaurants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bombay Marrakech Gueliz has street parking nearby. Medina Rooftop is in the pedestrian Medina area - we recommend taxi or walking from nearby parking. Bombay Casablanca Maârif has parking available in the area.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the dress code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart casual. We welcome guests in comfortable but presentable attire. No beachwear or sportswear at our fine dining locations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you accept reservations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we highly recommend reservations especially for dinner and weekends. Book online via our website or call +212 613-727362.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer catering for weddings and events?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide catering services for weddings, corporate events, and private functions across Morocco. Contact us via WhatsApp at +212 613-727362 for a custom quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Marrakech locations (Gueliz & Medina): Cash only (MAD, EUR, USD). Casablanca location: Cash and card payments accepted.',
      },
    },
  ],
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://www.bombaymaroc.com${item.url}`,
    })),
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function generateFaqSchema(entries: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

const sharedFaqs: FaqEntry[] = [
  { question: 'Is Bombay Restaurant halal?', answer: 'Yes, all meat served at Bombay Restaurant is halal certified. We source our ingredients from trusted halal suppliers.' },
  { question: 'Do you offer catering for weddings and events?', answer: 'Yes, we provide catering services for weddings, corporate events, and private functions across Morocco. Contact us via WhatsApp at +212 613-727362 for a custom quote.' },
];

export const guelizFaq = generateFaqSchema([
  ...sharedFaqs,
  { question: 'Where is Bombay Marrakech Gueliz located?', answer: 'We are at 7, Rue Ibn Zaidoun in Gueliz, Marrakech\'s modern Ville Nouvelle district, a short walk from Carré Eden shopping center.' },
  { question: 'Is there parking near Bombay Marrakech Gueliz?', answer: 'Yes, street parking is available on Rue Ibn Zaidoun and surrounding streets, with paid parking at nearby Gueliz parking facilities.' },
  { question: 'What are the opening hours of the Gueliz restaurant?', answer: 'Tuesday to Sunday from 12:00 to 23:00. On Mondays we open for dinner only, from 18:00 to 23:00.' },
  { question: 'Can I pay by card at Bombay Marrakech Gueliz?', answer: 'The Gueliz branch accepts cash payments only (MAD, EUR, USD). For card payments, please visit our Casablanca branch.' },
]);

export const medinaFaq = generateFaqSchema([
  ...sharedFaqs,
  { question: 'Does Medina Rooftop have views of the Koutoubia Mosque?', answer: 'Yes! Our rooftop terrace offers panoramic sunset views of the Koutoubia Mosque and the Atlas Mountains, just minutes from Jemaa el-Fnaa square.' },
  { question: 'How do I find Medina Rooftop in the Marrakech Medina?', answer: 'We are located on Derb Dabachi, near Jemaa el-Fnaa. The medina streets can be confusing - call us at +212 613-727362 and we will guide you in, or ask any local for "Bombay Restaurant, Derb Dabachi".' },
  { question: 'Is the rooftop open in winter?', answer: 'Yes, the rooftop operates year-round. During cooler months we provide heaters and blankets so you can enjoy dinner under the stars comfortably.' },
  { question: 'What time is sunset at Medina Rooftop?', answer: 'Sunset views are best from approximately one hour before dusk. We recommend arriving around 18:00-18:30 to secure a prime terrace table.' },
]);

export const casablancaFaq = generateFaqSchema([
  ...sharedFaqs,
  { question: 'Does Bombay Casablanca accept credit cards?', answer: 'Yes! Unlike our Marrakech branches, our Casablanca restaurant accepts both cash and credit/debit card payments (MAD, EUR, USD).' },
  { question: 'Where is Bombay Casablanca located?', answer: 'We are on Boulevard Ghandi in the Maârif district of Casablanca, easily accessible from the city center with parking available in the area.' },
  { question: 'What makes the Casablanca menu different?', answer: 'Our Casablanca kitchen features coastal specialties including fresh seafood curries, sizzlers, and handcrafted mocktails alongside our full North Indian tandoor menu.' },
  { question: 'What are the opening hours of Bombay Casablanca?', answer: 'We are open daily from 12:00 to 23:30, for lunch and dinner.' },
]);

export function generateMenuSchema(branch: 'marrakech' | 'casablanca') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${branch === 'marrakech' ? 'Marrakech' : 'Casablanca'} Menu`,
    description: `Complete menu for Bombay Restaurant ${branch === 'marrakech' ? 'Marrakech (Gueliz & Medina)' : 'Casablanca'} location.`,
    url: `https://www.bombaymaroc.com/locations/${branch}`,
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Starters & Salads',
        description: 'Traditional Indian appetizers including samosas, pakoras, and fresh salads.',
      },
      {
        '@type': 'MenuSection',
        name: 'Tandoor Grills',
        description: 'Clay-oven grilled meats, seafood, and paneer marinated in traditional spices.',
      },
      {
        '@type': 'MenuSection',
        name: 'Indo-Chinese Fusion',
        description: 'Kolkata-style Indo-Chinese favorites like Chilli Chicken and Garlic Chicken.',
      },
      {
        '@type': 'MenuSection',
        name: 'Chicken Curries',
        description: 'Authentic North Indian chicken curries including Butter Chicken, Tikka Masala, and Korma.',
      },
      {
        '@type': 'MenuSection',
        name: 'Mutton & Lamb',
        description: 'Slow-cooked lamb specialties: Rogan Josh, Bhuna Gosht, and Shahi Korma.',
      },
      {
        '@type': 'MenuSection',
        name: 'Seafood',
        description: 'Fresh fish and prawn curries with coastal Indian flavors.',
      },
      {
        '@type': 'MenuSection',
        name: 'Vegetarian',
        description: 'Extensive vegetarian selection including paneer, dal, and seasonal vegetables.',
      },
      {
        '@type': 'MenuSection',
        name: 'Biryani & Rice',
        description: 'Signature clay-pot dum biryanis and aromatic rice preparations.',
      },
      {
        '@type': 'MenuSection',
        name: 'Breads',
        description: 'Fresh tandoor-baked naan, roti, and paratha varieties.',
      },
      {
        '@type': 'MenuSection',
        name: 'Desserts & Drinks',
        description: 'Traditional Indian desserts, lassis, and refreshing mocktails.',
      },
    ],
  };
}

export function generateMenuItemSchema(item: {
  id: string;
  name: { EN: string; FR: string };
  description: { EN: string; FR: string };
  price: { marrakech: number; casablanca: number };
  category: string;
  imageUrl?: string;
  isVeg?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  isGF?: boolean;
  locationExclusive?: 'marrakech' | 'casablanca';
}, branch: 'marrakech' | 'casablanca', lang: 'EN' | 'FR') {
  const price = branch === 'marrakech' ? item.price.marrakech : item.price.casablanca;
  const currency = 'MAD';
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: item.name[lang],
    description: item.description[lang],
    image: item.imageUrl ? `https://www.bombaymaroc.com${item.imageUrl}` : undefined,
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
    category: item.category,
    suitableForDiet: [
      ...(item.isVeg ? ['https://schema.org/VegetarianDiet'] : []),
      ...(item.isVegan ? ['https://schema.org/VeganDiet'] : []),
      ...(item.isGF ? ['https://schema.org/GlutenFreeDiet'] : []),
    ],
  };
}