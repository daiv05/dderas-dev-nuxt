const projectList = [
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
          'Sistema integral de gestión de incidencias y mantenimiento para la Facultad de Ingeniería y Arquitectura de la Universidad de El Salvador.',
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
          'Comprehensive incident and maintenance management system for the Faculty of Engineering and Architecture (University of El Salvador).',
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
          'Aplicación web interactiva que transforma tus datos de Spotify en visualizaciones dinámicas y atractivas.',
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
          'Interactive web app that turns your Spotify data into dynamic visualizations.',
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
          'Plataforma integral para inventario, facturación, RRHH y rutas de entrega (delivery).',
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
          'End-to-end management platform for inventory, invoicing, HR and delivery built for local stores.',
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
  {
    id: 'ratiosinsights',
    date: '2023',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'TailwindCSS', 'SheetJS', 'Chart.js'],
    online: false,
    repo: true,
    images: {
      0: '/img/projects/ratios-pics/1.webp',
      1: '/img/projects/ratios-pics/2.webp',
      2: '/img/projects/ratios-pics/3.webp',
      3: '/img/projects/ratios-pics/4.webp',
      4: '/img/projects/ratios-pics/5.webp',
      5: '/img/projects/ratios-pics/6.webp',
    },
    link: '#',
    link_repo: 'https://github.com/daiv05/ratios-sis',
    translations: {
      es: {
        name: 'RatioInsights',
        description:
          'Herramienta financiera que calcula ratios clave y los compara con benchmarks sectoriales.',
        longDescription:
          'Plataforma para importar estados financieros desde Excel, calcular más de 20 indicadores y generar reportes ejecutivos con visualizaciones históricas.',
        client: 'Proyecto universitario',
        category: 'FinTech',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL, SheetJS, Chart.js',
        features: [
          'Importación de libros contables en Excel',
          'Cálculo automático de ratios de liquidez y rentabilidad',
          'Comparación contra promedios de la industria',
          'Visualización de tendencias históricas',
        ],
      },
      en: {
        name: 'RatioInsights',
        description:
          'Financial analysis tool that calculates key ratios and benchmarks them against the industry.',
        longDescription:
          'Platform to import financial statements from Excel, compute 20+ metrics automatically and produce executive reports with historical visualizations.',
        client: 'University project',
        category: 'FinTech',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL, SheetJS, Chart.js',
        features: [
          'Excel import for financial statements',
          'Automatic liquidity and profitability ratios',
          'Benchmarking against industry averages',
          'Historical trend visualization',
        ],
      },
    },
  },
  {
    id: 'cheroomsv',
    date: '2022',
    tags: ['Vue.js', 'Django', 'PostgreSQL'],
    online: false,
    repo: true,
    images: {
      0: '/img/projects/roomies-pics/0.webp',
      1: '/img/projects/roomies-pics/1.webp',
      2: '/img/projects/roomies-pics/2.webp',
      3: '/img/projects/roomies-pics/3.webp',
    },
    link: '#',
    link_repo: 'https://github.com/daiv05/cherooms-proy',
    translations: {
      es: {
        name: 'CheRooms SV',
        description: 'Plataforma social para conectar roomies en San Salvador.',
        longDescription:
          'Prototipo de plataforma social para la publicación y búsqueda de roomies en San Salvador, orientado a conocer personas y lugares basado en presupuesto, ubicación y estilo de vida.',
        client: 'Proyecto universitario',
        category: 'Plataforma social',
        technologies: 'Vue.js, Django, PostgreSQL',
        features: [
          'Registro y autenticación',
          'Perfiles con preferencias y requisitos',
          'Búsqueda avanzada con filtros',
          'Gestión de anuncios de cuartos',
        ],
      },
      en: {
        name: 'CheRooms SV',
        description: 'Social platform that connects roommates in San Salvador.',
        longDescription:
          'Network with a matching algorithm based on budget, location and lifestyle.',
        client: 'University project',
        category: 'Social platform',
        technologies: 'Vue.js, Django, PostgreSQL',
        features: [
          'User registration and authentication',
          'Profiles with preferences and requirements',
          'Advanced search with filters',
          'Room listing management',
        ],
      },
    },
  },
] as const;

export { projectList };
