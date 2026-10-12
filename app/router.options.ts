import type { RouterConfig } from '@nuxt/schema'

const NAV_OFFSET = 72

export default {
  routes(_routes) {
    return [..._routes, { path: '/tools', redirect: '/' }, { path: '/es/tools', redirect: '/es' }]
  },
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, top: NAV_OFFSET }), to.path === from.path ? 0 : 120)
      })
    }
    return { left: 0, top: 0 }
  },
} satisfies RouterConfig
