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
    "el salvador"
  ]
image: /blog/risk-prediction-model-adolescents-sv-2013/shared/risk-prediction-model.webp
author: David Deras
lastmod: 2026-06-25
sitemap:
  priority: 0.7
  loc: /es/blog/risk-prediction-model-adolescents-sv-2013
  lastmod: 2026-06-25
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

La encuesta tiene varias preguntas relacionadas con la salud de los adolescentes, incluyendo hábitos de alimentación, actividad física, salud mental, consumo de sustancias y factores de riesgo psicosociales, en total son 58 preguntas, identificadas con códigos específicos: Q1 hasta Q58.

A parte de estas preguntas, se incluyen variantes derivadas con respuestas en un rango de [1, 2], donde 1 representa la respuesta "Sí" y 2 representa la respuesta "No", para las preguntas [Q6-Q27], [Q34-Q40], [Q44-Q58].

Por último, se incluyen otros indicadores derivados, como de obesidad, sobrepeso, bajo peso, actividad física, consumo de frutas, entre otros, para un total de 11 indicadores derivados.

En total, el conjunto de datos contiene 104 variables, incluyendo las preguntas originales, las variantes derivadas y los indicadores derivados.

Algunas respuestas contienen el valor de: 1.7976931348623157E+308, que representa un valor faltante o desconocido. En esta investigación (en el pipeline), reemplazaremos estos valores con NaN (Not a Number) para su  manejo.

## Objetivos

Dividiremos los objetivos en 3 puntos principales:

1. **Limpieza y análisis de datos**: Se hará un análisis exploratorio de los datos para seleccionar las variables más relevantes para cada modelo, así como tener en cuenta la colinealidad entre las variables y la importancia de cada una en los modelos de predicción.
2. **Modelo de predicción del IMC (Índice de Masa Corporal)**: Utilizando los hábitos de alimentación y actividad física de los adolescentes, construiremos un modelo de regresión para predecir el IMC, pero, sin usar las variables de peso y altura directamente.
3. **Modelo de predicción del riesgo de salud mental**: Utilizando algúnos factores de riesgo, como ideas de suicidio, consumo de sustancias, violencia, entre otros, construiremos un modelo de clasificación para predecir el riesgo de salud mental en los adolescentes.

## Limpieza y análisis de datos

