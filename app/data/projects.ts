const projectList = [
  {
    id: 'vynta',
    date: '2026',
    tags: ['Tauri v2', 'Rust', 'Vue 3', 'TypeScript', 'Pinia', 'Win32 API', 'DXGI', 'WinAPI'],
    online: true,
    repo: true,
    images: {
      0: '/img/projects/vynta-pics/0.webp',
      1: '/img/projects/vynta-pics/1.webp',
      2: '/img/projects/vynta-pics/2.webp',
      3: '/img/projects/vynta-pics/3.webp',
      4: '/img/projects/vynta-pics/4.webp',
      5: '/img/projects/vynta-pics/5.webp',
    },
    link: 'https://apps.microsoft.com/detail/9PDH2H0KDGHC',
    link_repo: 'https://github.com/daiv05/vynta',
    translations: {
      es: {
        name: 'Vynta',
        description:
          'Una herramienta de escritorio para Windows que construí para aprender Tauri y Rust. Terminó siendo bastante más grande de lo esperado — y hasta llegó al Microsoft Store.',
        longDescription:
          'Vynta es una aplicación de escritorio para Windows que permite anotar, resaltar y magnificar cualquier parte de la pantalla en tiempo real, sin interrumpir las aplicaciones que están debajo. Es el equivalente en Windows de lo que Presentify ofrece en macOS: dibujar, spotlight, zoom dinámico y whiteboard, todo desde atajos globales personalizables.\n\nEl proyecto nació como un experimento para aprender Tauri y Rust, pero fue creciendo hasta convertirse en una herramienta real publicada en el Microsoft Store. El stack es Tauri v2 + Vue 3 + TypeScript en el frontend, y Rust en el backend, con acceso directo a las APIs de Windows (Win32, Magnification API, DXGI, Direct3D 11) para gestionar ventanas overlay, captura de pantalla y el motor de zoom.\n\nLa decisión de usar Tauri sobre Electron fue clara: bundle mucho más pequeño (~30 MB), mejor rendimiento nativo y acceso real a las APIs del sistema operativo sin compromisos. El frontend con Vue 3 + Pinia me permitió separar bien la lógica de estado de los componentes, y la internacionalización (vue-i18n) fue algo que agregué temprano para soportar inglés y español desde el inicio.\n\nEl mayor reto técnico fue el motor de zoom: implementé dos backends (Windows Magnification API y DXGI + Direct3D 11) y expuse una opción en runtime para que el usuario elija según su hardware y compatibilidad. El modo DXGI captura frames reales de la pantalla vía GPU, mientras que el modo Magnifier usa la API nativa del sistema. Cada uno tiene sus trade-offs en términos de compatibilidad y rendimiento.\n\nOtros desafíos interesantes: gestión de múltiples ventanas overlay transparentes que coexisten sin robarse el foco del usuario, atajos globales que funcionan incluso cuando la app no está en primer plano, persistencia de configuración usando el plugin de store de Tauri, y detección de monitor activo para soporte multi-monitor.\n\nEl CI/CD lo configuré con GitHub Actions: tres pipelines separados para calidad de código (oxlint, type-check), versionado automático (Release Please con Conventional Commits) y build + publicación del instalador (.msi y .exe) para Windows.',
        client: 'Proyecto personal',
        category: 'Herramienta de productividad / Desktop',
        technologies: 'Tauri v2, Rust, Vue 3, TypeScript, Pinia, vue-i18n, Win32 API, DXGI, Direct3D 11, Magnification API, oxlint, Husky',
        features: [
          'Anotaciones en pantalla en tiempo real (pluma, marcador, formas, flechas, texto)',
          'Resaltado de cursor con halo personalizable',
          'Spotlight: oscurece la pantalla excepto el área del cursor',
          'Whiteboard independiente con exportación a PNG',
          'Zoom dinámico con dos motores: Magnification API y DXGI + Direct3D 11',
          'Atajos globales completamente personalizables',
          'Soporte multi-monitor',
          'Internacionalización (inglés y español)',
          'Persistencia de configuración automática',
          'Publicado en el Microsoft Store',
          'CI/CD con GitHub Actions (lint, type-check, build, release)',
        ],
      },
      en: {
        name: 'Vynta',
        description:
          'A Windows desktop tool I built to learn Tauri and Rust. It ended up being way bigger than expected — and even made it to the Microsoft Store.',
        longDescription:
          "Vynta is a Windows desktop application for real-time screen annotation, cursor highlighting, and magnification — all without interrupting the app underneath. Think of it as the Windows alternative to Presentify for macOS: draw, spotlight, zoom, and whiteboard, all from customizable global shortcuts.\n\nThe project started as an experiment to learn Tauri and Rust, but grew into a real shipped product published on the Microsoft Store. The stack is Tauri v2 + Vue 3 + TypeScript on the frontend, and Rust on the backend, with direct access to Windows APIs (Win32, Magnification API, DXGI, Direct3D 11) to manage overlay windows, screen capture, and the zoom engine.\n\nChoosing Tauri over Electron was straightforward: much smaller bundle (~30 MB), better native performance, and real access to OS APIs without compromises. Vue 3 + Pinia gave me a clean separation between state logic and components, and I added vue-i18n internationalization early on to support English and Spanish from the start.\n\nThe biggest technical challenge was the zoom engine: I implemented two backends (Windows Magnification API and DXGI + Direct3D 11) and exposed a runtime option so the user can choose based on their hardware and compatibility. The DXGI mode captures real screen frames via the GPU, while the Magnifier mode uses the native system API. Each has its own trade-offs in terms of compatibility and performance.\n\nOther interesting challenges: managing multiple transparent overlay windows that coexist without stealing user focus, global shortcuts that work even when the app is not in the foreground, config persistence using the Tauri store plugin, and active monitor detection for multi-monitor support.\n\nFor CI/CD I set up three separate GitHub Actions pipelines: code quality (oxlint, type-check), automatic versioning (Release Please with Conventional Commits), and build + publish of Windows installers (.msi and .exe).",
        client: 'Personal project',
        category: 'Productivity tool / Desktop',
        technologies: 'Tauri v2, Rust, Vue 3, TypeScript, Pinia, vue-i18n, Win32 API, DXGI, Direct3D 11, Magnification API, oxlint, Husky',
        features: [
          'Real-time screen annotations (pen, marker, shapes, arrows, text)',
          'Cursor highlight with customizable halo',
          'Spotlight: dims the screen except the area around the cursor',
          'Independent whiteboard with PNG export',
          'Dynamic zoom with two engines: Magnification API and DXGI + Direct3D 11',
          'Fully customizable global shortcuts',
          'Multi-monitor support',
          'Internationalization (English and Spanish)',
          'Automatic configuration persistence',
          'Published on the Microsoft Store',
          'CI/CD with GitHub Actions (lint, type-check, build, release)',
        ],
      },
    },
  },
  {
    id: 'dderas-dev',
    date: '2025',
    tags: [
      'Nuxt 4',
      'Vue 3',
      'Vuetify 4',
      'GSAP',
      'Pinia',
      'Nuxt Content',
      'i18n',
      'SSG',
      'TypeScript',
      'SASS',
    ],
    online: true,
    repo: true,
    images: {
      0: '/img/projects/dderas-dev-pics/0.webp',
      1: '/img/projects/dderas-dev-pics/1.webp',
      2: '/img/projects/dderas-dev-pics/2.webp',
      3: '/img/projects/dderas-dev-pics/3.webp',
    },
    link: 'https://deras.dev',
    link_repo: 'https://github.com/daiv05/dderas-dev-nuxt',
    translations: {
      es: {
        name: 'Portfolio & Blog Personal — deras.dev',
        description:
          'Mi propio sitio web: portfolio de proyectos y blog técnico construido con Nuxt 4 y Vuetify 4. Un proyecto donde también experimento con lo que aprendo.',
        longDescription:
          'deras.dev es mi portfolio personal y blog de desarrollo full-stack, construido con Nuxt 4, Vue 3 y Vuetify 4. El objetivo era tener un espacio propio donde mostrar proyectos y publicar artículos técnicos en español e inglés, sin depender de plataformas de terceros.\n\nElegí Nuxt 4 sobre un SPA convencional para aprovechar el SSG (Static Site Generation): el sitio se pre-renderiza completo en build time, lo que da carga casi instantánea y un SEO real sin configuración extra. @nuxtjs/sitemap genera automáticamente el sitemap con soporte hreflang para ambos idiomas.\n\nPara el blog usé @nuxt/content v3 con Markdown; definí dos colecciones separadas (content_en y content_es) con sus propios prefijos de ruta, validadas con Zod. La ventaja es que el contenido vive en archivos .md versionados en git, sin necesidad de CMS ni base de datos.\n\nEl sistema de internacionalización usa @nuxtjs/i18n con estrategia prefix_except_default — inglés en la raíz, español bajo /es/ — con detección automática del idioma del navegador y cookie de preferencia. Las traducciones de la UI van en archivos JSON separados.\n\nPara animaciones usé GSAP con ScrollTrigger. El mayor reto fue que Vuetify usa su propio contenedor de scroll (.shell-main) en vez del window, lo que rompe ScrollTrigger por defecto. Implementé un plugin cliente que detecta el scroller correcto con reintentos, y un sistema de fallback con listeners de scroll nativos para garantizar que las animaciones se disparen aunque ScrollTrigger no inicialice a tiempo (especialmente en mobile).\n\nVuetify 4 se integra con Vite usando vite-plugin-vuetify con autoImport. Los iconos son MDI SVG puro (sin fuente icon), lo que reduce el bundle. El tema (light/dark) se gestiona con Pinia, sincronizado con Vuetify de forma SSR-safe: el servidor lee el tema del store y el cliente lo aplica al DOM sin hydration mismatch.\n\nEl stack de fuentes usa @nuxt/fonts con Epilogue para textos y JetBrains Mono para código, cargadas desde Google Fonts con subsetting automático.',
        client: 'Proyecto personal',
        category: 'Portfolio / Blog técnico',
        technologies:
          'Nuxt 4, Vue 3, Vuetify 4, GSAP 3 + ScrollTrigger, Pinia, @nuxt/content v3, @nuxtjs/i18n, @nuxtjs/sitemap, TypeScript, SASS, SSG',
        features: [
          'SSG completo — build time rendering con prerenderizado de rutas y sitemap',
          'Blog bilingüe (en/es) con Markdown, syntax highlighting y ToC automático',
          'Internacionalización con @nuxtjs/i18n, detección por navegador y persistencia en cookie',
          'Animaciones de scroll con GSAP + ScrollTrigger, con fallback nativo para mobile',
          'Tema dark/light gestionado con Pinia, sincronizado con Vuetify sin hydration mismatch',
          'Íconos MDI en SVG puro, sin cargar fuente de iconos completa',
          'SEO estructurado: meta tags por página, hreflang por locale, sitemap automático',
          'Tipografías Epilogue + JetBrains Mono con subsetting automático vía @nuxt/fonts',
          'ESLint con reglas de imports sin usar y prettier integrado',
        ],
      },
      en: {
        name: 'Personal Portfolio & Blog — deras.dev',
        description:
          'My own website: a project portfolio and technical blog built with Nuxt 4 and Vuetify 4. Also a living experiment where I try things as I learn them.',
        longDescription:
          "deras.dev is my personal portfolio and full-stack development blog, built with Nuxt 4, Vue 3, and Vuetify 4. The goal was to have my own space to showcase projects and publish technical articles in both English and Spanish, without depending on third-party platforms.\n\nI chose Nuxt 4 over a conventional SPA to take advantage of SSG (Static Site Generation): the site is fully pre-rendered at build time, which gives near-instant load and real SEO with no extra configuration. @nuxtjs/sitemap automatically generates the sitemap with hreflang support for both locales.\n\nFor the blog I used @nuxt/content v3 with Markdown; I defined two separate collections (content_en and content_es) with their own route prefixes, validated with Zod. The advantage is that content lives in .md files versioned in git — no CMS or database needed.\n\nThe i18n system uses @nuxtjs/i18n with prefix_except_default strategy — English at the root, Spanish under /es/ — with automatic browser language detection and a preference cookie. UI translations live in separate JSON files.\n\nFor animations I used GSAP with ScrollTrigger. The biggest challenge was that Vuetify uses its own scroll container (.shell-main) instead of window, which breaks ScrollTrigger by default. I implemented a client-only plugin that detects the right scroller with retries, plus a native scroll listener fallback system to guarantee animations fire even when ScrollTrigger doesn't initialize in time (especially on mobile).\n\nVuetify 4 integrates with Vite using vite-plugin-vuetify with autoImport. Icons use pure MDI SVG (no icon font), reducing bundle size. The theme (light/dark) is managed with Pinia, synchronized with Vuetify in an SSR-safe way: the server reads the theme from the store and the client applies it to the DOM without hydration mismatches.\n\nThe font stack uses @nuxt/fonts with Epilogue for body text and JetBrains Mono for code, loaded from Google Fonts with automatic subsetting.",
        client: 'Personal project',
        category: 'Portfolio / Technical blog',
        technologies:
          'Nuxt 4, Vue 3, Vuetify 4, GSAP 3 + ScrollTrigger, Pinia, @nuxt/content v3, @nuxtjs/i18n, @nuxtjs/sitemap, TypeScript, SASS, SSG',
        features: [
          'Full SSG — build-time rendering with route prerendering and sitemap',
          'Bilingual blog (en/es) with Markdown, syntax highlighting, and automatic ToC',
          'Internationalization with @nuxtjs/i18n, browser detection and cookie persistence',
          'Scroll animations with GSAP + ScrollTrigger, native scroll fallback for mobile',
          'Dark/light theme managed with Pinia, SSR-safe sync with Vuetify (no hydration mismatch)',
          'MDI icons as pure SVGs — no full icon font loaded',
          'Structured SEO: per-page meta tags, per-locale hreflang, automatic sitemap',
          'Epilogue + JetBrains Mono fonts with automatic subsetting via @nuxt/fonts',
          'ESLint with unused-imports rules and integrated Prettier',
        ],
      },
    },
  },
  {
    id: 'reportfia',
    date: '2025',
    tags: [
      'Laravel',
      'TailwindCSS',
      'Flowbite',
      'Chart.js',
      'PWA',
      'MySQL',
      'Spatie Permission',
      'Audits',
      'Reports',
      'Excel',
    ],
    online: true,
    repo: false,
    images: {
      0: '/img/projects/reportfia-pics/1.webp',
    },
    link: null,
    link_repo: null,
    translations: {
      es: {
        name: 'Sistema para el control de incidencias FIA - UES',
        description:
          'PWA construida para que una facultad universitaria dejara de gestionar incidencias por WhatsApp y papel. Ciclo completo: reporte, asignación, resolución, auditorías y dashboards.',
        longDescription:
          'ReportFIA es una aplicación PWA desarrollada en Laravel que permite crear, asignar, seguir y resolver reportes de incidencias, gestionar personal y recursos, auditar operaciones y visualizar métricas para la toma de decisiones. \n\n El sistema surgió para optimizar la gestión interna de la facultad, el requerimiento principal era contar con una herramienta digital que centralizara y automatizara el proceso de manejo de incidencias, la facultad tenía interés en llevar un mejor control de los reportes y su resolución, así como mejorar la comunicación entre estudiantes, personal y administración. \n\nLa elección de las tecnologías fue en conjunto con el cliente (FIA-UES) y el equipo de desarrollo, se optó por Laravel debido a su robustez y facilidad para construir aplicaciones web escalables, TailwindCSS se seleccionó para un diseño rápido y responsivo, Chart.js para las visualizaciones de datos, y PWA para asegurar una experiencia móvil fluida, ya que se esperaba que la mayoría de usuarios accedieran desde dispositivos móviles. \n\n Se inició con un análisis detallado de los requerimientos del cliente, tomados mediante reuniones periódicas, seguido por los diseños iniciales de la interfaz (utilizando Figma) y la arquitectura del sistema. La implementación se llevó a cabo en fases, comenzando por las funcionalidades básicas de reportes y seguimiento, para luego integrar módulos adicionales como gestión de personal, auditorías y dashboards analíticos. \n\n Durante el desarrollo, se realizaron pruebas continuas con usuarios clave de la facultad para asegurar que el sistema cumpliera con sus necesidades y se ajustara según su feedback. Finalmente, se desplegó el sistema en un entorno de producción y se capacitó al personal administrativo para su uso efectivo.',
        client: 'Facultad de Ingeniería y Arquitectura - UES',
        category: 'Gestión de incidencias / Mantenimiento',
        technologies:
          'Laravel 10.x, TailwindCSS, Flowbite, Chart.js, MySQL, PWA, Spatie Permission, Audits, Reports, MS Excel',
        features: [
          'Creación y seguimiento completo del ciclo de vida de reportes',
          'Gestión de personal, puestos y asignaciones',
          'Control de inventario y bienes patrimoniales',
          'Registro y consulta de auditoría completa',
          'Dashboard de estadísticas con exportación a varios formatos',
          'Autenticación y control de acceso por roles (RBAC)',
          'PWA con assets y capturas para experiencia móvil',
          'Importación masiva desde Excel y validaciones',
          'Notificaciones y experiencia responsive',
        ],
      },
      en: {
        name: 'FIA Incident Management System - UES',
        description:
          'PWA built for a university faculty to stop managing incidents in WhatsApp and paper. Full lifecycle: reporting, assignment, resolution, audits and dashboards.',
        longDescription:
          "ReportFIA is a PWA application built with Laravel that enables creating, assigning, tracking, and resolving incident reports, managing personnel and resources, auditing operations, and visualizing metrics for decision-making. \n\n The system was developed to optimize the faculty's internal management; the main requirement was to have a digital tool that centralized and automated the incident handling process. The faculty sought to improve report tracking and resolution, as well as enhance communication between students, staff, and administration. \n\n The choice of technologies was made in collaboration with the client (FIA-UES) and the development team. Laravel was chosen for its robustness and ease of building scalable web applications, TailwindCSS for rapid and responsive design, Chart.js for data visualizations, and PWA to ensure a smooth mobile experience since most users were expected to access it from mobile devices. \n\n The project began with a detailed analysis of the client's requirements through periodic meetings, followed by initial interface designs (using Figma) and system architecture planning. Implementation was carried out in phases, starting with basic reporting and tracking functionalities, followed by additional modules such as personnel management, audits, and analytical dashboards. \n\n Throughout development, continuous testing was conducted with key faculty users to ensure the system met their needs and was adjusted based on their feedback. Finally, the system was deployed in a production environment, and administrative staff were trained for effective use.",
        client: 'Faculty of Engineering and Architecture - UES',
        category: 'Incident management / Maintenance',
        technologies:
          'Laravel 10.x, TailwindCSS, Chart.js, MySQL, PWA, Spatie Permission, Audits, Reports, Excel',
        features: [
          'Full lifecycle incident reporting and tracking',
          'Personnel and position management with assignments',
          'Inventory and institutional asset control',
          'Comprehensive audit logging and traceability',
          'Analytics dashboard with export capabilities',
          'Authentication and RBAC access control',
          'PWA-ready with mobile screenshots and icons',
          'Bulk import from Excel with validation',
          'Responsive, modern UI and real-time notifications',
        ],
      },
    },
  },
  {
    id: 'musycharts',
    date: '2023',
    tags: ['Vue.js', 'Vuetify', 'Spotify API', 'amCharts 5', 'OAuth 2.0'],
    online: true,
    repo: true,
    images: {
      0: '/img/projects/musycharts-pics/0.webp',
      1: '/img/projects/musycharts-pics/1.webp',
      2: '/img/projects/musycharts-pics/2.webp',
      3: '/img/projects/musycharts-pics/3.webp',
    },
    link: 'https://musycharts-dcdv.vercel.app/',
    link_repo: 'https://github.com/daiv05/musycharts-dcdv',
    translations: {
      es: {
        name: 'MusyCharts',
        description:
          'Un dashboard de Spotify que construí para entender OAuth 2.0 de verdad. Terminé usando OAuth en mi siguiente trabajo — así que valió la pena.',
        longDescription:
          'MusyCharts conecta con la API de Spotify para extraer estadísticas personalizadas y mostrarlas con amCharts 5 en dashboards interactivos que revelan hábitos musicales y géneros predominantes. La aplicación permite a los usuarios autenticarse mediante OAuth 2.0, seleccionar rangos de tiempo y explorar sus tendencias de escucha a través de gráficos dinámicos y un diseño moderno y responsive. \n\n Es un proyecto personal desarrollado para aprender sobre integración de APIs, autenticación OAuth y visualización de datos en la web (y practicar con OAuth fue muy acertado ya que terminé trabajando con ello en mi siguiente trabajo). \n\n La decisión de usar Vue.js y Vuetify podría decir que se basó en su facilidad para construir interfaces reactivas y componentes modulares (aunque realmente no necesitas todo un framework para algo como esto, fue más para practicar), mientras que amCharts 5 lo elegí porque quería probar otra librería a parte de Charts.js y esta se veía bastante prometedora. \n\n El desarrollo comenzó con la configuración del entorno y maquetación de algunas vistas (en este caso no utilicé Figma y fui directamente al código), seguido por las pruebas e implementación de la autenticación OAuth 2.0. Luego se diseñaron y desarrollaron los dashboards utilizando amCharts 5 para representar visualmente los datos obtenidos. \n\n Tiempo después decidí hacer un re-diseño completo para hacer mas llamativa la interfaz y mejorar la experiencia de usuario, agregando nuevas visualizaciones y optimizando el rendimiento general de la aplicación.',
        client: 'Proyecto personal',
        category: 'Visualización de datos',
        technologies: 'Vue.js, Vuetify, Spotify API, amCharts 5, OAuth 2.0',
        features: [
          'Autenticación OAuth 2.0 con Spotify',
          'Top tracks y artistas por períodos personalizados',
          'Visualización de géneros con gráficos dinámicos',
          'Dashboard interactivo con múltiples vistas',
          'Diseño responsive y moderno',
        ],
      },
      en: {
        name: 'MusyCharts',
        description:
          'A Spotify dashboard I built to learn OAuth 2.0 properly. Ended up using OAuth at my next job — so that worked out.',
        longDescription:
          "MusyCharts connects to the Spotify API to fetch personalized statistics and display them using amCharts 5 in interactive dashboards that reveal listening habits and top genres. The app allows users to authenticate via OAuth 2.0, select time ranges, and explore their listening trends through dynamic charts and a modern, responsive design. \n\n It is a personal project developed to learn about API integration, OAuth authentication, and data visualization on the web (and practicing OAuth was a great choice since I ended up working with it in my next job). \n\n The decision to use Vue.js and Vuetify was based on their ease of building reactive interfaces and modular components (although you don't really need a full framework for something like this, it was more for practice), while I chose amCharts 5 because I wanted to try another library besides Charts.js and this one looked quite promising. \n\n Development began with setting up the environment and laying out some views (in this case I didn't use Figma and went straight to code), followed by testing and implementing OAuth 2.0 authentication. Then the dashboards were designed and developed using amCharts 5 to visually represent the fetched data. \n\n Later on, I decided to do a complete redesign to make the interface more appealing and improve user experience, adding new visualizations and optimizing overall application performance.",
        client: 'Personal project',
        category: 'Data visualization',
        technologies: 'Vue.js, Vuetify, Spotify API, amCharts 5, OAuth 2.0',
        features: [
          'OAuth 2.0 authentication with Spotify',
          'Top tracks and artists by custom ranges',
          'Genre analysis with dynamic charts',
          'Multi-view interactive dashboard',
          'Responsive, modern UI',
        ],
      },
    },
  },
  {
    id: 'carmencita',
    date: '2023',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'TailwindCSS', 'REST API', 'Sanctum'],
    online: false,
    repo: true,
    images: {
      0: '/img/projects/carmencita-pics/0.webp',
      1: '/img/projects/carmencita-pics/1.webp',
      2: '/img/projects/carmencita-pics/2.webp',
      3: '/img/projects/carmencita-pics/3.webp',
      4: '/img/projects/carmencita-pics/4.webp',
      5: '/img/projects/carmencita-pics/5.webp',
    },
    link: '#',
    link_repo: 'https://github.com/daiv05/carmencita_vuejs',
    translations: {
      es: {
        name: 'Sistema de Gestión Carmencita',
        description:
          'ERP a medida para una tienda costera donde el dueño tenía que estar presente en cada venta porque nadie sabía los precios. Inventario, facturación, RRHH y rutas de entrega.',
        longDescription:
          'ERP desarrollado a medida con módulos conectados: inventario, facturación, gestión de planillas y rutas de entrega. El sistema incluye un panel administrativo con informes sobre ventas e inventario. \n\n El proyecto nació de la necesidad de una tienda local de contar con un sistema digital que integrara todas sus operaciones diarias en una sola plataforma, ya que anteriormente manejaban inventarios y facturación de forma manual, nos comentaba el cliente que incluso no todos los vendedores conocían los precios de los productos, y siempre tenía que estar él o la subgerente presentes, lo que generaba errores y retrasos. \n\n Se optó por usar Vue.js para el frontend debido a su capacidad para crear interfaces de usuario reactivas y dinámicas, mientras que Laravel se eligió para el backend por su robustez y facilidad para construir APIs RESTful seguras con Sanctum. MySQL fue la base de datos seleccionada por su rendimiento y escalabilidad, y TailwindCSS permitió un diseño rápido y responsivo. \n\n El desarrollo comenzó con un análisis detallado de los procesos comerciales del cliente, se llevaron acabo varias reuniones grabadas que sirvieron para documentar los requerimientos, seguido por la creación de prototipos de la interfaz en Figma, cada prototipo era presentado y validado con el cliente. \n\n La implementación se realizó en fases, comenzando con el módulo de inventario, seguido por facturación, RRHH y finalmente el sistema de rutas de entrega (ellos necesitaban poder registrar pedidos y luego armar rutas por fechas según mejor les convenía). \n\n Durante el desarrollo, se realizaron pruebas continuas con usuarios clave del negocio para asegurar que el sistema cumpliera con sus necesidades y se ajustara según su feedback. Finalmente, se desplegó de forma local en la tienda y se entregó documentación y videotutoriales al personal para su uso efectivo.',
        client: 'Tienda y Depósito "Carmencita"',
        category: 'Software empresarial',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL',
        features: [
          'Inventario y manejo de stock',
          'Punto de venta con impresión de facturas',
          'Planillas automáticas y gestión de RRHH',
          'Gestión de permisos e incapacidades',
          'Marcado de asistencia',
          'Pedidos delivery y armado de rutas de entrega',
          'Panel administrativo con reportes',
          'Roles y permisos básicos (lo que necesitaban)',
        ],
      },
      en: {
        name: 'Carmencita Management System',
        description:
          'Custom ERP for a coastal store where the owner had to be present for every sale because nobody knew the prices. Inventory, invoicing, HR and delivery routes.',
        longDescription:
          "Custom-developed ERP with interconnected modules: inventory, invoicing, payroll management, and delivery routes. The system includes an admin dashboard with sales and inventory reports. \n\n The project originated from a local store's need for a digital system that integrated all their daily operations into a single platform, as they previously managed inventory and invoicing manually. The client mentioned that not all salespeople knew the product prices, and he or the assistant manager always had to be present, leading to errors and delays. \n\n Vue.js was chosen for the frontend due to its ability to create reactive and dynamic user interfaces, while Laravel was selected for the backend for its robustness and ease of building secure RESTful APIs with Sanctum. MySQL was the chosen database for its performance and scalability, and TailwindCSS enabled rapid and responsive design. \n\n Development began with a detailed analysis of the client's business processes, with several recorded meetings that helped document the requirements, followed by creating interface prototypes in Figma, each presented and validated with the client. \n\n Implementation was carried out in phases, starting with the inventory module, followed by invoicing, HR, and finally the delivery route system (they needed to be able to register orders and then create routes by dates as it suited them best). \n\n During development, continuous testing was conducted with key business users to ensure the system met their needs and was adjusted based on their feedback. Finally, it was deployed locally in the store, and documentation and video tutorials were provided to the staff for effective use.",
        client: '"Carmencita" store & depot',
        category: 'Enterprise software',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL, Redis',
        features: [
          'Inventory and stock management',
          'Point of sale with invoice printing',
          'Automated payroll and HR management',
          'Leave and permission management',
          'Attendance marking',
          'Delivery order management and route planning',
          'Admin dashboard with reporting',
          'Basic roles and permissions (the essentials)',
        ],
      },
    },
  },
] as const;

export { projectList };
