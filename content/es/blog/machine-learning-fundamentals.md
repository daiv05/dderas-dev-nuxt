---
id: 'machine-learning-fundamentals'
title: 'Fundamentos de Aprendizaje Automático'
slug: 'machine-learning-fundamentals'
date: 2026-03-27
summary: 'Conceptos básicos para iniciar en el mundo del aprendizaje automático'
tags: ['Aprendizaje Automático', 'Inteligencia Artificial', 'Python', 'Data Science', 'Machine Learning']
image: /blog/machine-learning-fundamentals/shared/ml-fundamentals.webp
author: David Deras
lastmod: 2026-03-27
sitemap:
  priority: 0.7
  loc: /es/blog/machine-learning-fundamentals
  lastmod: 2026-03-27
---

Esta es la primera parte de una serie de artículos donde exploraremos el aprendizaje automático, desde sus conceptos básicos hasta redes neuronales y el crear un modelo de machine learning. En esta primera parte, nos centraremos en los fundamentos del aprendizaje automático, incluyendo qué es, sus tipos y algunos algoritmos comunes.

::table-of-contents
::

---

## Inteligencia Artificial y Machine Learning

Te despiertas un día, abres Netflix y te encuentras recomendada exactamente la serie que querías ver. Luego, abres Google escribes algo y el buscador completa tu frase antes de que termines de teclear. ¿Cómo hacen esto? La respuesta es: Inteligencia Artificial. La IA, es una disciplina enfocada en desarrollar sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como aprender, razonar y percibir nuestro entorno, asi como tomar decisiones.

Existen tres tipos de IA:

- **IA débil o estrecha (Artificial Narrow Intelligence o ANI)**: Es la IA que tenemos hoy en día. Está diseñada para realizar tareas específicas, como reconocimiento de voz, recomendaciones de productos o traducción automática. No tiene conciencia ni comprensión real, simplemente sigue algoritmos y patrones predefinidos. Los LLM como GPT, Claude o Gemini, son ejemplos de IA débil, ya que están diseñados para procesar y generar texto, "solamente" son modelos estadisticos que predicen texto, y  no tienen una comprensión profunda del mundo ni pueden realizar tareas fuera de su ámbito específico. Aunque parecen inteligentes, en realidad solo están imitando patrones de lenguaje basados en los datos con los que fueron entrenados.
- **IA general (Artifical General Intelligence o AGI)**: Es una IA hipotética que tendría la capacidad de entender, aprender y aplicar conocimientos en una amplia variedad de tareas, similar a la inteligencia humana. Aún no existe, pero es un objetivo a largo plazo en el campo de la IA.
- **IA superinteligente (Artificial Superintelligence o ASI)**: Es una IA que superaría la inteligencia humana en todos los aspectos, incluyendo creatividad, resolución de problemas y toma de decisiones. Es un concepto **teórico** que plantea muchas preguntas éticas y filosóficas sobre el futuro de la humanidad.

¿Dónde entra el Machine Learning? Es muy común confundir la IA con el Machine Learning, pero no son exactamente lo mismo. Podemos decir que la Inteligencia Artificial es un gran paraguas conceptual, y debajo de ese paraguas se encuentra el Machine Learning, un subcampo específico que permite a las computadoras aprender automáticamente a partir de datos, sin necesidad de que un humano las programe paso a paso.

> Recursos recomendados:
> * [Inteligencia Artificial vs Machine Learning vs Deep Learning | Machine Learning 101](https://youtu.be/dKqwnCKrpVI?si=g6qqFa_1G_M5P3LS)

---

## Subcampos de la IA

Dentro del gran paraguas de la IA, hay varios subcampos que se especializan en diferentes aspectos de la inteligencia artificial:

- **Aprendizaje Automático (Machine Learning)**: Se centra en desarrollar algoritmos que permiten a las máquinas aprender de los datos y mejorar su rendimiento con el tiempo sin ser explícitamente programadas para cada tarea específica.
- **Aprendizaje Profundo (Deep Learning)**: Es una rama del aprendizaje automático que utiliza redes neuronales profundas para modelar y resolver problemas complejos. Es especialmente efectivo en tareas como reconocimiento de voz, visión por computadora y procesamiento del lenguaje natural.
- **Procesamiento del Lenguaje Natural (Natural Language Processing o NLP)**: Se enfoca en la interacción entre las computadoras y el lenguaje humano, permitiendo a las máquinas entender, interpretar y generar texto de manera natural. Es lo que hace posible que los chatbots como ChatGPT puedan mantener conversaciones coherentes con los usuarios.
- **Visión por Computadora (Computer Vision)**: Se ocupa de permitir que las máquinas comprendan y procesen imágenes y videos. Esto es fundamental para aplicaciones como el reconocimiento facial, la conducción autónoma y la detección de objetos.
- **Robótica**: Se dedica al diseño y construcción de robots que pueden realizar tareas físicas en el mundo real, desde la fabricación hasta la asistencia médica.
- **Sistemas Expertos**: Son programas que imitan la toma de decisiones de un experto humano en un dominio específico, utilizando reglas y lógica para resolver problemas complejos.
- **Razonamiento Automático**: Se enfoca en inferir conclusiones lógicas a partir de reglas formales, no es lo mismo que el aprendizaje automático, este campo incluye lógica simbólica, resolución de problemas y planificación automática.
- **Agentes Inteligentes**: Son sistemas que pueden percibir su entorno, razonar sobre él y tomar decisiones para alcanzar objetivos específicos. Pueden ser tan simples como un chatbot o tan complejos como un sistema de conducción autónoma (puede usar ML, reglas simples, razonamiento lógico, etc).
- **IA Distribuida**: Se refiere a sistemas de IA que operan en múltiples dispositivos o nodos, colaborando para resolver problemas de manera más eficiente. Esto es especialmente relevante en aplicaciones como el Internet de las Cosas (IoT) y la computación en la nube.
- **IA Explicable (XAI)**: Se centra en desarrollar modelos de IA que sean transparentes y comprensibles para los humanos, permitiendo a los usuarios entender cómo y por qué la IA toma ciertas decisiones.
- **Ética y Gobernanza de la IA**: Se ocupa de las implicaciones éticas, legales y sociales del desarrollo y uso de la IA, abordando temas como la privacidad, la equidad, la transparencia.

---

## Como aprende una máquina en el aprendizaje automático

Todo depende de los datos que le demos:

- **Aprendizaje Supervisado**: Aquí le damos a la máquina ejemplos claros con las respuestas correctas ya "etiquetadas". Por ejemplo, si queremos que la IA ayude en un diagnóstico médico, le damos miles de historiales médicos donde ya sabemos qué paciente estaba **enfermo** y qué paciente estaba **sano**. 
Ahí tenemos un conjunto de datos con características (edad, síntomas, resultados de pruebas) y etiquetas (diagnóstico, si está enfermo o sano). Entonces, la máquina aprende a reconocer patrones en esos datos para poder predecir el diagnóstico de nuevos pacientes basándose en lo que ha aprendido.

Un ejemplo sencillo sería algo así:

| Edad | Síntomas         | Resultado de Pruebas | Diagnóstico |
|-----|-------------------|----------------------|-------------|
| 45  | Fiebre, Tos       | Positivo             | Enfermo     |
| 30  | Dolor de cabeza   | Negativo             | Sano        |

La etiqueta aquí es el "Diagnóstico", y la máquina aprende a asociar las características (Edad, Síntomas, Resultado de Pruebas) con esa etiqueta para hacer predicciones futuras.

Dentro del aprendizaje supervisado, hay dos tipos principales de tareas:
- **Clasificación**: Donde la máquina asigna una etiqueta a cada ejemplo. Por ejemplo, clasificar correos electrónicos como "spam" o "no spam".
- **Regresión**: Donde la máquina predice un valor continuo. Por ejemplo, predecir el precio de una casa basándose en características como el tamaño, la ubicación y el número de habitaciones.

Basicamente si la respuesta que queremos predecir es una categoría (o una variable discreta), es clasificación, si la respuesta es un número, es regresión.
Y el requisito para que el aprendizaje supervisado funcione bien es tener un conjunto de datos grande y representativo, con etiquetas precisas. Si los datos son escasos o las etiquetas son incorrectas, la máquina no podrá aprender correctamente y sus predicciones serán inexactas.

Ejemplos de aplicaciones de ML son:
- Detección de fraudes en transacciones financieras (clasificación)
- Predicción de precios de acciones (regresión)
- Reconocimiento de imágenes (clasificación)
- Análisis de sentimientos en redes sociales (clasificación)

---

- **Aprendizaje No Supervisado**: Imagina que te sueltan en un país desconocido y tienes que deducir cómo funciona la sociedad solo observando, es algo similar. Aquí, la máquina recibe datos sin etiquetas y debe encontrar patrones ocultos por sí sola. Puede ser útil para segmentar clientes en marketing o para detectar fraudes en transacciones financieras.


---

- **Aprendizaje por Refuerzo**: Piensa en cómo entrenas a una mascota con premios. La máquina (el agente) toma decisiones en un entorno y recibe "recompensas" o "penalizaciones". Así es como los sistemas de conducción autónoma de Tesla o los robots aprenden a navegar por el mundo físico. Un ejemplo que me gusta es el de un video donde le enseñan a bot a jugar Geometry Dash, un juego de plataformas. Al principio, el bot no tiene ni idea de cómo jugar, pero a través de prueba y error, va mejorando su rendimiento hasta convertirse en un experto jugador.

> Recursos recomendados:
> * [¿Qué es el Aprendizaje Supervisado y No Supervisado? | DotCSV](https://youtu.be/oT3arRRB2Cw?si=ykU9KQjQLxdn9ggj)
> * [El APRENDIZAJE POR REFUERZO: la guía DEFINITIVA](https://youtu.be/qBtB-xcJp4c?si=c2GuJBCFPorKGN44)

---

## Memorizar vs Aprender

Cuando hablamos de aprendizaje, ya sea humano o de máquinas, existe un concepto crucial que debemos entender: memorizar no es lo mismo que aprender.

**Memorizar** es como copiar y pegar información sin realmente entenderla. Por ejemplo, si memorizas la fórmula del área de un círculo (A = πr²) sin comprender qué significa cada parte, no podrás aplicarla correctamente en diferentes contextos. La memoria te salva en lo inmediato, pero no te da la capacidad de adaptarte a nuevas situaciones o resolver problemas que no has visto antes, en cambio, **aprender** implica comprender los conceptos que están detrás y ser capaz de aplicarlos en situaciones nuevas. 

En el mundo del aprendizaje automático, una máquina que solo memoriza los datos de entrenamiento puede tener un rendimiento excelente en esos datos específicos, pero luego fallar estrepitosamente cuando se utiliza en entornos reales. Por eso, en machine learning, el verdadero objetivo no es memorizar patrones específicos, sino generalizar: aprender reglas y relaciones que funcionen más allá de los ejemplos vistos.

Pero aprender tampoco es sencillo, a veces, las máquinas sufren de **Overfitting** (sobreajuste), que ocurre cuando un modelo "memoriza" los datos de entrenamiento a la perfección, pero fracasa rotundamente cuando se enfrenta a datos nuevos en el mundo real. Es exactamente igual que un estudiante que memoriza las respuestas de un examen sin entender realmente los conceptos. Por el contrario, si el modelo es demasiado simple y no aprende nada, sufre de **Underfitting** (subajuste), como un estudiante que no estudió lo suficiente.

> Recursos recomendados:
> * [Subajuste y sobreajuste: explicados](https://youtu.be/o3DztvnfAJg?si=lorMlPZqLAMa-EV3)

---

## La ética en el aprendizaje automático

A medida que el aprendizaje automático se vuelve más omnipresente en nuestras vidas, es crucial considerar las implicaciones éticas de su uso. Los modelos de machine learning pueden perpetuar sesgos existentes en los datos, lo que puede llevar a decisiones injustas o discriminatorias. Por ejemplo, si un modelo de contratación se entrena con datos históricos que reflejan prejuicios de género o raza, es probable que el modelo reproduzca esos sesgos en sus recomendaciones. Además, la privacidad de los datos es una preocupación importante. Es fundamental asegurarse de que los datos utilizados para entrenar modelos de machine learning se recopilen y manejen de manera ética, respetando la privacidad y los derechos de las personas.
