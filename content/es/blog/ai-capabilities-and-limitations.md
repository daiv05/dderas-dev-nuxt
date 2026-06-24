---
id: "ai-capabilities-and-limitations"
title: "Capacidades y Limitaciones de la Inteligencia Artificial"
slug: "ai-capabilities-and-limitations"
order: 20
date: 2026-05-14
summary: "La inteligencia artificial tiene capacidades impressionantes, pero también presenta limitaciones importantes. En este artículo, exploraremos ambas facetas en el contexto del aprendizaje automático."
tags:
  [
    "inteligencia artificial",
    "aprendizaje automático",
    "capacidades de la IA",
    "limitaciones de la IA",
    "machine learning",
  ]
image: /blog/ai-capabilities-and-limitations/shared/ai-capabilities-limitations.webp
author: David Deras
lastmod: 2026-06-24
sitemap:
  priority: 0.7
  loc: /es/blog/ai-capabilities-and-limitations
  lastmod: 2026-06-24
---

Mientras exploraba los cursos de Anthropic me encontré con un artículo que me llamó la atención: [Capabilities and Limitations of AI](https://anthropic.skilljar.com/ai-capabilities-and-limitations). Asi que quise hacer un recorrido sobre las bases y lo que es actualmente la inteligencia artificial.

::table-of-contents
::

---

## ¿Cómo sabe un modelo que responder?

Los modelos de IA que se han hecho tan virales, son modelos de IA generativa, estos generan salidas basadas en patrones aprendidos a partir de grandes cantidades de datos, no tienen comprensión real del mundo, sino que **predicen la siguiente palabra o secuencia de palabras** basándose en las **probabilidades** derivadas de su entrenamiento. Por lo tanto, la salida de un modelo de IA es una combinación de patrones estadísticos y asociaciones aprendidas, sin una verdadera comprensión semántica o contextual.

> Entender que la IA es un motor de **PREDICCIÓN** es fundamental para entender sus capacidades y limitaciones. No es un ser consciente ni tiene intenciones propias, sino que simplemente genera respuestas basadas en patrones aprendidos.

### El carácter de un modelo

Todos hemos notado que cada modelo tiene su "forma" de responder.
Cuando se entrena un modelo de IA, se le proporciona una gran cantidad de datos para que aprenda a reconocer patrones y asociaciones, y se lleva a cabo en 2 etapas:

- En el **pre-entrenamiento (pretraining)**: el modelo aprende a predecir la siguiente palabra en una secuencia de texto. Es dónde aprende lo que se conoce como **Next Token Prediction**. En este es un **completador de texto**, no tiene una tarea específica, simplemente aprende a generar texto coherente basado en los datos de entrenamiento, no sabe sobre "ayudarte a escribir código" o "responder preguntas".

En el curso de Anthropic se menciona como ejemplo que si en este punto se le pregunta al modelo "¿Cuál es la capital de Francia?", el modelo podría responder "París" y luego continuar con ¿Cuál es la capital de Alemania? "Berlín", ¿Cuál es la capital de España? "Madrid", y así sucesivamente, porque es un caso común en quizes de geografía, pero no tiene una comprensión real de lo que es una capital o un país, simplemente ha aprendido a asociar ciertas "palabras" con otras.

> Está completando texto, de la forma más estadísticamente probable

- Luego sigue el **ajuste fino (fine-tuning)**: en esta etapa, el modelo se entrena con datos más específicos y se le muestra cómo responder a ciertas preguntas o realizar tareas específicas. Aquí es donde el modelo aprende como debería ser una "buena respuesta" a una pregunta, y se le da un marco de referencia para entender lo que se espera de él. Aqui se suelen utilizar técnicas de **Reforzamiento con Retroalimentación Humana (RLHF)**, donde se le da retroalimentación al modelo sobre la calidad de sus respuestas, lo que ayuda a mejorar su rendimiento en tareas específicas.

En este camino de convertirse en un "asistente" el modelo pasa a tener ciertos "problemas":

- **Sycophancy**: el modelo puede aprender a ser complaciente y a generar respuestas que son agradables para el usuario, esto más de una vez lo hemos notado, y tiene mucho que ver con su entrenamiento.
- **Verbosity**: el modelo puede generar respuestas largas y detalladas, incluso cuando no es necesario.
- **Overcaution**: el modelo puede ser demasiado cauteloso y evitar responder a ciertas preguntas o realizar ciertas tareas, incluso cuando es capaz de hacerlo.
- **Lose confidence calibration**: el modelo puede perder la capacidad de calibrar su confianza en sus respuestas, lo que puede llevar a generar respuestas incorrectas con alta confianza.

> La manera en la que se realiza el fine-tuning impacta en que tan complaciente, detallado, confidente o cauteloso puede ser un modelo.

### La línea entre capacidades y limitaciones

El proceso generativo dentro del modelo siempre es el mismo, lo que cambia es que tan bien "conoce" sobre lo que se le pregunta, si se le pregunta sobre un tema extremadamente específico, dará una respuesta con el mismo tono y seguridad que cualquier otra pregunta, pero la calidad de la respuesta será muy baja.

- **La zona de capacidad** es el área donde el modelo tiene un buen conocimiento y puede generar respuestas de alta calidad. En esta zona, el modelo puede responder preguntas con precisión y coherencia, y puede realizar tareas específicas de manera efectiva:
  - Hacer resúmenes
  - Reformular texto
  - Escribir sobre conceptos comunes
  - Redactar en un estilo familiar
  - Programar en un lenguaje de programación común

- **La zona de limitación** es el área donde el modelo tiene un conocimiento limitado o nulo, y puede generar respuestas de baja calidad:
  - Territorios nuevos: temas nuevos que no han sido ampliamente cubiertos en los datos de entrenamiento del modelo (como preguntarle sobre la nueva versión de ese framework que salió hace 2 días).
  - Temas poco conocidos: temas que son raros o poco comunes, como un paper académico muy específico o un tema de nicho que no ha sido ampliamente discutido en los datos de entrenamiento del modelo.
  - Temas cambiantes: temas que están en constante evolución o cambio, como la tecnología o las noticias actuales, donde la información puede volverse obsoleta rápidamente.
  - Sesgos y estereotipos: el modelo puede reflejar sesgos presentes en los datos de entrenamiento, lo que puede llevar a generar respuestas que son inapropiadas o ofensivas.

La calidad de la respuesta dependerá de a qué zona esté más cerca la pregunta.

> No importa que tan confidente o detallada sea la respuesta, el tono no es una señal de calidad.
> Siempre trata las respuestas como borradores a verificar.

Para ayudar a reducir el riesgo de obtener respuestas de baja calidad existen algunas estrategias como el **Web searching** (el modelo puede buscar información en la web para obtener datos más actualizados o específicos) o el uso de **MCPs** (Model Context Protocols, para interactuar con otros modelos o herramientas).

### Next token prediction

Veámos un ejemplo de cómo funciona el proceso de predicción de la siguiente "palabra" utilizando cadenas de Markov simples, que es una forma de modelar la probabilidad de que una palabra siga a otra.

Supongamos que entrenamos un modelo con estas frases:

- "me gusta programar en python"
- "me gusta aprender inteligencia artificial"
- "programar en equipo es divertido"
- "aprender cosas nuevas es útil"

A partir de esas frases, contamos qué palabra aparece después de otra.
Con eso construye una **matriz de transición**.

| Palabra      | me  | gusta | programar | en  | python | aprender | inteligencia | artificial | equipo | es  | divertido | cosas | nuevas | útil |
| ------------ | --- | ----- | --------- | --- | ------ | -------- | ------------ | ---------- | ------ | --- | --------- | ----- | ------ | ---- |
| me           | 0   | 2     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 0   | 0         | 0     | 0      | 0    |
| gusta        | 0   | 0     | 1         | 0   | 0      | 1        | 0            | 0          | 0      | 0   | 0         | 0     | 0      | 0    |
| programar    | 0   | 0     | 0         | 2   | 0      | 0        | 0            | 0          | 0      | 0   | 0         | 0     | 0      | 0    |
| en           | 0   | 0     | 0         | 0   | 1      | 0        | 0            | 0          | 1      | 0   | 0         | 0     | 0      | 0    |
| python       | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 0   | 0         | 0     | 0      | 0    |
| aprender     | 0   | 0     | 0         | 0   | 0      | 0        | 1            | 0          | 0      | 0   | 0         | 1     | 0      | 0    |
| inteligencia | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 1          | 0      | 0   | 0         | 0     | 0      | 0    |
| artificial   | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 0   | 0         | 0     | 0      | 0    |
| equipo       | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 1   | 0         | 0     | 0      | 0    |
| es           | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 0   | 1         | 0     | 0      | 1    |
| divertido    | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 0   | 0         | 0     | 0      | 0    |
| cosas        | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 0   | 0         | 0     | 1      | 0    |
| nuevas       | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 1   | 0         | 0     | 0      | 0    |
| útil         | 0   | 0     | 0         | 0   | 0      | 0        | 0            | 0          | 0      | 0   | 0         | 0     | 0      | 0    |

Ahora imaginemos que queremos generar texto comenzando con:

> "me gusta **\_**"

El modelo revisa la fila de **"gusta"**.

Ve que después de "gusta" aparecieron:

- "programar" - 1 vez
- "aprender" - 1 vez

Entonces ambas palabras tienen la misma probabilidad:

- P(programar | gusta) = 50%
- P(aprender | gusta) = 50%

El modelo podría continuar de cualquiera de estas maneras:

- "me gusta programar..."
- "me gusta aprender..."

Si el modelo elige:

> "me gusta programar **\_**"

Entonces revisa la fila de **"programar"**.

Observa que después de "programar" aparecieron:

- "en" - 2 veces

Por lo que es 100% probable que la siguiente palabra sea "en":

- P(en | programar) = 100%

Ahora tenemos:

> "me gusta programar en **\_**"

Revisamos la fila de **"en"** y vemos que después de "en" aparecieron:

- "python" - 1 vez
- "equipo" - 1 vez

De nuevo, ambas tienen 50% de probabilidad.

El texto podría continuar como:

- "me gusta programar en python"
- "me gusta programar en equipo"

Entonces, estamos aprendiendo patrones observando textos, y luego usamos probabilidades para decidir la siguiente palabra hasta formar una oración completa.

Para el caso de los LLMs, el proceso podríamos decir que es similar pero mucho más complejo, ya que no solo consideran la "palabra" anterior, sino todo el contexto disponible dentro de su **ventana de contexto** (todo lo que puede ver), además de no ser solo "palabras", si no tokens, que pueden ser palabras, partes de palabras o incluso caracteres.

Y tampoco trabajan directamente con esas palabras o caracteres como texto plano, cada token primero se convierte en un **vector numérico** dentro de un espacio de muchas dimensiones.

Por ejemplo:

```
"python" --> [0.12, -0.44, 1.03, ..., 0.91]
```

Ese vector puede tener X dimensiones dependiendo del modelo:

- 768 dimensiones
- 1024 dimensiones
- 4096 dimensiones
- 8192 dimensiones

Por ejemplo cuando decimos que un modelo usa un espacio de **1024 dimensiones** significa que cada token es representado mediante un vector de 1024 números.

Matemáticamente sería algo como:

$$
x \in \mathbb{R}^{1024}
$$

Donde:

- (x) es el embedding del token
- $(\mathbb{R}^{1024})$ representa un espacio de 1024 dimensiones

¿Por qué usar dimensiones? Porque los modelos necesitan representar relaciones complejas entre conceptos.

En una cadena de Markov simple:

```
"gusta" -- "programar"
```

Solo estamos considerando la palabra anterior, pero en un LLM, el vector puede capturar simultáneamente:

- Significado semántico
- Contexto
- Gramática
- Relaciones entre palabras
- Tono
- Idioma
- Patrones estadísticos
- Intención

```
"python" --> embedding --> [0.12, -0.44, 1.03, ..., 0.91]
```

> En términos técnicos primero existe un `embedding table`, cada token obtiene un vector inicial a partir de esa tabla, y luego ese vector se transforma a través de múltiples capas del modelo, cada una con sus propias operaciones matemáticas, hasta llegar a la salida final.

¿Que significa cada valor de ese vector?

Pedagógicamente podríamos verlo como que el primer valor (0.12) podría representar la relación de "python" con el concepto de "programación", el segundo valor representar su relación con "lenguaje de programación", etc., PERO, realmente no existe una dimensión que **represente directamente un concepto humano específico**, el significado emerge de patrones distribuidos entre muchas dimensiones.

Mientras más grande es la dimensionalidad:

- Más información puede representar el modelo
- Más complejas son las operaciones matemáticas
- Más parámetros necesita

Por eso modelos grandes como:

- Llama 3.3 70B
- GPT-4
- Gemini

Usan espacios internos enormes y muchos parámetros. 

Todo esto potencia lo que llamamos `atención`: en vez de mirar solo la palabra anterior, el modelo compara cada token con los demás tokens del contexto.

La atención utiliza operaciones entre vectores como:

$$
QK^T
$$

Donde:

- Q = Query (el token actual)
- K = Keys (todos los tokens del contexto)
- $T$ = Transpuesta

El resultado es una matriz de atención que indica qué tan relevante es cada token del contexto para predecir el siguiente token.

Así el modelo puede entender relaciones como:

```
"El perro persiguió al gato porque estaba asustado"
```

Y decidir si "asustado" se refiere al perro o al gato usando contexto completo, no únicamente la palabra anterior.


Asi que, aunque los LLMs son muchísimo más complejos, el objetivo final sigue siendo sorprendentemente parecido al ejemplo inicial:

> Predecir el siguiente token

