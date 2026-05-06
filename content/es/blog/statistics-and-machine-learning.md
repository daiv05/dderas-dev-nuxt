---
id: "statistics-and-machine-learning"
title: "Estadística y Aprendizaje Automático"
slug: "statistics-and-machine-learning"
order: 8
date: 2026-05-06
summary: "La estadística nos permite analizar y entender los datos. En este artículo, exploraremos un poco más sobre la estadística descriptiva e inferencial, y cómo estos conceptos son fundamentales para el aprendizaje automático."
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
lastmod: 2026-05-06
sitemap:
  priority: 0.7
  loc: /es/blog/statistics-and-machine-learning
  lastmod: 2026-05-06
---

Ya hemos explorado el flujo de trabajo de un proyecto de aprendizaje automático, y hemos experimentado con el análisis exploratorio de datos (EDA) y la ingeniería de características (FE), ahora profundizaremos un poco más en algunos conceptos estadísticos que son fundamentales, y veremos `qué` deberíamos tener en cuenta al analizar nuestros datos con el fin de asegurar que nuestros modelos tengan el mejor desempeño posible.

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

El tipo de variable influye en cómo analizamos y qué métricas utilizamos:

- **Variables Categóricas:** Representan categorías o grupos. Pueden ser:
  - **Nominales:** No tienen un orden específico (colores, tipos de frutas).
  - **Ordinales:** Tienen un orden o jerarquía (niveles de satisfacción: bajo, medio, alto).
- **Variables Numéricas:** Representan cantidades o medidas. Pueden ser:
  - **Discretas:** Toman valores enteros (número de hijos, cantidad de coches).
  - **Continuas:** Pueden tomar cualquier valor dentro de un rango (altura, peso, salario).

### Tablas de Frecuencia y Distribución

Las **tablas de frecuencia** son una herramienta fundamental para organizar y presentar datos categóricos. Nos permiten contar cuántas veces ocurre cada categoría en nuestro conjunto de datos, lo que facilita la identificación de patrones y tendencias. Por ejemplo, si tenemos una variable "Color de Auto" con categorías "Rojo", "Azul" y "Negro", una tabla de frecuencia nos mostraría cuántos autos de cada color hay en nuestro dataset.

Las **tablas de distribución**, por otro lado, se utilizan para variables numéricas. Nos permiten organizar los datos en intervalos o rangos y contar cuántos valores caen dentro de cada intervalo. Esto es especialmente útil para entender la forma de la distribución de los datos, identificar sesgos o detectar la presencia de outliers.

> Este tipo de tablas (y gráficos) nos permiten detectar casos como distribuciones sesgadas, presencia de outliers, o la necesidad de transformar los datos para mejorar el rendimiento de nuestros modelos de aprendizaje automático.

### Presentación de Datos

La presentación de datos es crucial para comunicar eficazmente los hallazgos estadísticos. Podemos usar:

- **Tablas:** Para mostrar información de manera estructurada y detallada.
- **Gráficos:** Para visualizar patrones, tendencias y relaciones en los datos:
  - **Histogramas:** Muestran la distribución de una variable continua.
  - **Diagramas de caja (Box plots):** Muestran la dispersión y la presencia de outliers.
  - **Gráficos de barras:** Muestran comparaciones entre categorías.
  - **Gráficos de líneas:** Muestran tendencias a lo largo del tiempo.

### Medidas Estadísticas

Para resumir los datos numéricos, se emplean principalmente dos familias de métricas:

- **Medidas de Tendencia Central:** Indican hacia dónde se agrupan los datos.
  - **Media (Promedio):** La suma de todos los valores dividida por el total de datos. Es sensible a valores extremos (outliers).
    > **¿Como le afectan los outliers?** Si tenemos un conjunto de datos con valores atípicos, la media puede darnos una impresión errónea del "centro" de los datos. Por ejemplo, si la mayoría de los empleados gana entre `$2K` y `$3.5K`, pero hay un directivo que gana `$15K`, la media se elevará, dando la falsa impresión de que el salario típico es mucho más alto de lo que realmente es para la mayoría.
  - **Mediana:** Es el valor central de un conjunto de datos ordenados de menor a mayor. Es robusta y no se deja engañar fácilmente por anomalías.
    > **¿Cómo se protege de los outliers?** La mediana nos da una mejor idea del salario típico en el ejemplo anterior, si tenemos valores como `$2K`, `$2.2K`, `$2.5K`, `$2.5K`, `$2.8K`, `$3.1K`, `$3.5K` y un outlier de `$15K`, la mediana sería `$2.65K`, reflejando mejor el salario típico de la mayoría de los empleados.
  - **Moda:** El valor (o valores) que más se repite en el conjunto de datos.
- **Medidas de Dispersión:** Proporcionan información sobre la **variabilidad** o qué tan separados están los datos.
  - **Rango:** La diferencia entre el valor máximo y el mínimo.
  - **Varianza:** Mide el promedio de las desviaciones al cuadrado respecto a la media.
      > **¿Por qué al cuadrado?** Porque si simplemente sumamos las desviaciones (valores - media), estas se cancelarán entre sí, dando un resultado de cero. Al elevar al cuadrado, todas las desviaciones se vuelven positivas, permitiendo medir la dispersión sin que los valores se anulen.
  - **Desviación Estándar:** La raíz cuadrada de la varianza. Se usa comúnmente porque devuelve la medida a sus unidades originales.
  - **Rango Intercuartílico (IQR):** La diferencia entre el percentil 75 (Q3) y el percentil 25 (Q1). Ayuda a comprender la dispersión del 50% central de los datos, ignorando colas o extremos.
    > **¿Por qué es útil?** Porque nos permite entender la dispersión de la mayoría de los datos sin que los valores extremos (outliers) distorsionen nuestra percepción. En el ejemplo de salarios, el IQR nos mostraría la variabilidad entre el 25% y el 75% de los empleados, proporcionando una visión más clara de la distribución salarial típica.

¿Cómo afecta una baja o alta desviación estándar a nuestros modelos de aprendizaje automático? Una baja desviación estándar indica que los datos están muy agrupados alrededor de la media, lo que puede facilitar que los modelos aprendan patrones claros. Por otro lado, una alta desviación estándar sugiere que los datos están más dispersos, lo que puede hacer que sea más difícil para los modelos encontrar relaciones significativas y generalizar bien a nuevos datos.

![Gráfico de dispersión con baja y alta desviación estándar](/blog/statistics-and-machine-learning/shared/standard-deviation-comparison.webp)

Veamos cómo generar y analizar estos estadísticos utilizando `pandas`. Tomemos el ejemplo de los salarios de los empleados:

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
- **Desviación Estándar:** Obtendremos aproximadamente **\$4,390.25**. Es una dispersión enorme provocado nuevamente por el sueldo alto alejado de los demás.
- **IQR:** El Rango Intercuartílico nos da **\$775**, reafirmando que el "grueso" del núcleo normal de empleados (el 50% del medio) varía sus salarios en un margen mucho menor y más manejable.

> Una regla práctica (pero NO absoluta): Si la media < la mediana, entonces la distribución es sesgada a la izquierda (negativamente sesgada). Si la media > la mediana, entonces la distribución es sesgada a la derecha (positivamente sesgada).

Puedes practicar con otros ejemplos en el siguiente [notebook de Google Colab](https://colab.research.google.com/drive/1jD0kH9z9oVHrM4HwN1dykpjwfKO2S5ge?usp=sharing).

## Estadística Inferencial

Otra rama muy importante es la **estadística inferencial**. Mientras que la estadística descriptiva se limita a describir los datos que tenemos, la inferencial nos permite **sacar conclusiones sobre una población a partir de una muestra**. Esto es crucial en el aprendizaje automático, ya que a menudo trabajamos con conjuntos de datos limitados y queremos generalizar nuestros hallazgos a un contexto más amplio.

Empecemos por definir algunos conceptos clave:

1. **Población**

Lo entenderemos como el conjunto total de individuos o elementos que queremos estudiar. Por ejemplo todos los estudiantes de una universidad.

2. **Muestra**

Un subconjunto de la población que realmente se está estudiando. De todos los estudiantes, tomamos 200 seleccionados al azar.

3. **Parámetro**

Es un valor numérico que describe una característica de la población. Podríamos por ejemplo tomar la media de estatura de todos los estudiantes.

4. **Estadístico**

Al contrario del parámetro, el estadístico es calculado a partir de la muestra. Podríamos tener por ejemplo la media de estatura de los 200 estudiantes.

5. **Error muestral**

Diferencia entre el parámetro real y el estadístico estimado. Si la media real de estatura de la población es 1.70m y la media de nuestra muestra es 1.68m, el error muestral sería 0.02m. PERO, en la práctica lo más seguro es que no conozcamos el parámetro real, por lo que el error muestral no puede calcularse directamente. En su lugar, se suele calcular el error estándar, que es una estimación de la variabilidad del estadístico debido al muestreo aleatorio. El error estándar se calcula como: 

$$
SE = \frac{\sigma}{\sqrt{n}}
$$

Donde $\sigma$ es la desviación estándar de la población (o una estimación basada en la muestra) y $n$ es el tamaño de la muestra.

6. **Nivel de confianza**

Probabilidad de que una estimación contenga el verdadero parámetro. Si decimos que tenemos un intervalo de confianza del 95%, significa que si repitiéramos el proceso de muestreo muchas veces, aproximadamente el 95% de esos intervalos incluirían el verdadero parámetro poblacional. Es una medida de cuán seguros estamos de nuestras estimaciones.

---

### Intervalo de confianza

Un **intervalo de confianza (IC)** es un rango de valores dentro del cual se espera que esté el parámetro poblacional con cierto **nivel de confianza**. En términos simples, es una forma de expresar la incertidumbre de nuestras estimaciones. Por ejemplo, si calculamos un intervalo de confianza del 95% para la media de estatura de los estudiantes y obtenemos (1.65m, 1.75m), podemos decir que estamos 95% seguros de que la verdadera media de estatura de todos los estudiantes está entre esos dos valores.

Fórmula básica:

$$
IC = \bar{x} \pm Z \left(\frac{\sigma}{\sqrt{n}}\right)
$$

Donde:

* $\bar{x}$ = media muestral
* $Z$ = valor crítico
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

Estas pruebas sirven para **tomar decisiones** sobre una afirmación respecto a la población. Vamos por partes:

1. **Componentes básicos**

**Hipótesis nula ($H_0$)**

Una afirmación que ponemos a prueba, generalmente una afirmación de "no diferencia", "no efecto" o "igualdad". Ejemplo: "La media es **igual** a 50".

**Hipótesis alternativa ($H_1$)**

Representa la afirmación para la cuál buscamos evidencia. Contraria a la hipótesis nula. Por ejemplo: "La media es **diferente** de 50".

**Nivel de significancia ($\alpha$)**

Esta es la probabilidad de rechazar $H_0$ cuando es verdadera. Es decir, el riesgo que estamos dispuestos a asumir de cometer un error tipo I (falso positivo). Comúnmente valores como: **0.05 (5%)**, **0.01 (1%)** o **0.10 (10%)** se utilizan como niveles de significancia.

**Estadístico de prueba**

Valor calculado para decidir si rechazamos $H_0$.

**Valor p**

Probabilidad de obtener un resultado tan extremo como el observado si $H_0$ fuera verdadera. Si el valor p es menor que $\alpha$, rechazamos $H_0$, caso contrario, no rechazamos $H_0$.

> El valor p nos dice qué tan probable es obtener los resultados que tenemos (o más extremos) si la hipótesis nula fuera cierta. Si esta probabilidad es muy baja (menor que nuestro nivel de significancia), entonces tenemos suficiente evidencia para rechazar la hipótesis nula. Por dar un ejemplo, si obtenemos un valor p de 0.03 y nuestro nivel de significancia es 0.05, esto significa que hay solo un 3% de probabilidad de obtener esos resultados si la hipótesis nula fuera verdadera, lo que nos lleva a rechazar $H_0$.

Hagámos un ejemplo práctico:

Una empresa afirma que el tiempo promedio de entrega es **30 minutos**.

Se toma una muestra y se obtiene:

* n = 36
* media = 32 minutos
* desviación estándar = 6
* $\alpha$ = 0.05

1. Planteamos hipótesis

$$
H_0: \mu = 30
$$

$$
H_1: \mu \neq 30
$$

2. Calculamos estadístico Z

$$
Z = \frac{\bar{x} - \mu}{\sigma/\sqrt{n}}
$$

Dónde:
* $\bar{x}$ = media muestral = 32
* $\mu$ = media hipotética = 30
* $\sigma$ = desviación estándar = 6
* $n$ = tamaño de muestra = 36

$$
Z = \frac{32 - 30}{6/\sqrt{36}}
$$

$$
Z = \frac{2}{1}
$$

$$
Z = 2
$$

3. Obtener el valor de p:

Para Z = 2, el valor p es aproximadamente 0.0455 (usando una tabla de distribución normal estándar o una calculadora estadística).

4. Comparar con $\alpha$:

Dado que 0.0455 < 0.05, llegamos a la conclusión de que:

**Se rechaza $H_0$**

Ahora expliquemos un poco más a fondo como interpretar este resultado y los pasos que hemos realizado:

Primero que nada entendamos algo sobre este ejercicio: tenemos una **población** en la que el tiempo de entrega promedio es desconocido, pero la empresa afirma que es de 30 minutos. Entonces tomamos una muestra de 36 entregas y obtenemos una media de 32 minutos con una desviación estándar de 6 minutos. Queremos calcular que tan compatible es esta media muestral de 32 minutos con la afirmación de que el tiempo promedio de la población es de 30 minutos.

La fórmula para obtener Z lo que hace es estandarizar la diferencia entre la media muestral (32 minutos, **LO OBSERVADO POR NOSOTROS**) y la media hipotética (30 minutos, **LO AFIRMADO POR LA EMPRESA**) en términos de desviaciones estándar.

El Z calculado de 2 indica que la media muestral está a 2 desviaciones estándar por encima de la media hipotética de 30 minutos, es decir que: Si realmente el tiempo de entrega promedio fuera de 30 minutos, obtener una media muestral de 32 minutos (tal como nos sucede) sería un resultado que está 2 desviaciones estándar por encima de lo esperado.

Cuando trabajamos con una distribución normal estándar, aproximadamente un 95% de los valores están entre -1.96 y 1.96, el 5% está fuera de ese rango (2.5% en cada cola). Entonces, si asumiéramos que $H_0$ es verdadera, esperaríamos que la media muestral normalmente caiga cerca de 30 minutos, pero obtener un Z de 2 implica que con ese valor de 32 minutos estamos en una zona que ocurre aproximadamente el 4.55% de las veces (valor p bilateral), lo que es menor que nuestro nivel de significancia del 5%.

> Es decir, si el promedio real fuera de 30, solo en un 4.55% de las muestras podríamos obtener una diferencia igual o mayor que 32 minutos por puro azar. O sea que esos 32 minutos serían muy raros de obtener si realmente el tiempo promedio fuera de 30 minutos.

Realmente una prueba de hipótesis no nos dice que $H_0$ es verdadera o falsa, NO estamos diciendo que el tiempo de entrega es **definitivamente** diferente a 30 minutos, sino que estamos diciendo que **existe evidencia estadística significativa** para concluir que el tiempo promedio de entrega es diferente de 30 minutos.

La conclusión formal sería:
> Con un nivel de significancia del 5%, los datos observados son suficientemente incompatibles con la afirmación de que el tiempo promedio de entrega es de 30 minutos, por lo que rechazamos la hipótesis nula.

---

Haciendo un paréntesis.

Otra forma equivalente de analizar el problema es mediante un intervalo de confianza del 95% para la media poblacional.

La fórmula del intervalo es:

$$
IC = \bar{x} \pm Z \left(\frac{\sigma}{\sqrt{n}}\right)
$$

Sabemos que $\bar{x} = 32$, $Z = 1.96$, $\sigma = 6$ y $n = 36$.

$$
IC = 32 \pm 1.96 \left(\frac{6}{\sqrt{36}}\right)
$$

$$
IC = 32 \pm 1.96 (1)
$$

$$
IC = (30.04 , 33.96)
$$

**El valor 30 NO está dentro del intervalo de confianza**

Eso significa que, con un 95% de confianza, el verdadero promedio no es 30 minutos.

Rechazar $H_0$ al 5% es exactamente equivalente a que el valor hipotético (30) quede fuera del intervalo de confianza del 95%.

Las pruebas bilaterales y los intervalos de confianza cuentan la misma historia, solo desde perspectivas diferentes.

---

Regresando a la conclusión anterior:

**No es lo mismo a decir: "Es poco probable que el tiempo de entrega promedio sea de 30 minutos"**

La prueba clásica no cálcula:

$P(H_0 | datos)$ - es decir,  la probabilidad de que $H_0$ sea verdadera dado los datos que tenemos

Sino:

$P(datos|H_0)$ - la probabilidad de obtener los datos que tenemos (o más extremos) asumiendo que $H_0$ es verdadera.

Y además es importante tener claros estos 3 puntos:

- **Que no rechazar $H_0$ no es lo mismo que aceptar $H_0$**. Si el valor p hubiera sido mayor que 0.05, simplemente no tendríamos suficiente evidencia para rechazar $H_0$, pero eso no significa que $H_0$ sea verdadera, sino que los datos no nos permiten concluir que es falsa. Recordemos que estamos trabajando con una muestra.
- **Que no existe certeza absoluta**. En este caso existe una probabilidad del 4.55% de cometer un error tipo I (rechazar $H_0$ cuando es verdadera).
- Y además existe la posibilidad de que la **diferencia sea estadísticamente significativa pero no tenga relevancia práctica** (es decir, que la diferencia de 2 minutos no sea importante en la realidad).

Algo interesante que también podemos analizar es el tamaño del efecto. La diferencia que tenemos es de 2 minutos, pero el error estándar es de 1 minuto (es la parte de $\sigma/\sqrt{n}$ del cálculo de Z). Esto hace que la diferencia sea "grande" en términos estadísticos, pero si la muestra hubiera sido de solo 9 personas, el error estándar sería de 2 minutos, y el Z sería de 1, lo que no nos daría suficiente evidencia para rechazar $H_0$.

> La significancia depende del tamaño de muestra. Una diferencia pequeña puede ser significativa si la muestra es grande.

### Sobre los tipos de errores

- **Error tipo I (falso positivo)** Rechazar $H_0$ cuando es verdadera. Por ejemplo, concluir que el tiempo de entrega es diferente a 30 minutos cuando en realidad sí lo es.
- **Error tipo II (falso negativo)** No rechazar $H_0$ cuando es falsa. Por ejemplo, concluir que el tiempo de entrega es igual a 30 minutos cuando en realidad es diferente.

## Importancia en el aprendizaje automático

En aprendizaje automático no es suficiente con comparar métricas y elegir el modelo que tenga el valor más alto. Las métricas que obtenemos (accuracy, precisión, recall, AUC, etc.) son **estimaciones muestrales** del rendimiento real del modelo.

Es decir:

* El dataset que usamos es una **muestra del mundo real**.
* La métrica calculada es un **estadístico**.
* El rendimiento real en producción es un **parámetro poblacional desconocido**.

Entonces, toda comparación entre modelos está sujeta a **variabilidad muestral**. Si tomáramos otra muestra distinta del mismo problema, las métricas cambiarían.

Aquí aparece exactamente el mismo problema que vimos antes:

> ¿La diferencia observada es real o puede explicarse por azar?

Supongamos que comparamos dos modelos de clasificación binaria sobre un conjunto de prueba de 1000 observaciones:

* Modelo A: accuracy = 0.85
* Modelo B: accuracy = 0.80

La diferencia es del 5%, pero ¿es esa diferencia estadísticamente significativa? ¿Realmente el modelo A es mejor que el modelo B, o esa diferencia podría ser producto del azar?

Podríamos por ejemplo construir un intervalo de confianza para el accuracy que nos permita estimar un rango plausible para el rendimiento real del modelo.

Otro caso sería comparar dos modelos sobre el mismo conjunto de prueba (como comúnmente se hace), lo que introduce dependencia entre las observaciones, que es importante tenerlo en cuenta porque:

* No podemos usar pruebas para muestras independientes.
* Necesitamos pruebas para datos pareados.

Algunas herramientas comunes son:

* **Prueba de McNemar**: para comparar accuracy en clasificación binaria.
* **t-test pareado**: cuando usamos validación cruzada y obtenemos múltiples mediciones.
* **Bootstrap**: para estimar la distribución empírica de la diferencia entre modelos.

---