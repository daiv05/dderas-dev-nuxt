export type ProjectCluster = 'agents' | 'rag' | 'ml' | 'fullstack'

export interface ProjectTranslation {
  name: string
  description: string
  longDescription: string
  client: string
  category: string
  technologies: string
  features: string[]
  metricLabel?: string
}

export interface Project {
  id: string
  date: string
  tags: string[]
  featured: boolean
  cluster: ProjectCluster
  metric: { value: string } | null
  images: Record<number, string>
  links: { live: string | null; repo: string | null; dataset: string | null }
  translations: Record<'en' | 'es', ProjectTranslation>
}

export const projectList: Project[] = [
  {
    "id": "doctormaiz",
    "date": "2025",
    "tags": [
      "PyTorch",
      "EfficientNet-Lite0",
      "TensorFlow Lite",
      "ONNX",
      "Optuna",
      "Computer Vision",
      "FastAPI",
      "Modal",
      "Edge AI"
    ],
    "featured": true,
    "cluster": "ml",
    "metric": {
      "value": "0.947"
    },
    "images": {},
    "links": {
      "live": null,
      "repo": null,
      "dataset": "https://huggingface.co/daiv05/corn-leaf-diseases-pests-and-deficiencies"
    },
    "translations": {
      "en": {
        "name": "DoctorMaiz",
        "description": "An offline maize disease classifier for small-scale farmers: a 3.56 MB int8 model that diagnoses 9 diseases, pests and nutrient deficiencies in ~60 ms on an Android phone, with no connection.",
        "longDescription": "DoctorMaiz is an edge-AI system that identifies maize leaf diseases, pests and nutrient deficiencies from a single photo, fully offline on Android. It is built for small-scale farmers in rural areas without connectivity, where a late diagnosis can cost a large part of a harvest.\n\nI led the machine learning side: data, training, evaluation, interpretability and export. The corpus consolidates 33,438 images from 8 public sources, deduplicated with perceptual hashing. A classic stratified split leaks images from the same source to both sides and inflates metrics, so I audited that leakage, built source-grouped splits and measured generalization with leave-one-source-out evaluation. That honest number (0.60 macro-F1 on unseen sources versus 0.95 in-domain) is reported next to the headline result, because it is what a farmer with a new camera and a new field actually gets.\n\nThe deployed model is EfficientNet-Lite0 quantized to int8 TensorFlow Lite: 0.947 macro-F1 and 97.9% accuracy on an independent test set of 5,015 images, 3.56 MB on disk and around 60 ms per image on a mid-range phone. Training uses PyTorch with Optuna for hyperparameter search, K-fold cross-validation and a soft-voting ensemble (0.957 macro-F1) for server-side inference. The export pipeline checks numerical parity between PyTorch, ONNX and TFLite, and the model exposes its pooled features so the app can run a Mahalanobis out-of-distribution detector that rejects photos that are not maize leaves.\n\nA fairness audit compares lab and field images, and a small FastAPI backend handles accounts, optional sync and dataset contributions. Training runs on GPUs through Modal.",
        "client": "Machine Learning specialization project",
        "category": "Edge AI / Computer vision",
        "technologies": "PyTorch, EfficientNet-Lite0, TensorFlow Lite (int8), ONNX, Optuna, scikit-learn, FastAPI, Modal",
        "metricLabel": "macro-F1 · 3.56 MB · ~60 ms offline on Android",
        "features": [
          "33,438 images from 8 public sources, deduplicated with perceptual hashing",
          "EfficientNet-Lite0 int8 TFLite: 0.947 macro-F1 and 97.9% accuracy",
          "Leave-one-source-out evaluation and source-leakage audit",
          "Fairness audit across lab and field images",
          "Optuna search, K-fold cross-validation and soft-voting ensemble (0.957 macro-F1)",
          "PyTorch / ONNX / TFLite parity checks",
          "Mahalanobis out-of-distribution detector to reject non-leaf photos",
          "Companion FastAPI backend for accounts, sync and dataset contributions"
        ]
      },
      "es": {
        "name": "DoctorMaiz",
        "description": "Un clasificador offline de enfermedades del maíz para pequeños productores: un modelo int8 de 3.56 MB que diagnostica 9 enfermedades, plagas y deficiencias en ~60 ms en un teléfono Android, sin conexión.",
        "longDescription": "DoctorMaiz es un sistema de IA en el borde que identifica enfermedades foliares, plagas y deficiencias nutricionales del maíz a partir de una sola foto, completamente offline en Android. Está pensado para pequeños productores en zonas rurales sin conectividad, donde un diagnóstico tardío puede costar buena parte de una cosecha.\n\nLideré la parte de machine learning: datos, entrenamiento, evaluación, interpretabilidad y exportación. El corpus consolida 33,438 imágenes de 8 fuentes públicas, deduplicadas con hash perceptual. Una partición estratificada clásica filtra imágenes de una misma fuente a ambos lados y infla las métricas, así que audité esa fuga, construí particiones agrupadas por fuente y medí la generalización con evaluación leave-one-source-out. Ese número honesto (0.60 de macro-F1 en fuentes no vistas frente a 0.95 dentro del dominio) se reporta junto al resultado principal, porque es lo que obtiene un agricultor con una cámara y una parcela nuevas.\n\nEl modelo desplegado es EfficientNet-Lite0 cuantizado a TensorFlow Lite int8: 0.947 de macro-F1 y 97.9% de exactitud en un conjunto de prueba independiente de 5,015 imágenes, 3.56 MB en disco y unos 60 ms por imagen en un teléfono de gama media. El entrenamiento usa PyTorch con Optuna para la búsqueda de hiperparámetros, validación cruzada K-fold y un ensamble de voto suave (0.957 de macro-F1) para inferencia en servidor. La exportación verifica paridad numérica entre PyTorch, ONNX y TFLite, y el modelo expone sus features para que la app ejecute un detector fuera de distribución de Mahalanobis que rechaza fotos que no son hojas de maíz.\n\nUna auditoría de equidad compara imágenes de laboratorio y de campo, y un backend pequeño en FastAPI maneja cuentas, sincronización opcional y contribuciones al dataset. El entrenamiento corre en GPUs mediante Modal.",
        "client": "Proyecto de la especialización en Machine Learning",
        "category": "IA en el borde / Visión por computadora",
        "technologies": "PyTorch, EfficientNet-Lite0, TensorFlow Lite (int8), ONNX, Optuna, scikit-learn, FastAPI, Modal",
        "metricLabel": "macro-F1 · 3.56 MB · ~60 ms offline en Android",
        "features": [
          "33,438 imágenes de 8 fuentes públicas, deduplicadas con hash perceptual",
          "EfficientNet-Lite0 int8 TFLite: 0.947 de macro-F1 y 97.9% de exactitud",
          "Evaluación leave-one-source-out y auditoría de fuga entre fuentes",
          "Auditoría de equidad entre imágenes de laboratorio y de campo",
          "Búsqueda con Optuna, validación cruzada K-fold y ensamble de voto suave (0.957 de macro-F1)",
          "Verificación de paridad PyTorch / ONNX / TFLite",
          "Detector fuera de distribución de Mahalanobis para rechazar fotos que no son hojas",
          "Backend en FastAPI para cuentas, sincronización y contribuciones al dataset"
        ]
      }
    }
  },
  {
    "id": "reportfia",
    "date": "2025",
    "tags": [
      "Laravel",
      "TailwindCSS",
      "Flowbite",
      "Chart.js",
      "PWA",
      "MySQL",
      "Spatie Permission",
      "Audits",
      "Reports",
      "Excel"
    ],
    "featured": true,
    "cluster": "fullstack",
    "metric": {
      "value": "6,000+"
    },
    "images": {
      "0": "/img/projects/reportfia-pics/1.webp"
    },
    "links": {
      "live": null,
      "repo": "https://github.com/daiv05/reportes-ues",
      "dataset": null
    },
    "translations": {
      "en": {
        "name": "FIA Incident Management System - UES",
        "description": "PWA built for a university faculty to stop managing incidents in WhatsApp and paper. Full lifecycle: reporting, assignment, resolution, audits and dashboards.",
        "longDescription": "ReportFIA is a PWA application built with Laravel that enables creating, assigning, tracking, and resolving incident reports, managing personnel and resources, auditing operations, and visualizing metrics for decision-making. \n\n The system was developed to optimize the faculty's internal management; the main requirement was to have a digital tool that centralized and automated the incident handling process. The faculty sought to improve report tracking and resolution, as well as enhance communication between students, staff, and administration. \n\n The choice of technologies was made in collaboration with the client (FIA-UES) and the development team. Laravel was chosen for its robustness and ease of building scalable web applications, TailwindCSS for rapid and responsive design, Chart.js for data visualizations, and PWA to ensure a smooth mobile experience since most users were expected to access it from mobile devices. \n\n The project began with a detailed analysis of the client's requirements through periodic meetings, followed by initial interface designs (using Figma) and system architecture planning. Implementation was carried out in phases, starting with basic reporting and tracking functionalities, followed by additional modules such as personnel management, audits, and analytical dashboards. \n\n Throughout development, continuous testing was conducted with key faculty users to ensure the system met their needs and was adjusted based on their feedback. Finally, the system was deployed in a production environment, and administrative staff were trained for effective use.",
        "client": "Faculty of Engineering and Architecture - UES",
        "category": "Incident management / Maintenance",
        "technologies": "Laravel 10.x, TailwindCSS, Chart.js, MySQL, PWA, Spatie Permission, Audits, Reports, Excel",
        "features": [
          "Full lifecycle incident reporting and tracking",
          "Personnel and position management with assignments",
          "Inventory and institutional asset control",
          "Comprehensive audit logging and traceability",
          "Analytics dashboard with export capabilities",
          "Authentication and RBAC access control",
          "PWA-ready with mobile screenshots and icons",
          "Bulk import from Excel with validation",
          "Responsive, modern UI and real-time notifications"
        ],
        "metricLabel": "students and 200+ staff served"
      },
      "es": {
        "name": "Sistema para el control de incidencias FIA - UES",
        "description": "PWA construida para que una facultad universitaria dejara de gestionar incidencias por WhatsApp y papel. Ciclo completo: reporte, asignación, resolución, auditorías y dashboards.",
        "longDescription": "ReportFIA es una aplicación PWA desarrollada en Laravel que permite crear, asignar, seguir y resolver reportes de incidencias, gestionar personal y recursos, auditar operaciones y visualizar métricas para la toma de decisiones. \n\n El sistema surgió para optimizar la gestión interna de la facultad, el requerimiento principal era contar con una herramienta digital que centralizara y automatizara el proceso de manejo de incidencias, la facultad tenía interés en llevar un mejor control de los reportes y su resolución, así como mejorar la comunicación entre estudiantes, personal y administración. \n\nLa elección de las tecnologías fue en conjunto con el cliente (FIA-UES) y el equipo de desarrollo, se optó por Laravel debido a su robustez y facilidad para construir aplicaciones web escalables, TailwindCSS se seleccionó para un diseño rápido y responsivo, Chart.js para las visualizaciones de datos, y PWA para asegurar una experiencia móvil fluida, ya que se esperaba que la mayoría de usuarios accedieran desde dispositivos móviles. \n\n Se inició con un análisis detallado de los requerimientos del cliente, tomados mediante reuniones periódicas, seguido por los diseños iniciales de la interfaz (utilizando Figma) y la arquitectura del sistema. La implementación se llevó a cabo en fases, comenzando por las funcionalidades básicas de reportes y seguimiento, para luego integrar módulos adicionales como gestión de personal, auditorías y dashboards analíticos. \n\n Durante el desarrollo, se realizaron pruebas continuas con usuarios clave de la facultad para asegurar que el sistema cumpliera con sus necesidades y se ajustara según su feedback. Finalmente, se desplegó el sistema en un entorno de producción y se capacitó al personal administrativo para su uso efectivo.",
        "client": "Facultad de Ingeniería y Arquitectura - UES",
        "category": "Gestión de incidencias / Mantenimiento",
        "technologies": "Laravel 10.x, TailwindCSS, Flowbite, Chart.js, MySQL, PWA, Spatie Permission, Audits, Reports, MS Excel",
        "features": [
          "Creación y seguimiento completo del ciclo de vida de reportes",
          "Gestión de personal, puestos y asignaciones",
          "Control de inventario y bienes patrimoniales",
          "Registro y consulta de auditoría completa",
          "Dashboard de estadísticas con exportación a varios formatos",
          "Autenticación y control de acceso por roles (RBAC)",
          "PWA con assets y capturas para experiencia móvil",
          "Importación masiva desde Excel y validaciones",
          "Notificaciones y experiencia responsive"
        ],
        "metricLabel": "estudiantes y 200+ empleados beneficiados"
      }
    }
  },
  {
    "id": "vynta",
    "date": "2026",
    "tags": [
      "Tauri v2",
      "Rust",
      "Vue 3",
      "TypeScript",
      "Pinia",
      "Win32 API",
      "DXGI",
      "WinAPI"
    ],
    "featured": true,
    "cluster": "fullstack",
    "metric": {
      "value": "MS Store"
    },
    "images": {
      "0": "/img/projects/vynta-pics/0.webp",
      "1": "/img/projects/vynta-pics/1.webp",
      "2": "/img/projects/vynta-pics/2.webp",
      "3": "/img/projects/vynta-pics/3.webp",
      "4": "/img/projects/vynta-pics/4.webp",
      "5": "/img/projects/vynta-pics/5.webp"
    },
    "links": {
      "live": "https://apps.microsoft.com/detail/9PDH2H0KDGHC",
      "repo": "https://github.com/daiv05/vynta",
      "dataset": null
    },
    "translations": {
      "en": {
        "name": "Vynta",
        "description": "A Windows desktop tool I built to learn Tauri and Rust. It ended up being way bigger than expected - and even made it to the Microsoft Store.",
        "longDescription": "Vynta is a desktop application for Windows that allows you to annotate, highlight, and magnify any part of the screen in real time, without interrupting applications running underneath. It's the Windows equivalent of what Presentify offers on macOS: drawing, spotlight, dynamic zoom, and whiteboard, all from customizable global shortcuts.\n\nThe project began as an experiment to learn Tauri and Rust, but it grew into a real tool. The stack is Vue 3 + TypeScript on the frontend, and Rust on the backend, with direct access to Windows APIs (Win32, Magnification API, DXGI, Direct3D 11) to manage overlay windows, screenshots, and the zoom engine.\n\nThe decision to use Tauri? To learn, to experiment, nothing more than that, because realistically, using WebView with its RAM consumption is a terrible decision-something you want to minimize in an application that will be running in the background and that technically doesn't do anything resource-intensive. The frontend with Vue 3 + Pinia allowed me to clearly separate the state logic from the components, and internationalization (vue-i18n) was something I added early on to support English and Spanish from the start.\n\nThe biggest technical challenge was the zoom engine: I implemented two backends (Windows Magnification API and DXGI + Direct3D 11) and exposed a runtime option for the user to choose based on their hardware and compatibility. DXGI mode captures actual screen frames via the GPU, while Magnifier mode uses the system's native API. Each has its trade-offs in terms of compatibility and performance.\n\nOther interesting challenges: managing multiple transparent overlay windows that coexist without stealing the user's focus, global shortcuts that work even when the app is not in the foreground, configuration persistence using the Tauri store plugin, and active monitor detection for multi-monitor support.\n\nI configured CI/CD with GitHub Actions: three separate pipelines for code quality (oxlint, type-check), automatic versioning (Release Please with Conventional Commits), and build + publish the installer (.msi and .exe) for Windows.",
        "client": "Personal project",
        "category": "Productivity tool / Desktop",
        "technologies": "Tauri v2, Rust, Vue 3, TypeScript, Pinia, vue-i18n, Win32 API, DXGI, Direct3D 11, Magnification API, oxlint, Husky",
        "features": [
          "Real-time screen annotations (pen, marker, shapes, arrows, text)",
          "Cursor highlight with customizable halo",
          "Spotlight: dims the screen except the area around the cursor",
          "Independent whiteboard with PNG export",
          "Dynamic zoom with two engines: Magnification API and DXGI + Direct3D 11",
          "Fully customizable global shortcuts",
          "Multi-monitor support",
          "Internationalization (English and Spanish)",
          "Automatic configuration persistence",
          "Published on the Microsoft Store",
          "CI/CD with GitHub Actions (lint, type-check, build, release)"
        ],
        "metricLabel": "published desktop app"
      },
      "es": {
        "name": "Vynta",
        "description": "Una herramienta de escritorio para Windows que construí para aprender Tauri y Rust. Terminó siendo bastante más grande de lo esperado - y hasta llegó a Microsoft Store.",
        "longDescription": "Vynta es una aplicación de escritorio para Windows que permite anotar, resaltar y magnificar cualquier parte de la pantalla en tiempo real, sin interrumpir las aplicaciones que están debajo. Es el equivalente en Windows de lo que Presentify ofrece en macOS: dibujar, spotlight, zoom dinámico y whiteboard, todo desde atajos globales personalizables.\n\nEl proyecto nació como un experimento para aprender Tauri y Rust, pero fue creciendo hasta convertirse en una herramienta real. El stack es Vue 3 + TypeScript en el frontend, y Rust en el backend, con acceso directo a las APIs de Windows (Win32, Magnification API, DXGI, Direct3D 11) para gestionar ventanas overlay, captura de pantalla y el motor de zoom.\n\n¿La decisión de usar Tauri? Conocer, experimentar, nada mas que eso, porque siendo realistas es una pésima decisión utilizar WebView con su consumo de RAM, algo que quieres reducir en una aplicación que tendrás corriendo en segundo plano y que técnicamente no hace nada pesado. El frontend con Vue 3 + Pinia me permitió separar bien la lógica de estado de los componentes, y la internacionalización (vue-i18n) fue algo que agregué temprano para soportar inglés y español desde el inicio.\n\nEl mayor reto técnico fue el motor de zoom: implementé dos backends (Windows Magnification API y DXGI + Direct3D 11) y expuse una opción en runtime para que el usuario elija según su hardware y compatibilidad. El modo DXGI captura frames reales de la pantalla vía GPU, mientras que el modo Magnifier usa la API nativa del sistema. Cada uno tiene sus trade-offs en términos de compatibilidad y rendimiento.\n\nOtros desafíos interesantes: gestión de múltiples ventanas overlay transparentes que coexisten sin robarse el foco del usuario, atajos globales que funcionan incluso cuando la app no está en primer plano, persistencia de configuración usando el plugin de store de Tauri, y detección de monitor activo para soporte multi-monitor.\n\nEl CI/CD lo configuré con GitHub Actions: tres pipelines separados para calidad de código (oxlint, type-check), versionado automático (Release Please con Conventional Commits) y build + publicación del instalador (.msi y .exe) para Windows.",
        "client": "Proyecto personal",
        "category": "Herramienta de productividad / Desktop",
        "technologies": "Tauri v2, Rust, Vue 3, TypeScript, Pinia, vue-i18n, Win32 API, DXGI, Direct3D 11, Magnification API, oxlint, Husky",
        "features": [
          "Anotaciones en pantalla en tiempo real (pluma, marcador, formas, flechas, texto)",
          "Resaltado de cursor con halo personalizable",
          "Spotlight: oscurece la pantalla excepto el área del cursor",
          "Whiteboard independiente con exportación a PNG",
          "Zoom dinámico con dos motores: Magnification API y DXGI + Direct3D 11",
          "Atajos globales completamente personalizables",
          "Soporte multi-monitor",
          "Internacionalización (inglés y español)",
          "Persistencia de configuración automática",
          "Publicado en el Microsoft Store",
          "CI/CD con GitHub Actions (lint, type-check, build, release)"
        ],
        "metricLabel": "app de escritorio publicada"
      }
    }
  },
  {
    "id": "dderas-dev",
    "date": "2026",
    "tags": [
      "Nuxt 4",
      "Vue 3",
      "TresJS",
      "Three.js",
      "GSAP",
      "Lenis",
      "Nuxt Content",
      "i18n",
      "SSG",
      "TypeScript",
      "Python",
      "UMAP"
    ],
    "featured": false,
    "cluster": "fullstack",
    "metric": null,
    "images": {
      "0": "/img/projects/dderas-dev-pics/0.webp",
      "1": "/img/projects/dderas-dev-pics/1.webp",
      "2": "/img/projects/dderas-dev-pics/2.webp",
      "3": "/img/projects/dderas-dev-pics/3.webp"
    },
    "links": {
      "live": "https://deras.dev",
      "repo": "https://github.com/daiv05/dderas-dev-nuxt",
      "dataset": null
    },
    "translations": {
      "en": {
        "name": "Personal Portfolio & Blog - deras.dev",
        "description": "This site: a static, bilingual portfolio where the 3D background is a real embedding space of my own work, plus a technical blog.",
        "longDescription": "deras.dev is my portfolio and technical blog, built with Nuxt 4 and fully prerendered as a static site in English and Spanish.\n\nThe point cloud behind the home page is not decoration. A local script exports every project, experience bullet, capability and blog paragraph, embeds them with sentence-transformers (all-MiniLM-L6-v2), reduces the vectors to 3D with UMAP and writes a versioned JSON file. The page renders that space with TresJS and Three.js: one instanced mesh for the points, line segments for nearest-neighbor edges, and a camera that travels to each cluster as you scroll.\n\nThe live query in the hero is a real top-k similarity search: suggested queries are embedded ahead of time with the same model, so the browser only reads precomputed neighbors and no model runs on the client. Free text resolves to the closest suggested query by keyword overlap.\n\nPerformance and accessibility shaped the architecture. All content is real HTML, the 3D canvas loads only on the client after the first paint, caps its pixel ratio and pauses when hidden, and visitors with reduced motion, no WebGL, save-data or low-end devices get a static SVG of the same space.\n\nThe design system is custom (Fraunces and JetBrains Mono on a warm paper palette) and replaced Vuetify entirely. Motion uses GSAP with ScrollTrigger and Lenis, and the blog keeps using @nuxt/content with KaTeX and Mermaid.",
        "client": "Personal project",
        "category": "Portfolio / Technical blog",
        "technologies": "Nuxt 4, Vue 3, TresJS, Three.js, GSAP + ScrollTrigger, Lenis, @nuxt/content, @nuxtjs/i18n, TypeScript, Python (sentence-transformers, UMAP), Vitest",
        "features": [
          "Real embedding space of my own content, reduced to 3D with UMAP",
          "Live top-k similarity query over precomputed neighbors",
          "TresJS scene with instanced points and scroll-driven camera",
          "Static SVG fallback for reduced motion, no WebGL and low-end devices",
          "Custom Field Notes design system with light and dark themes",
          "Bilingual static site with sitemap and hreflang",
          "Blog with Markdown, KaTeX and Mermaid"
        ]
      },
      "es": {
        "name": "Portfolio & Blog Personal - deras.dev",
        "description": "Este sitio: un portafolio estático y bilingüe donde el fondo 3D es un espacio de embeddings real de mi propio trabajo, más un blog técnico.",
        "longDescription": "deras.dev es mi portafolio y blog técnico, construido con Nuxt 4 y prerenderizado por completo como sitio estático en inglés y español.\n\nLa nube de puntos detrás de la página principal no es decoración. Un script local exporta cada proyecto, logro de experiencia, capacidad y párrafo del blog, los convierte en embeddings con sentence-transformers (all-MiniLM-L6-v2), reduce los vectores a 3D con UMAP y escribe un JSON versionado. La página dibuja ese espacio con TresJS y Three.js: un único mesh instanciado para los puntos, segmentos de línea para las aristas entre vecinos cercanos y una cámara que viaja a cada cúmulo mientras haces scroll.\n\nLa consulta en vivo del hero es una búsqueda real top-k por similitud: las consultas sugeridas se convierten en embeddings de antemano con el mismo modelo, así que el navegador solo lee vecinos precalculados y no corre ningún modelo en el cliente. El texto libre se resuelve a la consulta sugerida más cercana por palabras clave.\n\nEl rendimiento y la accesibilidad definieron la arquitectura. Todo el contenido es HTML real, el canvas 3D se carga solo en el cliente después del primer pintado, limita su resolución y se pausa cuando no está visible, y quienes tienen movimiento reducido, no tienen WebGL, usan ahorro de datos o equipos de gama baja ven un SVG estático del mismo espacio.\n\nEl sistema de diseño es propio (Fraunces y JetBrains Mono sobre una paleta cálida de papel) y reemplazó por completo a Vuetify. El movimiento usa GSAP con ScrollTrigger y Lenis, y el blog sigue usando @nuxt/content con KaTeX y Mermaid.",
        "client": "Proyecto personal",
        "category": "Portfolio / Blog técnico",
        "technologies": "Nuxt 4, Vue 3, TresJS, Three.js, GSAP + ScrollTrigger, Lenis, @nuxt/content, @nuxtjs/i18n, TypeScript, Python (sentence-transformers, UMAP), Vitest",
        "features": [
          "Espacio de embeddings real de mi propio contenido, reducido a 3D con UMAP",
          "Consulta top-k en vivo sobre vecinos precalculados",
          "Escena TresJS con puntos instanciados y cámara guiada por el scroll",
          "Respaldo SVG estático para movimiento reducido, sin WebGL y equipos de gama baja",
          "Sistema de diseño propio Field Notes con temas claro y oscuro",
          "Sitio estático bilingüe con sitemap y hreflang",
          "Blog en Markdown con KaTeX y Mermaid"
        ]
      }
    }
  },
  {
    "id": "musycharts",
    "date": "2023",
    "tags": [
      "Vue.js",
      "Vuetify",
      "Spotify API",
      "amCharts 5",
      "OAuth 2.0"
    ],
    "featured": false,
    "cluster": "fullstack",
    "metric": null,
    "images": {
      "0": "/img/projects/musycharts-pics/0.webp",
      "1": "/img/projects/musycharts-pics/1.webp",
      "2": "/img/projects/musycharts-pics/2.webp",
      "3": "/img/projects/musycharts-pics/3.webp"
    },
    "links": {
      "live": "https://musycharts-dcdv.vercel.app/",
      "repo": "https://github.com/daiv05/musycharts-dcdv",
      "dataset": null
    },
    "translations": {
      "en": {
        "name": "MusyCharts",
        "description": "A Spotify dashboard I built to learn OAuth 2.0 properly. Ended up using OAuth at my next job - so that worked out.",
        "longDescription": "MusyCharts connects to the Spotify API to fetch personalized statistics and display them using amCharts 5 in interactive dashboards that reveal listening habits and top genres. The app allows users to authenticate via OAuth 2.0, select time ranges, and explore their listening trends through dynamic charts and a modern, responsive design. \n\n It is a personal project developed to learn about API integration, OAuth authentication, and data visualization on the web (and practicing OAuth was a great choice since I ended up working with it in my next job). \n\n The decision to use Vue.js and Vuetify was based on their ease of building reactive interfaces and modular components (although you don't really need a full framework for something like this, it was more for practice), while I chose amCharts 5 because I wanted to try another library besides Charts.js and this one looked quite promising. \n\n Development began with setting up the environment and laying out some views (in this case I didn't use Figma and went straight to code), followed by testing and implementing OAuth 2.0 authentication. Then the dashboards were designed and developed using amCharts 5 to visually represent the fetched data. \n\n Later on, I decided to do a complete redesign to make the interface more appealing and improve user experience, adding new visualizations and optimizing overall application performance.",
        "client": "Personal project",
        "category": "Data visualization",
        "technologies": "Vue.js, Vuetify, Spotify API, amCharts 5, OAuth 2.0",
        "features": [
          "OAuth 2.0 authentication with Spotify",
          "Top tracks and artists by custom ranges",
          "Genre analysis with dynamic charts",
          "Multi-view interactive dashboard",
          "Responsive, modern UI"
        ]
      },
      "es": {
        "name": "MusyCharts",
        "description": "Un dashboard de Spotify que construí para entender OAuth 2.0 de verdad. Terminé usando OAuth en mi siguiente trabajo - así que valió la pena.",
        "longDescription": "MusyCharts conecta con la API de Spotify para extraer estadísticas personalizadas y mostrarlas con amCharts 5 en dashboards interactivos que revelan hábitos musicales y géneros predominantes. La aplicación permite a los usuarios autenticarse mediante OAuth 2.0, seleccionar rangos de tiempo y explorar sus tendencias de escucha a través de gráficos dinámicos y un diseño moderno y responsive. \n\n Es un proyecto personal desarrollado para aprender sobre integración de APIs, autenticación OAuth y visualización de datos en la web (y practicar con OAuth fue muy acertado ya que terminé trabajando con ello en mi siguiente trabajo). \n\n La decisión de usar Vue.js y Vuetify podría decir que se basó en su facilidad para construir interfaces reactivas y componentes modulares (aunque realmente no necesitas todo un framework para algo como esto, fue más para practicar), mientras que amCharts 5 lo elegí porque quería probar otra librería a parte de Charts.js y esta se veía bastante prometedora. \n\n El desarrollo comenzó con la configuración del entorno y maquetación de algunas vistas (en este caso no utilicé Figma y fui directamente al código), seguido por las pruebas e implementación de la autenticación OAuth 2.0. Luego se diseñaron y desarrollaron los dashboards utilizando amCharts 5 para representar visualmente los datos obtenidos. \n\n Tiempo después decidí hacer un re-diseño completo para hacer mas llamativa la interfaz y mejorar la experiencia de usuario, agregando nuevas visualizaciones y optimizando el rendimiento general de la aplicación.",
        "client": "Proyecto personal",
        "category": "Visualización de datos",
        "technologies": "Vue.js, Vuetify, Spotify API, amCharts 5, OAuth 2.0",
        "features": [
          "Autenticación OAuth 2.0 con Spotify",
          "Top tracks y artistas por períodos personalizados",
          "Visualización de géneros con gráficos dinámicos",
          "Dashboard interactivo con múltiples vistas",
          "Diseño responsive y moderno"
        ]
      }
    }
  },
  {
    "id": "carmencita",
    "date": "2023",
    "tags": [
      "Vue.js",
      "Laravel",
      "MySQL",
      "TailwindCSS",
      "REST API",
      "Sanctum"
    ],
    "featured": false,
    "cluster": "fullstack",
    "metric": null,
    "images": {
      "0": "/img/projects/carmencita-pics/0.webp",
      "1": "/img/projects/carmencita-pics/1.webp",
      "2": "/img/projects/carmencita-pics/2.webp",
      "3": "/img/projects/carmencita-pics/3.webp",
      "4": "/img/projects/carmencita-pics/4.webp",
      "5": "/img/projects/carmencita-pics/5.webp"
    },
    "links": {
      "live": null,
      "repo": "https://github.com/daiv05/carmencita_vuejs",
      "dataset": null
    },
    "translations": {
      "en": {
        "name": "Carmencita Management System",
        "description": "Custom ERP for a coastal store where the owner had to be present for every sale because nobody knew the prices. Inventory, invoicing, HR and delivery routes.",
        "longDescription": "Custom-developed ERP with interconnected modules: inventory, invoicing, payroll management, and delivery routes. The system includes an admin dashboard with sales and inventory reports. \n\n The project originated from a local store's need for a digital system that integrated all their daily operations into a single platform, as they previously managed inventory and invoicing manually. The client mentioned that not all salespeople knew the product prices, and he or the assistant manager always had to be present, leading to errors and delays. \n\n Vue.js was chosen for the frontend due to its ability to create reactive and dynamic user interfaces, while Laravel was selected for the backend for its robustness and ease of building secure RESTful APIs with Sanctum. MySQL was the chosen database for its performance and scalability, and TailwindCSS enabled rapid and responsive design. \n\n Development began with a detailed analysis of the client's business processes, with several recorded meetings that helped document the requirements, followed by creating interface prototypes in Figma, each presented and validated with the client. \n\n Implementation was carried out in phases, starting with the inventory module, followed by invoicing, HR, and finally the delivery route system (they needed to be able to register orders and then create routes by dates as it suited them best). \n\n During development, continuous testing was conducted with key business users to ensure the system met their needs and was adjusted based on their feedback. Finally, it was deployed locally in the store, and documentation and video tutorials were provided to the staff for effective use.",
        "client": "\"Carmencita\" store & depot",
        "category": "Enterprise software",
        "technologies": "Vue.js, TailwindCSS, Laravel, MySQL, Redis",
        "features": [
          "Inventory and stock management",
          "Point of sale with invoice printing",
          "Automated payroll and HR management",
          "Leave and permission management",
          "Attendance marking",
          "Delivery order management and route planning",
          "Admin dashboard with reporting",
          "Basic roles and permissions (the essentials)"
        ]
      },
      "es": {
        "name": "Sistema de Gestión Carmencita",
        "description": "ERP a medida para una tienda costera donde el dueño tenía que estar presente en cada venta porque nadie sabía los precios. Inventario, facturación, RRHH y rutas de entrega.",
        "longDescription": "ERP desarrollado a medida con módulos conectados: inventario, facturación, gestión de planillas y rutas de entrega. El sistema incluye un panel administrativo con informes sobre ventas e inventario. \n\n El proyecto nació de la necesidad de una tienda local de contar con un sistema digital que integrara todas sus operaciones diarias en una sola plataforma, ya que anteriormente manejaban inventarios y facturación de forma manual, nos comentaba el cliente que incluso no todos los vendedores conocían los precios de los productos, y siempre tenía que estar él o la subgerente presentes, lo que generaba errores y retrasos. \n\n Se optó por usar Vue.js para el frontend debido a su capacidad para crear interfaces de usuario reactivas y dinámicas, mientras que Laravel se eligió para el backend por su robustez y facilidad para construir APIs RESTful seguras con Sanctum. MySQL fue la base de datos seleccionada por su rendimiento y escalabilidad, y TailwindCSS permitió un diseño rápido y responsivo. \n\n El desarrollo comenzó con un análisis detallado de los procesos comerciales del cliente, se llevaron acabo varias reuniones grabadas que sirvieron para documentar los requerimientos, seguido por la creación de prototipos de la interfaz en Figma, cada prototipo era presentado y validado con el cliente. \n\n La implementación se realizó en fases, comenzando con el módulo de inventario, seguido por facturación, RRHH y finalmente el sistema de rutas de entrega (ellos necesitaban poder registrar pedidos y luego armar rutas por fechas según mejor les convenía). \n\n Durante el desarrollo, se realizaron pruebas continuas con usuarios clave del negocio para asegurar que el sistema cumpliera con sus necesidades y se ajustara según su feedback. Finalmente, se desplegó de forma local en la tienda y se entregó documentación y videotutoriales al personal para su uso efectivo.",
        "client": "Tienda y Depósito \"Carmencita\"",
        "category": "Software empresarial",
        "technologies": "Vue.js, TailwindCSS, Laravel, MySQL",
        "features": [
          "Inventario y manejo de stock",
          "Punto de venta con impresión de facturas",
          "Planillas automáticas y gestión de RRHH",
          "Gestión de permisos e incapacidades",
          "Marcado de asistencia",
          "Pedidos delivery y armado de rutas de entrega",
          "Panel administrativo con reportes",
          "Roles y permisos básicos (lo que necesitaban)"
        ]
      }
    }
  }
]

export function getProject(id: string): Project | undefined {
  return projectList.find((p) => p.id === id)
}
