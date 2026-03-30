---
id: 'machine-learning-fundamentals'
title: 'Fundamentos de Aprendizaje Automático'
slug: 'machine-learning-fundamentals'
date: 2026-03-30
summary: 'Conceptos básicos para iniciar en el mundo del aprendizaje automático'
tags: ['Aprendizaje Automático', 'Inteligencia Artificial', 'Python', 'Data Science', 'Machine Learning']
image: /blog/machine-learning-fundamentals/shared/ml-fundamentals.webp
author: David Deras
lastmod: 2026-03-30
sitemap:
  priority: 0.7
  loc: /es/blog/machine-learning-fundamentals
  lastmod: 2026-03-30
---

Esta es la primera parte de una serie de artículos donde exploraremos el aprendizaje automático, desde sus conceptos básicos hasta redes neuronales y la creación de un modelo de machine learning. En esta primera parte, nos centraremos en los fundamentos del aprendizaje automático, incluyendo qué es, sus tipos y algunos algoritmos comunes.

::table-of-contents
::

---

## Inteligencia Artificial y Machine Learning

Te despiertas un día, abres Netflix y te encuentras recomendada exactamente la serie que querías ver. Luego, abres Google escribes algo y el buscador completa tu frase antes de que termines de teclear. ¿Cómo hacen esto? La respuesta es: Inteligencia Artificial. La IA, es una disciplina enfocada en desarrollar sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como **aprender**, **razonar** y **percibir** nuestro entorno, asi como **tomar decisiones**.

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

## Como aprende una máquina

Todo depende de los datos que le demos:

- **Aprendizaje Supervisado**: Aquí le damos a la máquina ejemplos claros con las respuestas correctas ya "etiquetadas". Por ejemplo, si queremos que la IA ayude en un diagnóstico médico, le damos miles de historiales médicos donde ya sabemos qué paciente estaba **enfermo** y qué paciente estaba **sano**. 
La máquina aprende a reconocer patrones en esos datos para poder predecir el diagnóstico de nuevos pacientes basándose en lo que ha aprendido.

  Un ejemplo sencillo sería algo así:

  | Edad | Síntomas         | Resultado de Pruebas | Diagnóstico |
  |-----|-------------------|----------------------|-------------|
  | 45  | Fiebre, Tos       | Positivo             | Enfermo     |
  | 30  | Dolor de cabeza   | Negativo             | Sano        |

  La etiqueta aquí es el "Diagnóstico", y la máquina aprende a asociar las características (Edad, Síntomas, Resultado de Pruebas) con esa etiqueta para hacer predicciones futuras.

  Dentro del aprendizaje supervisado, hay dos tipos principales de tareas:
  - **Clasificación**: Donde la máquina asigna una etiqueta a cada ejemplo. Como clasificar correos electrónicos como "spam" o "no spam".
  - **Regresión**: Donde la máquina predice un valor continuo. Por ejemplo, predecir el precio de una casa basándose en características como el tamaño, la ubicación y el número de habitaciones.

  Basicamente si la respuesta que queremos predecir es una categoría (o una <a href="https://www.probabilidadyestadistica.net/variable-discreta" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">variable discreta</a>), es clasificación, si la respuesta representa una cantidad medible en una escala continua, es regresión.
  Y el requisito para que el aprendizaje supervisado funcione bien es tener un conjunto de datos grande y representativo, con etiquetas precisas. Si los datos son escasos o las etiquetas son incorrectas, la máquina no podrá aprender correctamente y sus predicciones serán inexactas.

  Ejemplos de aplicaciones de ML son:
  - Detección de fraudes en transacciones financieras (clasificación)
  - Predicción de precios de acciones (regresión)
  - Reconocimiento de imágenes (clasificación)
  - Análisis de sentimientos en redes sociales (clasificación)

---

- **Aprendizaje No Supervisado**: Imagina que te sueltan en un país desconocido y tienes que deducir cómo funciona la sociedad solo observando, es algo similar. Aquí, la máquina recibe datos sin etiquetas y debe encontrar patrones ocultos por sí sola. El sistema tendrá que analizar similitudes, diferencias y comportamientos para encontrar agrupaciones o patrones inusuales. No hay un "profesor" que le diga si está bien o mal.

  Técnicas principales:
  1. **Clustering (Agrupamiento)**: Agrupa datos similares entre si.
    Se usa típicamente para segmentación de clientes, agrupar documentos por tema y organización automática de imágenes, etc. Algunos algoritmos:
      - K-means clustering
      - DBSCAN
      - Hierarchical clustering
  2. **Reducción de dimensionalidad**: Este busca reducir la cantidad de variables manteniendo la información importante. Usado para visualizar datos complejos y preparar datos para otros modelos.
      - Principal Component Analysis (PCA)
      - t-SNE
  3. **Detección de anomalías**: Identifica datos que se comportan diferente del resto. Útil para detectar fraudes, fallos en sistemas y comportamientos sospechosos.

  Un ejemplo sencillo sería:
  | Edad | Ingresos Anuales | Gastos Mensuales |
  |-----|------------------|------------------|
  | 25  | $30,000          | $1,000           |
  | 40  | $80,000          | $3,000           |
  | 60  | $50,000          | $2,000           |

  La máquina podría agrupar a los clientes en segmentos basados en sus ingresos y gastos, sin que le digamos explícitamente qué grupos existen.
  Con esto podemos identificar patrones de consumo, como por ejemplo, que los clientes jóvenes tienden a gastar menos que los clientes de mediana edad, o que hay un grupo de clientes con ingresos altos pero gastos bajos, lo que podría indicar un segmento de ahorro.

---

- **Aprendizaje por Refuerzo**: Piensa en cómo entrenas a una mascota con premios. La máquina (el agente) toma decisiones en un entorno y recibe "recompensas" o "penalizaciones". Así es como los sistemas de conducción autónoma de Tesla o los robots aprenden a navegar por el mundo físico. Un ejemplo que me gusta es el de un video donde <a href="https://youtu.be/PKDMGPf-PEA?si=tAEMO3cETdPrvi_t" target="_blank" rel="noopener noreferrer">entrenan a un agente para jugar Geometry Dash</a>.

  En este tipo de aprendizaje se tienen cuatro componentes principales:
  1. **Agente**: Es el sistema que toma decisiones y aprende a través de la interacción con el entorno. Puede ser un robot, un programa de computadora o cualquier sistema que pueda percibir su entorno y actuar sobre él.
  2. **Entorno**: Es el mundo en el que el agente opera. Puede ser un entorno físico, como un robot en una habitación, o un entorno virtual, como un videojuego.
  3. **Recompensa**: Es la señal que el agente recibe después de tomar una acción. Puede ser positiva (recompensa) o negativa (penalización) y sirve para guiar el aprendizaje del agente.
  4. **Política**: Es la estrategia que el agente utiliza para decidir qué acción tomar en función de su estado actual y de las recompensas que ha recibido en el pasado. 

  Básicamente siguen un flujo como el siguiente:

  <MermaidDiagram content="graph TD
      A[Agente] -->|Toma acción| B(Entorno)
      B -->|Proporciona recompensa| C[Recompensa]
      C -->|Actualiza política| A" />

> Recursos recomendados:
> * [¿Qué es el Aprendizaje Supervisado y No Supervisado? | DotCSV](https://youtu.be/oT3arRRB2Cw?si=ykU9KQjQLxdn9ggj)
> * [El APRENDIZAJE POR REFUERZO: la guía DEFINITIVA](https://youtu.be/qBtB-xcJp4c?si=c2GuJBCFPorKGN44)

---

## Pipeline de un proyecto de IA

Un proyecto de IA generalmente sigue un proceso estructurado que incluye varias etapas clave:

1. **Definición del problema**: Es fundamental entender claramente el problema que se quiere resolver y los objetivos del proyecto. Esto incluye identificar las preguntas que se quieren responder, los resultados esperados y las métricas de éxito.
2. **Recolección de datos**: Se recopilan los datos necesarios para entrenar el modelo de IA. Esto puede incluir datos estructurados (como bases de datos) o no estructurados (como texto, imágenes o videos). Es importante asegurarse de que los datos sean de alta calidad y representativos del problema que se quiere resolver.
3. **Preprocesamiento de datos**: Los datos recopilados a menudo necesitan ser limpiados y transformados antes de ser utilizados para entrenar el modelo. Esto puede incluir la eliminación de valores faltantes, la normalización de datos, la codificación de variables categóricas y la división de los datos en conjuntos de entrenamiento y prueba.
4. **Selección del modelo**: Se elige el algoritmo de aprendizaje automático más adecuado para el problema en cuestión. Esto puede depender de la naturaleza de los datos, la complejidad del problema y los recursos disponibles.
5. **Entrenamiento del modelo**: Se utiliza el conjunto de datos de entrenamiento para entrenar el modelo de IA. Durante esta etapa, el modelo aprende a partir de los datos y ajusta sus parámetros para minimizar el error en las predicciones.
6. **Evaluación del modelo**: Se evalúa el rendimiento del modelo utilizando el conjunto de prueba. Se utilizan métricas específicas para medir la precisión, la exactitud, la sensibilidad y otras características del modelo, dependiendo del tipo de problema (clasificación, regresión, etc.).
7. **Ajuste de hiperparámetros**: Si el rendimiento del modelo no es satisfactorio, se pueden ajustar los hiperparámetros del modelo para mejorar su rendimiento. Esto puede incluir cambiar la arquitectura del modelo, ajustar la tasa de aprendizaje o modificar otros parámetros específicos del algoritmo.
8. **Implementación**: Una vez que el modelo ha sido entrenado y evaluado, se implementa en un entorno de producción donde puede ser utilizado para hacer predicciones en tiempo real o procesar nuevos datos.
9. **Mantenimiento y actualización**: Después de la implementación, es importante monitorear el rendimiento del modelo y actualizarlo regularmente para asegurarse de que siga siendo efectivo a medida que cambian los datos y las condiciones del entorno.


## Memorizar vs Aprender

Cuando hablamos de aprendizaje, ya sea humano o de máquinas, existe un concepto crucial que debemos entender: memorizar no es lo mismo que aprender.

**Memorizar** es como copiar y pegar información sin realmente entenderla. Por ejemplo, si memorizas la fórmula del área de un círculo (A = πr²) sin comprender qué significa cada parte, no podrás aplicarla correctamente en diferentes contextos. La memoria te salva en lo inmediato, pero no te da la capacidad de adaptarte a nuevas situaciones o resolver problemas que no has visto antes, en cambio, **aprender** implica comprender los conceptos que están detrás y ser capaz de aplicarlos en situaciones nuevas. 

En el mundo del aprendizaje automático, una máquina que solo memoriza los datos de entrenamiento puede tener un rendimiento excelente en esos datos específicos, pero luego fallar estrepitosamente cuando se utiliza en entornos reales. Por eso, en machine learning, el verdadero objetivo no es memorizar patrones específicos, sino generalizar: aprender reglas y relaciones que funcionen más allá de los ejemplos vistos.

Pero aprender tampoco es sencillo, a veces, las máquinas sufren de **Overfitting** (sobreajuste), que ocurre cuando un modelo "memoriza" los datos de entrenamiento a la perfección, pero fracasa rotundamente cuando se enfrenta a datos nuevos en el mundo real. Es exactamente igual que un estudiante que memoriza las respuestas de un examen sin entender realmente los conceptos. Por el contrario, si el modelo es demasiado simple y no aprende nada, sufre de **Underfitting** (subajuste), como un estudiante que no estudió lo suficiente.

> Recursos recomendados:
> * [Subajuste y sobreajuste: explicados](https://youtu.be/o3DztvnfAJg?si=lorMlPZqLAMa-EV3)


---

## Los componentes de un sistema de IA

- **Datos**: Son la base de cualquier sistema de IA. Sin datos, no hay aprendizaje. Deben ser de alta calidad, relevantes y representativos del problema que se quiere resolver. Con un alto volumen y con el menor <a href="https://www.innovatiana.com/es/post/bias-estimation-in-machine-learning" target="_blank" rel="noopener noreferrer">sesgo</a> posible.
- **Algoritmos**: Son las recetas que la máquina sigue para aprender de los datos. Hay muchos tipos de algoritmos, cada uno con sus propias fortalezas y debilidades, y deben ser seleccionados cuidadosamente según el problema específico que se quiere resolver, configurados y ajustados para obtener el mejor rendimiento posible.
- **Infraestructura**: Es el hardware y software necesario para procesar los datos y ejecutar los algoritmos. Esto incluye desde servidores (CPU, GPU, TPU) hasta plataformas de computación en la nube y herramientas de desarrollo (AWS, Azure, GCP), asi como almacenamiento de datos y sistemas de gestión de bases de datos.

A parte de estos componentes, tenemos la **evaluación**, que es el proceso de medir el rendimiento del modelo de IA para asegurarse de que está funcionando correctamente y cumpliendo con los objetivos establecidos, asi como el rol de la **ética y gobernanza**, que es fundamental para considerar las implicaciones éticas y sociales.


---

## La ética en la IA

A medida que la inteligencia artificial se vuelve más omnipresente en nuestras vidas, es crucial considerar las implicaciones éticas de su uso. Los modelos de machine learning pueden perpetuar sesgos existentes en los datos, lo que puede llevar a decisiones injustas o discriminatorias. Por ejemplo, si un modelo de contratación se entrena con datos históricos que reflejan prejuicios de género o raza, es probable que el modelo reproduzca esos sesgos en sus recomendaciones. Además, la privacidad de los datos es una preocupación importante. Es fundamental asegurarse de que los datos utilizados se recopilen y manejen de manera ética, respetando la privacidad y los derechos de las personas.

- **Transparencia**: Los sistemas deben ser comprensibles y auditables para que los usuarios puedan entender cómo funcionan y por qué toman ciertas decisiones, una solución a esto es la IA explicable (XAI).
- **Explicabilidad**: Los modelos de IA deben ser capaces de explicar sus decisiones de manera clara y comprensible para los usuarios, lo que ayuda a generar confianza y permite a los usuarios entender las razones detrás de las recomendaciones o acciones del sistema.
- **Responsabilidad**: Se debe establecer claramente quién es responsable de las decisiones tomadas por los sistemas de IA, especialmente en casos donde las decisiones pueden tener un impacto significativo en la vida de las personas. Aqui entran en juego los marcos legales y regulaciones que deben ser desarrollados para garantizar que las empresas y desarrolladores de IA sean responsables de sus creaciones.


---

Hasta aquí la primera parte de esta serie de artículos sobre aprendizaje automático. En la próxima parte, exploraremos algunos paradigmas de machine learning y ciertos fundamentos matemáticos que son esenciales para entender cómo funcionan los algoritmos.