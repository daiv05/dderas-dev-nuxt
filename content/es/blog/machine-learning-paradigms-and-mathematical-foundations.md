---
id: 'machine-learning-paradigms-and-mathematical-foundations'
title: 'Paradigmas de aprendizaje automático y fundamentos matemáticos'
slug: 'machine-learning-paradigms-and-mathematical-foundations'
order: 3
date: 2026-04-06
summary: 'Tipos de aprendizaje automático, algoritmos comunes y fundamentos matemáticos esenciales para entender cómo funcionan los modelos de machine learning.'
tags: ['Machine Learning', 'Inteligencia Artificial', 'Matemáticas para Machine Learning']
image: /blog/machine-learning-paradigms-and-mathematical-foundations/shared/ml-paradigms.webp
author: David Deras
lastmod: 2026-04-06
sitemap:
  priority: 0.7
  loc: /es/blog/machine-learning-paradigms-and-mathematical-foundations
  lastmod: 2026-04-06
---

Continuamos aprendiendo sobre Machine Learning, en esta ocasión nos adentraremos en los diferentes paradigmas de aprendizaje automático y los fundamentos matemáticos que sustentan estos modelos.

Artículo anterior: [Fundamentos de Aprendizaje Automático](https://deras.dev/es/blog/machine-learning-fundamentals)

::table-of-contents
::

---

## Paradigmas de Aprendizaje Automático

El machine learning NO comienza con algoritmos. EL proceso comienza con una comprension profunda del problema antes de seleccionar cualquier técnica o modelo, además de tres criterios fundamentales para determinar que enfoque  y técnicas podemos usar:
- **Naturaleza de los datos**: Analizar el tipo de datos disponibles (etiquetados o no etiquetados) y su estructura.
- **Tipo de salida esperada**: ¿Qué tipo de resultado esperamos obtener? ¿Una
categoría, un número continuo, o una estructura oculta?
- **Interacción con el entorno**: ¿El modelo necesita aprender a través de la interacción con un entorno dinámico?

### Aprendizaje Supervisado

El aprendizaje supervisado requiere un conjunto de datos donde cada ejemplo de entrada X está asociado con una etiqueta o salida Y. El objetivo del modelo es aprender una función que mapee las entradas a las salidas correctas.

En función de esto, el conjunto de datos de entrenamiento se representa como un conjunto de pares $$\{(x_1, y_1), (x_2, y_2), ..., (x_n, y_n)\}$$, donde $$x_i$$ es la entrada y $$y_i$$ es la etiqueta correspondiente. El modelo de aprendizaje supervisado intenta encontrar una función f que pueda predecir la salida Y a partir de la entrada X:

$$
f: X \rightarrow Y
$$

Dependiendo del tipo de salida, el aprendizaje supervisado se puede dividir en:

- **Clasificación**: Cuando la salida Y es una categoría discreta (es decir, un valor categórico). Por ejemplo, clasificar si una imagen contiene un gato o un perro, si un número es par o impar, o si un correo electrónico es spam o no spam.
- **Regresión**: Cuando la salida Y es un valor continuo (es decir, un número real). Por ejemplo, hacer una predicción de las ventas futuras basándose en datos históricos, predecir el precio de una casa basándose en sus características, o estimar la temperatura de una ciudad en función de factores climáticos.

Una regla que nos puede servir para detectar si un problema es de clasificación o regresión es, si la respuesta es "¿Cuánto?" entonces es un problema de regresión, pero si la respuesta es "¿Cuál?" entonces es un problema de clasificación.

> Objetivo: Aprender una función que mapee las entradas a las salidas correctas, minimizando el error entre las predicciones del modelo.

---

### Aprendizaje No Supervisado

En el aprendizaje no supervisado, el modelo recibe solo las entradas X sin etiquetas asociadas: $$\{x_1, x_2, ..., x_n\}$$. Lo que se busca es encontrar patrones o estructuras subyacentes en los datos.
Algunos ejemplos de técnicas de aprendizaje no supervisado incluyen:

- **Clustering**: Agrupar datos similares en clusters. Por ejemplo, segmentar clientes en grupos basados en sus comportamientos de compra.

- **Reducción de Dimensionalidad**: Reducir el número de variables en un conjunto de datos mientras se conserva la mayor cantidad de información posible. Por ejemplo, usar PCA (Análisis de Componentes Principales) para visualizar datos en 2D o 3D.

> Objetivo: Encontrar patrones o estructuras subyacentes en los datos sin etiquetas, como agrupamientos o representaciones más compactas.

---

### Aprendizaje por Refuerzo

El aprendizaje por refuerzo se basa en la idea de que un agente aprende a tomar decisiones mediante la interacción con un entorno. El agente recibe recompensas o castigos en función de las acciones que toma, y su objetivo es maximizar la recompensa acumulada a lo largo del tiempo.
En este paradigma, el agente aprende una política de acción que le permite tomar decisiones óptimas en función del estado actual del entorno. Un ejemplo clásico de aprendizaje por refuerzo es el juego de ajedrez, donde el agente aprende a jugar mejor a medida que juega más partidas y recibe retroalimentación sobre sus movimientos.

1. **Agente**: El sistema que toma decisiones.
2. **Entorno**: El mundo con el que el agente interactúa.
3. **Recompensa**: La retroalimentación que el agente recibe después de tomar una acción.
4. **Política**: La estrategia que el agente sigue para tomar decisiones.

Sus aplicaciones incluyen juegos, robótica y sistemas de recomendación.

> Objetivo: Aprender a tomar decisiones óptimas mediante la interacción con un entorno, maximizando la recompensa acumulada a lo largo del tiempo.

---

## Fundamentos Matemáticos

Es importante entender que el aprendizaje automático se basa en conceptos de álgebra lineal, cálculo, probabilidad y estadística. Estos fundamentos son esenciales para comprender cómo **funcionan** los modelos y cómo se **optimizan**.

### Regresión

> Utilizado en el **aprendizaje supervisado**.

¿Qué es un problema de regresión? Es un tipo de problema donde el objetivo es predecir un valor continuo encontrando la mejor línea (o plano) que se ajuste a los datos. Ya hablamos de ejemplos de aplicación como el cálculo de precios, ventas, etc.

La forma mas simple de regresión es la regresión lineal, que se puede expresar matemáticamente como:
$$
y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p + \epsilon
$$

Donde:
- $$y$$ es la variable dependiente (lo que queremos predecir).
- $$x_1, x_2, ..., x_p$$ son las variables independientes (las características).
- $$\beta_0$$ es la intersección (el valor de $$y$$ cuando todas las $$x$$ son 0).
- $$\beta_1, \beta_2, ..., \beta_p$$ son los coeficientes que representan la influencia de cada característica en la variable dependiente.
- $$\epsilon$$ es el valor de error o ruido, que representa la variabilidad no explicada por el modelo, es decir, lo que afecta a $$y$$ pero no está incluido en las variables independientes.

El objetivo del modelo de regresión es encontrar los valores de los coeficientes $$\beta$$ que minimicen la diferencia entre las predicciones del modelo y los valores reales de $$y$$. Esto se puede lograr utilizando técnicas como el método de mínimos cuadrados.

El **intercepto** se representa como el primer elemento del vector de coeficientes $$\boldsymbol{\beta}$$, y es el valor de $$\mathbf{y}$$ cuando todas las variables independientes en $$\mathbf{X}$$ son cero, es decir, representa el punto de la línea de regresión donde cruza el eje Y.

La **pendiente** se representa por los coeficientes restantes en el vector $$\boldsymbol{\beta}$$, y cada coeficiente indica la cantidad de cambio en la variable dependiente $$\mathbf{y}$$ por cada unidad de cambio en la variable independiente correspondiente en $$\mathbf{X}$$, manteniendo constantes las demás variables independientes.
Gráficamente podemos verlo de la siguiente manera:

![Gráfico de regresión lineal](/blog/machine-learning-paradigms-and-mathematical-foundations/shared/regression-model.webp)
_Gráfico de Regresión Lineal_

Cada punto negro representa un dato de entrenamiento, y la línea roja el modelo.

Lo importante aquí es entender que **el objetivo principal** es encontrar los valores de los coeficientes $$\boldsymbol{\beta}$$ que hagan que las predicciones $$\mathbf{y}$$ (la línea roja) sean lo más cercanas a los valores reales.

Es decir, no se busca predecir con exactitud, siempre (en la realidad) habrá un error o diferencia entre lo que el modelo predice y lo que realmente ocurre. EL término $$\boldsymbol{\epsilon}$$ es la diferencia entre los valores predichos por el modelo y los valores reales:

$$
\boldsymbol{\epsilon _i} = \mathbf{y_i} - \hat{\mathbf{y_i}}
$$

Que también se puede expresar como:

$$
\boldsymbol{\epsilon _i} = \mathbf{y_i} - (\boldsymbol{\beta_0} + \beta_1 x_{i})
$$

Para medir el error podemos utilizar una función de pérdida. En el caso de la regresión lineal, una función de pérdida comúnmente utilizada es el error cuadrático medio (MSE, por sus siglas en inglés), que se define como:

$$
MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y_i})^2
$$

Donde:
- $$n$$ es el número de ejemplos en el conjunto de datos.
- $$y_i$$ es el valor real de la variable dependiente para el ejemplo $$i$$.
- $$\hat{y}_i$$ es la predicción del modelo para el ejemplo $$i$$.

Minimizar el MSE es equivalente a minimizar la suma de errores cuadrados:

$$
\sum_{i=1}^{n} (y_i - \hat{y_i})^2
$$

O también:
$$
\sum_{i=1}^{n} (y_i - (\beta_0 + \beta_1 x_i))^2
$$

A esto se le conoce como el **método de mínimos cuadrados**, y es una técnica comúnmente utilizada para encontrar los coeficientes $$\boldsymbol{\beta}$$ que mejor se ajusten a los datos.

> ¿Por qué se usan cuadrados? Porque al elevar al cuadrado las diferencias, se penalizan más los errores grandes, lo que ayuda a encontrar una mejor línea de ajuste para los datos.

Veamos ahora como obtenemos esos coeficientes $$\boldsymbol{\beta}$$ utilizando el método de mínimos cuadrados. Para encontrar los valores de $$\beta_0$$ y $$\beta_1$$, podemos usar las siguientes fórmulas, que se obtienen al derivar la función de pérdida MSE con respecto a los coeficientes y establecer las derivadas iguales a cero:

$$
\beta_1 = \frac{n \sum (x_i y_i) - \sum x_i \sum y_i}{n \sum (x_i^2) - (\sum x_i)^2}
$$

$$
\beta_0 = \bar{y} - \beta_1 \bar{x}
$$

Donde:
- $$n$$ es el número de ejemplos en el conjunto de datos.
- $$x_i$$ y $$y_i$$ son los valores de las variables independientes y dependientes para cada ejemplo.
- $$\bar{x}$$ y $$\bar{y}$$ son las medias (o promedios) de las variables independientes y dependientes, respectivamente.

Hagámos un ejemplo para entender como aplicarlo. Supongamos que tenemos un conjunto de datos con las siguientes características:

| Tamaño (m²) | Precio (USD) |
|-------------|--------------|
| 50          | 100,000      |
| 100         | 200,000      |
| 150         | 300,000      |

Queremos construir un modelo de regresión lineal para **predecir el precio** de una casa basándonos en su tamaño. En este caso, la variable independiente es el tamaño (X) y la variable dependiente es el precio (Y). El modelo de regresión lineal se puede expresar como:

$$
y = \beta_0 + \beta_1 x + \epsilon
$$

Donde:
- $$y$$ es el precio de la casa.
- $$x$$ es el tamaño de la casa.
- $$\beta_0$$ es el intercepto.
- $$\beta_1$$ es la pendiente.
- $$\epsilon$$ es el error o ruido, que para este ejemplo asumiremos que es cero para simplificar.

Para encontrar los valores de $$\beta_0$$ y $$\beta_1$$, podemos usar el método de mínimos cuadrados con la fórmula que mencionamos anteriormente:
$$
\beta_1 = \frac{n \sum (x_i y_i) - \sum x_i \sum y_i}{n \sum (x_i^2) - (\sum x_i)^2}
$$
$$
\beta_0 = \bar{y} - \beta_1 \bar{x}
$$
Donde:
- $$n$$ es el número de ejemplos (en este caso, 3).
- $$x_i$$ y $$y_i$$ son los valores de tamaño y precio para cada ejemplo.
- $$\bar{x}$$ y $$\bar{y}$$ son las medias de las variables independientes y dependientes, respectivamente.

Tenemos entonces para este caso:
$$
\beta_1 = \frac{3(50*100000 + 100*200000 + 150*300000) - (50 + 100 + 150)(100000 + 200000 + 300000)}{3(50^2 + 100^2 + 150^2) - (50 + 100 + 150)^2}
$$
$$
\beta_0 = \frac{100000 + 200000 + 300000}{3} - \beta_1 \frac{50 + 100 + 150}{3}
$$

Resolviendo estas fórmulas, obtenemos los valores de $$\beta_0 = 0$$ y $$\beta_1 = 2000$$, que nos permiten construir el siguiente modelo:
$$
\hat{y} = 0 + 2000x
$$
$$
\hat{y} = 2000x
$$

Ahora podemos hacer predicciones para nuevos valores de tamaño. Por ejemplo, para una casa de 120 m², el modelo predice un precio de:
$$
\hat{y} = 2000 * 120 = 240,000
$$

Los cálculos nos han dado los mejores coeficientes que **minimizan** el error cuadrático medio (pero no que lo eliminan completamente). Para medir el error de nuestro modelo, podemos calcular el MSE utilizando la fórmula que mencionamos antes:

$$
MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y_i})^2
$$

Donde:
- $$n$$ es el número de ejemplos (en este caso, 3).
- $$y_i$$ son los valores reales de precio para cada ejemplo.
- $$\hat{y}_i$$ son las predicciones del modelo para cada ejemplo, que se calculan usando el modelo de regresión lineal.

1. Calculamos las predicciones para cada ejemplo:

- Para 50 m²: $$\hat{y_1} = 2000 * 50 = 100,000$$
- Para 100 m²: $$\hat{y_2} = 2000 * 100 = 200,000$$
- Para 150 m²: $$\hat{y_3} = 2000 * 150 = 300,000$$

2. Calculamos los errores para cada ejemplo:

$$
e_i = y_i - \hat{y_i}
$$

- Error para 50 m²: $$e_1 = 100000 - 100000 = 0$$
- Error para 100 m²: $$e_2 = 200000 - 200000 = 0$$
- Error para 150 m²: $$e_3 = 300000 - 300000 = 0$$

3. Elevamos al cuadrado y promediamos para obtener el MSE:

$$
MSE = \frac{1}{3} (0^2 + 0^2 + 0^2) = 0
$$

Para este caso un MSE de 0 nos indica que el modelo predice perfectamente los valores reales para **este conjunto de datos de entrenamiento**. Por supuesto que en la práctica los datos reales contendrán ruido y serán aún mayores, con mas variabilidad, por lo que el epsilon $$\epsilon$$ no será cero.

Para explorar más con la regresión puedes usar este Colab de Google que contiene un ejemplo completo de regresión lineal con Python: <a href="https://colab.research.google.com/drive/1yi8-fVw2Ak7pqYOzZsiT7NO_zccZrQir?usp=sharing" target="_blank" rel="noopener noreferrer">linear_regression</a>

---

### Clasificación

> Utilizado en el **aprendizaje supervisado**.

Un problema de clasificacion busca predecir una variable de salida categórica a partir de un conjunto de variables independientes. Por ejemplo, predecir si un correo electrónico es spam o no spam basándose en su contenido, o saber si en la foto hay un gato o un perro.

Existen tres tipos principales de clasificación:
- **Clasificación Binaria**: Cuando hay dos clases posibles. Por ejemplo, clasificar si un paciente tiene una enfermedad (sí/no).
- **Clasificación Multiclase**: Cuando hay más de dos clases posibles. Por ejemplo, clasificar el tipo de flor (puede ser setosa, versicolor o virginica) basándose en sus características.
- **Clasificación Multietiqueta**: Cuando cada ejemplo puede pertenecer a múltiples clases, como clasificar las etiquetas de un artículo de noticias (política, economía, deportes) donde un artículo puede pertenecer a varias categorías.

> La diferencia entre clasificación multiclase y multietiqueta es que en la primera cada ejemplo solo puede pertenecer a una clase, mientras que en la segunda un ejemplo puede pertenecer a múltiples clases simultáneamente.

Veámos un poco más sobre la clasificación binaria. En este caso, el objetivo es encontrar una función que mapee las entradas a una de las dos clases posibles.

La pregunta que el modelo de clasificación binaria intenta responder es: **¿Cuál es la probabilidad de que un ejemplo pertenezca a la clase 1 dado un conjunto de características?** Esto se puede expresar matemáticamente como:
$$ P(y=1|x) = f(x) $$
Donde:
- $$P(y=1|x)$$ es la probabilidad de que la clase sea 1 dado el vector de características x.
- $$f(x)$$ es la función que mapea las características a la probabilidad.

El modelo más común para clasificación binaria es la **regresión logística**, que tiene el siguiente proceso:

1. Calculamos una **combinación lineal** de las características:

$$
z = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p
$$

2. Aplicamos la **función sigmoide** para obtener una probabilidad:

$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

3. Probabilidad de clase:
$$
P(y=1|x) = \sigma(z) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p)}}
$$

Donde:
- $$\beta_0$$ es el intercepto.
- $$\beta_1, \beta_2, ..., \beta_p$$ son los coeficientes que representan la influencia de cada característica en la variable dependiente.
- $$x_1, x_2, ..., x_p$$ son las características o variables independientes.
- $$P(y=1|x)$$ es la probabilidad de que la clase sea 1 dado el vector de características x.

Cada característica aporta evidencia a favor o en contra, imagina si la palabra "gratis" aparece en un correo electrónico, eso podría aumentar la probabilidad de que sea spam. Por otro lado, si la palabra "reunión" aparece, eso podría disminuir la probabilidad de que sea spam.

> Esto nos proporciona no solo una clasificación, sino también una medida de confianza en esa clasificación a través de la probabilidad calculada por la función sigmoide.

La función sigmoide transforma cualquier valor real en un valor entre 0 y 1. La fórmula como se muestra arriba es:
$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$
Donde:
- $$z$$ es la combinación lineal de las características, es decir, $$z = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p$$.
- $$e$$ es el número de Euler, aproximadamente igual a 2.71828.
- $$\sigma(z)$$ es la salida de la función sigmoide, que representa la probabilidad de que la clase sea 1 dado el valor de z (rango entre 0 y 1).

Visualmente es algo así (con z en el eje X y $$\sigma(z)$$ en el eje Y):
![Gráfico de la función sigmoide](/blog/machine-learning-paradigms-and-mathematical-foundations/shared/sigmoid-function.webp)
_Gráfico de la Función Sigmoide_

De aqui podemos sacar algunas conclusiones importantes:
- Cuando z es muy negativo, $$\sigma(z)$$ se acerca a 0, lo que indica una baja probabilidad de que la clase sea 1.
- Cuando z es muy positivo, $$\sigma(z)$$ se acerca a 1, lo que indica una alta probabilidad de que la clase sea 1.
- Cuando z es 0, $$\sigma(z)$$ es 0.5, lo que indica una probabilidad igual de que la clase sea 0 o 1.

EL valor de 0.5 **comunmente se utiliza como umbral**, de manera que:
- Si $$\sigma(z) \geq 0.5$$, se clasifica como clase 1.
- Si $$\sigma(z) < 0.5$$, se clasifica como clase 0.

> Propiedades clave: 
> - Rango acotado entre 0 y 1
> - Monotonía, si z aumenta, $$\sigma(z)$$ también aumenta)
> - Asintótica, $$\sigma(z) \to 1$$ cuando $$z \to \infty$$ y $$\sigma(z) \to 0$$ cuando $$z \to -\infty$$

**¿Cómo medimos el error en clasificación?** Aquí se utilizan métricas como la **entropía cruzada** o **log loss**:

Pérdida para una muestra:
$$
L = -[y \cdot \log(\hat{y}) + (1 - y) \cdot \log(1 - \hat{y})]
$$

Pérdida promedio (o función de costo) para todo el conjunto de datos:
$$
J = -\frac{1}{n} \sum_{i=1}^{n} [y_i \cdot \log(\hat{y_i}) + (1 - y_i) \cdot \log(1 - \hat{y_i})]
$$

Donde:
- $$n$$ es el número de ejemplos en el conjunto de datos.
- $$y_i$$ es la etiqueta real (0 o 1) para el ejemplo $$i$$.
- $$\hat{y_i}$$ es la probabilidad predicha por el modelo para el ejemplo $$i$$ (valor entre 0 y 1).

¿Por qué se usa la entropía cruzada?
1. Penaliza más las predicciones incorrectas con alta confianza.
2. Es una función de pérdida convexa, lo que facilita la optimización mediante métodos como el descenso de gradiente.
3. Interpretación probabilística, ya que se basa en la probabilidad predicha por el modelo.

El comportamiento de la función de pérdida se muestra en la siguiente gráfica:

![Gráfico de la función de pérdida de entropía cruzada](/blog/machine-learning-paradigms-and-mathematical-foundations/shared/cross-entropy.webp)
_Gráfico de la Función de Pérdida de Entropía Cruzada_

La función penaliza más las predicciones incorrectas con alta confianza, lo que se refleja en la forma de la curva.
1. Cuando la etiqueta real es 1 (y=1) (línea azul):
- La fórmula se simplifica a $$L = -\log(\hat{y})$$
- Si $$\hat{y}$$ se acerca a 1, la pérdida se acerca a 0 (buena predicción).
- Si $$\hat{y}$$ se acerca a 0, la pérdida se dispara a infinito (mala predicción).
2. Cuando la etiqueta real es 0 (y=0) (línea roja):
- La fórmula se simplifica a $$L = -\log(1 - \hat{y})$$
- Si $$\hat{y}$$ se acerca a 0, la pérdida se acerca a 0 (buena predicción).
- Si $$\hat{y}$$ se acerca a 1, la pérdida se dispara a infinito (mala predicción).

La naturaleza logarítmica de la función es la que garantiza que el modelo sea penalizado severamente cuando se muestra "seguro pero equivocado", lo que obliga al modelo a ajustar sus pesos de forma más agresiva para mejorar las predicciones.

## Validación y Optimización

### Métricas de Evaluación

Para **regresión**, las métricas comunes incluyen:
- **Error Cuadrático Medio (MSE)**: Promedio de los cuadrados de las diferencias entre los valores reales y las predicciones.
- **Error Raíz Cuadrático Medio (RMSE)**: Raíz cuadrada del MSE, que tiene la misma unidad que la variable dependiente.
- **Coeficiente de Determinación (R²)**: Proporción de la varianza en la variable dependiente que es explicada por el modelo.
- **Error Absoluto Medio (MAE)**: Promedio de las diferencias absolutas entre los valores reales y las predicciones.

Para **clasificación**, las métricas comunes incluyen:
- **Exactitud (Accuracy)**: Proporción de predicciones correctas sobre el total de ejemplos.
- **Precisión (Precision)**: Proporción de verdaderos positivos sobre el total de predicciones positivas.
- **Recall (Sensibilidad)**: Proporción de verdaderos positivos sobre el total de ejemplos reales positivos.
- **F1 Score**: Media armónica de la precisión y el recall, que proporciona una medida equilibrada entre ambos.

> La elección de la métrica adecuada depende del contexto del problema y de las consecuencias de los errores de clasificación. Por ejemplo, en un problema de detección de fraude, es más importante minimizar los falsos negativos (no detectar un fraude) que los falsos positivos (marcar una transacción legítima como fraude), por lo que el recall podría ser una métrica más relevante que la precisión.

### Optimización

La optimización de modelos de machine learning se refiere al proceso de ajustar los parámetros del modelo para **minimizar la función de pérdida**. Esto se puede lograr mediante técnicas como el descenso de gradiente, que iterativamente ajusta los pesos del modelo en la dirección que reduce la pérdida.

El descenso de gradiente se puede expresar matemáticamente como:
$$
\theta = \theta - \alpha \nabla J(\theta)
$$  
Donde:
- $$\theta$$ representa los parámetros del modelo (por ejemplo, los coeficientes en regresión).
- $$\alpha$$ es la tasa de aprendizaje, que controla el tamaño de los pasos que se dan en cada iteración.
- $$\nabla J(\theta)$$ es el gradiente de la función de pérdida con respecto a los parámetros, que indica la dirección de mayor aumento de la pérdida.

El proceso de optimización continúa hasta que se alcanza un criterio de convergencia, como un número máximo de iteraciones o una mejora mínima en la función de pérdida.

- Posee una **tasa de aprendizaje** ($$\alpha$$) que controla el tamaño de los pasos que se dan en cada iteración (típicamente un valor pequeño como 0.01 o 0.001).
- El **gradiente** ($$\nabla J(\theta)$$) es un vector que contiene las derivadas parciales de la función de pérdida con respecto a cada parámetro, indicando la dirección de mayor aumento de la pérdida.
- El proceso de optimización continúa hasta que se alcanza un criterio de **convergencia**, como un número máximo de iteraciones o una mejora mínima en la función de pérdida.

Gráficamente:

![Gráfico del proceso de optimización con descenso de gradiente](/blog/machine-learning-paradigms-and-mathematical-foundations/shared/gradient-descent.webp)
_Optimización con Descenso de Gradiente_

1. Se inicia con un punto aleatorio en la función de pérdida (INITIAL POINT).
2. Se calcula el gradiente en ese punto, que indica la dirección de mayor aumento de la pérdida.
3. Se actualizan los parámetros del modelo en la dirección opuesta al gradiente, con un paso controlado por la tasa de aprendizaje (LEARNING RATE / STEP SIZE).
4. Este proceso se repite iterativamente hasta que se alcanza un mínimo local o global de la función de pérdida, lo que indica que el modelo ha sido optimizado.

La tasa de aprendizaje es crucial para el éxito del proceso de optimización:
- **DIVERGENCIA**: Si la tasa de aprendizaje es demasiado **alta**, el modelo puede divergir, saltando por encima del mínimo y aumentando la pérdida.
- **CONVERGENCIA LENTA**: Si la tasa de aprendizaje es demasiado **baja**, el proceso de optimización puede ser muy lento, tardando mucho tiempo en converger o quedándose atrapado en un mínimo local.
- **CONVERGENCIA ÓPTIMA**: Una tasa de aprendizaje adecuada permite que el modelo converja de manera eficiente hacia un mínimo global o local, optimizando la función de pérdida de manera efectiva.

## El Proceso de Machine Learning

Podemos resumir el proceso de ML en:

1. **Paradigma de aprendizaje**: Elegir el tipo de aprendizaje (supervisado, no supervisado, por refuerzo) según el problema a resolver.
    - Define el tipo de problema y datos disponibles.
2. **Modelo matemático**: Seleccionar un modelo adecuado (regresión, clasificación, clustering) y entender su formulación matemática.
    - Establece la relación matemática entre entrada y salida.
3. **Función de pérdida/costo**: Definir una función de pérdida que mida el error del modelo y que se pueda optimizar.
    - Cuántifica que tan malo es el modelo en sus predicciones.
4. **Optimización**: Utilizar técnicas como el descenso de gradiente para ajustar los parámetros del modelo y minimizar la función de pérdida.
    - Encuentra los mejores parámetros para que el modelo haga buenas predicciones.
5. **Evaluación**: Medir el rendimiento del modelo utilizando métricas adecuadas para el tipo de problema (MSE para regresión, precisión/recall para clasificación, etc.).
    - Valida el desempeño del modelo y su capacidad de generalización a datos no vistos.
