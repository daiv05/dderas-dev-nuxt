---
id: "probability-and-machine-learning"
title: "Probabilidad y Aprendizaje Automático"
slug: "probability-and-machine-learning"
order: 9
date: 2026-05-05
summary: "La probabilidad nos permite modelar la incertidumbre y tomar decisiones informadas. En este artículo, exploraremos cómo se utiliza esta herramienta en el contexto del aprendizaje automático."
tags:
  [
    "aprendizaje automático",
    "probabilidad",
    "análisis de datos",
    "machine learning",
    "data analysis",
  ]
image: /blog/probability-and-machine-learning/shared/probability-machine-learning.webp
author: David Deras
lastmod: 2026-05-12
sitemap:
  priority: 0.7
  loc: /es/blog/probability-and-machine-learning
  lastmod: 2026-05-12
---

Luego de explorar la estadística y su relación con el aprendizaje automático, es hora de adentrarnos en otro concepto fundamental: la probabilidad.

Artículo anterior de esta serie: [Estadística y Aprendizaje Automático](https://deras.dev/es/blog/statistics-and-machine-learning)

::table-of-contents
::

---

## ¿Qué es la probabilidad?

La probabilidad es una medida numérica de la **posibilidad** de que ocurra un **evento**. Se expresa como un número entre 0 y 1, donde 0 indica que el evento es imposible, 0.5 indica que el evento es equiprobable, y 1 indica que el evento es seguro. La probabilidad se utiliza para modelar la incertidumbre y tomar decisiones informadas en situaciones donde no se tiene certeza absoluta.

> Equiprobable: Se refiere a la situación en la que todos los resultados posibles de un experimento tienen la misma probabilidad de ocurrir. Por ejemplo, al lanzar una moneda justa, las posibilidades de obtener cara o cruz son equiprobables, ya que cada resultado tiene una probabilidad de 0.5.

Matemáticamente, la probabilidad de un evento A se denota como `P(A)` y se calcula utilizando la fórmula:

$$
P(A) = \frac{\text{Número de resultados favorables}}{\text{Número total de resultados posibles}}
$$

Hagámos una tabla simple de eventos y sus probabilidades para ilustrar este concepto:
| Evento | Probabilidad | Explicación |
|-------|-------------|-------------|
| Lanzar un dado y obtener un 6 | 1/6 = 0.1667 | Hay 6 resultados posibles (1, 2, 3, 4, 5, 6) y solo uno de ellos es favorable (obtener un 6). |
| Lanzar una moneda y obtener cara | 1/2 = 0.5 | Hay 2 resultados posibles (cara o cruz) y solo uno de ellos es favorable (obtener cara). |
| Lanzar un dado y obtener un número par | 3/6 = 0.5 | Hay 6 resultados posibles (1, 2, 3, 4, 5, 6) y tres de ellos son favorables (2, 4, 6). |

### Espacio muestral

El espacio muestral es el conjunto de todos los resultados posibles de un experimento. Por ejemplo, al lanzar un dado, el espacio muestral es `{1, 2, 3, 4, 5, 6}`. Al lanzar una moneda, el espacio muestral es `{cara, cruz}`.
Se puede clasificar en 2 tipos:

- **Espacio muestral discreto**: Contiene un número finito o contable de resultados. Por ejemplo, al lanzar un dado, el espacio muestral es discreto porque solo hay 6 resultados posibles.
- **Espacio muestral continuo**: Contiene un número infinito de resultados posibles. Por ejemplo, al medir la altura de una persona, el espacio muestral es continuo porque puede tomar cualquier valor dentro de un rango.

¿Y si tenemos más de un experimento? Por ejemplo, al lanzar dos dados, el espacio muestral se compone de todas las combinaciones posibles de los resultados de ambos dados, lo que da lugar a 36 resultados posibles `(1,1), (1,2), ..., (6,6)`.

Para un solo dado, el espacio muestral es:

$$
S = \{1, 2, 3, 4, 5, 6\}
$$

Para dos dados, el espacio muestral es:

$$
S = \{(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (2,1), (2,2), ..., (6,6)\}
$$

#### Eventos

Un evento es simplemente un subconjunto del espacio muestral. Al lanzar un dado, el evento "obtener un número par" es un subconjunto del espacio muestral `{1, 2, 3, 4, 5, 6}` y lo podemos escribir como `A = {2, 4, 6}`. La probabilidad de este evento se calcula como `P(A) = 3/6 = 0.5`.

### Variables aleatorias

Una variable aleatoria es una función que asigna un valor numérico a cada resultado posible de un experimento. Por ejemplo, al lanzar un dado, podemos definir una variable aleatoria `X` que representa el número que obtenemos, en este caso, `X` puede tomar los valores 1, 2, 3, 4, 5 o 6. Pero también podriamos definir una variable aleatoria `Y` que representa si el número es par o impar, donde `Y = 1` si el número es par y `Y = 0` si el número es impar.

Formalmente una variable aleatoria se denota como:

$$
X: S \rightarrow \mathbb{R}
$$

Dónde:

- `S` es el espacio muestral.
- $\mathbb{R}$ es el conjunto de los números reales.

La variable comparte la misma propiedad que el espacio muestral, en cuánto a que puede ser discreta o continua dependiendo del tipo de resultados que pueda tomar.

El espacio muestral describe todos los resultados posibles de un experimento, mientras que una variable aleatoria asigna un valor numérico a cada uno de esos resultados.

Esta traducción de resultados a números es fundamental para el aprendizaje automático, ya que nos permite trabajar con datos de manera cuantitativa y aplicar técnicas estadísticas y algorítmicas para hacer predicciones y tomar decisiones informadas.

### Eventos dependientes

Dos eventos A y B son dependientes si la ocurrencia de uno afecta la probabilidad de ocurrencia del otro. Matemáticamente, esto se expresa como:

$$
P(A \mid B) \neq P(A)
$$

Para calcular la probabilidad de eventos dependientes, se utiliza la fórmula de la probabilidad condicional:

$$
P(A \cap B) = P(A) \cdot P(B \mid A)
$$

> El símbolo $\cap$ representa la intersección de dos eventos, es decir, la ocurrencia simultánea de ambos eventos A y B.
> El símbolo $\mid$ representa la condición de que el evento A ha ocurrido.

### Eventos independientes

Dos eventos A y B son independientes si la ocurrencia de uno `NO` afecta la probabilidad de ocurrencia del otro:

$$
P(A \mid B) = P(A)
$$

Y para verificar si dos eventos son independientes, se puede usar la siguiente fórmula:

$$
P(A \cap B) = P(A) \cdot P(B)
$$

En el contexto del aprendizaje automático, la independencia de eventos es un concepto importante, ya que muchos algoritmos asumen que las características de los datos son independientes entre sí para simplificar el modelo y reducir la complejidad computacional.

### Naive Bayes

En artículos anteriores de esta serie, hemos visto ya su aplicación en problemas de clasificación. Cuando un modelo predice una clase, en realidad está estimando la probabilidad de que esa clase sea la correcta dado los datos de entrada:

$$
P(\text{y} \mid \text{x})
$$

Por ejemplo:

- En un problema de clasificación binaria, el modelo podría predecir que la probabilidad de que una imagen contenga un gato es del 80%, lo que se expresa como `P(gato | imagen) = 0.8`.
- En un problema de clasificación multiclase, el modelo podría predecir que la probabilidad de que una imagen contenga un gato es del 60%, un perro del 30% y un pájaro del 10%, lo que se expresa como `P(gato | imagen) = 0.6`, `P(perro | imagen) = 0.3` y `P(pájaro | imagen) = 0.1`.

Pero también hay otra aplicación bastante importante, y es el de **Naive Bayes**:

**Naive Bayes** es un algoritmo de clasificación basado en el **Teorema de Bayes** y en una suposición "ingenua" (naive):

**_Asume que las variables predictoras son independientes entre sí dado la clase_**

Parte del Teorema de Bayes:

$$
P(C \mid X) = \frac{P(X \mid C) \cdot P(C)}{P(X)}
$$

Donde:

- $C$: clase (ej. spam / no spam)
- $X$: conjunto de características
- $P(C)$: probabilidad previa (prior), es la probabilidad de la clase antes de observar las características, prior porque representa lo que sabemos antes de ver los datos. Por ejemplo, si el 40% de los correos son spam, entonces $P(Spam) = 0.4$ y $P(NoSpam) = 0.6$.
- $P(X \mid C)$: verosimilitud (likelihood), es decir, la probabilidad de observar las características dado la clase. Por ejemplo, la probabilidad de que un correo contenga la palabra "oferta" dado que es spam podría ser $P(oferta \mid Spam) = 0.7$.
- $P(C \mid X)$: probabilidad posterior, es decir, la probabilidad actualizada de la clase después de observar las características. Por ejemplo, la probabilidad de que un correo sea spam dado que contiene la palabra "oferta" podría ser $P(Spam \mid oferta)$.
- $P(X)$: probabilidad total de observar la evidencia (normalización). Su función es normalizar el resultado para que la probabilidad final sea un valor entre 0 y 1. Se calcula sumando las probabilidades de observar las características para todas las clases posibles:
  $$
  P(X) = P(X \mid Spam) \cdot P(Spam) + P(X \mid NoSpam) \cdot P(NoSpam)
  $$

La parte "naive" consiste en asumir que:

$$
P(X \mid C) = P(x_1 \mid C) \cdot P(x_2 \mid C) \cdot \ldots \cdot P(x_n \mid C)
$$

Es decir, cada variable contribuye de manera independiente a la probabilidad final.

El modelo predice la clase con mayor probabilidad posterior:

$$
\hat{C} = \arg \cdot \max_C \cdot P(C) \prod_{i=1}^{n} P(x_i \mid C)
$$

Imaginemos que buscamos clasificar un correo como spam, tendríamos características como:

- Contiene la palabra "oferta"
- Contiene muchos signos de exclamación
- Tiene enlaces externos

Naive Bayes calcula:

$$
P(\text{Spam} \mid \text{caracteristicas})
$$

Multiplicando las probabilidades individuales de cada característica dado que es spam.

Existen variantes según el tipo de datos:

1. **Gaussian Naive Bayes**: Se usa cuando las variables son continuas y se asume distribución normal, como en el caso de: edades, -

2. **Multinomial Naive Bayes**: Muy usado en **procesamiento de texto**, se basa en conteos de frecuencia de palabras.

3. **Bernoulli Naive Bayes**: Trabaja con variables binarias (presencia o ausencia). Ideal para tareas de clasificación de texto donde solo importa si una palabra está presente o no.

Posee varias ventajas y desventajas que lo hacen adecuado para ciertos tipos de problemas y no para otros.

Entre sus ventajas está su simplicidad, que es muy rápido y puede funcionar bien con pocos datos, especialmente en tareas de procesamiento de lenguaje natural (NLP) como clasificación de texto o detección de spam.

En cambio, sus desventajas incluyen la suposición fuerte de independencia entre características (en la realidad las variables suelen estar correlacionadas), el problema de probabilidad cero (cuando una característica no aparece en el entrenamiento para una clase, aunque puede arreglarse con Laplace smoothing) y la incapacidad para capturar relaciones complejas entre variables.

> ¿Por qué funciona si la independencia es irreal? Porque en clasificación, muchas veces **no necesitamos que las probabilidades sean perfectas**, solo necesitamos que la clase correcta tenga la probabilidad más alta. Naive Bayes suele acertar en la comparación relativa, aunque el valor exacto no sea completamente preciso.

#### Ejercicio práctico

Haremos un ejercicio con un dataset de correos electrónicos para clasificar si son spam o no spam usando Naive Bayes. Para esto, usaremos el dataset "SMS Spam Collection" que contiene mensajes de texto etiquetados como "ham" (no spam) o "spam".

> Puedes ver el código y seguir el ejercicio en esta <a rel="noopener noreferrer" href="https://colab.research.google.com/drive/1cPc735Pqffpx2NwGM8wkMPr36arkIari?usp=sharing" target="_blank">notebook de Google Colab</a>.

Dataset: https://archive.ics.uci.edu/ml/datasets/SMS+Spam+Collection

<!-- ANALISIS Y EXPLORACION -->


## Árboles de probabilidad

Los árboles de probabilidad son una herramienta visual que se utiliza para representar y calcular probabilidades de eventos compuestos. Se construyen a partir de un nodo raíz que representa el evento inicial, y a partir de ahí se ramifican en nodos hijos que representan eventos posteriores o condiciones adicionales. Cada rama del árbol representa una posible secuencia de eventos, y se asigna una probabilidad a cada rama.

### Como se contruyen

Veámos cómo construir un árbol de probabilidad paso a paso, usando como ejemplo el lanzamiento de una moneda dos veces:

1. El primer paso es identificar el evento inicial: Se dibuja el nodo raíz y sus posibles resultados. Por ejemplo, al lanzar una moneda, el nodo raíz representaría el lanzamiento y las ramas representarían los resultados posibles (cara o cruz).

<MermaidDiagram content="graph TD
      A[Lanzar una moneda] --> | 0.5 | B(Cara)
      A --> | 0.5 | C(Cruz)" />
---

2. Agregamos el segundo evento condicionado al primer evento: Si queremos lanzar la moneda dos veces, agregamos un segundo nivel al árbol. Cada rama del primer nivel se ramifica en dos nuevas ramas que representan los resultados del segundo lanzamiento.

<MermaidDiagram content="graph TD
      A[Lanzar una moneda] --> | 0.5 | B(Cara)
      A --> | 0.5 | C(Cruz)
      B --> | 0.5 | D(Cara)
      B --> | 0.5 | E(Cruz)
      C --> | 0.5 | F(Cara)
      C --> | 0.5 | G(Cruz)" />
---

### Operaciones

Pero, ¿cómo se calculan las probabilidades de eventos compuestos usando el árbol? Aquí es donde entran en juego las reglas de probabilidad:
- **Regla del producto (intersección)**: Para obtener la probabilidad de una secuencia especifica de eventos, se multiplican las probabilidades a lo largo de la rama correspondiente. Por ejemplo, la probabilidad de obtener cara en el primer lanzamiento y cruz en el segundo lanzamiento se calcula como `P(Cara, Cruz) = P(Cara) * P(Cruz | Cara) = 0.5 * 0.5 = 0.25`.
- **Regla de la suma (unión)**: Si un evento puede ocurrir de varias maneras, se suman las probabilidades de cada rama que conduce a ese evento. Por ejemplo, la probabilidad de obtener exactamente una cara en dos lanzamientos se calcula sumando las probabilidades de las ramas que representan esa situación: `P(1 Cara) = P(Cara, Cruz) + P(Cruz, Cara) = 0.25 + 0.25 = 0.5`.

## Ejemplo de aplicación

Hagámos un ejemplos mas interesante, supongamos que tenemos un test para detectar una enfermedad que es 99% preciso (es decir, tiene una tasa de falsos positivos del 1% y una tasa de falsos negativos del 1%). La prevalencia de la enfermedad en la población es del 0.1%. Queremos calcular la probabilidad de que una persona tenga la enfermedad dado que el test ha dado positivo.
Para resolver este problema, podemos construir un árbol de probabilidad:

<MermaidDiagram content="graph TD
      A[Estado de la persona] --> |0.001| B(Enfermo)
      A --> |0.999| C(No enfermo)
      B --> |0.99| D(Test positivo)
      B --> |0.01| E(Test negativo)
      C --> |0.01| F(Test positivo)
      C --> |0.99| G(Test negativo)" />
---

En este árbol, el nodo raíz representa el estado de la persona, y las ramas representan las probabilidades de cada resultado dado la condición de estar enfermo o no estar enfermo. Para calcular la probabilidad de que una persona tenga la enfermedad dado que el test ha dado positivo, utilizamos la regla del producto y la regla de la suma:

$$
P(Enfermo \mid Test \, positivo) = \frac{P(Test \, positivo \mid Enfermo) \cdot P(Enfermo)}{P(Test \, positivo)}
$$

Donde:
- $P(Test \, positivo \mid Enfermo) = 0.99$ (tasa de verdaderos positivos)
- $P(Enfermo) = 0.001$ (prevalencia de la enfermedad)
- $P(Test \, positivo) = P(Test \, positivo \mid Enfermo) \cdot P(Enfermo) + P(Test \, positivo \mid No \, enfermo) \cdot P(No \, enfermo)$

$$
P(Test \, positivo) = 0.99 \cdot 0.001 + 0.01 \cdot 0.999 = 0.01098
$$

Entonces:

$$
P(Enfermo \mid Test \, positivo) = \frac{0.99 \cdot 0.001}{0.01098} \approx 0.09016
$$

Esto significa que, a pesar de que el test es muy preciso, la probabilidad de que una persona tenga la enfermedad dado que el test ha dado positivo es solo del 9.016%. Esto se debe a la baja prevalencia de la enfermedad en la población, lo que hace que los falsos positivos tengan un impacto significativo en la probabilidad final.

Si lo vemos con números, de cada 100,000 personas, 100 tendrán la enfermedad (0.1% de prevalencia). De esos 100, 99 darán positivo (tasa de verdaderos positivos del 99%), pero de las 99,900 personas que no tienen la enfermedad, 999 darán positivo (tasa de falsos positivos del 1%). Por lo tanto, hay un total de 1,098 personas que dan positivo, pero solo 99 de ellas realmente tienen la enfermedad, lo que resulta en una probabilidad de aproximadamente el 9.016% de que una persona tenga la enfermedad dado un resultado positivo en el test, ¿mucho más inuitivo, no? :)

---


## Naive Bayes en práctica

En el notebook <a rel="noopener noreferrer" href="https://colab.research.google.com/drive/1cPc735Pqffpx2NwGM8wkMPr36arkIari?usp=sharing" target="_blank">Naive Bayes y el Dataset de Spam</a> analizamos cada una de las variantes mencionadas anteriormente, explicaremos de manera resumen cada una de ellas aquí.

### GaussianNB

El dataset Iris se adapta perfectamente a GaussianNB: cuatro mediciones continuas de flores con distribuciones aproximadamente gaussianas por clase. Primero, analizamos las distribuciones condicionales a la clase:

```python
for cls in range(3):
    sns.kdeplot(X_train[y_train == cls, feat_idx],
                label=iris.target_names[cls], ax=ax, fill=True, alpha=0.3)
```

Los gráficos KDE confirman una forma de campana para cada especie, exactamente lo que GaussianNB presupone. Tras el ajuste a la longitud y el ancho de los pétalos, los límites de decisión son **curvos** (cuadráticos), no rectos. Esto sucede porque GaussianNB asigna a cada clase su propia gaussiana con media y varianza independientes:

$$
P(x_i \mid C) = \frac{1}{\sqrt{2\pi\sigma_{C,i}^2}} \exp\!\left(-\frac{(x_i - \mu_{C,i})^2}{2\sigma_{C,i}^2}\right)
$$

![Límites de decisión de GaussianNB en características de pétalos de iris](/blog/probability-and-machine-learning/shared/nb_gaussian_boundary.webp)
_Límites de decisión de GaussianNB - Iris (longitud del pétalo vs. anchura del pétalo)_

El gráfico de probabilidad posterior para una sola muestra de prueba nos dice con qué confianza el modelo asigna probabilidades. Aunque se incumple el supuesto de independencia (la longitud y el ancho del pétalo tienen una correlación de aproximadamente 0,96), GaussianNB alcanza una precisión de validación 5-fold CV Accuracy de aproximadamente el 96 %.

```
GaussianNB 5-fold CV Accuracy: 0.953 +/- 0.027
Individual fold scores: [0.933 0.967 0.933 0.933 1.   ]
```

### MultinomialNB

Para la clasificación de texto, las características son recuentos de palabras: números enteros no negativos que se ajustan a la verosimilitud multinomial:

$$
P(x_i \mid C) = \frac{N_{C,i} + \alpha}{N_C + \alpha \cdot |V|}
$$

El parámetro de suavizado de Laplace (**Laplace smoothing**) $\alpha$ evita el problema de la frecuencia cero: si una palabra nunca aparece en los datos de entrenamiento de la clase $C$, de lo contrario, anularía toda la distribución posterior. El notebook demuestra esto en el conjunto de datos de 20 grupos de noticias (4 categorías: béisbol, espacio, política/armas, gráficos por computadora):

```python
vec = CountVectorizer(stop_words='english', max_features=10_000)
X_train_counts = vec.fit_transform(news_train.data)

mnb = MultinomialNB(alpha=1.0)
mnb.fit(X_train_counts, news_train.target)
```

Al analizar `feature_log_prob_` se revelan las palabras más informativas de cada categoría. Las palabras principales para `sci.space` incluyen términos específicos del dominio como "nasa", "órbita" y "transbordador": el modelo aprende señales lingüísticas reales, no ruido.

![Palabras más informativas por categoría](/blog/probability-and-machine-learning/shared/nb_multinomial_top_words.webp)
_Palabras más informativas por categoría - MultinomialNB en 20 grupos de noticias_

Un barrido alfa muestra cómo la intensidad del suavizado afecta la precisión: un suavizado insuficiente (alfa cercano a 0) provoca sobreajuste en palabras poco frecuentes; un suavizado excesivo diluye la señal. El valor óptimo suele estar entre 0,1 y 1,0.

![Efecto del Laplace smoothing en la precisión de la validación cruzada](/blog/probability-and-machine-learning/shared/nb_multinomial_alpha.webp)
_Barrido de parámetros de Laplace smoothing: precisión de la validación cruzada de 5 pliegues_

### BernoulliNB

BernoulliNB trata cada característica como un indicador binario: ¿estaba presente (1) o ausente (0) esta palabra?

$$
P(x_i \mid C) = P(i \mid C)^{x_i} \cdot \bigl(1 - P(i \mid C)\bigr)^{1 - x_i}
$$

La diferencia más importante con respecto a MultinomialNB es en el término $(1 - P(i \mid C))^{1-x_i}$, que **penaliza la ausencia** de una palabra. Si "gol" está fuertemente asociado con la clase de deportes, pero no aparece en un documento, BernoulliNB lo considera evidencia en contra de la clase de deportes. En el caso de MultinomialNB simplemente ignora las palabras ausentes.

El notebook ilustra esto con un vocabulario sencillo de cinco palabras: un documento que contiene solo "juego" (ambiguo) se clasifica de manera diferente según si las palabras de la clase de deportes están presentes o no.

| Model | Behavior for absent features | Best for |
|-------|------------------------------|---------|
| MultinomialNB | Ignores absent features | Long documents, articles |
| BernoulliNB | Penalizes absent features | Short texts, tweets, profiles |

En el subconjunto de 4 categorías de 20 grupos de noticias:

| Model | Test Accuracy | CV Accuracy (5-fold) |
|-------|--------------|---------------------|
| MultinomialNB | ~0.93 | ~0.92 |
| BernoulliNB | ~0.88 | ~0.88 |

El método MultinomialNB resulta ventajoso en documentos más largos (las publicaciones en grupos de noticias tienen un promedio de cientos de palabras), pero el método BernoulliNB puede superarlo en textos muy cortos donde la frecuencia no aporta información relevante.

### Comparación de los tres

| Propiedad | GaussianNB | MultinomialNB | BernoulliNB | ComplementNB |
|----------|-----------|--------------|------------|-------------|
| Tipo de característica | Continua | Recuentos no negativos | Binaria (0/1) | Recuentos no negativos |
| Probabilidad | PDF Gaussiana | Multinomial | Bernoulli | Multinomial Complementario |
| ¿Penaliza la ausencia? | N/A | No | **Sí** | No |
| Ideal para | Biología, sensores | Texto largo | Texto corto, perfiles | Texto desequilibrado |

> La suposición de independencia que vimos en la sección [Eventos independientes](#eventos-independientes) es lo que hace que NB sea "ingenuo" y precisamente por eso sigue funcionando: en la clasificación, solo necesitamos que la clase correcta ocupe el puesto más alto, no que las probabilidades sean exactas.

### SMS Spam Classifier

En el notebook finalizamos con el [SMS Spam Collection](https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset), que contiene 5572 mensajes etiquetados como legítimos o spam. El proceso de preprocesamiento reproduce los pasos teóricos:

```python
# 1. Clean - letters only, lowercase
text = re.sub('[^a-zA-Z]', ' ', text).lower().split()
# 2. Remove stopwords
text = [w for w in text if w not in stop_words]
# 3. Lemmatize
text = [lemmatizer.lemmatize(w, pos='v') for w in text]
# 4. TF-IDF vectorization
X = TfidfVectorizer(max_features=3000).fit_transform(corpus)
```

Se comparan cuatro clasificadores utilizando las mismas características:

![Distribución de clases de spam en SMS](/blog/probability-and-machine-learning/shared/nb_spam_distribution.webp)
_SMS dataset: muy desequilibrado hacia los mensajes legítimos (aproximadamente 87 % legítimos, aproximadamente 13 % spam)._

| Model | Precision | Recall | F1 | CV Accuracy (10x) |
|-------|-----------|--------|----|-------------------|
| MultinomialNB | $\approx$ 0.97 | $\approx$ 0.94 | $\approx$ 0.95 | $\approx$ 0.97 |
| RandomForest | $\approx$ 0.98 | $\approx$ 0.94 | $\approx$ 0.96 | $\approx$ 0.97 |
| KNeighbors | $\approx$ 0.92 | $\approx$ 0.79 | $\approx$ 0.85 | $\approx$ 0.91 |
| SVC | $\approx$ 0.98 | $\approx$ 0.96 | $\approx$ 0.97 | $\approx$ 0.97 |

MultinomialNB ofrece un rendimiento competitivo frente a Random Forest y SVC, requiriendo solo una fracción del tiempo de entrenamiento. Sus parámetros `feature_log_prob_` son directamente interpretables, lo que permite analizar qué palabras contribuyeron en mayor medida a la predicción de spam.

![Matrices de confusión para los cuatro clasificadores](/blog/probability-and-machine-learning/shared/nb_spam_confusion_matrices.webp)
_Matrices de confusión: Random Forest logra el mejor equilibrio general y no produce falsos positivos, mientras que MultinomialNB y SVC siguen siendo altamente competitivos. KNN tiene un rendimiento sustancialmente peor debido a su baja precisión en la clase minoritaria._

Naive Bayes es el punto de partida ideal antes de recurrir a modelos más complejos. Es rápido, interpretable y sorprendentemente competitivo en tareas de clasificación de texto, precisamente la aplicación donde la suposición de independencia "ingenua" tiende a ser menos perjudicial.

---

En el próximo artículo, exploraremos las pruebas estadísticas y su papel en el aprendizaje automático.