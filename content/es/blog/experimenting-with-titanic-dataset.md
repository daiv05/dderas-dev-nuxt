---
id: "experimenting-with-titanic-dataset"
title: "Experimentando con el dataset de supervivencia del Titanic"
slug: "experimenting-with-titanic-dataset"
order: 6
date: 2026-04-23
summary: "Exploremos el dataset de supervivencia del Titanic utilizando técnicas de análisis exploratorio de datos (EDA) para descubrir patrones y relaciones entre las características de los pasajeros y su supervivencia."
tags:
  [
    "aprendizaje automático",
    "análisis de datos",
    "EDA",
    "proyectos de machine learning",
    "análisis exploratorio",
  ]
image: /blog/experimenting-with-titanic-dataset/shared/titanic.webp
author: David Deras
lastmod: 2026-04-23
sitemap:
  priority: 0.7
  loc: /es/blog/experimenting-with-titanic-dataset
  lastmod: 2026-04-23
---

Esta vez vamos a experimentar con el EDA (Análisis Exploratorio de Datos) usando el dataset de supervivencia del Titanic.

En el artículo anterior de esta serie de Machine Learning realizamos un ejercicio similar para una tienda de café: [Experimentando con el análisis exploratorio de datos](https://deras.dev/es/blog/experimenting-with-exploratory-data-analysis)

::table-of-contents
::

---

## Un Ejercicio Práctico: El Dataset del Titanic

El dataset del Titanic es un clásico en aprendizaje automático. Incluye información de los pasajeros (edad, sexo, clase, tarifa, puerto de embarque, etc.) y la variable objetivo `survived`, que indica si la persona sobrevivió (`1`) o no (`0`).

Lo vamos a usar para practicar un flujo completo, pero esta vez con un enfoque más orientado a técnicas de limpieza y evaluación:

1. Carga y revisión inicial.
2. Limpieza y transformación de variables.
3. EDA con visualizaciones.
4. Preparación para modelado.
5. Entrenamiento y evaluación con varias métricas.

Puedes ver el notebook completo con el código y visualizaciones aquí: <a href="https://colab.research.google.com/drive/1-yoNx_d1vY0TVCyx-1PLi1lGXQLbMMYC?usp=sharing" target="_blank" rel="noopener noreferrer">EDA with the Titanic dataset</a>

### 1. Carga y Exploración Inicial

Comenzamos importando librerías, cargando el dataset y revisando estructura/tipos para entender con qué estamos trabajando.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Estilo base de gráficas
sns.set_style('whitegrid')
plt.rcParams['figure.figsize'] = (12, 8)

# Cargar dataset
df_raw = sns.load_dataset('titanic')
df = df_raw.copy()

print('Primeras 5 filas del dataset original:')
display(df.head())

print(f"\nDimensión del dataset: {df.shape[0]} filas x {df.shape[1]} columnas")
print('\nTipos de datos por columna:')
display(df.dtypes.to_frame(name='dtype'))
```

Aquí observamos una mezcla de variables numéricas y categóricas, además de columnas con nulos (por ejemplo `deck`) y algunas variables redundantes (`alive` vs `survived`, `class` vs `pclass`).

| survived | pclass | sex    | age | sibsp | parch | fare    | embarked | class | who   | adult_male | deck | embark_town | alive | alone |
| :------- | :----- | :----- | :-- | :---- | :---- | :------ | :------- | :---- | :---- | :--------- | :--- | :---------- | :---- | :---- |
| 0        | 3      | male   | 22  | 1     | 0     | 7.25    | S        | Third | man   | True       | NaN  | Southampton | no    | False |
| 1        | 1      | female | 38  | 1     | 0     | 71.2833 | C        | First | woman | False      | C    | Cherbourg   | yes   | False |
| 1        | 3      | female | 26  | 0     | 0     | 7.925   | S        | Third | woman | False      | NaN  | Southampton | yes   | True  |
| 1        | 1      | female | 35  | 1     | 0     | 53.1    | S        | First | woman | False      | C    | Southampton | yes   | False |
| 0        | 3      | male   | 35  | 0     | 0     | 8.05    | S        | Third | man   | True       | NaN  | Southampton | no    | True  |

### 2. Valores Nulos y Limpieza de Datos

Ahora aplicamos una limpieza base, enfocada en:

1. Eliminar columnas muy incompletas o redundantes.
2. Imputar nulos estratégicamente.
3. Codificar variables categóricas.

> Con imputar nos referimos a rellenar los valores faltantes con alguna estrategia (mediana, moda, etc.) para no perder filas completas, de manera que podamos seguir usando esa información, pero sin introducir sesgos o ruido innecesario.

```python
print('Valores nulos por columna (dataset original):')
print(df.isnull().sum().sort_values(ascending=False))

# Limpieza base
cols_to_drop = ['deck', 'embark_town', 'alive', 'class', 'who', 'adult_male']
df = df.drop(columns=cols_to_drop)

# Imputación
df['age'] = df['age'].fillna(df['age'].median())
df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])

# Codificación
df['sex'] = df['sex'].map({'male': 0, 'female': 1})
df = pd.get_dummies(df, columns=['embarked'], drop_first=True, dtype=int)

print('\nValores nulos totales después de limpieza:')
print(df.isnull().sum().sum())
```

Usamos mediana para `age` porque es robusta ante outliers, y moda para `embarked` porque es categórica.

> La mediana es el valor que se encuentra en el medio de un conjunto de datos ordenados, lo que la hace menos sensible a valores extremos (outliers) que podrían distorsionar la media. Por eso es común usarla para imputar edades, donde pueden haber pasajeros muy jóvenes o muy ancianos.

> La moda es el valor más frecuente en una columna, lo que la hace adecuada para variables categóricas como `embarked`, donde queremos rellenar los nulos con la categoría más común sin introducir nuevas categorías o sesgos.

También aplicamos One-Hot Encoding en `embarked` con `drop_first=True` para evitar multicolinealidad.

**Detengámonos un momento en esto**: al aplicar One-Hot Encoding a una variable con `n` categorías, se crean `n` columnas binarias (una para cada categoría).

Pasa de ser una sola columna como:
| embarked |
| :------- |
| S |
| C |
| Q |

A tres columnas binarias:

| embarked_C | embarked_Q | embarked_S |
| :--------- | :--------- | :--------- |
| 0          | 0          | 1          |
| 1          | 0          | 0          |
| 0          | 0          | 1          |

El problema es que si se incluyen todas, siempre se puede deducir una a partir de las otras (porque si no es C ni Q, entonces necesariamente es S), lo que genera **multicolinealidad**, es decir, información repetida que puede confundir a modelos como la regresión lineal o logística y hacer inestables sus resultados. Entonces, al usar drop_first=True, se elimina una de las categorías y esa pasa a ser la **referencia implícita**, evitando esa redundancia y haciendo que el modelo funcione de forma más estable y clara.

Con referencia implícita nos referimos a que, si `embarked_S` es 0 y `embarked_Q` es 0, entonces por descarte sabemos que el pasajero embarcó en C, sin necesidad de una columna explícita para eso.

Revisamos cómo quedó el dataset:

```python
print('Primeras 5 filas después del preprocesamiento:')
display(df.head())

print('\nResumen estadístico de variables numéricas:')
display(df.describe().T)
```

| survived | pclass | sex | age | sibsp | parch | fare    | alone | embarked_Q | embarked_S |
| :------- | :----- | :-- | :-- | :---- | :---- | :------ | :---- | :--------- | :--------- |
| 0        | 3      | 0   | 22  | 1     | 0     | 7.25    | False | 0          | 1          |
| 1        | 1      | 1   | 38  | 1     | 0     | 71.2833 | False | 0          | 0          |
| 1        | 3      | 1   | 26  | 0     | 0     | 7.925   | True  | 0          | 1          |
| 1        | 1      | 1   | 35  | 1     | 0     | 53.1    | False | 0          | 1          |
| 0        | 3      | 0   | 35  | 0     | 0     | 8.05    | True  | 0          | 1          |

|            | count | mean      | std       | min  | 25%    | 50%     | 75% | max      |
| :--------- | :---- | :-------- | :-------- | :--- | :----- | :------ | :-- | :------- |
| survived   | 891   | 0.383838  | 0.486592  | 0    | 0      | 0       | 1   | 1        |
| pclass     | 891   | 2.308642  | 0.836071  | 1    | 2      | 3       | 3   | 3        |
| sex        | 891   | 0.352413  | 0.47799   | 0    | 0      | 0       | 1   | 1        |
| age        | 891   | 29.361582 | 13.019697 | 0.42 | 22     | 28      | 35  | 80       |
| sibsp      | 891   | 0.523008  | 1.102743  | 0    | 0      | 0       | 1   | 8        |
| parch      | 891   | 0.381594  | 0.806057  | 0    | 0      | 0       | 0   | 6        |
| fare       | 891   | 32.204208 | 49.693429 | 0    | 7.9104 | 14.4542 | 31  | 512.3292 |
| embarked_Q | 891   | 0.08642   | 0.281141  | 0    | 0      | 0       | 0   | 1        |
| embarked_S | 891   | 0.725028  | 0.446751  | 0    | 0      | 1       | 1   | 1        |

De esta estadística descriptiva vemos que la edad tiene un rango amplio (desde bebés hasta ancianos), y que la tarifa (`fare`) también varía mucho, con algunos pasajeros pagando tarifas muy altas (probablemente de primera clase).

### 3. EDA: Distribuciones y Relaciones

Con los datos limpios, comencemos a explorar visualmente:

#### Distribución de la variable objetivo

```python
plt.figure(figsize=(7, 5))
ax = sns.countplot(data=df, x='survived', palette='viridis', hue='survived', legend=False)
plt.title('Distribución de Supervivencia (0 = No, 1 = Sí)')
plt.xlabel('Sobrevivió')
plt.ylabel('Cantidad de pasajeros')

# Etiquetas de porcentaje
total = len(df)
for p in ax.patches:
  height = p.get_height()
  ax.annotate(f'{(height/total)*100:.1f}%',
        (p.get_x() + p.get_width() / 2, height),
        ha='center', va='bottom', fontsize=10, xytext=(0, 4),
        textcoords='offset points')

plt.tight_layout()
plt.show()
```

![Distribución de Supervivencia](/blog/experimenting-with-titanic-dataset/shared/survived_distribution.webp)
_De los 891 pasajeros, aproximadamente el 38% sobrevivió._

Vemos una clase negativa más frecuente (más pasajeros NO sobrevivieron), así que conviene evaluar algo más que **exactitud**.

#### Supervivencia por sexo y clase

```python
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

sns.barplot(data=df, x='sex', y='survived', ax=axes[0], palette='Set2', hue='sex', legend=False)
axes[0].set_title('Tasa de Supervivencia por Sexo (0 = Hombre, 1 = Mujer)')
axes[0].set_xlabel('Sexo')
axes[0].set_ylabel('Tasa media de supervivencia')

sns.barplot(data=df, x='pclass', y='survived', ax=axes[1], palette='Set2', hue='pclass', legend=False)
axes[1].set_title('Tasa de Supervivencia por Clase del Boleto')
axes[1].set_xlabel('Clase del boleto')
axes[1].set_ylabel('Tasa media de supervivencia')

plt.tight_layout()
plt.show()
```

![Tasa de Supervivencia por Sexo y Clase](/blog/experimenting-with-titanic-dataset/shared/survival_by_sex_and_class.webp)
_Mayor supervivencia en mujeres, además de una tendencia positiva cuanto mayor es la clase._

Se mantiene un patrón esperado: mayor supervivencia en mujeres y en clases más altas.

#### Matriz de correlación

```python
corr = df.corr(numeric_only=True)
plt.figure(figsize=(10, 8))
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', square=True, linewidths=0.4)
plt.title('Matriz de Correlación de Variables')
plt.tight_layout()
plt.show()
```

![Matriz de Correlación](/blog/experimenting-with-titanic-dataset/shared/correlation_matrix.webp)
_Matriz de correlación_

`survived` es nuestra variable objetivo, así que nos interesa ver qué variables influyen más:

* **`sex` (0.54)** - correlación positiva moderada-alta.
  El sexo influye bastante en la supervivencia.

* **`pclass` (-0.34)** - correlación negativa moderada.
  A menor clase (3ra clase = número mayor), menor probabilidad de sobrevivir.

* **`fare` (0.26)** - correlación positiva baja-moderada.
  A mayor tarifa pagada, mayor probabilidad de sobrevivir (relacionado con clase).

* **`alone` (-0.20)** - correlación negativa leve.
  Viajar solo disminuye ligeramente la probabilidad de sobrevivir.

* **`age` (-0.06)** - casi no hay relación lineal, es decir, la edad no influye de forma clara en la supervivencia para este caso.

Busquemos otras correlaciones altas entre variables independientes:

* **`sibsp` y `parch` (0.41)**
  Relación moderada. Ambas miden familiares a bordo.

* **`sibsp` y `alone` (-0.58)**
  Fuerte relación negativa. Aunque bueno, es de esperar que si tienes hermanos/esposos a bordo, no viajas solo (?).

* **`parch` y `alone` (-0.58)**
  Igual lógica: si tienes padres/hijos a bordo, no viajas solo.

* **`pclass` y `fare` (-0.55)**
  Fuerte correlación negativa. Mejor clase -> mayor precio.

Con lo anterior hemos detectado que algunas variables contienen información similar.

* **`embarked_Q` y `embarked_S` (-0.50)**
  Tiene sentido porque si una es 1, la otra probablemente es 0.
  Esto es típico cuando se crean variables dummy, y por eso normalmente se usa `drop_first=True` para evitar redundancia perfecta.

Veámos ahora la relación entre `age` y `fare` con `survived` usando boxplots:

```python
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

sns.boxplot(data=df, x='survived', y='age', ax=axes[0])
axes[0].set_title('Distribución de Edad por Supervivencia')
axes[0].set_xlabel('Supervivencia')
axes[0].set_ylabel('Edad')

sns.boxplot(data=df, x='survived', y='fare', ax=axes[1])
axes[1].set_title('Distribución de Tarifa por Supervivencia')
axes[1].set_xlabel('Supervivencia')
axes[1].set_ylabel('Tarifa')

plt.tight_layout()
plt.show()
```

![Boxplots de Edad y Tarifa por Supervivencia](/blog/experimenting-with-titanic-dataset/shared/boxplots_age_fare.webp)
_Boxplots de Edad y Tarifa por Supervivencia_

Los boxplots muestran cómo se distribuyen la edad y la tarifa según si la persona sobrevivió o no. En el caso de la edad, las cajas y las líneas centrales (medianas) son muy parecidas entre ambos grupos, lo que indica que la edad, en general, no marca una diferencia clara en la supervivencia. Sin embargo, se observan algunos valores extremos como niños muy pequeños y personas mayores, lo que sugiere que podrían existir diferencias si se analizan por grupos de edad. En cambio, en el gráfico de la tarifa sí se nota una diferencia más clara: las personas que sobrevivieron pagaron, en promedio, tarifas más altas.

Esto indica que el precio del boleto (relacionado con la clase social) tuvo mayor influencia en la probabilidad de sobrevivir que la edad.

#### Ingeniería de variables y análisis por tasa de supervivencia

Para profundizar el EDA, ahora crearemos nuevas variables y analizamos combinaciones entre categóricas y numéricas usando **tasas de supervivencia** (media de `survived`) en lugar de solo conteos.

##### 1) Crear `family_size`

Esto nos da una idea del tamaño del grupo familiar a bordo, lo que podría influir en la supervivencia (por ejemplo, familias grandes podrían tener más dificultades para evacuar).

```python
# family_size = pasajero + familiares cercanos a bordo
df['family_size'] = df['sibsp'] + df['parch'] + 1

print('Resumen de family_size:')
display(df['family_size'].describe())

plt.figure(figsize=(8, 5))
sns.countplot(data=df, x='family_size', palette='crest', hue='family_size', legend=False)
plt.title('Distribución de Family Size')
plt.xlabel('Tamaño de familia')
plt.ylabel('Cantidad de pasajeros')
plt.tight_layout()
plt.show()
```

##### 2) Agrupar edad en bins (`age_group`)

Aqui podemos crear grupos de edad para ver si hay diferencias más claras en supervivencia entre niños, jóvenes, adultos y ancianos.

```python
age_bins = [0, 12, 18, 35, 60, np.inf]
age_labels = ['child', 'teen', 'young_adult', 'adult', 'senior']

df['age_group'] = pd.cut(df['age'], bins=age_bins, labels=age_labels, right=False)

print('Distribución por grupos de edad:')
display(df['age_group'].value_counts(dropna=False).sort_index())
```

##### 3) Aplicar transformación logarítmica a `fare`

Al aplicar logaritmo, reducimos el impacto de valores extremos y podemos visualizar mejor la distribución de tarifas.

```python
# log1p maneja correctamente tarifas en 0
df['fare_log'] = np.log1p(df['fare'])

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

sns.histplot(df['fare'], kde=True, ax=axes[0], color='#2a9d8f')
axes[0].set_title('Distribución original de Fare')
axes[0].set_xlabel('Fare')

sns.histplot(df['fare_log'], kde=True, ax=axes[1], color='#e76f51')
axes[1].set_title('Distribución transformada: log(1 + Fare)')
axes[1].set_xlabel('Fare (log1p)')

plt.tight_layout()
plt.show()
```

##### 4) Tablas cruzadas

Gráficamos combinaciones de variables categóricas para ver cómo se distribuyen los pasajeros según sexo, clase, grupos de edad y tarifas agrupadas.

```python
# sex + pclass (recordatorio: sex esta codificado 0=male, 1=female)
ct_sex_pclass = pd.crosstab(df['sex'], df['pclass'], margins=True)
print('Tabla cruzada: sex + pclass')
display(ct_sex_pclass)

# pclass + fare (fare agrupado por cuantiles)
df['fare_group'] = pd.qcut(df['fare'], q=4, labels=['Q1', 'Q2', 'Q3', 'Q4'])
ct_pclass_fare = pd.crosstab(df['pclass'], df['fare_group'], margins=True)
print('Tabla cruzada: pclass + fare_group')
display(ct_pclass_fare)

# age_group + survived
ct_age_survived = pd.crosstab(df['age_group'], df['survived'], margins=True)
print('Tabla cruzada: age_group + survived')
display(ct_age_survived)
```

##### 5) Visualizar **survival rate** en lugar de solo distribución

Ahora vamos a graficar la tasa de supervivencia (media de `survived`) para combinaciones clave, lo que nos da una visión más clara de cómo cambian las probabilidades de sobrevivir según diferentes características.

```python
fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# Survival rate por combinacion sex + pclass
survival_sex_pclass = (
  df.groupby(['sex', 'pclass'])['survived']
  .mean()
  .reset_index()
)
sns.barplot(
  data=survival_sex_pclass,
  x='pclass',
  y='survived',
  hue='sex',
  palette='Set2',
  ax=axes[0]
)
axes[0].set_title('Survival Rate por Sexo y Clase')
axes[0].set_xlabel('Clase')
axes[0].set_ylabel('Tasa de supervivencia')
axes[0].set_ylim(0, 1)
axes[0].legend(title='Sexo (0=male, 1=female)')

# Survival rate por pclass + fare_group
survival_pclass_fare = (
  df.groupby(['pclass', 'fare_group'], observed=False)['survived']
  .mean()
  .reset_index()
)
sns.barplot(
  data=survival_pclass_fare,
  x='pclass',
  y='survived',
  hue='fare_group',
  palette='viridis',
  ax=axes[1]
)
axes[1].set_title('Survival Rate por Clase y Cuartil de Fare')
axes[1].set_xlabel('Clase')
axes[1].set_ylabel('Tasa de supervivencia')
axes[1].set_ylim(0, 1)
axes[1].legend(title='Fare group')

# Survival rate por age_group
survival_age = df.groupby('age_group', observed=False)['survived'].mean().reset_index()
sns.barplot(data=survival_age, x='age_group', y='survived', palette='mako', hue='age_group', legend=False, ax=axes[2])
axes[2].set_title('Survival Rate por Grupo de Edad')
axes[2].set_xlabel('Grupo de edad')
axes[2].set_ylabel('Tasa de supervivencia')
axes[2].set_ylim(0, 1)

plt.tight_layout()
plt.show()
```

Aquí ya se observan patrones mucho más claros y estructurales en los datos.

Primero, el **tamaño de familia** muestra que la mayoría de pasajeros viajaban solos (family size = 1) y que los grupos grandes eran poco comunes. Esto sugiere que las variables relacionadas con familia están muy concentradas en valores bajos y que viajar solo es el caso dominante, lo cual puede influir en el modelo.

En la **tarifa**, la distribución original está fuertemente sesgada a la derecha: la mayoría pagó poco y unos pocos pagaron cantidades muy altas. Al aplicar la transformación logarítmica (log(1 + fare)), la distribución se vuelve mucho más equilibrada y manejable para modelos estadísticos, reduciendo el impacto de valores extremos.

En la **supervivencia por sexo y clase**, el patrón es contundente: las mujeres sobreviven mucho más que los hombres en todas las clases, y la primera clase tiene mayores tasas de supervivencia. Esto reafirma que el sexo y la clase social fueron factores determinantes en la supervivencia.

Cuando se analiza **clase junto con cuartiles de tarifa**, se confirma que pagar más dentro de cada clase generalmente aumenta la probabilidad de sobrevivir, especialmente en primera y segunda clase. Esto refuerza la importancia del estatus socioeconómico.

Finalmente, la **supervivencia por grupo de edad** indica que los niños tienen mayor tasa de supervivencia, mientras que los adultos mayores tienen la menor. Esto demuestra que la edad sí influye, pero de forma segmentada (no lineal), algo que la correlación simple no lograba mostrar.

En conjunto, estos gráficos revelan que la supervivencia no dependió de un solo factor aislado, sino de la combinación de sexo, clase social, tarifa pagada y grupo de edad.

### 4. Preparación para Modelado

Antes de entrenar, separamos features/target, hacemos split estratificado y escalamos variables continuas (`age`, `fare`).

```python
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler

# Features y target
X = df.drop(columns=['survived'])
y = df['survived']

# Split estratificado 80/20
X_train, X_test, y_train, y_test = train_test_split(
  X, y, test_size=0.2, random_state=42, stratify=y
)

print('Distribución de clases en entrenamiento:')
print(y_train.value_counts(normalize=True).rename('proporcion').round(3))

# Escalado de variables continuas
scaler = StandardScaler()
cols_to_scale = ['age', 'fare']

X_train_scaled = X_train.copy()
X_test_scaled = X_test.copy()

X_train_scaled[cols_to_scale] = scaler.fit_transform(X_train[cols_to_scale])
X_test_scaled[cols_to_scale] = scaler.transform(X_test[cols_to_scale])

print('\nForma de train:', X_train_scaled.shape)
print('Forma de test:', X_test_scaled.shape)
```

### 5. Baseline con Regresión Logística

Entrenamos una regresión logística con `class_weight='balanced'` para manejar mejor el desbalance relativo de clases.

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(random_state=42, max_iter=1000, class_weight='balanced')
model.fit(X_train_scaled, y_train)

y_pred = model.predict(X_test_scaled)
y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]

# Validación cruzada en entrenamiento
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_auc = cross_val_score(model, X_train_scaled, y_train, cv=cv, scoring='roc_auc')

print(f'ROC-AUC en validación cruzada (train): {cv_auc.mean():.3f} +/- {cv_auc.std():.3f}')
```

Dando como resultado:

```
Cross-validated ROC-AUC (train, mean +/- std): 0.856 +/- 0.021
```

En términos simples:
Si se toma al azar una persona que sobrevivió y otra que no, el modelo tiene aproximadamente 85.6% de probabilidad de asignar mayor probabilidad al que realmente sobrevivió... Tal vez esto no suene muy claro, asi que veámoslo de otra forma:

1. Tomas a un pasajero que sobrevivió.
2. Tomas a otro pasajero que no sobrevivió.
3. Le preguntamos al modelo ¿Qué probabilidad le das a cada uno de haber sobrevivido?
4. El modelo le asigna una probabilidad de supervivencia a cada uno, por ejemplo, 0.8 para el sobreviviente y 0.3 para el no sobreviviente.

Si el pasajero que realmente sobrevivió tiene una probabilidad asignada más alta que el que no sobrevivió, entonces el modelo acertó en esa comparación. El ROC-AUC mide la proporción de veces que esto ocurre a lo largo de todas las posibles combinaciones de pasajeros sobrevivientes y no sobrevivientes.

> **ROC-AUC** (Receiver Operating Characteristic - Area Under the Curve) es una métrica que evalúa la capacidad de un modelo para distinguir entre clases. En este caso, mide qué tan bien el modelo puede diferenciar entre pasajeros que sobrevivieron y los que no.
> Va de 0.5 (azar total) a 1.0 (clasificación perfecta).
> 0.856 indica que el modelo tiene una muy buena capacidad de discriminación.

### 6. Evaluación Completa del Modelo

Además del `classification_report`, agregamos métricas globales y curvas complementarias para tener una visión más realista del rendimiento.

```python
from sklearn.metrics import (
  classification_report,
  confusion_matrix,
  roc_auc_score,
  roc_curve,
  precision_recall_curve,
  average_precision_score,
  accuracy_score,
  f1_score,
  precision_score,
  recall_score,
  ConfusionMatrixDisplay,
)

# Métricas principales
acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
rec = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_pred_proba)
ap = average_precision_score(y_test, y_pred_proba)

print('Métricas en test:')
print(f'Accuracy:  {acc:.3f}')
print(f'Precision: {prec:.3f}')
print(f'Recall:    {rec:.3f}')
print(f'F1-score:  {f1:.3f}')
print(f'ROC-AUC:   {roc_auc:.3f}')
print(f'PR-AUC:    {ap:.3f}\n')

print('Reporte de clasificación:')
print(classification_report(y_test, y_pred, target_names=['No Sobrevivio', 'Sobrevivio']))

# Matriz de confusión
cm = confusion_matrix(y_test, y_pred)
fig, ax = plt.subplots(figsize=(6, 5))
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['No Sobrevivio', 'Sobrevivio'])
disp.plot(ax=ax, cmap='Blues', colorbar=False)
ax.set_title('Matriz de Confusion - Regresion Logistica (Titanic)')
plt.tight_layout()
plt.show()

# Curva ROC
fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'Curva ROC (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--', label='Referencia aleatoria')
plt.title('Curva ROC - Regresion Logistica (Titanic)')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend(loc='lower right')
plt.tight_layout()
plt.show()

# Curva Precision-Recall
precision_vals, recall_vals, _ = precision_recall_curve(y_test, y_pred_proba)
plt.figure(figsize=(8, 6))
plt.plot(recall_vals, precision_vals, color='teal', lw=2, label=f'Curva PR (AP = {ap:.2f})')
plt.title('Curva Precision-Recall - Regresion Logistica (Titanic)')
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.legend(loc='lower left')
plt.tight_layout()
plt.show()
```

Con este pipeline, en test obtuvimos aproximadamente:

1. Accuracy: `0.793`
2. Precision: `0.722`
3. Recall: `0.754`
4. F1-score: `0.738`
5. ROC-AUC: `0.851`
6. PR-AUC: `0.796`

Estos resultados indican que tu modelo tiene un desempeño **sólido y bastante equilibrado** en el conjunto de prueba. Vamos a interpretarlo paso a paso.

Primero, la **accuracy (0.793)** significa que el modelo clasifica correctamente aproximadamente el 79.3% de los pasajeros. Es un buen valor, pero por sí sola no es suficiente, especialmente porque el dataset está algo desbalanceado (110 no sobrevivieron vs 69 sobrevivieron).

En la clase **"Survived"**:

* **Precision = 0.722**
  De todas las personas que el modelo predijo como sobrevivientes, el 72.2% realmente sobrevivió.
  Esto mide qué tan "confiables" son las predicciones positivas.

* **Recall = 0.754**
  De todos los que realmente sobrevivieron, el modelo logró identificar el 75.4%.
  Esto mide qué tanto se le escapan casos reales.

* **F1-score = 0.738**
  Es el equilibrio entre precision y recall.
  Indica que el modelo mantiene un buen balance entre detectar sobrevivientes y no generar demasiados falsos positivos.

En la clase **"Did Not Survive"** el rendimiento es incluso un poco mejor (F1 ~ 0.83), lo cual es normal porque hay más ejemplos de esa clase.

Ahora las métricas de discriminación:

* **ROC-AUC = 0.851**
  El modelo separa bastante bien a sobrevivientes de no sobrevivientes (muy buena capacidad de discriminación).

* **PR-AUC = 0.796**
  Esta métrica es especialmente útil cuando hay desbalance. Un 0.796 indica que el modelo mantiene buena relación entre precision y recall al variar el umbral.

![Matriz de confusión](/blog/experimenting-with-titanic-dataset/shared/confusion_matrix.webp)
  _Matriz de confusión_

![Curva ROC](/blog/experimenting-with-titanic-dataset/shared/roc_curve.webp)
  _Curva ROC_

![Curva Precision-Recall](/blog/experimenting-with-titanic-dataset/shared/pr_curve.webp)
  _Curva Precision-Recall_

---

## Conclusiones

Siempre ten en cuenta que:
1. Un buen EDA reduce sorpresas durante el modelado.
2. Limpiar e imputar correctamente puede impactar tanto como elegir el modelo.
3. Evaluar con varias métricas (no solo accuracy) da una lectura mucho más real del comportamiento del clasificador.

Puedes buscar otros datasets y experimentar por tu cuenta, aplicando este mismo flujo de trabajo. ¡Es la mejor forma de aprender!

Algunas fuentes de datasets interesantes para practicar EDA y modelado:
* [Kaggle Datasets](https://www.kaggle.com/datasets)
* [UCI Machine Learning Repository](https://archive.ics.uci.edu/)
* [Google Dataset Search](https://datasetsearch.research.google.com/)
* [Awesome Public Datasets](https://github.com/awesomedata/awesome-public-datasets)
