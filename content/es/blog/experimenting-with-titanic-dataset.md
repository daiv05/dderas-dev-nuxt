---
id: 'experimenting-with-titanic-dataset'
title: 'Experimentando con el dataset de supervivencia del Titanic'
slug: 'experimenting-with-titanic-dataset'
order: 6
date: 2026-04-21
summary: 'Exploremos el dataset de supervivencia del Titanic utilizando técnicas de análisis exploratorio de datos (EDA) para descubrir patrones y relaciones entre las características de los pasajeros y su supervivencia.'
tags: ['aprendizaje automático', 'análisis de datos', 'EDA', 'proyectos de machine learning', 'análisis exploratorio']
image: /blog/experimenting-with-titanic-dataset/shared/titanic.webp
author: David Deras
lastmod: 2026-04-21
sitemap:
  priority: 0.7
  loc: /es/blog/experimenting-with-titanic-dataset
  lastmod: 2026-04-21
---

Esta vez vamos a experimentar con EDA (Análisis Exploratorio de Datos) usando el dataset de supervivencia del Titanic, pero además daremos un paso más: construiremos un baseline de clasificación bien evaluado.

En el artículo anterior de esta serie de Machine Learning: [Experimentando con el análisis exploratorio de datos](https://deras.dev/es/blog/experimenting-with-exploratory-data-analysis)

::table-of-contents
::

---

## Un Ejercicio Práctico: El Dataset del Titanic

El dataset del Titanic es un clásico en aprendizaje automático. Incluye información de los pasajeros (edad, sexo, clase, tarifa, puerto de embarque, etc.) y la variable objetivo `survived`, que indica si la persona sobrevivió (`1`) o no (`0`).

Es ideal para practicar un flujo completo:

1. Carga y revisión inicial.
2. Limpieza y transformación de variables.
3. EDA con visualizaciones.
4. Preparación para modelado.
5. Entrenamiento y evaluación con varias métricas.

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

### 2. Valores Nulos y Limpieza de Datos

Ahora aplicamos una limpieza base, enfocada en:

1. Eliminar columnas muy incompletas o redundantes.
2. Imputar nulos estratégicamente.
3. Codificar variables categóricas.

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

También aplicamos One-Hot Encoding en `embarked` con `drop_first=True` para evitar multicolinealidad (la conocida “dummy variable trap”).

Revisamos cómo quedó el dataset:

```python
print('Primeras 5 filas después del preprocesamiento:')
display(df.head())

print('\nResumen estadístico de variables numéricas:')
display(df.describe().T)
```

### 3. EDA: Distribuciones y Relaciones

Con los datos limpios, exploramos patrones claros de supervivencia.

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

![Distribución de Supervivencia](https://deras.dev/es/blog/experimenting-with-titanic-dataset/shared/survived_distribution.png)

Vemos una clase negativa más frecuente (más pasajeros no sobrevivieron), así que conviene evaluar algo más que exactitud.

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

![Tasa de Supervivencia por Sexo](https://deras.dev/es/blog/experimenting-with-titanic-dataset/shared/survival_by_sex.png)

![Tasa de Supervivencia por Clase](https://deras.dev/es/blog/experimenting-with-titanic-dataset/shared/survival_by_class.png)

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

![Matriz de Correlación](https://deras.dev/es/blog/experimenting-with-titanic-dataset/shared/correlation_matrix.png)

La variable `survived` muestra correlación positiva con `sex` (según nuestra codificación, valores más altos corresponden a mujer) y negativa con `pclass` (recordando que 1 es primera clase y 3 es tercera).

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

Ese resultado nos da una señal de estabilidad del modelo antes de mirar test.

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

En otras palabras: para ser un baseline relativamente simple, el modelo logra un desempeño bastante sólido y, sobre todo, consistente con lo que vimos en el EDA.

## Conclusiones

Este ejercicio deja tres aprendizajes importantes:

1. Un buen EDA reduce sorpresas durante el modelado.
2. Limpiar e imputar correctamente puede impactar tanto como elegir el modelo.
3. Evaluar con varias métricas (no solo accuracy) da una lectura mucho más real del comportamiento del clasificador.

En el siguiente paso, podemos probar tuning de hiperparámetros, calibración de umbral o comparar contra modelos de árboles para ver si mejoramos recall o AUC sin perder interpretabilidad.