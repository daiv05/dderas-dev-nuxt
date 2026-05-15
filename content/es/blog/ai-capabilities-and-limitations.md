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
lastmod: 2026-05-14
sitemap:
  priority: 0.7
  loc: /es/blog/ai-capabilities-and-limitations
  lastmod: 2026-05-14
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

- En el **pre-entrenamiento (pretraining)**: el modelo aprende a predecir la siguiente palabra en una secuencia de texto. Es dónde aprende lo que se conoce como **Next Token Prediction**. En este punto el modelo es un **completador de texto**, pero no tiene una tarea específica, simplemente aprende a generar texto coherente basado en los datos de entrenamiento, no sabe sobre "ayudarte a escribir código" o "responder preguntas".

En el curso de Anthropic se menciona como ejemplo que si en este punto se le pregunta al modelo "¿Cuál es la capital de Francia?", el modelo podría responder "París" y luego continuar con ¿Cuál es la capital de Alemania? "Berlín", ¿Cuál es la capital de España? "Madrid", y así sucesivamente, porque es un caso común en quizes de geografía, pero no tiene una comprensión real de lo que es una capital o un país, simplemente ha aprendido a asociar ciertas palabras con otras.

> Esta completando texto, de la forma más estadísticamente probable

- Pero luego sigue el **ajuste fino (fine-tuning)**: en esta etapa, el modelo se entrena con datos más específicos y se le muestra cómo responder a ciertas preguntas o realizar tareas específicas. Aquí es donde el modelo comienza a aprender a como debería ser una "buena respuesta" a una pregunta, y se le da un marco de referencia para entender lo que se espera de él. Aqui se suelen utilizar técnicas de **Reforzamiento con Retroalimentación Humana (RLHF)**, donde se le da retroalimentación al modelo sobre la calidad de sus respuestas, lo que ayuda a mejorar su rendimiento en tareas específicas.

En el camino de convertirse en un "asistente" el modelo pasa a tener ciertos "problemas":

- **Sycophancy**: el modelo puede aprender a ser complaciente y a generar respuestas que son agradables para el usuario, esto más de una vez lo hemos notado, y tiene mucho que ver con su entrenamiento. 
- **Verbosity**: el modelo puede generar respuestas largas y detalladas, incluso cuando no es necesario.
- **Overcaution**: el modelo puede ser demasiado cauteloso y evitar responder a ciertas preguntas o realizar ciertas tareas, incluso cuando es capaz de hacerlo.
- **Lose confidence calibration**: el modelo puede perder la capacidad de calibrar su confianza en sus respuestas, lo que puede llevar a generar respuestas incorrectas con alta confianza.

> La manera en la que se realiza el fine-tuning impacta en que tan complaciente, detallado, confidente o cauteloso puede ser un modelo.

### La línea entre capacidades y limitaciones

El proceso generativo dentro del modelo siempre es el mismo, lo que cambia es que tan bien "concoce" sobre lo que se le pregunta, si se le pregunta sobre un tema extremadamente específico, dará una respuesta con el mismo tono y seguridad que cualquier otra pregunta, pero la calidad de la respuesta será muy baja.

- **Capability zone**: es el área donde el modelo tiene un buen conocimiento y puede generar respuestas de alta calidad. En esta zona, el modelo puede responder preguntas con precisión y coherencia, y puede realizar tareas específicas de manera efectiva:
  - Hacer resúmenes
  - Reformular texto
  - Escribir sobre conceptos comunes
  - Redactar en un estilo familiar
  - Programar en un lenguaje de programación común

- **Limitation Zone**: es el área donde el modelo tiene un conocimiento limitado o nulo, y puede generar respuestas de baja calidad:
  - Territorios nuevos: temas nuevos que no han sido ampliamente cubiertos en los datos de entrenamiento del modelo (como preguntarle sobre la nueva versión de ese framework que salió hace 2 días).
  - Temas poco conocidos: temas que son raros o poco comunes, como un paper académico muy específico o un tema de nicho que no ha sido ampliamente discutido en los datos de entrenamiento del modelo.

La calidad de la respuesta dependerá de a qué zona esté más cerca la pregunta.

> No importa que tan confidente o detallada sea la respuesta, el tono no es una señal de calidad.
> Siempre trata las respuestas como borradores a verificar.

Para ayudar a reducir el riesgo de obtener respuestas de baja calidad existen algunas estrategias como el **Web searching** (el modelo puede buscar información en la web para obtener datos más actualizados o específicos) o el uso de **MCPs** (Model Context Protocols, para interactuar con otros modelos o herramientas).

