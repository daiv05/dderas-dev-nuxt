export const contactInfo = {
  name: 'David Deras',
  title: 'Software Engineer',
  location: 'San Salvador, El Salvador',
  city: 'San Salvador',
  country: 'El Salvador',
  countryCode: 'SV',
  email: 'david@deras.dev',
  siteUrl: import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://deras.dev',
  socials: {
    github: 'https://github.com/daiv05',
    linkedin: 'https://www.linkedin.com/in/dderas',
  },
} as const
