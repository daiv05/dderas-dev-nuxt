---
id: "risk-prediction-model-adolescents-sv-2013"
title: "Modelo de Predicción de Riesgo en Adolescentes (SV 2013)"
slug: "risk-prediction-model-adolescents-sv-2013"
order: 21
date: 2026-06-25
summary: "En este artículo, crearemos modelos de predicción de riesgo en adolescentes utilizando el conjunto de datos del Global School-Based Student Health Survey 2013 para El Salvador."
tags:
  [
    "machine learning",
    "data science",
    "predicción de riesgo",
    "adolescentes",
    "salud pública",
    "global school-based student health survey",
    "gshs 2013",
    "el salvador",
  ]
image: /blog/risk-prediction-model-adolescents-sv-2013/shared/risk-prediction-model.webp
author: David Deras
lastmod: 2026-06-26
sitemap:
  priority: 0.7
  loc: /es/blog/risk-prediction-model-adolescents-sv-2013
  lastmod: 2026-06-26
---

Sería de mayor utilidad si tuviésemos datos más recientes pero desafortunadamente, el conjunto de datos más reciente disponible para El Salvador es del año 2013. A pesar de esto, haremos este ejercicio con el fin de ejemplificar como la inteligencia artificial puede ser un gran apoyo en la resolución de problemas críticos para la sociedad, como lo es la salud de los adolescentes. En este artículo, crearemos dos modelos dentro de un mismo pipeline:

- Uno para predecir el IMC (Índice de Masa Corporal) basado en los hábitos de alimentación y actividad física de los adolescentes.
- Otro para predecir el riesgo de salud mental basado en factores de riesgo psicosociales y de comportamiento.

::table-of-contents
::

---

## La investigación de la salud en adolescentes

La Global School-based Student Health Survey (GSHS) es una encuesta desarrollada por la Organización Mundial de la Salud (OMS), mide los factores de riesgo conductuales y los factores de protección en 10 áreas clave entre jóvenes de 13 a 17 años.

Toda la investigación y reportes se puede encontrar en el sitio web de la OMS, específicamente en la sección de [El Salvador - Global School-based Student Health Survey 2013](https://extranet.who.int/ncdsmicrodata/index.php/catalog/97).

Tambien se puede acceder a otras investigaciones en el mismo sitio web.

> Los datos de esta investigación de GSHS son de acceso público y pueden ser utilizados para fines de investigación. Sin embargo, es importante tener en cuenta los términos y condiciones establecidos en la website de la OMS, y se recomienda revisar y cumplir con dichos términos antes de utilizar los datos para cualquier propósito.

> El dataset NO se incluye en este repositorio ni en el repositorio principal de la investigación, debido a restricciones de la plataforma de la OMS.

## Los datos

La encuesta tiene varias preguntas relacionadas con la salud de los adolescentes, incluyendo hábitos de alimentación, actividad física, salud mental, consumo de sustancias y factores de riesgo psicosociales, en total son 52 preguntas, identificadas con códigos específicos: Q1 hasta Q58, saltandose Q28-Q33.

A parte de estas preguntas, se incluyen variantes derivadas con respuestas en un rango de [1, 2], donde 1 representa la respuesta "Sí" y 2 representa la respuesta "No", para las preguntas [Q6-Q27], [Q34-Q40], [Q44-Q58].

Por último, se incluyen otros indicadores derivados, como de obesidad, sobrepeso, bajo peso, actividad física, consumo de frutas, entre otros, para un total de 11 indicadores derivados.

En total, el conjunto de datos contiene 104 variables, incluyendo las preguntas originales, las variantes derivadas y los indicadores derivados.

Algunas respuestas contienen el valor de: 1.7976931348623157E+308, que representa un valor faltante o desconocido. En esta investigación (en el pipeline), reemplazaremos estos valores con NaN (Not a Number) para su manejo.

## Objetivos

Dividiremos los objetivos en 3 puntos principales:

1. **Limpieza y análisis de datos**: Se hará un análisis exploratorio de los datos para seleccionar las variables más relevantes para cada modelo, así como tener en cuenta la colinealidad entre las variables y la importancia de cada una en los modelos de predicción.
2. **Modelo de predicción del IMC (Índice de Masa Corporal)**: Utilizando los hábitos de alimentación y actividad física de los adolescentes, construiremos un modelo de regresión para predecir el IMC, pero, sin usar las variables de peso y altura directamente.
3. **Modelo de predicción del riesgo de salud mental**: Utilizando algúnos factores de riesgo, como ideas de suicidio, consumo de sustancias, violencia, entre otros, construiremos un modelo de clasificación para predecir el riesgo de salud mental en los adolescentes.

## Limpieza y análisis de datos

Antes de entrenar cualquier modelo, necesitamos entender y preparar los datos. El primer obstáculo es el valor centinela que mencionamos: `1.7976931348623157E+308`. Este número es el **máximo valor representable por un `float64`** según el estándar IEEE 754, y el software de la OMS lo usa para marcar respuestas faltantes o no aplicables.

Por eso, lo primero que hacemos al cargar los datos es reemplazarlo por `NaN`:

```python
import numpy as np
import pandas as pd

SENTINEL_VALUE = 1.79769313486232e+308

def load_raw(path):
    df = pd.read_csv(path)
    df.replace(SENTINEL_VALUE, np.nan, inplace=True)
    return df
```

### Análisis exploratorio

Con los datos ya limpios de centinelas, hacemos un análisis exploratorio (EDA) para entender qué tenemos entre manos. Aquí buscamos dos cosas:

1. **Análisis univariado**: la distribución de cada variable por separado. ¿Cómo se reparten las edades? ¿Cuál es la proporción de hombres y mujeres? ¿Cómo se ve la distribución del IMC?
2. **Análisis bivariado**: cómo se relacionan las variables entre sí y con lo que queremos predecir. Por ejemplo, ¿los estudiantes más activos físicamente tienen un IMC menor? ¿El bullying se asocia con mayor riesgo de salud mental?

Un punto importante del EDA es el **análisis de valores faltantes**. Algunas columnas `QN` son sub-muestras condicionales: solo aplican a quien respondió "sí" a una pregunta previa, como por ejemplo: "entre los estudiantes que bebieron alcohol, ¿cuántos lo hicieron antes de los 14 años?" solo tiene sentido para quienes bebieron, y esto provoca que estas columnas tengan más del 65% de datos faltantes.

> `QN18`, `QN19`, `QN21`, `QN34`, `QN36`, `QN37`, `QN40`, `QN45`, `QN47`, `QN48`, `qnc1g` y `qnc2g`.

Por eso las vamos a **excluir** de nuestras variables predictoras. Usar una variable con un 80% de ausencias introduce más ruido que señal, a parte de que su naturaleza condicional rompería un poco la interpretación del modelo.

### ¿Usamos las preguntas Q o las variantes QN?

Si haz analizado el dataset, esta es probablemente la decisión más importante que se debe tomar, porque NO puedes simplemente usar todas columnas relacionadas "porque asi tengo más información", cada columna `QN` es una **dicotomización** de su pregunta `Q` correspondiente: por ejemplo, `QN7` vale 1 ("Sí") si el estudiante come fruta dos o más veces al día (`Q7 ≥ 4`), y 2 ("No") en caso contrario.

Esto significa que `Q7` y `QN7` están **casi perfectamente correlacionadas**. Si incluyéramos a ambas en el mismo modelo, introduciríamos **colinealidad**, que distorsiona los coeficientes de los modelos y además, no aporta información nueva.

Asi que antes de seguir, tenemos que definir una regla: **nunca mezclar `Q` y `QN` del mismo dominio**.

Pero tampoco podemos hacerlo de manera global para todo el pipeline, recordemos que tenemos 2 modelos, entonces:

| Modelo                           | Familia             | Por qué                                                                                                                                                                                                |
| -------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Regresión (IMC)**              | `Q` (ordinales)     | La escala ordinal conserva información que una binarización pierde. Comer fruta 1 vez al día no es lo mismo que comerla 5 veces, y esa diferencia importa para predecir un valor continuo como el IMC. |
| **Clasificación (salud mental)** | `QN` + demográficas | Los `QN` representan los umbrales clínicos **validados por la OMS**. Aquí la binarización sí es significativa: haber consumido alcohol es un factor de riesgo, sin importar la cantidad exacta.        |

Las variables demográficas (`Q1` edad, `Q2` sexo, `Q3` grado) las usamos en ambos modelos, ya que no tienen una variante `QN` equivalente.

## Nuevas variables

Para cumplir con nuestros objetivos, necesitamos construir algunas variables nuevas.

### IMC

Para la tarea de regresión, calculamos el IMC a partir del peso (`Q5`, en kg) y la estatura (`Q4`, en metros) con la fórmula estándar:

```python
df["bmi"] = df["Q5"] / (df["Q4"] ** 2)
```

Con esto ya tenemos la etiqueta para nuestro modelo.

Sin embargo, aqui debemos aclarar algo, **usaremos `Q4` y `Q5` solo para construir el target, NO los incluiremos como variables predictoras**.

Si los usáramos, predecir el IMC sería trivial (es literalmente su fórmula).

Lo interesante, y lo que queremos averiguar, es cuánto del IMC podemos explicar únicamente con el **estilo de vida** de los estudiantes: alimentación, actividad física y sedentarismo.

### La variable de riesgo de salud mental

El dataset no tiene una única columna de "riesgo grave de salud mental", así que tenemos que construirla.

Analizando las preguntas, encontramos cuatro indicadores que nos dan señales de riesgo de salud mental:

| Columna | Significado                                                         |
| ------- | ------------------------------------------------------------------- |
| `QN24`  | Consideró seriamente el suicidio en los últimos 12 meses (ideación) |
| `QN25`  | Hizo un plan sobre cómo intentar suicidarse (plan)                  |
| `QN26`  | Intentó suicidarse en los últimos 12 meses (intento)                |

Elegir sólo una podría ser un poco restrictivo, y elegir todas podría ser demasiado amplio. Por eso definimos el target como **1 si el estudiante respondió "Sí" a cualquiera de estas tres preguntas**, y 0 en caso contrario:

```python
suicidality = ["QN24", "QN25", "QN26"]
df["mental_health_risk"] = (df[suicidality] == 1).any(axis=1).astype(int)
```

Ya sea que el estudiante mostró ideación, plan o intento de suicidio, cualquiera es una definición interpretable de riesgo de salud mental.

> No olvidemos que al hacer esto, estas mismas variables deben excluirse de las features (si no, le estaríamos filtrando la respuesta al modelo)

### Variables resumidas

Siguiendo con el feature engineering y analizando las demás preguntas, creamos cuatro variables resumidas que capturan los factores de riesgo más importantes:

| Score                     | Rango | Resume                                                      |
| ------------------------- | ----- | ----------------------------------------------------------- |
| `dietary_risk_score`      | 0–4   | Bebidas azucaradas, poca fruta, poca verdura, comida rápida |
| `physical_activity_score` | 0–3   | Actividad ≥60 min, transporte activo, educación física      |
| `substance_risk_score`    | 0–3   | Alcohol reciente, embriaguez, problemas por alcohol         |
| `social_support_score`    | 0–4   | Compañeros amables, supervisión y comprensión parental      |

## Preprocesamiento dentro del pipeline

Antes de entrenar, los datos pasan por tres transformaciones: imputación de faltantes, codificación de categóricas y escalado. La clave es que **todas viven dentro de un `Pipeline` de scikit-learn**, no se aplican "a mano" por separado.

| Tipo de columna                 | Imputación                 | Transformación                    |
| ------------------------------- | -------------------------- | --------------------------------- |
| Categóricas (`Q1`, `Q2`, `Q3`)  | Moda (valor más frecuente) | One-Hot Encoding (`drop='first'`) |
| Ordinales (resto de `Q` y `QN`) | Mediana                    | `StandardScaler`                  |

¿Por qué dentro del pipeline y no antes? Si imputáramos y escaláramos sobre todo el dataset antes de la validación cruzada, los parámetros (la mediana, la media, la varianza) se calcularían usando también los datos de validación. Eso es **fuga de datos** (_data leakage_): el modelo "vería" información del conjunto de prueba durante el entrenamiento, y sus métricas estarían infladas. Al estar dentro del pipeline, scikit-learn recalcula estos parámetros en cada fold usando solo los datos de entrenamiento de ese fold.

Usamos One-Hot Encoding con `drop='first'` para las categóricas: convierte cada categoría en una columna binaria y elimina una de referencia, evitando multicolinealidad en los modelos lineales.

## Modelo de predicción del IMC

Para la regresión entrenamos y comparamos **dos modelos**:

- **Regresión Lineal**: nuestra línea base, simple e interpretable.
- **Random Forest Regressor**: un ensemble de árboles que captura relaciones no lineales e interacciones entre variables.

Ambos se evalúan con **validación cruzada de 5 folds**, y medimos su desempeño con tres métricas: el **RMSE** (raíz del error cuadrático medio) y el **MAE** (error absoluto medio) que queremos minimizar, y el **$R^2$** (coeficiente de determinación) que queremos maximizar.

```python
from sklearn.model_selection import cross_validate

scores = cross_validate(
    pipeline, X, y, cv=5,
    scoring=["r2", "neg_mean_absolute_error", "neg_root_mean_squared_error"],
)
```

Un detalle a anticipar: el $R^2$ de este modelo será **modesto por diseño**. Predecir el IMC solo con comportamiento autorreportado, sin peso ni estatura, es intrínsecamente difícil - el estilo de vida explica una fracción pequeña de la variabilidad del IMC en adolescentes. Y precisamente ese es el hallazgo interesante: nos dice cuánto (o cuán poco) determina el comportamiento al IMC.

## Modelo de predicción del riesgo de salud mental

Esta es una tarea de clasificación binaria, y tiene un reto particular: los datos están **desbalanceados**. Hay muchos más estudiantes sin riesgo detectado que estudiantes en riesgo. Si entrenáramos sin cuidado, el modelo aprendería el atajo de predecir siempre "sin riesgo" y tendría una exactitud alta pero sería inútil.

### Eligiendo las métricas correctas

Por eso **no usamos accuracy como métrica principal**. En su lugar nos enfocamos en:

- El **F1-Score de la clase minoritaria** (los estudiantes en riesgo), que balancea precisión y recall sobre la clase que realmente nos importa.
- El **AUC-ROC**, que mide la capacidad del modelo de distinguir entre las dos clases independientemente del umbral.

### Manejando el desbalance

Combinamos dos estrategias. La primera es `class_weight='balanced'`, que hace que el modelo penalice más los errores sobre la clase minoritaria. La segunda es **SMOTE** (_Synthetic Minority Over-sampling Technique_), que genera ejemplos sintéticos de la clase minoritaria.

Aquí hay un detalle crítico sobre **dónde** aplicar SMOTE. Lo insertamos dentro de un pipeline de `imbalanced-learn`, en este orden:

```python
from imblearn.pipeline import Pipeline as ImbPipeline
from imblearn.over_sampling import SMOTE

ImbPipeline([
    ("preprocessor", preprocessor),    # imputa, codifica y escala
    ("smote", SMOTE(random_state=42)),  # sobremuestrea SOLO en entrenamiento
    ("model", model),
])
```

¿Por qué usar el `Pipeline` de `imbalanced-learn` y no el de scikit-learn? Porque el de `imbalanced-learn` aplica SMOTE **únicamente en los folds de entrenamiento** durante la validación cruzada, nunca en los de validación. Si sobremuestreáramos todo el dataset antes de la CV, habría muestras sintéticas derivadas de los datos de validación filtrándose al entrenamiento - otra forma de fuga de datos que inflaría las métricas.

Para esta tarea también comparamos dos modelos: **Regresión Logística** (lineal, interpretable) y **Random Forest Classifier** (ensemble de árboles).

## Optimización y evaluación

### Ajuste de hiperparámetros

Cada modelo tiene hiperparámetros que ajustar. Usamos **GridSearchCV** para la regresión (espacio de búsqueda pequeño, prueba todas las combinaciones) y **RandomizedSearchCV** para la clasificación (espacio mayor, prueba combinaciones aleatorias de forma más eficiente).

| Modelo                   | Hiperparámetros explorados                                                           |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `RandomForestRegressor`  | `n_estimators`, `max_depth`, `min_samples_split`, `min_samples_leaf`, `max_features` |
| `LogisticRegression`     | `C`, `penalty` (`l1`/`l2`), `solver=saga`                                            |
| `RandomForestClassifier` | `n_estimators`, `max_depth`, `min_samples_leaf`, `max_features`                      |

### Evaluando los resultados

Para la regresión reportamos MAE, RMSE y $R^2$. Para la clasificación, además del F1 de la clase minoritaria y el AUC-ROC, generamos una **matriz de confusión** normalizada que nos muestra dónde se equivoca el modelo: cuántos estudiantes en riesgo detecta correctamente y cuántos se le escapan.

#### Regresión del IMC

Las métricas sobre el conjunto de prueba, son, bastante reveladoras:

| Modelo | MAE | RMSE | $R^2$ |
| --- | --- | --- | --- |
| Regresión Lineal | 2.95 | 3.89 | −0.00 |
| Random Forest | 3.19 | 4.08 | −0.10 |

El **$R^2$ es prácticamente cero (o incluso negativo)**. Un $R^2$ negativo significa que el modelo predice *peor* que simplemente usar siempre el IMC promedio. En otras palabras: los hábitos de alimentación, higiene y actividad física que reportaron los estudiantes **no contienen información suficiente para predecir su IMC**.

Recordemos que deliberadamente excluimos el peso y la estatura. El IMC de un adolescente depende fuertemente de factores que no están en estas variables: genética, etapa de desarrollo puberal, composición corporal, y la imprecisión inherente del comportamiento que ellos mismos reportan. El error medio (MAE ≈ 3 puntos de IMC) es grande considerando que la desviación del IMC en la muestra ronda los 4 puntos.

El modelo nos confirma, con datos, que **el estilo de vida autorreportado explica muy poco de la variabilidad del IMC**.

#### Clasificación del riesgo de salud mental

Aquí los resultados son mucho más útiles:

| Modelo | Accuracy | F1 (clase en riesgo) | AUC-ROC |
| --- | --- | --- | --- |
| Regresión Logística | 0.76 | **0.56** | **0.79** |
| Random Forest | 0.82 | 0.40 | 0.76 |

Aunque el Random Forest tiene mayor *accuracy* (0.82), eso es engañoso: alcanza esa cifra prediciendo bien la clase mayoritaria (sin riesgo) pero fallando en la que importa. La **Regresión Logística es el mejor modelo** para nuestro objetivo, con un F1 de la clase minoritaria de 0.56 y un AUC-ROC de 0.79, buena capacidad de discriminar entre estudiantes en riesgo y sin riesgo. Este es justo el caso donde elegir la métrica correcta cambia qué modelo consideramos "mejor".

La **matriz de confusión** del modelo logístico muestra el balance entre detectar verdaderos casos de riesgo y las falsas alarmas:

![Matriz de confusión - Regresión Logística](/blog/risk-prediction-model-adolescents-sv-2013/shared/confusion_matrix_logistic.webp)
_Matriz de confusión_

También analizamos la **importancia de características**, que nos dice qué factores pesan más en cada predicción. Para Random Forest usamos su atributo `feature_importances_`; para los modelos lineales, el valor absoluto de los coeficientes.

![Importancia de características - Riesgo de salud mental](/blog/risk-prediction-model-adolescents-sv-2013/shared/feature_importance_mental_health.webp)
_Importancia de características_

Los factores afectivos (soledad frecuente e insomnio por preocupación) y el consumo de sustancias aparecen entre los predictores más fuertes del riesgo de suicidalidad, mientras que el apoyo familiar y escolar actúa en la dirección opuesta, como factor protector.

### Análisis de ablación

Como análisis complementario hacemos un estudio de **ablación leave-one-group-out**. Agrupamos las variables por dominio (demografía, dieta, violencia, sustancias, apoyo social, etc.) y entrenamos el modelo quitando un grupo a la vez. Comparando la caída de desempeño respecto al modelo completo, medimos cuánto aporta cada dominio.

Partiendo de un F1 base de **0.491**, esto fue lo que pasó al retirar cada grupo:

| Grupo retirado | F1 resultante | Δ vs. base |
| --- | --- | --- |
| _(ninguno - base)_ | 0.491 | - |
| **affective** (soledad, insomnio) | 0.437 | **−0.054** |
| substance_use (alcohol, drogas, sexo) | 0.471 | −0.020 |
| demographics (edad, sexo, grado) | 0.486 | −0.005 |
| violence_bullying | 0.491 | 0.000 |
| social_support | 0.494 | +0.003 |
| physical_activity | 0.500 | +0.008 |
| diet_nutrition | 0.502 | +0.011 |

El resultado más claro: el grupo **afectivo** (soledad e insomnio por preocupación) es con diferencia el más valioso, quitarlo hace caer el F1 en 0.054. Esto valida que a pesar de que usamos (y por ende ignoramos después para evitar data leakage) las variables de suicidalidad, dejamos libres la soledad y el insomnio para usarlas como predictores, y resultaron ser justo las más informativos. El consumo de sustancias también aporta. En cambio, retirar dieta o actividad física *mejora* ligeramente el modelo, lo que sugiere que esos grupos aportan más ruido que señal para predecir riesgo.

## Conclusión

A lo largo de este pipeline construimos dos modelos sobre los mismos datos pero con propósitos muy distintos, y obtuvimos dos resultados muy diferentes:

- El **modelo de IMC fracasó en predecir** ($R^2$ = 0), y nos hace concluir que el comportamiento autorreportado de alimentación e higiene no basta para inferir el IMC de un adolescente.
- El **modelo de riesgo de salud mental funcionó razonablemente bien** (AUC-ROC de 0.79, F1 de 0.56 sobre la clase en riesgo), y la ablación nos mostró que los síntomas afectivos son sus predictores más fuertes.

También resaltar algunas decisiones técnicas que tomamos en el camino:

- Tratar los valores faltantes (y los centinelas disfrazados de números válidos) antes que nada.
- Detenerse a analizar y elegir entre variables correlacionadas para evitar colinealidad.
- Encapsular todo el preprocesamiento **dentro** del pipeline.
- Elegir métricas honestas cuando las clases están desbalanceadas: el modelo con mayor *accuracy* no fue el mejor para nuestro objetivo.

