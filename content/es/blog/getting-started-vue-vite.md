---
id: 'getting-started-vue-vite'
title: 'Comenzando con Vue 3 y Vite'
slug: 'getting-started-vue-vite'
date: 2025-12-04
summary: 'Una guía completa para configurar tu primer proyecto Vue 3 con Vite, incluyendo mejores prácticas y herramientas modernas.'
tags: ['Vue.js', 'Vite', 'Tailwind CSS']
image: /blog/getting-started-vue-vite/shared/vite+vue.webp
author: David Deras
lastmod: 2025-12-22
---

En esta guía, exploraremos cómo iniciar un proyecto moderno con Vue 3 y Vite, explicaremos la estructura del proyecto, como funciona una aplicación Vue, el router, Pinia, los composables, veremos algunas buenas prácticas para desarrollar aplicaciones escalables y mantenibles, y como extra publicaremos el proyecto en GitHub y veremos cómo instalar Tailwind CSS v4 para obtener estilos rápidos y responsivos.

::table-of-contents
::

---

## Configurando el entorno

Antes de continuar, debemos tener:

- Node.js, cualquier versión **LTS**. Recomiendo acostumbrarse a utilizar <a target="_blank" href="https://github.com/coreybutler/nvm-windows" rel="noopener noreferrer">nvm</a> para manejar múltiples versiones de Node.
- Un gestor de paquetes (aquí usaremos `npm`, que ya se instala con Node.js).
- <a target="_blank" href="https://code.visualstudio.com/" rel="noopener noreferrer">VS Code</a> actualizado
- <a target="_blank" href="https://www.desarrollolibre.net/blog/programacion-basica/la-guia-de-git-que-nunca-tuve" rel="noopener noreferrer">Git configurado</a> correctamente

Además, instala la extensión oficial de Vue.js para VS Code:

- <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=Vue.volar" rel="noopener noreferrer">Vue.js (Volar)</a>.
  Más adelante exploraremos otros plugins útiles como ESLint, Prettier y Tailwind CSS IntelliSense.

---

## ¿JavaScript o TypeScript?

Vue 3 tiene un soporte bastante bueno para TypeScript, puedes usarlo teniendo en cuenta la <a target="_blank" href="https://vuejs.org/guide/typescript/overview.html" rel="noopener noreferrer">guía de uso oficial</a>.

No necesitas usar TypeScript en todos tus proyectos, especialmente si estás comenzando o solo quieres experimentar. Asi que mi recomendación es que valores tu contexto, la aplicación y tu equipo (si estás trabajando en uno).

En esta guía usaremos JavaScript para mantener las cosas simples.

---

## Creando el proyecto con Vite

La forma más rápida de iniciar un proyecto Vue 3 con Vite es usando el comando (puedes ejecutarlo en cualquier carpeta donde quieras crear el proyecto, utiliza la terminal integrada de VS Code o tu terminal favorita):

```bash
npm create vue@latest
```

Si es primera vez que lo usas, te preguntará si deseas instalar el paquete `create-vue`. Responde que sí (escribimos `y` y damos ENTER).

![Instalando create-vue](/blog/getting-started-vue-vite/shared/install-create-vue-package.webp)
_Instalando paquete: create-vue_

Nos preguntará por el nombre del proyecto, escribe el nombre que quieras:

![Nombre del proyecto](/blog/getting-started-vue-vite/shared/project-name.webp)
_Asígnale un nombre a tu proyecto_

Luego selecciona las opciones que necesites:

![Opciones del proyecto](/blog/getting-started-vue-vite/shared/project-options.webp)
_Features disponibles al crear una app Vue_

Vamos punto por punto (tal como se muestra en la imagen, nos movemos con las flechas y seleccionamos con la barra espaciadora):

1. **TypeScript**: como mencionamos antes, usaremos JavaScript, así que ignoramos.
2. **JSX Support**: no usaremos <a target="_blank" href="https://kinsta.com/es/blog/que-es-jsx/" rel="noopener noreferrer">JSX</a>.
3. **Router (SPA development)**: Vue Router es esencial para trabajar con Vue como SPA (Single Page Application). No ahondaremos en temas de <a target="_blank" href="https://www.geeksforgeeks.org/blogs/spa-vs-mpa-which-one-is-better-for-you/" rel="noopener noreferrer">SPA vs MPA</a>, solo ten presente que Vue funciona como una SPA por defecto. Selecciona esta opción.
4. **Pinia (state management)**: es la librería oficial para el manejo de estado. Nos ayudará a manejar datos compartidos entre componentes. Selecciona esta opción.
5. **Vitest (unit testing)**: es el framework de testing recomendado para proyectos con Vite. No lo usaremos en esta guía.
6. **End-to-End Testing**: nos permitirá elegir e integrar una herramienta para pruebas E2E (<a target="_blank" href="https://playwright.dev/" rel="noopener noreferrer">Playwright</a>, <a target="_blank" href="https://www.cypress.io/" rel="noopener noreferrer">Cypress</a> o <a target="_blank" href="https://nightwatchjs.org/" rel="noopener noreferrer">Nightwatch</a>). No lo usaremos en esta guía.
7. **ESLint (error prevention)**: es una herramienta para mantener la calidad del código, ayudando a detectar errores y mantener un estilo consistente. Recomiendo mucho su uso, aunque es importante personalizarlo según tu equipo y proyecto. La seleccionaremos para explorarla un poco más adelante.
8. **Prettier (code formatting)**: es una herramienta para formatear el código automáticamente. En este caso la seleccionaremos también para explorarla.

Presionamos ENTER y ahora nos preguntará sobre algunas features experimentales de Vite:

![Features experimentales de Vite](/blog/getting-started-vue-vite/shared/project-experimental-options.webp)
_Features experimentales de Vite_

1. **Oxlint**: es un nuevo linter, parte de <a target="_blank" href="https://oxc.rs/" rel="noopener noreferrer">OXC</a>, una nueva colección de herramientas de javascript escritas en Rust, Oxlint es en extremo rápido y promete bastante, sin embargo como se menciona en su web, aún tiene sus detalles, así que por ahora recomiendo seguir usando ESLint. Ignoramos esta opción.
2. **rolldown vite (experimental)**: Rolldown-vite es una bifurcación de Vite que utiliza Rolldown en lugar de Rollup y esbuild, con el objetivo de obtener el máximo rendimiento. Pronto se convertirá en el paquete por defecto, por ahora ignoremos esta opción.

Continuamos presionando ENTER.

Nos preguntará si queremos empezar con un proyecto totalmente en blanco o con ejemplos. Si es tu primera vez, te recomiendo seleccionar "No" para que puedas ver una estructura básica con ejemplos. Esa será la opción que seleccionaremos aquí.

Vite creará la estructura inicial del proyecto y nos dará algunos comandos útiles, vamos ejecutando uno por uno:

![Proyecto creado](/blog/getting-started-vue-vite/shared/project-created.webp)
_Proyecto creado_

1. Primero navegamos a la carpeta del proyecto:

```bash
cd nombre-del-proyecto
```

2. Instalamos las dependencias (esto puede tardar unos minutos dependiendo de tu conexión):

```bash
npm install
```

3. Este comando es para correr Prettier, no tendrá ningún efecto porque no hemos modificado nada aún, pero es bueno tenerlo presente:

```bash
npm run format
```

4. Finalmente, iniciamos el servidor de desarrollo:

```bash
npm run dev
```

![Servidor de desarrollo corriendo](/blog/getting-started-vue-vite/shared/dev-server-running.webp)
_Servidor de desarrollo levantado_

Vite corre el servidor de desarrollo en `http://localhost:5173/` (el puerto puede variar si el 5173 ya está en uso (5174, 5175, etc.) ).

> El puerto 5173 es un guiño al propio Vite:
>
> - 5 = V
> - 1 = I
> - 7 = T
> - 3 = E
>
> Aunque más allá de eso, Vite utiliza el puerto 5173 porque es poco habitual en entornos de desarrollo, lo que reduce la probabilidad de conflictos con otros servidores locales. Vía <a target="_blank" href="https://medium.com/@bishakhghosh0/why-localhost-5173-is-every-frontend-developers-best-friend-b3bb5b6fb1db" rel="noopener noreferrer">Why localhost:5173 is Every Frontend Developer’s Best Friend</a>.

Si entramos a esa URL en nuestro navegador, veremos la app Vue corriendo:

![App Vue corriendo](/blog/getting-started-vue-vite/shared/vue-app-running.webp)
_App Vue corriendo_

El equipo de Vue comparte varios recursos oficiales para aprender más sobre el framework, comenzando por la <a target="_blank" href="https://vuejs.org/guide/introduction.html" rel="noopener noreferrer">documentación oficial</a>. Explora cada enlace para aprender y conocer sobre todo el ecosistema.

---

## Estructura del proyecto

Pasemos a ver la estructura inicial, abre el proyecto en tu editor de código favorito (recomiendo VS Code):

```bash
my-vue-app/
├── .vscode/              # (Si estás en VS Code) Configuración de Visual Studio Code
├── node_modules/         # Dependencias del proyecto, generadas al instalar los paquetes
├── public/               # Archivos estáticos
├── src/                  # Código fuente de la aplicación
│   ├── assets/           # Recursos como imágenes y estilos
│   ├── components/       # Componentes Vue reutilizables
│   ├── router/           # Configuración de Vue Router
│   ├── store/            # Configuración de Pinia
│   ├── views/            # Vistas para las rutas
│   ├── App.vue           # Componente raíz de la aplicación
│   └── main.js           # Punto de entrada de la aplicación
├── .editorconfig         # Configuración de EditorConfig
├── .gitattributes        # Configuración de Git
├── .gitignore            # Archivos y carpetas ignoradas por Git
├── .prettierrc.json      # Configuración de Prettier
├── eslint.config.js      # Configuración de ESLint
├── index.html            # Archivo HTML principal
├── jsconfig.json         # Configuración de JavaScript para el editor
├── package-lock.json     # Versiones exactas de las dependencias (autogenerado)
├── package.json          # Información del proyecto y scripts
├── README.md             # Documentación del proyecto
└── vite.config.js        # Configuración de Vite
```

La estructura puede variar ligeramente dependiendo de las opciones seleccionadas al crear el proyecto (por ejemplo, si se incluye o no ESLint o Pinia). Además, si estás usando VS Code es probable que veas la carpeta `.vscode/` con configuraciones específicas para el editor y que algunos archivos los veas "agrupados":

![Estructura del proyecto en VS Code](/blog/getting-started-vue-vite/shared/project-structure-nested.webp)
_Estructura del proyecto en VS Code_

Esto es solo una forma visual que tiene VS Code para organizar los archivos, puedes mostrarlos individualmente (opción que prefiero) cambiando el valor de `"explorer.fileNesting.enabled"` a `false` en el archivo `.vscode\settings.json`.

### Entendiendo las carpetas principales

- `public/`: Aquí van los archivos estáticos que no serán procesados por Vite. Puedes colocar imágenes, fuentes u otros recursos que necesites servir directamente.
- `src/`: Esta es la carpeta más importante, contiene todo el código fuente de tu aplicación. Aquí tenemos:
  - `assets/`: Aquí van los recursos como imágenes, fuentes y estilos CSS.
  - `components/`: Aquí van los componentes Vue globales, reutilizables, que puedes usar en diferentes partes de tu aplicación, por ejemplo, botones, tarjetas, modales, etc.
  - `router/`: Aquí va la configuración de <a href="https://router.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue Router</a>, donde defines las rutas de tu aplicación y cómo se navega entre ellas, así como la posible configuración de guards, lazy loading, etc.
  - `store/`: Aquí va la configuración de <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener noreferrer">Pinia</a>, donde defines el <a href="https://kinsta.com/es/blog/vue-pinia/" target="_blank" rel="noopener noreferrer">estado global de tu aplicación. </a>
  - `views/`: Aquí van las vistas principales que corresponden a las rutas definidas en Vue Router. Cada vista generalmente representa una página completa, caso contrario a los componentes que son partes más pequeñas y reutilizables. A final todos son archivos `.vue`, por lo que la diferencia radica en su propósito y uso.
  - `App.vue`: Este es el componente raíz de tu aplicación, donde se monta todo (ya explicaremos más adelante).
  - `main.js`: Este es el punto de entrada de tu aplicación, donde se inicializa Vue, se configuran los plugins (como Vue Router y Pinia) y se monta la aplicación en el DOM.

### ¿Es suficiente esta estructura?

Es una estructura básica que por ahora está bien. A medida que tu aplicación crezca normalmente se busca organizar mejor el código. Aquí hay dos propuestas:

- Crear subcarpetas por módulo/funcionalidad dentro de las distintas carpetas, como `components/` y `views/`. Por ejemplo:

```bash
my-vue-app/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.vue
│   │   │   └── RegisterForm.vue
│   │   ├── dashboard/
│   │   │   ├── StatsCard.vue
│   │   │   └── ChartWidget.vue
│   │   └── shared/
│   │       ├── BaseButton.vue
│   │       └── BaseModal.vue
│   │
│   ├── views/
│   │   ├── auth/
│   │   │   ├── LoginView.vue
│   │   │   └── RegisterView.vue
│   │   ├── dashboard/
│   │   │   └── DashboardView.vue
│   │   └── home/
│   │       └── HomeView.vue
│   │
│   ├── store/
│   │   ├── auth/
│   │   │   └── auth.store.js
│   │   ├── dashboard/
│   │   │   └── dashboard.store.js
│   │   └── shared/
│   │       └── ui.store.js
│   │
│   ├── router/
│   │   ├── auth.routes.js
│   │   ├── dashboard.routes.js
│   │   └── index.js
│   │
│   ├── ...
├── ...
```

**Puedes usar un enfoque similar a este** en apps pequeñas o medianas, con poca gente trabajando, en las que quieres un poco más de orden sin complicarte demasiado y sin cambiar demasiado la estructura original que propone Vue. **La limitante** es que a medida que la app crece, puede volverse difícil manejar dependencias entre módulos y mantener el código organizado, porque todo está disperso en varias carpetas.

- En otros casos, puedes optar por una estructura basada en funcionalidades o módulos, donde cada uno tiene su propia carpeta que contiene componentes, vistas, y lógica relacionada. Por ejemplo:

```bash
my-vue-app/
├── src/
│   ├── modules/
│   │   ├── auth/                     # Si el módulo es pequeño, puedes omitir la división en carpetas
│   │   │   ├── components/
│   │   │   │   └── LoginForm.vue
│   │   │   ├── views/
│   │   │   │   └── LoginView.vue
│   │   │   ├── store/
│   │   │   │   └── auth.store.js
│   │   │   ├── router/
│   │   │   │   └── auth.routes.js
│   │   │   └── index.js
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   ├── views/
│   │   │   ├── store/
│   │   │   ├── router/
│   │   │   └── index.js
│   │   │
│   │   └── users/
│   │       ├── components/
│   │       ├── views/
│   │       ├── store/
│   │       ├── router/
│   │       └── index.js
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── BaseButton.vue
│   │   │   └── BaseModal.vue
│   │   ├── composables/
│   │   │   └── useFetch.js
│   │   ├── store/
│   │   │   └── ui.store.js
│   │   ├── utils/
│   │   │   └── formatDate.js
│   │   └── constants/
│   │       └── roles.js
│   │
│   ├── router/
│   │   └── index.js                # Archivo principal del router que importa las rutas de los módulos
│   │                               # (los guards van aquí)
│   ├── ...
├── ...
```

Cada módulo o funcionalidad concentra **todo lo que necesita en un solo lugar**, lo que simplifica la navegación y facilita el mantenimiento del código. Este enfoque resulta especialmente beneficioso en aplicaciones grandes o complejas.

La carpeta `shared/` nos sirve para almacenar componentes, composables, utilidades y constantes que son reutilizables en toda la aplicación (solo ten cuidado de no sobrecargarla).

La base de este enfoque consiste en dividir la aplicación en módulos independientes dentro de `/src/modules`, cada uno con su propia estructura interna.

> Al final, la elección depende del tamaño y complejidad de tu proyecto, así como de las **_preferencias de tu equipo_**, asi que no hay una única forma correcta de hacerlo. Estos son solo ejemplos para inspirarte.

---

## Entendiendo como se monta la app Vue

El punto de entrada de la aplicación Vue en sí, es el archivo `src/main.js`, aquí es donde se inicializa, se configuran los plugins y se monta en el DOM. Si vemos el archivo `src/main.js`:

```javascript
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
```

Aquí estamos haciendo lo siguiente:

1. Importamos los estilos globales desde `main.css`. Este archivo contiene cualquier estilo que quieras aplicar globalmente.
2. Importamos las funciones `createApp` y `createPinia` para crear nuevas instancias de Vue y Pinia.
3. Importamos el componente raíz `App.vue`.
4. Importamos la configuración de nuestras rutas desde `src/router/index.js`.
5. Creamos la instancia de la aplicación con `createApp(App)`, pasando el componente raíz `App` como argumento, indicando que este será el punto de partida de nuestra aplicación Vue, básicamente le estamos diciendo a Vue: "Aquí está el componente principal, toda la aplicación la construirás a partir de él".
6. Usamos `app.use(createPinia())` para registrar la instancia de Pinia, habilitando el manejo de estado global en nuestra aplicación.
7. Usamos `app.use(router)` para registrar la instancia de Vue Router y habilitar la navegación entre vistas.
8. Finalmente, montamos la aplicación Vue en el elemento del DOM con el id `app` usando `app.mount('#app')`.

Ahora, abre el archivo `index.html` ubicado en la raíz del proyecto:

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Aquí vemos que el archivo HTML tiene un `<div>` con el id `app`, que es donde Vue montará nuestra aplicación. El `<script>` que le sigue carga nuestro archivo `main.js`, que es donde inicializamos todo.

Abre el archivo `src/App.vue`:

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Estilos CSS */
</style>
```

Aquí vemos que `App.vue` contiene un encabezado (header) con un logo, un componente `HelloWorld`, y un menú de navegación con enlaces a las rutas definidas. El `<RouterView />` es donde se renderizarán las vistas correspondientes según la ruta actual, gracias a Vue Router.

Exploremos la configuración del router. Abre el archivo `src/router/index.js`:

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      /* Esta ruta usa lazy loading */
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
```

Aquí estamos importando las funciones necesarias de Vue Router y definiendo una ruta básica para la vista `HomeView` y otra para `AboutView`. La ruta `/` renderiza `HomeView`, y la ruta `/about` carga `AboutView` utilizando carga diferida (<a href="https://medium.com/@drewcauchi/lazy-loading-in-vue-js-bb32018d2c2d" target="_blank" rel="noopener noreferrer">lazy loading</a>).

Repasemos el flujo completo:

1. El archivo `index.html` es lo que el navegador nos muestra, y lo primero que hace es cargar `main.js`.
2. En `main.js`, se crea la aplicación Vue con `App.vue` como componente raíz (a parte de importar estilos, configurar Pinia, Vue Router y otras configuraciones).
3. `App.vue` define la estructura principal de la aplicación (como un layout principal) y utiliza `<RouterView />` para renderizar las vistas según la ruta actual.

![Flujo de una app Vue](/blog/getting-started-vue-vite/es/explaining-vue-app.webp)
_Flujo de una app Vue_

Esto quiere decir que todo lo que veas dentro de `App.vue` estará siempre presente (como el header y el menú de navegación), mientras que el contenido principal se mostrará dentro de `<RouterView />` y cambiará dependiendo de la ruta actual, gracias a nuestro router.

Normalmente, en aplicaciones más complejas, `App.vue` también contendrá otros elementos comunes como un footer, barras laterales, modales globales, etc.
Y cuando se necesita, se crean layouts específicos para diferentes módulos de la aplicación, por ejemplo, un layout para las vistas de administración y otro para las vistas públicas como el inicio de sesión. Puedes explorar más en <a href="https://vueschool.io/articles/vuejs-tutorials/composing-layouts-with-vue-router/" target="_blank" rel="noopener noreferrer">este recurso de Vue School</a>.

---

A este punto ya tenemos una idea clara de cómo se estructura y monta una aplicación Vue 3 con Vite. Puedes comenzar a explorar y modificar los componentes, vistas y rutas para familiarizarte más con el framework. Ahora seguiremos explorando otros conceptos y herramientas importantes del ecosistema.

---

## Pinia para manejo de estado global

Pinia nos sirve para manejar el estado global de nuestra aplicación: datos que deben ser accesibles desde cualquier parte de la aplicación, datos que necesitamos compartir entre múltiples componentes o vistas.

Por ejemplo, cuando necesitamos tener acceso a la información del usuario autenticado en diferentes partes de la app, o si queremos manejar un carrito de compras que pueda ser consultado desde distintos componentes.

Veamos un ejemplo básico. Crea el archivo `src/store/auth.store.js`:

```javascript
import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    login(userData, token) {
      this.user = userData;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
```

Aquí estamos definiendo una store llamada `auth` que tiene un estado con las propiedades `user` y `token`, y dos acciones para iniciar sesión y cerrar sesión.
Ahora, veamos cómo usar esta store en un componente. Crea un componente Vue, por ejemplo `src/components/Auth.vue`:

```vue
<template>
  <div>
    <div v-if="authStore.user">
      <p>Welcome, {{ authStore.user.name }}!</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <button @click="login">Login</button>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '../store/auth.store';
const authStore = useAuthStore();
const login = () => {
  // Simulamos un inicio de sesión
  const userData = { name: 'John Doe', email: 'john.doe@example.com' };
  const token = 'fake-jwt-token';
  authStore.login(userData, token);
};

const logout = () => {
  authStore.logout();
};
</script>
```

Aquí estamos importando la store `useAuthStore` y usándola para acceder al estado `user` y las acciones `login` y `logout`.
Gracias a Pinia, el estado del usuario se mantiene consistente en todas partes, y cualquier cambio (como iniciar o cerrar sesión) se refleja automáticamente en todos los componentes que usan esta store.

Algunos casos reales de uso:

- **Autenticación de usuarios**: Creas una store para manejar el estado del usuario autenticado, con datos como el token, nombre, roles, etc. Puedes crear acciones para iniciar sesión, cerrar sesión y actualizar la información del usuario.
- **Carrito de compras**: Creas una store para manejar los productos en el carrito, con acciones para agregar, eliminar y actualizar productos. Este estado puede ser accedido desde cualquier parte de la aplicación, como la página de productos y la página del carrito.
- **Preferencias de usuario**: Creas una store para manejar las preferencias del usuario, como el tema (claro/oscuro), idioma, etc. Puedes crear acciones para actualizar estas preferencias y reflejarlas en toda la aplicación.

Puedes explorar más sobre Pinia en la <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener noreferrer">documentación oficial</a>.

---

## Composables

Los composables son funciones reutilizables que encapsulan lógica específica, con estado, y pueden ser usados entre diferentes componentes.

Nos permiten organizar mejor nuestro código, promoviendo la reutilización y la separación de responsabilidades. Normalmente toda lógica con estado la pondríamos dentro de un `<script setup>` en un componente Vue, pero si esa lógica es algo que podría ser útil en varios componentes, podemos extraerla a un composable.

Veamos un ejemplo bastante básico. Crea un archivo llamado `src/composables/useClipboard.js`:

```javascript
import { ref } from 'vue';

export function useClipboard() {
  const copied = ref(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };

  return {
    copied,
    copyToClipboard,
  };
}
```

Aquí estamos definiendo un composable llamado `useClipboard` que proporciona una función para copiar texto al portapapeles y un estado **reactivo** `copied` que indica si el texto fue copiado exitosamente.

Al implementarlo podríamos tener algo como esto. Crea un componente llamado `src/components/ClipboardExample.vue`:

```vue
<template>
  <div>
    <input v-model="textToCopy" placeholder="Type something to copy" />
    <button @click="copyToClipboard(textToCopy)">Copy to Clipboard</button>
    <p v-if="copied">Text copied!</p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useClipboard } from '../composables/useClipboard';
const { copied, copyToClipboard } = useClipboard();
const textToCopy = ref('');
</script>
```

Y luego importa este componente en `App.vue` y añádelo debajo del componente `HelloWorld` para probarlo:

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import ClipboardExample from './components/ClipboardExample.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <ClipboardExample />
      <!-- Aquí -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
```

El estado `copied` nos permite mostrar un mensaje cuando el texto ha sido copiado exitosamente.

¿Que logramos con esto?

- **Reutilización**: Podemos usar `useClipboard` en cualquier componente que necesite funcionalidad de copiar al portapapeles, sin duplicar código.
- **Organización**: La lógica relacionada con el portapapeles está encapsulada en un solo lugar.
- **Mantenimiento**: Si necesitamos cambiar la forma en que copiamos al portapapeles, solo tenemos que modificar el composable, no todos los componentes que lo usan.

### ¿Cuál es la diferencia entre un composable y una store de Pinia?

**Estado global vs estado local**: Las stores de Pinia están diseñadas para manejar un estado global en la aplicación, datos que deben ser **accesibles y compartidos** desde cualquier parte.

Los composables, por otro lado, manejan lógica y estado que puede ser reutilizado en múltiples componentes, pero que **nada de eso es compartido**. Por ejemplo, si tengo varios componentes que necesitan funcionalidad para copiar al portapapeles (y que necesitan algún control de estado), usaría un composable, y el estado `copied` sería local en cada instancia del composable. En cambio, si necesito saber en varios lugares si actualmente se ha realizado una copia al portapapeles a nivel de aplicación, usaría una store de Pinia, porque aquí si se darían cuenta todos los componentes y todos podrían reaccionar a ese cambio.

Pongámoslo como un ejemplo: gracias a la variable `copied` puedo mostrar algo dentro del mismo componente, como el mensaje de "Texto copiado", ahora, si quisiera que por ejemplo el layout de mi aplicación muestre un ícono en la barra de navegación cada vez que se copie algo al portapapeles, entonces sería mejor que utilizara una store de Pinia para manejar ese estado globalmente, así al copiar desde mi componente `ClipboardExample`, el layout también se daría cuenta del cambio y podría mostrar el ícono.

### ¿Cuál es la diferencia entre un composable y un archivo de utilidades (utils)?

Las funciones de utilidades son generalmente más simples y no tienen estado, reciben entradas (algunas) y devuelven salidas sin efectos secundarios. Por ejemplo, si no necesitáramos el estado `copied` y solo quisiéramos una función para copiar texto, podríamos crear una simple función de utilidad en lugar de un composable:

```javascript
export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}
```

Lecturas recomendadas:

- <a href="https://vuejs.org/guide/reusability/composables.html" target="_blank" rel="noopener noreferrer">Composables - Vue.js Documentation</a>
- <a href="https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk" target="_blank" rel="noopener noreferrer">Good Practices and Design Patterns for Vue Composables</a>
- <a href="https://robconery.com/frontend/what-should-be-a-plugin-vs-a-composable-vs-a-store-in-nuxt/" target="_blank" rel="noopener noreferrer">What should be a Plugin vs a Composable vs a Store in Nuxt</a>

### VueUse

<a href="https://vueuse.org/" target="_blank" rel="noopener noreferrer">VueUse</a> es una colección de composables para Vue 3. Proporciona una amplia gama de funcionalidades listas para usar, desde manejo de estado hasta interacciones con el DOM y APIs del navegador. Puedes explorar la documentación oficial para ver todos los composables disponibles y cómo usarlos en tus proyectos.

![VueUse](/blog/getting-started-vue-vite/shared/vue-use.webp)
_VueUse_

Algunos ejemplos populares de composables en VueUse incluyen:

- `useBreakpoints`: para poder manejar breakpoints en tu aplicación y ayudar con el diseño responsivo.
- `useFetch`: para realizar solicitudes HTTP de manera sencilla.
- `useLocalStorage`: para sincronizar datos con el almacenamiento local del navegador.
- `useDark`: para manejar temas oscuros y claros en la aplicación.
- `useClipboard`: para copiar texto al portapapeles (similar al que creamos antes).

Es una colección muy útil que puede ahorrarte tiempo si necesitas alguna de estas funcionalidades.
Solo ten cuidado de no sobrecargar tu proyecto con dependencias innecesarias, instala solo lo que realmente vayas a usar y solo si realmente necesitas una librería para ella.

---

## ESLint y Prettier

Acostúmbrate a usar **ESLint**, es demasiado útil para mantener la calidad del código y evitar errores comunes.
La configuración generada por Vite es un buen punto de partida, pero siempre recomiendo personalizarla.

Puedes explorar las reglas disponibles en la documentación oficial <a href="https://eslint.org/docs/rules/" target="_blank" rel="noopener noreferrer">ESLint</a> y de <a href="https://eslint.vuejs.org/rules/" target="_blank" rel="noopener noreferrer">eslint-plugin-vue</a>.

Todas las reglas pueden ser configuradas como "off", "warn" o "error", dependiendo de la severidad que quieras asignarles:

```js
"no-console": "warn", // Muestra una advertencia si se usa console.log
"eqeqeq": "error", // Fuerza el uso de === y !== en lugar de == y !=
"vue/multi-word-component-names": "off", // Desactiva la regla que obliga a usar nombres de componentes con múltiples palabras
```

En el proyecto que creamos, puedes usar el comando `npm run lint` para revisar todo tu código según la configuración del archivo `eslint.config.js`.

**Sobre Prettier**, existe cierto debate sobre su uso, a mucha gente no le gusta porque puede imponer un estilo que no les agrada, así que pruébalo, explóralo y úsalo solo si te sientes cómodo con él.
En lugar de Prettier, para intentar siempre mantener un estilo consistente, puedes usar alternativas como EditorConfig, las propias reglas de ESLint o la configuración del editor de código que estés usando.

Si usas algunas de estas herramientas puedes explorar sus extensiones:

- <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank" rel="noopener noreferrer">ESLint extension for VS Code</a>
- <a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank" rel="noopener noreferrer">Prettier - Code formatter</a>
- <a href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig" target="_blank" rel="noopener noreferrer">EditorConfig for VS Code</a>

---

## EXTRA: Instalando Tailwind CSS v4

CSS puro está más que bien, puede lograr resultados increíbles (a veces incluso <a href="https://github.com/you-dont-need/You-Dont-Need-JavaScript" target="_blank" rel="noopener noreferrer">sin necesitar JavaScript</a>), pero un opción que tienes para acelerar tu desarrollo y mantener un estilo consistente es Tailwind CSS.

Siguiendo los pasos oficiales de la <a href="https://tailwindcss.com/docs/installation/using-vite" target="_blank" rel="noopener noreferrer">documentación de Tailwind CSS</a>, instalemos Tailwind CSS v4 en nuestro proyecto Vue con Vite.

Primero (estando dentro de la carpeta del proyecto), instala Tailwind CSS y su plugin para Vite:

```bash
npm install tailwindcss @tailwindcss/vite
```

Luego, agregamos el plugin a nuestro archivo `vite.config.js`:

```javascript
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite'; // Importamos el plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(), // Agregamos a la configuración de Vite
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

Luego en el archivo `src/assets/main.css`, reemplaza todo el contenido por lo siguiente:

```css
@import './base.css';

@import 'tailwindcss';
```

Aprovechamos a limpiar el archivo `src/assets/base.css` y dejar solo lo necesario:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

body {
  min-height: 100vh;
  color: #333;
  background: #fff;
  transition:
    color 0.5s,
    background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Ahora probemos que todo funciona correctamente. Primero, detén el servidor de desarrollo si está corriendo (`Ctrl + C` en la terminal) y luego vuelve a iniciarlo:

```bash
npm run dev
```

Abre el archivo `src/App.vue` y reemplaza todo el contenido por lo siguiente:

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="flex h-screen flex-col bg-gray-50">
    <!-- App Bar -->
    <header class="flex h-16 items-center justify-between bg-white px-6 shadow-sm">
      <div class="text-xl font-bold text-gray-800">My Project</div>
      <nav class="flex gap-4" aria-label="Main Navigation">
        <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
        <a href="#" class="text-gray-600 hover:text-gray-900">Profile</a>
      </nav>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 overflow-y-auto bg-white border-r border-gray-200">
        <nav class="p-4 space-y-2" aria-label="Sidebar Navigation">
          <RouterLink
            to="/"
            class="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
            exact-active-class="text-indigo-700 font-bold"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/about"
            class="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
            exact-active-class="text-indigo-700 font-bold"
          >
            About
          </RouterLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>

    <!-- Footer -->
    <footer
      class="flex h-12 items-center justify-center bg-white border-t border-gray-200 text-sm text-gray-500"
    >
      &copy; 2025 My Project. All rights reserved.
    </footer>
  </div>
</template>
```

Con esto hemos creado una estructura básica con un app bar, un sidebar, un área principal de contenido y un footer, todo estilizado con clases de Tailwind CSS.
Idealmente cada bloque (AppBar, Sidebar, Footer) debería ser un componente separado para promover la reutilización y el mantenimiento, pero para este ejemplo lo dejamos todo en `App.vue` para simplificar.

Verifica que todo funcione correctamente abriendo `http://localhost:5173` en tu navegador. Deberías ver la estructura básica con estilos aplicados.

Con esto ya tienes Tailwind CSS v4 funcionando en tu proyecto. Explora su <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">documentación oficial</a> e instala su extensión para un mejor autocompletado en VS Code: <a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss" target="_blank" rel="noopener noreferrer">Tailwind CSS IntelliSense</a>.

---

## EXTRA: Subiendo el proyecto a GitHub

Para esto tenemos muchas opciones. Antes de comenzar asumo que ya tienes una cuenta en GitHub y que tienes Git instalado en tu máquina.

1. Primero inicializamos un repositorio Git en la carpeta del proyecto:

```bash
git init
```

2. Luego creamos un archivo `.gitignore` en la raíz del proyecto (es probable que ya lo tengas) y nos aseguraremos de tener las siguientes líneas para ignorar archivos y carpetas innecesarias:

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
.DS_Store
dist
dist-ssr
coverage
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

*.tsbuildinfo

.eslintcache

# Cypress
/cypress/videos/
/cypress/screenshots/

# Vitest
__screenshots__/

```

3. Ahora agregamos todos los archivos y hacemos el commit inicial:

```bash
git add .
```

```bash
git commit -m "Initial commit"
```

4. Ahora vamos a GitHub y creamos un nuevo repositorio. Puedes hacer esto haciendo clic en el botón "+" en la esquina superior derecha y seleccionando "New repository". Ponle un nombre a tu repositorio (por ejemplo, `my-vue-app`), agrega una descripción si quieres, y déjalo como público o privado según prefieras. No agregues ningún archivo adicional (como README, .gitignore o licencia), ya los tenemos localmente.

5. Luego, seguimos las instrucciones que GitHub nos da para conectar nuestro repositorio local con el remoto. Normalmente son algo así:

```bash
git remote add origin https://example-url.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

6. Verificamos status

```bash
git status
```

Debe decir que estamos en la rama `main`, estamos sincronizados con el repositorio remoto `origin/main` y que no hay nada para hacer commit.

7. Finalmente, cada vez que hagamos cambios y queramos subirlos a GitHub, hacemos:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

¡Y eso es todo! Ahora tienes tu proyecto Vue 3 con Vite subido a GitHub.

Lo normal es que siempre uses un controlador de versiones como Git para manejar tu código, incluso en proyectos personales. Te ayudará a mantener un historial de cambios, colaborar con otros y proteger tu trabajo.

Te recomiendo explorar también sobre <a href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank" rel="noopener noreferrer">Conventional Commits</a> para mantener mensajes de commit consistentes y significativos. Es algo que usan muchas empresas, equipos y proyectos open source.

Algunos recursos para aprender más sobre Git y GitHub:

- <a href="https://github.com/djayepro3/Guide-Git-GitHub-VSCode" target="_blank" rel="noopener noreferrer">Git & GitHub with VS Code: A Beginner's Guide</a>
- <a href="https://docs.github.com/en/get-started/start-your-journey" target="_blank" rel="noopener noreferrer">GitHub Quickstart Guide</a>
- <a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer">Git Documentation</a>

Extensiones para VS Code:

- <a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" target="_blank" rel="noopener noreferrer">Gitlens</a>
- <a href="https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph" target="_blank" rel="noopener noreferrer">Git Graph</a>

---

## EXTRA: Otras extensiones útiles para VS Code

Algunas extensiones que siempre recomiendo para VS Code (sin importar el tipo de proyecto):

- <a href="https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens" target="_blank" rel="noopener noreferrer">Error Lens</a>: Resalta errores y advertencias directamente en el código, facilitando su identificación y corrección.
- <a href="https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight" target="_blank" rel="noopener noreferrer">Color Highlight</a>: Resalta los colores definidos en tu código CSS, facilitando la visualización de los mismos.
- <a href="https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments" target="_blank" rel="noopener noreferrer">Better Comments</a>: Mejora la legibilidad de los comentarios en el código mediante colores y estilos.
- <a href="https://marketplace.visualstudio.com/items?itemName=antfu.iconify" target="_blank" rel="noopener noreferrer">Iconify Intellisense</a>: Si quieres trabajar con iconos, esta extensión te permite buscar e insertar iconos de múltiples bibliotecas directamente en tu código. A parte de ello recomiendo explorar su librería <a href="https://icon-sets.iconify.design/" target="_blank" rel="noopener noreferrer">Iconify</a> dónde puedes encontrar una gran variedad de icon sets gratuitos.

---

Bueno, eso sería todo para esta guía introductoria sobre Vue 3 con Vite. Espero que te haya sido útil para comenzar tu viaje con este framework y su ecosistema.

---
