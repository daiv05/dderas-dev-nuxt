# AGENTS.md - Guía para Agentes de IA

## Información del Proyecto

Este es un portfolio personal construido con **Nuxt 4** (migrado desde Vue 3 + Vite), utilizando TypeScript, Vuetify 3, GSAP, y el módulo i18n para internacionalización.

### Stack Tecnológico

- **Nuxt 4**: Framework full-stack con auto-imports
- **TypeScript**: Modo estricto habilitado
- **Vuetify 3.11.6**: Biblioteca de componentes Material Design con SSR
- **GSAP 3.14.2**: Animaciones con ScrollTrigger
- **@nuxtjs/i18n v9.0.0**: Internacionalización (inglés/español)
- **Pinia**: State management con persistencia en cookies
- **@nuxt/content**: Para contenido markdown (futuro blog)

### Estructura del Proyecto

```
app/
├── assets/styles/         # Estilos globales (CSS variables, reset, etc.)
├── components/            # Componentes Vue reutilizables
├── composables/           # Lógica reutilizable (animaciones, navegación, SEO)
├── data/                  # Datos TypeScript (contacto, proyectos)
├── layouts/               # Layouts de página (default.vue)
├── locales/               # Traducciones JSON (en.json, es.json)
├── pages/                 # Páginas auto-ruteadas por Nuxt
├── plugins/               # Plugins Nuxt (GSAP, Vuetify)
└── stores/                # Stores Pinia (app.ts para tema/idioma)
```

## Patrones y Convenciones

### Auto-imports

Nuxt 4 auto-importa automáticamente:
- Composables de Vue: `ref`, `computed`, `watch`, `onMounted`, `nextTick`
- Composables de Nuxt: `useI18n`, `navigateTo`, `useState`, `useCookie`
- Stores de Pinia: `useAppStore`
- Composables custom desde `~/composables/`

**No** es necesario importar estos explícitamente.

### Internacionalización (i18n)

#### Funciones clave:

- **`t(key)`**: Para traducciones de strings simples
  ```typescript
  const title = t('home.title')
  ```

- **`tm(key)`**: Para objetos/arrays, retorna AST de i18n
  ```typescript
  const items = tm('sidebar.items') // Retorna objeto i18n
  ```

- **`rt(value)`**: Resuelve AST de i18n a valores reales
  ```typescript
  const items = tm('sidebar.items')
  items.forEach(item => {
    console.log(rt(item.title)) // String real
  })
  ```

- **`localePath(path)`**: Genera rutas con prefijo de idioma
  ```typescript
  navigateTo(localePath('/about'))
  ```

- **`setLocale(locale)`**: Cambia el idioma actual
  ```typescript
  setLocale('es')
  ```

#### Patrón recomendado:

```typescript
// Para arrays/objetos de traducciones
const overviews = computed(() => {
  const raw = tm('home.overviews')
  return raw.map(item => ({
    title: rt(item.title),
    description: rt(item.description)
  }))
})
```

### SSR y Patrones Cliente/Servidor

#### Guards SSR:

- **`import.meta.server`**: Código que solo corre en servidor
- **`import.meta.client`**: Código que solo corre en cliente
- **`onMounted()`**: Automáticamente solo corre en cliente (no necesita guards redundantes)

#### Componente `<ClientOnly>`:

Para código que depende de APIs del navegador o tiene valores diferentes en servidor/cliente:

```vue
<ClientOnly>
  <div v-if="!isDesktop">
    <!-- UI móvil usando useDisplay() de Vuetify -->
  </div>
</ClientOnly>
```

**Casos de uso:**
- `useDisplay()` de Vuetify (detecta viewport, no disponible en SSR)
- Valores de cookies que pueden diferir entre servidor/cliente
- Cualquier código que acceda a `window`, `document`, `localStorage`

#### Hydration Issues:

**Problema:** HTML diferente entre servidor y cliente causa warnings de hidratación.

**Soluciones:**
1. Envolver en `<ClientOnly>` para renderizar solo en cliente
2. Usar guards `import.meta.client` en lógica
3. Asegurar valores consistentes durante SSR (ej. defaults en stores)

### GSAP y Animaciones

#### Plugin GSAP (`app/plugins/gsap.ts`):

- Solo se ejecuta en cliente (`import.meta.client`)
- Registra ScrollTrigger
- Configura scroller personalizado (`.shell-main` o `.blog-main`)

#### Composable de Animaciones (`app/composables/useEnterAnimations.ts`):

**1. Para animaciones simples (fade-in, slide-in):**

```typescript
import { useGsapAnimations } from '~/composables/useEnterAnimations'

const { setupAnimations } = useGsapAnimations()

onMounted(() => {
  nextTick(() => {
    setupAnimations(() => {
      const scroller = getMainScroller()
      const title = document.querySelector('.my-title')
      
      gsap.fromTo(title, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: title,
            scroller,
            start: 'top 80%',
            once: true
          }
        }
      )
    })
  })
})
```

**2. Para patrón header + panels:**

```typescript
import { useEnterAnimations } from '~/composables/useEnterAnimations'

const headerRef = ref<HTMLElement | null>(null)
const panelsRefs = ref<HTMLElement[]>([])

const { cleanup } = useEnterAnimations({
  headerRef,
  panelsRefs,
  stagger: 0.15
})

// Cleanup automático con onBeforeUnmount
```

#### Funciones del plugin GSAP:

- **`isElementInViewport(el, scroller)`**: Verifica si elemento está visible
- **`animateInOnEnter(elements, options)`**: Anima elementos al entrar en viewport
- **`getMainScroller()`**: Obtiene contenedor de scroll (`.shell-main` o `.blog-main`)
- **`clearGSAPProps(elements)`**: Limpia propiedades GSAP

**Importante:** 
- No usar `gsap.set()` con `clearProps: 'all'` antes de hidratación (causa warnings)
- Siempre usar `gsap.context()` para cleanup automático
- Llamar a `ScrollTrigger.refresh()` después de cambios en DOM

### Pinia Stores

#### Store de App (`app/stores/app.ts`):

```typescript
const appStore = useAppStore()

// Acceder al tema actual
appStore.theme // 'dark' | 'light'

// Cambiar tema
appStore.theme = 'light'
// o
appStore.toggleTheme()

// Acceder al idioma
appStore.language // 'en' | 'es'

// Cambiar idioma (mejor usar setLocale de i18n)
appStore.language = 'es'
```

**Nota:** El store usa `useCookie` para persistir tema/idioma.

### Vuetify

#### Configuración (`app/plugins/vuetify.ts`):

- Temas personalizados (dark/light)
- Sincronización con cookie de tema
- Ícono sets: mdi (Material Design Icons)

#### Componentes principales:

- `v-app`: Contenedor raíz
- `v-navigation-drawer`: Sidebar
- `v-main`: Área de contenido principal
- `v-btn`, `v-icon`, `v-list`, etc.

#### Composable de Display:

```typescript
const { mobile, isDesktop } = useDisplay()
```

**¡Importante!** 
- `useDisplay()` no funciona en SSR. Envolver en `<ClientOnly>`.
- Usar vuetify.theme.change('themeName') para cambiar temas dinámicamente. NO USAR vuetify.theme.global.name (deprecado)

### TypeScript

#### Tipos comunes:

```typescript
// Theme
type ThemeName = 'dark' | 'light'

// Language
type LanguageCode = 'en' | 'es'

// Props
interface Props {
  title: string
  items: Array<{ id: number; name: string }>
}
const props = defineProps<Props>()

// Emits
interface Emits {
  (e: 'update', value: string): void
}
const emit = defineEmits<Emits>()
```

#### Type Guards (filtros):

```typescript
// Filtrar elementos nulos/undefined
const validElements = elements.filter((el): el is HTMLElement => 
  el instanceof HTMLElement
)

// Filtrar valores truthy
const items = rawItems.filter(Boolean)
```

## Mejores Prácticas

### 1. Componentes

- Usar `<script setup lang="ts">` en todos los componentes
- Definir tipos para props/emits explícitamente
- Usar `computed` para valores derivados

### 2. Navegación

```typescript
// CORRECTO: Usar navigateTo con localePath
await navigateTo(localePath('/about'))

// CORRECTO: Abrir en nueva pestaña
const route = useRouter().resolve(localePath('/projects'))
window.open(route.href, '_blank')

// EVITAR: Usar window.location directamente
```

### 3. Estilos

- Usar CSS variables definidas en `app/assets/styles/variables.css`
- Variables principales: `--text-main`, `--bg-main`, `--accent`, etc.
- Scoped styles en componentes (`<style scoped>`)

### 4. Performance

- Usar `computed` en lugar de métodos para valores calculados
- Lazy-load componentes pesados con `defineAsyncComponent`
- Minimizar watchers, preferir computed
- Usar `v-once` para contenido estático

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción local
npm run preview

# Linting
npm run lint

# Type-checking
npx nuxi typecheck
```

## Migraciones y Cambios Futuros

### Pendiente de Migración (desde dderas-dev):

- Componentes de blog (PostHeader, etc.)
- Páginas de blog (layout, vista individual)
- Sistema de routing de blog

### Mejoras Planificadas:

1. Implementar sistema de blog completo
2. Agregar tests (Vitest)
3. Mejorar SEO con useHead/useSeoMeta
4. Optimizar imágenes con @nuxt/image

## Notas para Agentes

- **Siempre verificar errores TypeScript** después de cambios con `get_errors` tool (no ejecutes comandos manualmente, solo verifica)
- **Usar `multi_replace_string_in_file`** para múltiples edits independientes
- **No crear archivos Markdown de resumen** a menos que se solicite explícitamente
- **Preferir soluciones Nuxt nativas** sobre workarounds de Vue
- **Consultar documentación de Nuxt 4** para APIs actualizadas
- **Respetar los patrones establecidos** en el código existente
- **Minimizar duplicación de código** usando composables
- **Siempre incluir context de 3-5 líneas** en replace_string_in_file

---

**Última actualización:** Enero 2026
**Versión de Nuxt:** 4.x
**Mantenido por:** dderas-dev
