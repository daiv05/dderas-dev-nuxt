---
id: "statistics-and-machine-learning"
title: "Estadística y Aprendizaje Automático"
slug: "statistics-and-machine-learning"
order: 8
date: 2026-05-05
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
lastmod: 2026-05-05
sitemap:
  priority: 0.7
  loc: /es/blog/statistics-and-machine-learning
  lastmod: 2026-05-05
---

Ya hemos explorado el flujo de trabajo de un proyecto de aprendizaje automático, y hemos experimentado con el análisis exploratorio de datos (EDA) y la ingeniería de características (FE). Ahora profundizaremos un poco más en algunos conceptos estadísticos que son fundamentales para el EDA, y veremos que deberíamos tener en cuenta al analizar nuestros datos con el fin de asegurar que nuestros modelos tengan el mejor desempeño posible.

Artículo anterior de esta serie: [Vectores y Aprendizaje Automático](https://deras.dev/es/blog/vectors-matrices-machine-learning)

::table-of-contents
::

---

## Estadística Descriptiva

La **estadística descriptiva** es la rama de la estadística que se centra en **recolectar**, **organizar**, **resumir** y **visualizar** un conjunto de datos. Su objetivo principal es transformar datos brutos en información estructurada y comprensible, permitiéndonos entender "qué pasó" con la información que estamos analizando.

Podemos dividir sus tareas principales en tres pasos fundamentales:

1. **Organizar:** Transformar los datos recolectados en estructuras tabulares o matrices. Por ejemplo, pasar de archivos en bruto a un `DataFrame` bien estructurado.
2. **Resumir:** Utilizar métricas numéricas para describir grandes volúmenes de datos con unos pocos valores clave. Aquí es donde destacan las medidas de tendencia central y dispersión.
3. **Visualizar:** Representar los datos de forma gráfica (por ejemplo, histogramas, diagramas de caja o gráficos de dispersión) para facilitar el reconocimiento de patrones y valores atípicos (outliers).

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

Otra rama muy importante es la **estadística inferencial**. Mientras que la estadística descriptiva se limita a describir los datos que tenemos, la inferencial nos permite **sacar conclusiones sobre una población a partir de una muestra**. Esto es crucial en el aprendizaje automático, ya que a menudo trabajamos con conjuntos de datos limitados y queremos generalizar nuestros hallazgos a un contexto más amplio.

Empecemos por definir algunos conceptos clave:

1. **Población**

Lo entenderemos como el conjunto total de individuos o elementos que queremos estudiar. Por ejemplo todos los estudiantes de una universidad.

2. **Muestra**

Un subconjunto de la población que realmente se está estudiando. De todos los estudiantes, tomamos 200 seleccionados al azar.

3. **Parámetro**

Es un valor numérico que describe una característica de la población. Podríamos tomar la media de estatura de todos los estudiantes.

4. **Estadístico**

Al contrario del parámetro, el estadístico es calculado a partir de la muestra. Tendríamos la media de estatura de los 200 estudiantes.

5. **Error muestral**

Diferencia entre el parámetro real y el estadístico estimado. Si la media real de estatura de la población es 1.70m y la media de nuestra muestra es 1.68m, el error muestral sería 0.02m. PERO, en la práctica, no conocemos el parámetro real, por lo que el error muestral no puede calcularse directamente. En su lugar, se suele calcular el error estándar, que es una estimación de la variabilidad del estadístico debido al muestreo aleatorio. El error estándar se calcula como: 
$$
SE = \frac{\sigma}{\sqrt{n}}
$$
Donde $\sigma$ es la desviación estándar de la población (o una estimación basada en la muestra) y $n$ es el tamaño de la muestra.

6. **Nivel de confianza**

Probabilidad de que una estimación contenga el verdadero parámetro. Si decimos que tenemos un intervalo de confianza del 95%, significa que si repitiéramos el proceso de muestreo muchas veces, aproximadamente el 95% de esos intervalos incluirían el verdadero parámetro poblacional. Es una medida de cuán seguros estamos de nuestras estimaciones.

---

### Intervalo de confianza

Un **intervalo de confianza (IC)** es un rango de valores dentro del cual se espera que esté el parámetro poblacional con cierto nivel de confianza. En términos simples, es una forma de expresar la incertidumbre de nuestras estimaciones. Por ejemplo, si calculamos un intervalo de confianza del 95% para la media de estatura de los estudiantes y obtenemos (1.65m, 1.75m), podemos decir que estamos 95% seguros de que la verdadera media de estatura de todos los estudiantes está entre esos dos valores.

Fórmula básica:

$$
IC = \bar{x} \pm Z \left(\frac{\sigma}{\sqrt{n}}\right)
$$

Donde:

* $\bar{x}$ = media muestral
* $Z$ = valor crítico (1.96 para 95%)
* $\sigma$ = desviación estándar
* $n$ = tamaño de muestra

Esta fórmula se utiliza para calcular el intervalo de confianza para la media de una población cuando la desviación estándar es conocida y la muestra es suficientemente grande (n > 30).

En la práctica, a menudo no conocemos la desviación estándar de la población, por lo que utilizamos la desviación estándar muestral y el valor crítico de la distribución t de Student en lugar de Z. La fórmula se ajusta a:

$$
IC = \bar{x} \pm t \left(\frac{s}{\sqrt{n}}\right)
$$

Donde:

* $\bar{x}$ = media muestral
* $t$ = valor crítico de la distribución t de Student
* $s$ = desviación estándar muestral
* $n$ = tamaño de muestra

Con eso aclarado, veámos un ejemplo práctico:

Se encuesta a **100 personas** y se obtiene que la media de gasto mensual es **\$50**, con una desviación estándar de **\$10** y con un nivel de confianza del **95%**.

Sabemos que:

$$
Z = 1.96
$$

Para un nivel de confianza del 95%, el valor crítico Z es aproximadamente 1.96 (esto se obtiene de la tabla de distribución normal estándar).

> Puedes buscar más sobre como obtener este valor investigando sobre la distribución normal estándar y las tablas Z (espero publicar un artículo sobre esto pronto).

Calculamos:

$$
IC = 50 \pm 1.96 \left(\frac{10}{\sqrt{100}}\right)
$$

$$
IC = 50 \pm 1.96 (1)
$$

$$
IC = 50 \pm 1.96
$$

Resultado:

$$
IC = (48.04 , 51.96)
$$

Interpretación:
Con 95% de confianza, el verdadero gasto promedio poblacional está entre **\$48.04 y \$51.96**.

---

### Pruebas de hipótesis

Estas pruebas sirven para **tomar decisiones** sobre una afirmación respecto a la población. Vamos parte por parte:

1. **Componentes básicos**

**Hipótesis nula ($H_0$)**

Una afirmación que ponemos a prueba, generalmente una afirmación de "no diferencia", "no efecto" o igualdad. Ejemplo: "La media es igual a 50".

**Hipótesis alternativa ($H_1$)**

Representa la afirmación para la cuál buscamos evidencia. Contraria a la hipótesis nula. Por ejemplo: "La media es diferente de 50".

**Nivel de significancia ($\alpha$)**

Esta es la probabilidad de rechazar $H_0$ cuando es verdadera. Es decir, el riesgo que estamos dispuestos a asumir de cometer un error tipo I (falso positivo). Comúnmente: **0.05 (5%)**

**Estadístico de prueba**

Valor calculado para decidir si rechazamos $H_0$.

**Valor p**

Probabilidad de obtener un resultado tan extremo como el observado si $H_0$ fuera verdadera. Si el valor p es menor que $\alpha$, rechazamos $H_0$, caso contrario, no rechazamos $H_0$.

> Para explicarlo de forma sencilla, el valor p nos dice qué tan probable es obtener los resultados que tenemos (o más extremos) si la hipótesis nula fuera cierta. Si esta probabilidad es muy baja (menor que nuestro nivel de significancia), entonces tenemos suficiente evidencia para rechazar la hipótesis nula. Por dar un ejemplo, si obtenemos un valor p de 0.03 y nuestro nivel de significancia es 0.05, esto significa que hay solo un 3% de probabilidad de obtener esos resultados si la hipótesis nula fuera verdadera, lo que nos lleva a rechazar $H_0$ y aceptar que hay una diferencia significativa.

Hagámos un ejemplo práctico:

Una empresa afirma que el tiempo promedio de entrega es **30 minutos**.

Se toma una muestra y se obtiene:

* n = 36
* media = 32 minutos
* desviación estándar = 6
* $\alpha$ = 0.05

1. Plantear hipótesis

$$
H_0: \mu = 30
$$

$$
H_1: \mu \neq 30
$$

2. Calcular estadístico Z

$$
Z = \frac{\bar{x} - \mu}{\sigma/\sqrt{n}}
$$

$$
Z = \frac{32 - 30}{6/\sqrt{36}}
$$

$$
Z = \frac{2}{1}
$$

$$
Z = 2
$$

3. Comparar con valor crítico

Para $\alpha$ = 0.05 (bilateral):

Z crítico = $\pm1.96$

Como:

$$
2 > 1.96
$$

**Se rechaza $H_0$**

> También podríamos (y quizás de forma más común) haber calculado el valor p para este estadístico Z. Para Z = 2, el valor p sería aproximadamente 0.0455 (usando una tabla de distribución normal estándar o una calculadora estadística). Dado que 0.0455 < 0.05, también llegaríamos a la conclusión de rechazar $H_0$.

Lo que quiere decir que hay suficiente evidencia para afirmar que el tiempo promedio de entrega es diferente a 30 minutos.

### Sobre los tipos de errores

- **Error tipo I (falso positivo)** Rechazar $H_0$ cuando es verdadera. Por ejemplo, concluir que el tiempo de entrega es diferente a 30 minutos cuando en realidad sí lo es.
- **Error tipo II (falso negativo)** No rechazar $H_0$ cuando es falsa. Por ejemplo, concluir que el tiempo de entrega es igual a 30 minutos cuando en realidad es diferente.

### Importancia en el aprendizaje automático

En aprendizaje automático no es suficiente con comparar métricas y elegir el modelo que tenga el valor más alto. Las métricas que obtenemos (accuracy, precisión, recall, AUC, etc.) son estimaciones muestrales del rendimiento real del modelo.

Es decir:
- El dataset que usamos es una **muestra del mundo real**.
- La métrica calculada es un **estadístico**.
- El rendimiento real en producción es un **parámetro poblacional desconocido**.

Entonces, toda comparación entre modelos está sujeta a variabilidad muestral (la métrica obtenida puede variar si se toma una muestra diferente). La estadística inferencial nos permite determinar si una diferencia observada es real o si puede explicarse por azar.

Supongamos que estamos comparando dos modelos de clasificación binaria y para un conjunto de datos de prueba de 1000 obtenemos un accuracy de 0.85 para el modelo A y 0.80 para el modelo B. ¿Es esta diferencia del 5% significativa o podría ser simplemente una fluctuación aleatoria debido a la muestra de datos que usamos?

En la práctica ambos modelos se suelen evaluar sobre el mismo dataset de prueba, lo que introduce dependencia entre las métricas, y para comparar modelos en este contexto, se pueden usar pruebas estadísticas específicas para muestras dependientes, como la prueba de McNemar para accuracy o t-test pareado (que ya lo veremos en un próximo artículo). Estas pruebas nos ayudarán a determinar si la diferencia observada en las métricas es estadísticamente significativa o si podría ser atribuible al azar.


---