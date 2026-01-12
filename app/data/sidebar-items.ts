import { mdiHome, mdiAccount, mdiFolder, mdiSchool, mdiPost } from '@mdi/js'

export interface SidebarItem {
  titleKey: string
  value: string
  icon: string
  to: string
  openInNewTab?: boolean
}

export const sidebarItems: SidebarItem[] = [
  {
    titleKey: 'navigation.items.home',
    value: 'home',
    icon: mdiHome,
    to: '/',
  },
  {
    titleKey: 'navigation.items.about',
    value: 'about',
    icon: mdiAccount,
    to: '/about',
  },
  {
    titleKey: 'navigation.items.projects',
    value: 'projects',
    icon: mdiFolder,
    to: '/projects',
  },
  {
    titleKey: 'navigation.items.blog',
    value: 'blog',
    icon: mdiPost,
    to: '/blog',
    openInNewTab: false,
  },
  {
    titleKey: 'navigation.items.ues',
    value: 'ues',
    icon: mdiSchool,
    to: '/resources',
  },
]
