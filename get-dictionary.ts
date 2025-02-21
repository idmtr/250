import "server-only"
import type { Locale } from "./i18n-config"
import type { Dictionary } from "./types/dictionary"

// For other locales, we'll dynamically import the JSON files
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
}

const validateDictionary = (dict: any): dict is Dictionary => {
  if (!dict || typeof dict !== 'object') {
    console.error('Dictionary is not an object')
    return false
  }

  // Check required sections
  const requiredSections = [
    'metadata',
    'header',
    'footer',
    'social',
    'hero',
    'consulting',
    'education',
    'clientLogos',
    'fieldsOfWork',
    'ourStory',
    'bookShowcase',
    'otherProjects',
    'workshops',
    'speakingEvents',
    'getFeedback'
  ]

  for (const section of requiredSections) {
    if (!dict[section] || typeof dict[section] !== 'object') {
      console.error(`Missing or invalid section: ${section}`)
      return false
    }
  }

  // Check hero section
  if (!dict.hero.title || !dict.hero.subtitle || !dict.hero.learnMore || !dict.hero.getInTouch) {
    console.error('Invalid hero section')
    return false
  }

  // Check consulting section
  if (!dict.consulting.title || !dict.consulting.subtitle || !dict.consulting.description || !dict.consulting.learnMore) {
    console.error('Invalid consulting section')
    return false
  }

  // Check education section
  if (!dict.education.title || !dict.education.subtitle || !dict.education.description || !dict.education.discoverMore || !Array.isArray(dict.education.items)) {
    console.error('Invalid education section')
    return false
  }

  // Check clientLogos section
  if (!dict.clientLogos.title || !dict.clientLogos.subtitle) {
    console.error('Invalid clientLogos section')
    return false
  }

  // Check fieldsOfWork section
  if (!dict.fieldsOfWork.title || 
      !dict.fieldsOfWork.consulting?.title || !dict.fieldsOfWork.consulting?.description ||
      !dict.fieldsOfWork.communityBuilding?.title || !dict.fieldsOfWork.communityBuilding?.description ||
      !dict.fieldsOfWork.eventsContent?.title || !dict.fieldsOfWork.eventsContent?.description) {
    console.error('Invalid fieldsOfWork section')
    return false
  }

  // Check ourStory section
  if (!dict.ourStory.title || !dict.ourStory.subtitle || !Array.isArray(dict.ourStory.points) || !dict.ourStory.getInTouch) {
    console.error('Invalid ourStory section')
    return false
  }

  // Check bookShowcase section
  if (!dict.bookShowcase.title || !dict.bookShowcase.description || !dict.bookShowcase.orderNow) {
    console.error('Invalid bookShowcase section')
    return false
  }

  // Check otherProjects section
  if (!dict.otherProjects.title || 
      !dict.otherProjects.coworkingJobBoard || 
      !dict.otherProjects.coworkingPodcast || 
      !dict.otherProjects.coworkingHackathon || 
      !dict.otherProjects.communityManagersGroup) {
    console.error('Invalid otherProjects section')
    return false
  }

  return true
}

export const getDictionary = async (locale: Locale) => {
  try {
    const dictionary = await dictionaries[locale]()
    if (!dictionary) {
      throw new Error(`Dictionary not found for locale: ${locale}`)
    }
    return dictionary
  } catch (error) {
    console.error(`Error loading dictionary for ${locale}:`, error)
    // Return a basic dictionary structure to prevent crashes
    return {
      blog: {
        title: 'Blog',
        readMore: 'Read More',
        latestPosts: 'Latest Posts',
        allPosts: 'All Posts',
        publishedOn: 'Published on',
        byAuthor: 'by',
        tags: 'Tags',
        noPostsFound: 'No posts found'
      }
    }
  }
}
