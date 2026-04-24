---
id: "vectors-matrices-machine-learning"
title: "Vectores y Aprendizaje Automático"
slug: "vectors-matrices-machine-learning"
order: 7
date: 2026-04-25
summary: "Los vectores son una parte esencial del aprendizaje automático, ya que permiten representar datos y parámetros de modelos de manera eficiente. En este artículo, exploraremos su definición y aplicación en algoritmos de machine learning."
tags: ["aprendizaje automático", "vectores", "matrices", "álgebra lineal"]
image: /blog/vectors-matrices-machine-learning/shared/vectors-matrices.webp
author: David Deras
lastmod: 2026-04-25
sitemap:
  priority: 0.7
  loc: /es/blog/vectors-matrices-machine-learning
  lastmod: 2026-04-25
---

En el artículo anterior de esta serie seguíamos experimentando con el flujo en proyectos de aprendizaje automático. Haremos una pausa para hablar sobre un tema fundamental: los vectores y matrices. Estos conceptos son esenciales para entender cómo se representan los datos y cómo funcionan los algoritmos de machine learning.

Artículo anterior: [Experimentando con el dataset de supervivencia del Titanic](https://deras.dev/es/blog/experimenting-with-titanic-dataset)

::table-of-contents
::

---

## Representación de Datos en Machine Learning

¿Cómo interpretar los datos una computadora?
Los algoritmos de aprendizaje automático procesan información en forma de números. Para representar y procesar datos de manera eficiente, utilizamos estructuras matemáticas como vectores y matrices, básicamente se usan conceptos fundamentales para trabajar con datos en machine learning:

- **Vectores**: Un vector es una lista ordenada de números que representa una sola instancia de datos. Por ejemplo, si tenemos un conjunto de datos con características como altura, peso y edad, cada instancia de datos se puede representar como un vector. Por ejemplo, un vector podría ser `[170, 65, 30]`, donde cada número representa una característica específica.
- **Matrices**: Una matriz es una colección de vectores organizados en filas y columnas. En el contexto del aprendizaje automático, una matriz se utiliza para representar un conjunto de datos completo. Por ejemplo, si tenemos 100 instancias de datos con 3 características cada una, podríamos representar este conjunto de datos como una matriz de 100 filas y 3 columnas.
- **Tensores**: Un tensor es una generalización de vectores y matrices a dimensiones superiores. En el aprendizaje automático, especialmente en redes neuronales, los tensores se utilizan para representar datos con múltiples dimensiones, como imágenes (que pueden tener dimensiones de altura, ancho y canales de color) o secuencias de texto (que pueden tener dimensiones de longitud y características).
- **Operaciones**: Se realizan diversas operaciones con vectores y matrices, como la multiplicación de matrices, la transposición, la inversa y la descomposición. Estas operaciones son fundamentales para el entrenamiento de modelos, la optimización de parámetros y la realización de predicciones.

Los algoritmos convierten tablas en estructuras matemáticas para procesar la información. Por ejemplo:
| Altura | Peso | Edad |
|--------|------|-----|
| 170 | 65 | 30 |
| 182 | 75 | 25 |

Se convierte en una matriz:

$$
\mathbf{X} =
\begin{bmatrix}
170 & 65 & 30 \\
182 & 75 & 25 \\
\vdots & \vdots & \vdots \\
\end{bmatrix}
$$

En esta matriz, cada fila representa una instancia de datos (una persona) y cada columna representa una característica (altura, peso, edad).

### Vector

Un vector es una lista ordenada de números que representa una sola instancia de datos, esta puede ser cualquier serie de valores organizados en una sola dimensión (fila o columna). Por ejemplo, si tenemos un conjunto de datos con características como altura, peso y edad, cada instancia de datos se puede representar como un vector.

$$
\mathbf{v} = [v_1, v_2, v_3]
$$

La dimensión de un vector se refiere al número de elementos que contiene. En el ejemplo anterior, el vector `v` tiene una dimensión de 3, ya que contiene tres elementos (altura, peso y edad). El orden de los elementos en un vector es importante, ya que cada posición representa una característica específica.

Dentro de los modelos los vectores se utilizan para:

- **Representar instancias de datos**: Cada fila de una matriz de datos puede ser un vector que representa una instancia específica.
- **Representar parámetros del modelo**: Los pesos y sesgos en modelos de machine learning también se representan como vectores.

Las operaciones comunes con vectores incluyen:

- **Suma de vectores**: Se suman los elementos correspondientes de dos vectores.

$$
\mathbf{v} + \mathbf{w} = [v_1 + w_1, v_2 + w_2, v_3 + w_3]
$$

- **Producto escalar**: Se multiplican los elementos correspondientes de dos vectores y se suman los resultados.

$$
\mathbf{v} \cdot \mathbf{w} = v_1 w_1 + v_2 w_2 + v_3 w_3
$$

- **Norma de un vector**: Se calcula la longitud o magnitud de un vector, lo que es útil para medir la distancia entre vectores.

$$
\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2 + v_3^2}
$$

- **Normalización**: Se ajusta un vector para que tenga una longitud de 1, lo que es útil para comparar vectores en diferentes escalas.

$$
\mathbf{v}_{norm} = \frac{\mathbf{v}}{\|\mathbf{v}\|}
$$

- **Mutiplicación por un escalar**: Se multiplican todos los elementos de un vector por un número (escalar).

$$
\mathbf{v} \cdot c = [v_1 \cdot c, v_2 \cdot c, v_3 \cdot c]
$$

### Matriz

Una matriz es una colección de vectores organizados en filas y columnas. En el contexto del aprendizaje automático, una matriz se utiliza para representar un conjunto de datos completo. Por ejemplo, si tenemos 100 instancias de datos con 3 características cada una, podríamos representar este conjunto de datos como una matriz de 100 filas y 3 columnas.

$$
\mathbf{X} =
\begin{bmatrix}
170 & 65 & 30 \\
182 & 75 & 25 \\
\vdots & \vdots & \vdots \\
\end{bmatrix}
$$

Un dataset con `m` instancias y `n` características se representa como una matriz de dimensiones `m x n`.

Las operaciones comunes con matrices incluyen:
- **Suma de matrices**: Se suman los elementos correspondientes de dos matrices.
$$
\mathbf{A} + \mathbf{B} =
\begin{bmatrix}
a_{11} + b_{11} & a_{12} + b_{12} & \cdots & a_{1n} + b_{1n} \\
a_{21} + b_{21} & a_{22} + b_{22} & \cdots & a_{2n} + b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} + b_{m1} & a_{m2} + b_{m2} & \cdots & a_{mn} + b_{mn} \\
\end{bmatrix}
$$

- **Multiplicación de matrices**: Se multiplican dos matrices siguiendo la regla de multiplicación de filas por columnas.
$$
\mathbf{A} \cdot \mathbf{B} =
\begin{bmatrix}
a_{11}b_{11} + a_{12}b_{21} + \cdots + a_{1n}b_{n1} & a_{11}b_{12} + a_{12}b_{22} + \cdots + a_{1n}b_{n2} & \cdots & a_{11}b_{1p} + a_{12}b_{2p} + \cdots + a_{1n}b_{np} \\
a_{21}b_{11} + a_{22}b_{21} + \cdots + a_{2n}b_{n1} & a_{21}b_{12} + a_{22}b_{22} + \cdots + a_{2n}b_{n2} & \cdots & a_{21}b_{1p} + a_{22}b_{2p} + \cdots + a_{2n}b_{np} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1}b_{11} + a_{m2}b_{21} + \cdots + a_{mn}b_{n1} & a_{m1}b_{12} + a_{m2}b_{22} + \cdots + a_{mn}b_{n2} & \cdots & a_{m1}b_{1p} + a_{m2}b_{2p} + \cdots + a_{mn}b_{np} \\
\end{bmatrix}
$$

- **Transposición**: Se intercambian las filas por las columnas de una matriz.
$$
\mathbf{A}^T =
\begin{bmatrix}
a_{11} & a_{21} & \cdots & a_{m1} \\
a_{12} & a_{22} & \cdots & a_{m2} \\
\vdots & \vdots & \ddots & \vdots \\
a_{1p} & a_{2p} & \cdots & a_{mp} \\
\end{bmatrix}
$$

- **Inversa**: Se calcula la matriz inversa, que es útil para resolver sistemas de ecuaciones lineales.
$$
\mathbf{A}^{-1} \cdot \mathbf{A} = \mathbf{I}
$$

- **Descomposición**: Se descompone una matriz en factores más simples, como la descomposición en valores singulares (SVD) o la descomposición LU, lo que es útil para la reducción de dimensionalidad y la optimización de modelos.
$$
\mathbf{A} = \mathbf{U} \Sigma \mathbf{V}^T
$$

- **Producto matriz-vector**: Se multiplica una matriz por un vector, lo que es común en la aplicación de modelos lineales.
$$
\mathbf{A} \cdot \mathbf{v} =
\begin{bmatrix}
a_{11}v_1 + a_{12}v_2 + \cdots + a_{1n}v_n \\
a_{21}v_1 + a_{22}v_2 + \cdots + a_{2n}v_n \\
\vdots \\
a_{m1}v_1 + a_{m2}v_2 + \cdots + a_{mn}v_n \\
\end{bmatrix}
$$

Una de las operaciones más importantes en el aprendizaje automático es la multiplicación, ya sea de matrices o de matrices por vectores, ya que es fundamental para el entrenamiento de modelos y la realización de predicciones. Por ejemplo, en un modelo de regresión lineal, la predicción se realiza multiplicando la matriz de características por el vector de pesos del modelo:
$$
\hat{\mathbf{y}} = \mathbf{X} \cdot \mathbf{w}
$$

Para generar predicciones, se multiplica la matriz de características `X` por el vector de pesos `w`, lo que da como resultado un vector de predicciones `ŷ`.

Veámos un ejemplo concreto:

Supongamos que tenemos un modelo de regresión lineal con dos características (altura y peso) y un conjunto de datos con tres instancias:

| Altura | Peso |
|--------|------|
| 170 | 65 |
| 182 | 75 |
| 160 | 55 |

Podemos representar este conjunto de datos como una matriz `X`:

$$
\mathbf{X} =
\begin{bmatrix}
170 & 65 \\
182 & 75 \\
160 & 55 \\
\end{bmatrix}
$$

Si nuestro modelo tiene un vector de pesos `w` que representa la importancia de cada característica, por ejemplo:

$$
\mathbf{w} =
\begin{bmatrix}
0.5 \\
0.3 \\
\end{bmatrix}
$$

Podemos generar predicciones multiplicando la matriz `X` por el vector `w`:

$$
\hat{\mathbf{y}} = \mathbf{X} \cdot \mathbf{w} =
\begin{bmatrix}
170 & 65 \\
182 & 75 \\
160 & 55 \\
\end{bmatrix}
\cdot
\begin{bmatrix}
0.5 \\
0.3 \\
\end{bmatrix}
$$

> Hemos omitido el bias en este ejemplo para simplificar la explicación, pero en un modelo real, también se incluiría un término de sesgo (bias) que se sumaría a las predicciones: $$\hat{\mathbf{y}} = \mathbf{X} \cdot \mathbf{w} + \mathbf{b} $$

Calculando el producto, obtenemos:

$$
\hat{\mathbf{y}} =
\begin{bmatrix}
170 \cdot 0.5 + 65 \cdot 0.3 \\
182 \cdot 0.5 + 75 \cdot 0.3 \\
160 \cdot 0.5 + 55 \cdot 0.3 \\
\end{bmatrix} =
\begin{bmatrix}85 + 19.5 \\91 + 22.5 \\80 + 16.5 \end{bmatrix} =
\begin{bmatrix}104.5 \\113.5 \\96.5 \end{bmatrix}
$$

En este ejemplo, las predicciones `ŷ` para cada instancia de datos se calculan como una combinación lineal de las características (altura y peso) ponderadas por los pesos del modelo.

| Altura | Peso | Predicción (ŷ) |
|--------|------|------------------|
| 170 | 65 | 104.5 |
| 182 | 75 | 113.5 |
| 160 | 55 | 96.5 |

Si el problema que estamos tratando es de clasificación, podríamos aplicar una función de activación (como la función sigmoide) a las predicciones para obtener probabilidades de clase, si es regresión podríamos usar las predicciones directamente para evaluar el rendimiento del modelo (el valor podría representar tal vez un índice de riesgo o X variable continua estimada a partir de las características).

### Uso en Algoritmos y Librerias

Hablando de forma puntual, las operaciones matriciales son la base de muchos algoritmos de aprendizaje automático:

- **Regresión Lineal**: Utiliza la multiplicación de matrices para calcular las predicciones a partir de las características y los pesos del modelo, y en su forma cerrada emplea operaciones como transposición e inversa de matrices.
- **Redes Neuronales**: Utilizan operaciones matriciales para calcular las activaciones en cada capa de la red, así como para actualizar los pesos durante el entrenamiento.
- **Regresión Logística**: Utiliza la multiplicación de matrices para calcular y luego poder obtener las probabilidades de clase a partir de las características y los pesos del modelo.

En cuánto a su uso, librerías como NumPy, TensorFlow y PyTorch, Scikit-learn proporcionan funciones optimizadas para realizar operaciones con vectores de manera eficiente:

```python
import numpy as np
# Crear una matriz de datos
X = np.array([[170, 65], [182, 75], [160, 55]])
# Crear un vector de pesos
w = np.array([0.5, 0.3])
# Generar predicciones
y_hat = X.dot(w)
print(y_hat)
```

### Recopilación de ejercicios

En este Colab puedes practicar operaciones con vectores y matrices utilizando NumPy: <a href="https://colab.research.google.com/drive/1P7gBDg7b6wVl1EMlCDf0UCWy5UBJ6b6N?usp=sharing" target="_blank" rel="noopener noreferrer">Ejercicios de Vectores y Matrices en Machine Learning</a>

---

Eso sería todo por esta ocasión, en el próximo artículo comenzaremos a profundizar en el campo de la estadística y probabilidad. ¡Nos vemos!