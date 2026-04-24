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

Ya hemos explorado el flujo de trabajo de un proyecto de aprendizaje automático, y hemos experimentado con el análisis exploratorio de datos (EDA) y la ingeniería de características (FE). En este artículo, profundizaremos un poco más en algunos conceptos estadísticos que son fundamentales para el EDA, y veremos que debemos tener en cuenta al analizar nuestros datos para asegurarnos de que nuestros modelos de aprendizaje automático tengan el mejor desempeño posible.

Artículo anterior: [Vectores y Aprendizaje Automático](https://deras.dev/es/blog/vectors-matrices-machine-learning)

::table-of-contents
::

---

## Estadística Descriptiva

La **estadística descriptiva** es la rama de la estadística que se centra en recolectar, organizar, resumir y visualizar un conjunto de datos. Su objetivo principal es transformar datos brutos en información estructurada y comprensible, permitiéndonos entender "qué pasó" con la información que estamos analizando.

Podemos dividir sus tareas principales en tres pasos fundamentales:

1. **Organizar:** Transformar los datos recolectados en estructuras tabulares o matrices. Por ejemplo, pasar de archivos en bruto a un `DataFrame` bien estructurado, o construir tablas de frecuencias agrupando categorías.
2. **Resumir:** Utilizar métricas numéricas para describir grandes volúmenes de datos con unos pocos valores clave. Aquí es donde destacan las medidas de tendencia central y dispersión.
3. **Visualizar:** Representar los datos de forma gráfica (ej. histogramas, diagramas de caja o gráficos de dispersión) para facilitar el reconocimiento de patrones y valores anómalos a simple vista.

### Medidas Estadísticas

Para resumir los datos numéricos, empleamos principalmente dos familias de métricas:

- **Medidas de Tendencia Central:** Indican hacia dónde se agrupan los datos.
  - **Media (Promedio):** La suma de todos los valores dividida por el total de datos. Es sensible a valores extremos (outliers).
    > **¿Por qué es importante?** Porque si tenemos un conjunto de datos con valores atípicos, la media puede darnos una impresión errónea del "centro" de los datos. Por ejemplo, si la mayoría de los empleados gana entre `$2K` y `$3.5K`, pero hay un directivo que gana `$15K`, la media se elevará significativamente, dando la falsa impresión de que el salario típico es mucho más alto de lo que realmente es para la mayoría.
  - **Mediana:** El valor central de los datos una vez ordenados. Es robusta y no se deja engañar fácilmente por anomalías.
    > **¿Por qué es importante?** Porque la mediana nos da una mejor idea del salario típico en el ejemplo anterior, si tenemos valores como `$2K`, `$2.2K`, `$2.5K`, `$2.5K`, `$2.8K`, `$3.1K`, `$3.5K` y un outlier de `$15K`, la mediana sería `$2.65K`, reflejando mejor el salario típico de la mayoría de los empleados.
  - **Moda:** El valor (o valores) que más se repite en el conjunto.
- **Medidas de Dispersión:** Proporcionan información sobre la variabilidad o qué tan separados están los datos.
  - **Rango:** La diferencia directa entre el valor máximo y el mínimo.
  - **Varianza:** Mide el promedio de las desviaciones al cuadrado respecto a la media.
      > **¿Por qué al cuadrado?** Porque si simplemente sumamos las desviaciones (valores - media), estas se cancelarán entre sí, dando un resultado de cero. Al elevar al cuadrado, todas las desviaciones se vuelven positivas, permitiendo medir la dispersión sin que los valores se anulen.
  - **Desviación Estándar:** La raíz cuadrada de la varianza. Se usa comúnmente porque devuelve la medida a sus unidades originales.
  - **Rango Intercuartílico (IQR):** La diferencia entre el percentil 75 (Q3) y el percentil 25 (Q1). Ayuda a comprender la dispersión del 50% central de los datos, ignorando colas o extremos.
    > **¿Por qué es útil el IQR?** Porque nos permite entender la dispersión de la mayoría de los datos sin que los valores extremos (outliers) distorsionen nuestra percepción. En el ejemplo de salarios, el IQR nos mostraría la variabilidad entre el 25% y el 75% de los empleados, proporcionando una visión más clara de la distribución salarial típica.

> ¿Cómo afeta una baja o alta desviación estándar a nuestros modelos de aprendizaje automático? Una baja desviación estándar indica que los datos están muy agrupados alrededor de la media, lo que puede facilitar que los modelos aprendan patrones claros. Por otro lado, una alta desviación estándar sugiere que los datos están más dispersos, lo que puede hacer que sea más difícil para los modelos encontrar relaciones significativas y generalizar bien a nuevos datos.

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

### Organizar los datos


### Visualizar los datos


## Estadística Inferencial
