---
id: "statistics-and-machine-learning"
title: "Estadística y Aprendizaje Automático"
slug: "statistics-and-machine-learning"
order: 8
date: 2026-04-25
summary: "La estadística es una parte esencial del aprendizaje automático, ya que permite analizar y entender los datos y los modelos. En este artículo, exploraremos un poco más sobre como realizar un buen análisis de datos"
tags:
  [
    "aprendizaje automático",
    "estadística",
    "análisis de datos",
    "machine learning",
    "data analysis",
  ]
image: /blog/statistics-and-machine-learning/shared/statistics-machine-learning.webp
author: David Deras
lastmod: 2026-04-25
sitemap:
  priority: 0.7
  loc: /es/blog/statistics-and-machine-learning
  lastmod: 2026-04-25
---

Ya hemos explorado el flujo de trabajo de un proyecto de aprendizaje automático, y hemos experimentado con el análisis exploratorio de datos (EDA) y la ingeniería de características (FE). Ahora profundizaremos un poco más en algunos conceptos estadísticos que son fundamentales para el EDA, y veremos qué deberíamos tener en cuenta al analizar nuestros datos con el fin de asegurar que nuestros modelos tengan el mejor desempeño posible.

Artículo anterior de esta serie: [Vectores y Aprendizaje Automático](https://deras.dev/es/blog/vectors-matrices-machine-learning)

::table-of-contents
::

---

## Estadística Descriptiva

La **estadística descriptiva** es la rama de la estadística que se centra en **recolectar**, **organizar**, **resumir** y **visualizar** un conjunto de datos. Su objetivo principal es transformar datos brutos en información estructurada y comprensible, permitiéndonos entender "qué pasó" con la información que estamos analizando.

Podemos dividir sus tareas principales en 5 pasos fundamentales:

1. **Recolectar:** Obtener los datos de diversas fuentes, como bases de datos, archivos CSV, APIs, etc. Este paso es crucial para asegurar que tenemos una muestra representativa y de calidad para nuestro análisis.
2. **Organizar:** Consiste en ordenar la información recolectada para poder analizarla: clasificar las variables o construir tablas de frecuencia o distribución.
3. **Presentar:** Mostrar los datos de manera clara y ordenada, utilizando tablas, resúmenes numéricos o gráficos. Esto facilita la interpretación y comunicación de los resultados a otros.
4. **Resumir:** Utilizar métricas numéricas para describir grandes volúmenes de datos con unos pocos valores clave. Aquí es donde destacan las medidas de tendencia central y dispersión.
5. **Interpretar:** Analizar los datos y extraer conclusiones significativas, utilizando tanto métricas numéricas como visualizaciones para comunicar los hallazgos de manera efectiva.

### Clasificación de Variables

Antes de sumergirnos en las métricas, es importante entender los tipos de variables que podemos encontrar en nuestros datos, ya que esto influirá en cómo las analizamos y qué métricas utilizamos:

- **Variables Categóricas:** Representan categorías o grupos. Pueden ser:
  - **Nominales:** No tienen un orden específico (e.g., colores, tipos de frutas).
  - **Ordinales:** Tienen un orden o jerarquía (e.g., niveles de satisfacción: bajo, medio, alto).
- **Variables Numéricas:** Representan cantidades o medidas. Pueden ser:
  - **Discretas:** Toman valores enteros (e.g., número de hijos, cantidad de coches).
  - **Continuas:** Pueden tomar cualquier valor dentro de un rango (e.g., altura, peso, salario).

### Tablas de Frecuencia y Distribución

Las **tablas de frecuencia** son una herramienta fundamental para organizar y presentar datos categóricos. Nos permiten contar cuántas veces ocurre cada categoría en nuestro conjunto de datos, lo que facilita la identificación de patrones y tendencias. Por ejemplo, si tenemos una variable "Color de Auto" con categorías "Rojo", "Azul" y "Negro", una tabla de frecuencia nos mostraría cuántos autos de cada color hay en nuestro dataset.
Las **tablas de distribución**, por otro lado, se utilizan para variables numéricas. Nos permiten organizar los datos en intervalos o rangos y contar cuántos valores caen dentro de cada intervalo. Esto es especialmente útil para entender la forma de la distribución de los datos, identificar sesgos o detectar la presencia de outliers.

### Presentación de Datos

La presentación de datos es crucial para comunicar eficazmente los hallazgos estadísticos. Se pueden utilizar diversas técnicas y herramientas, como:

- **Tablas:** Para mostrar información de manera estructurada y detallada.
- **Gráficos:** Para visualizar patrones, tendencias y relaciones en los datos. Algunos tipos comunes incluyen:
  - **Histogramas:** Muestran la distribución de una variable continua.
  - **Diagramas de caja (Box plots):** Muestran la dispersión y la presencia de outliers.
  - **Gráficos de barras:** Muestran comparaciones entre categorías.
  - **Gráficos de líneas:** Muestran tendencias a lo largo del tiempo.

### Medidas Estadísticas

Para resumir los datos numéricos, se emplean principalmente dos familias de métricas:

- **Medidas de Tendencia Central:** Indican hacia dónde se agrupan los datos.
  - **Media (Promedio):** La suma de todos los valores dividida por el total de datos. Es sensible a valores extremos (outliers).
    > **¿Como afectan los outliers?** Si tenemos un conjunto de datos con valores atípicos, la media puede darnos una impresión errónea del "centro" de los datos. Por ejemplo, si la mayoría de los empleados gana entre `$2K` y `$3.5K`, pero hay un directivo que gana `$15K`, la media se elevará, dando la falsa impresión de que el salario típico es mucho más alto de lo que realmente es para la mayoría.
  - **Mediana:** Es el valor central de un conjunto de datos ordenados de menor a mayor. Es robusta y no se deja engañar fácilmente por anomalías.
    > **¿Cómo se protege de los outliers?** La mediana nos da una mejor idea del salario típico en el ejemplo anterior, si tenemos valores como `$2K`, `$2.2K`, `$2.5K`, `$2.5K`, `$2.8K`, `$3.1K`, `$3.5K` y un outlier de `$15K`, la mediana sería `$2.65K`, reflejando mejor el salario típico de la mayoría de los empleados.
  - **Moda:** El valor (o valores) que más se repite en el conjunto de datos.
- **Medidas de Dispersión:** Proporcionan información sobre la **variabilidad** o qué tan separados están los datos.
  - **Rango:** La diferencia entre el valor máximo y el mínimo.
  - **Varianza:** Mide el promedio de las desviaciones al cuadrado respecto a la media.
      > **¿Por qué al cuadrado?** Porque si simplemente sumamos las desviaciones (valores - media), estas se cancelarán entre sí, dando un resultado de cero. Al elevar al cuadrado, todas las desviaciones se vuelven positivas, permitiendo medir la dispersión sin que los valores se anulen.
  - **Desviación Estándar:** La raíz cuadrada de la varianza. Se usa comúnmente porque devuelve la medida a sus unidades originales.
  - **Rango Intercuartílico (IQR):** La diferencia entre el percentil 75 (Q3) y el percentil 25 (Q1). Ayuda a comprender la dispersión del 50% central de los datos, ignorando colas o extremos.
    > **¿Por qué es útil el IQR?** Porque nos permite entender la dispersión de la mayoría de los datos sin que los valores extremos (outliers) distorsionen nuestra percepción. En el ejemplo de salarios, el IQR nos mostraría la variabilidad entre el 25% y el 75% de los empleados, proporcionando una visión más clara de la distribución salarial típica.

> ¿Cómo afeta una baja o alta desviación estándar a nuestros modelos de aprendizaje automático? Una baja desviación estándar indica que los datos están muy agrupados alrededor de la media, lo que puede facilitar que los modelos aprendan patrones claros. Por otro lado, una alta desviación estándar sugiere que los datos están más dispersos, lo que puede hacer que sea más difícil para los modelos encontrar relaciones significativas y generalizar bien a nuevos datos.

![Gráfico de dispersión con baja y alta desviación estándar](/blog/statistics-and-machine-learning/shared/standard-deviation-comparison.webp)

Veamos cómo generar y analizar estos estadísticos utilizando `pandas`. Imaginemos una lista de salarios de una empresa donde la mayoría son salarios normales, pero hay un salario directivo muy elevado.

```python
import pandas as pd

# 1. Organizamos los datos
# La mayoría gana entre $2K y $3.5K, pero un directivo gana $15,000 (nuestro outlier)
salarios = [2000, 2200, 2500, 2500, 2800, 3100, 3500, 15000]
df = pd.DataFrame({'Salario': salarios})

# 2. Medidas de Tendencia Central
media = df['Salario'].mean()
mediana = df['Salario'].median()
moda = df['Salario'].mode()[0]

print("--- Tendencia Central ---")
print(f"Media: ${media:.2f}")
print(f"Mediana: ${mediana:.2f}")
print(f"Moda: ${moda:.2f}\n")

# 3. Medidas de Dispersión
rango = df['Salario'].max() - df['Salario'].min()
varianza = df['Salario'].var() # ddof=1 por defecto (muestral)
desv_std = df['Salario'].std()
iqr = df['Salario'].quantile(0.75) - df['Salario'].quantile(0.25)

print("--- Medidas de Dispersión ---")
print(f"Rango: ${rango:.2f}")
print(f"Varianza: {varianza:.2f}")
print(f"Desviación Estándar: ${desv_std:.2f}")
print(f"IQR: ${iqr:.2f}")
```

- **Media vs. Mediana:** La media es **\$4,200**, inflada por los exagerados \$15,000. Sin embargo, la mediana es **\$2,650**, mucho más representativa de un empleado promedio. Al hacer análisis de datos, siempre debes chequear ambas frente a posibles sesgos.
- **Moda:** El estatus salarial más repetido es **\$2,500**.
- **Desviación Estándar:** Obtendremos aproximadamente **\$4,383**. Es una dispersión enorme provocado nuevamente por el sueldo alto alejado de los demás.
- **IQR:** El Rango Intercuartílico nos da **\$875**, reafirmando que el "grueso" del núcleo normal de empleados (el 50% del medio) varía sus salarios en un margen mucho menor y más manejable.

> Una regla práctica (pero NO absoluta): Si la media < la mediana, entonces la distribución es sesgada a la izquierda (negativamente sesgada). Si la media > la mediana, entonces la distribución es sesgada a la derecha (positivamente sesgada).

Puedes ver y practicar con este código en el siguiente [notebook de Google Colab](https://colab.research.google.com/drive/1jD0kH9z9oVHrM4HwN1dykpjwfKO2S5ge?usp=sharing).

## Estadística Inferencial
