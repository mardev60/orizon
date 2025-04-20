import { Translations, Language } from '../types';

export const translations: Translations = {
  title: {
    en: 'Orizon travel planner',
    fr: 'Planificateur Orizon'
  },
  subtitle: {
    en: 'Experience the future of travel planning with our AI-powered assistant. Tell us your preferences and let our algorithms craft your perfect journey.',
    fr: 'Découvrez le futur de la planification de voyage avec notre assistant alimenté par l\'IA. Partagez vos préférences et laissez nos algorithmes créer votre voyage parfait.'
  },
  fullName: {
    en: 'Full Name',
    fr: 'Nom Complet'
  },
  fullNamePlaceholder: {
    en: 'Enter your full name',
    fr: 'Entrez votre nom complet'
  },
  email: {
    en: 'Email',
    fr: 'Email'
  },
  emailPlaceholder: {
    en: 'your.email@example.com',
    fr: 'votre.email@exemple.com'
  },
  destination: {
    en: 'Destination Country',
    fr: 'Pays de Destination'
  },
  destinationPlaceholder: {
    en: 'Where do you want to go?',
    fr: 'Où voulez-vous aller ?'
  },
  travelDates: {
    en: 'Travel Dates',
    fr: 'Dates de Voyage'
  },
  selectDateRange: {
    en: 'Select date range',
    fr: 'Sélectionnez les dates'
  },
  numberOfPeople: {
    en: 'Number of People',
    fr: 'Nombre de Personnes'
  },
  budgetPerDay: {
    en: 'Budget per day (€)',
    fr: 'Budget par jour (€)'
  },
  travelStyle: {
    en: 'Travel Style',
    fr: 'Style de Voyage'
  },
  languagesSpoken: {
    en: 'Languages Spoken',
    fr: 'Langues Parlées'
  },
  transportPreference: {
    en: 'Transportation Preference',
    fr: 'Préférence de Transport'
  },
  accommodationPreference: {
    en: 'Accommodation Preference',
    fr: 'Préférence d\'Hébergement'
  },
  accommodationPlaceholder: {
    en: 'Describe your preferred type of accommodation',
    fr: 'Décrivez votre type d\'hébergement préféré'
  },
  foodPreference: {
    en: 'Food Preference',
    fr: 'Préférence Alimentaire'
  },
  foodPreferencePlaceholder: {
    en: 'Describe your food preferences',
    fr: 'Décrivez vos préférences alimentaires'
  },
  visitedBefore: {
    en: 'Have you visited this destination before?',
    fr: 'Avez-vous déjà visité cette destination ?'
  },
  specialRequests: {
    en: 'Special Requests',
    fr: 'Demandes Spéciales'
  },
  specialRequestsPlaceholder: {
    en: 'Any special requests or information for your trip',
    fr: 'Demandes spéciales ou informations pour votre voyage'
  },
  planMyTrip: {
    en: 'Plan My Trip',
    fr: 'Planifier Mon Voyage'
  },
  planYourJourney: {
    en: 'Plan Your Future Journey',
    fr: 'Planifiez Votre Prochain Voyage'
  },
  footer: {
    en: 'Made with ❤️ by Marouan',
    fr: 'Made with ❤️ by Marouan'
  },
  selectPlaceholder: {
    en: 'Select options...',
    fr: 'Sélectionner des options...'
  },
  yes: {
    en: 'Yes',
    fr: 'Oui'
  },
  no: {
    en: 'No',
    fr: 'Non'
  },
  tripSuccess: {
    en: 'Your Trip is Being Planned!',
    fr: 'Votre Voyage est en Cours de Planification !'
  },
  tripSuccessSubtitle: {
    en: 'Our AI travel assistant is crafting your perfect itinerary for',
    fr: 'Notre assistant de voyage IA crée votre itinéraire parfait pour'
  },
  planAnotherTrip: {
    en: 'Plan Another Trip',
    fr: 'Planifier un Autre Voyage'
  }
};

export const getTranslation = (key: string, language: Language): string => {
  return translations[key]?.[language] || key;
};