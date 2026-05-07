export default defineNuxtPlugin(() => {
  if (import.meta.env.PROD && import.meta.client) {
    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.setAttribute(
      'data-cf-beacon',
      JSON.stringify({ token: 'ad788157b87044eaac586a6eb9b6a134' })
    )
    document.head.appendChild(script)
  }
})
