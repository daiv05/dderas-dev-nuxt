---
id: 'workflow-machine-learning-projects'
title: 'El flujo en proyectos de aprendizaje automático'
slug: 'workflow-machine-learning-projects'
date: 2026-04-18
summary: 'Descubre el flujo típico de un proyecto de aprendizaje automático, desde la recopilación de datos hasta la implementación del modelo, y aprende sobre las mejores prácticas y desafíos comunes en el campo de la ciencia de datos.'
tags: ['Machine Learning', 'Data Science', 'Proyectos de ML', 'Flujo de trabajo']
image: /blog/workflow-machine-learning-projects/shared/workflow.webp
author: David Deras
lastmod: 2026-04-18
sitemap:
  priority: 0.7
  loc: /es/blog/workflow-machine-learning-projects
  lastmod: 2026-04-18
---

Continuamos aprendiendo sobre el mundo del aprendizaje automático, y en esta ocasión, nos adentraremos en el flujo típico de un proyecto de aprendizaje automático.

Artículo anterior: [Paradigmas de aprendizaje automático y fundamentos matemáticos](https://deras.dev/es/blog/machine-learning-paradigms-and-mathematical-foundations)

::table-of-contents
::

---

¿Por qué es importante entender el flujo de un proyecto de aprendizaje automático?
- **El proceso es más importante que el resultado**: Los modelos exitosos no dependen únicamente de algoritmos sofisticados, sino de un
proceso bien estructurado. Un Random Forest con datos limpios y bien preparados supera consistentemente a una red neuronal profunda con datos de mala calidad.
- **Reproducibilidad**: Un flujo de trabajo claro y documentado permite que otros científicos de datos puedan reproducir tus resultados, lo cual es fundamental para la validación y el avance del conocimiento en el campo.
- **Colaboración**: En proyectos de aprendizaje automático, a menudo hay múltiples personas involucradas, desde científicos de datos hasta ingenieros de datos y stakeholders. Un flujo de trabajo bien definido facilita la comunicación y la colaboración entre todos los miembros del equipo.
- **Reduce el riesgo de errores**: Un proceso estructurado ayuda a identificar y corregir errores en las etapas tempranas del proyecto, lo que puede ahorrar tiempo y recursos a largo plazo.

De forma general el aprendizaje automático es un proceso que es **parte de un sistema**, con un **ciclo iterativo** y **orientado a generar valor** que consta de varias etapas, cada una con sus propias tareas y desafíos.

![Visión integradora del ciclo en Machine Learning](/blog/workflow-machine-learning-projects/shared/machine-learning-cycle.webp)

---

## 1. Definición del problema

La primera etapa de cualquier proyecto de aprendizaje automático es la definición del problema:
- **Identificación del problema**: ¿Que queremos lograr con el proyecto? ¿Qué decisiones queremos apoyar con el modelo? Es crucial entender el contexto del negocio o la aplicación para definir claramente el problema.
- **Variable objetivo**: ¿Cuál es la variable que queremos predecir o clasificar? Esta variable, también conocida como variable dependiente, es el foco del proyecto y debe ser claramente definida.
- **Tipo de problema**: ¿Es un problema de clasificación, regresión, clustering, o algo más? La naturaleza del problema influirá en la elección de los algoritmos y técnicas a utilizar.
- **Métricas de evaluación**: ¿Cómo vamos a medir el éxito del modelo? Es importante definir las métricas de evaluación desde el principio, ya que estas guiarán el desarrollo del modelo y la toma de decisiones a lo largo del proyecto.

Esta etapa es el cimiento de todo el proyecto. Un problema mal definido puede llevar a esfuerzos desperdiciados y resultados insatisfactorios. Es fundamental dedicar tiempo a entender el problema y establecer objetivos claros antes de avanzar a las siguientes etapas.

Veámos un ejemplo práctico:
Supongamos que una empresa de comercio electrónico quiere predecir si un cliente realizará una compra en su sitio web. En este caso:
- **Identificación del problema**: Predecir la probabilidad de que un cliente realice una compra.
- **Variable objetivo**: La variable objetivo podría ser una variable binaria que indique si el cliente realizó una compra (1) o no (0).
- **Tipo de problema**: Este es un problema de clasificación binaria.
- **Métricas de evaluación**: Las métricas de evaluación podrían incluir la precisión, el recall y el F1-score, dependiendo de la importancia relativa de los falsos positivos y los falsos negativos en el contexto del negocio.

---

## 2. Recopilación de datos

Una vez que el problema está claramente definido, el siguiente paso es la recopilación de datos, aquí se deben identificar y acceder a las fuentes de datos relevantes. Esto puede incluir:
- **Bases de datos internas/empresariales**: Datos almacenados en sistemas internos de la empresa, como bases de datos relacionales, data warehouses o data lakes. Algunos ejemplos incluyen registros de ventas, datos de clientes, datos provenientes de CRM o ERP, entre otros.
- **APIs y servicios web**: Datos externos de proveedores de datos, redes sociales, servicios de geolocalización, etc. Por ejemplo, una empresa de análisis de sentimientos podría utilizar la API de Twitter para recopilar tweets relacionados con un tema específico.
- **Logs y registros de eventos de sistemas**: Datos generados por aplicaciones, servidores, dispositivos IoT, etc. Por ejemplo, una empresa de monitoreo de infraestructura podría recopilar logs de servidores para detectar patrones de fallos.
- **Datos públicos/externos**: Datos disponibles públicamente, como conjuntos de datos de Kaggle, datos gubernamentales, datos de investigación académica, etc. Por ejemplo, un investigador podría utilizar el conjunto de datos de imágenes de MNIST para entrenar un modelo de reconocimiento de dígitos manuscritos.

Es importante tener en cuenta que la calidad de los datos recopilados es crucial para el éxito del proyecto. Los datos deben ser relevantes, completos, precisos y actualizados. Además, es fundamental considerar aspectos éticos y legales relacionados con la recopilación y el uso de datos, como la privacidad de los usuarios y el cumplimiento de regulaciones como GDPR.

## 3. Preprocesamiento de datos

Esta es la fase de preparación y limpieza de datos,  es un paso crucial y a menudo es el mayor cuello de botella. Los prefesionales de datos suelen dedicar entre el 70% y el 80% de su tiempo a preparar datos y no a construir modelos.

La calidad del modelos depende directamente de la calidad de los datos, si están desordenados o incompletos, el modelo no podrá aprender patrones útiles. Incluso el algoritmo más sofisticado no puede compensar por datos de mala calidad.

## 4. Análisis exploratorio de datos (EDA)

Durante esta etapa, se realiza un análisis detallado de los datos para comprender su estructura, distribución y relaciones entre variables. Esto incluye:
- **Analisis univariado**: Examinar la distribución de cada variable individualmente, utilizando estadísticas descriptivas y visualizaciones como:
    - Histogramas
    - Diagramas de caja (boxplots)
    - Gráficos de barras
    - Estadísticas de tendencia central (media, mediana) y dispersión (desviación estándar, rango intercuartílico)
- **Analisis bivariado**: Explorar las relaciones entre pares de variables, utilizando visualizaciones como:
    - Diagramas de dispersión (scatter plots)
    - Mapas de calor (heatmaps) para visualizar correlaciones
    - Gráficos de barras apiladas para variables categóricas
- **Analisis multivariado**: Examinar las relaciones entre múltiples variables simultáneamente, utilizando técnicas como:
    - Análisis de componentes principales (PCA)
    - Análisis de clústeres
    - Gráficos de pares (pair plots)
El EDA es fundamental para detectar problemas en los datos, como valores atípicos, distribuciones sesgadas o relaciones no lineales entre variables. Además, el EDA puede proporcionar insights valiosos que guiarán la selección de características y la elección de algoritmos en las etapas posteriores del proyecto.

Las herramientas comunes para realizar EDA incluye:
- **Python**: Bibliotecas como Pandas, Matplotlib, Seaborn y Plotly son ampliamente utilizadas para el análisis exploratorio de datos en Python.
- **R**: Paquetes como ggplot2, dplyr y tidyr son populares para realizar EDA en R.
- **Herramientas de visualización**: Herramientas como Tableau, Power BI o QlikView también pueden ser utilizadas para realizar análisis exploratorio de datos de manera interactiva.
- **Jupyter Notebooks**: Los notebooks de Jupyter son una herramienta común para realizar EDA, ya que permiten combinar código, visualizaciones y texto explicativo en un solo documento.

> El EDA no es un paso lineal, a menudo se realiza de manera iterativa a medida que se descubren nuevos insights o se identifican problemas en los datos. Es importante documentar los hallazgos del EDA, ya que estos pueden ser útiles para la toma de decisiones en las etapas posteriores del proyecto.

### Principios para un EDA efectivo
- **Comenzar simple**: Iniciar con visualizaciones y estadísticas básicas para obtener una comprensión general de los datos antes de profundizar en análisis más complejos.
- **Colores con propósito**: Utilizar colores de manera estratégica para resaltar patrones o diferencias importantes en los datos, evitando el uso excesivo de colores que pueda distraer.
- **Proceso iterativo**:Iterar continuamente a medida que se descubren nuevos insights o se identifican problemas en los datos, ajustando el enfoque del EDA según sea necesario.
- **Documentar hallazgos**: Registrar los insights y descubrimientos del EDA para facilitar la toma de decisiones en las etapas posteriores del proyecto y para compartir con otros miembros del equipo.

## 5. Feature engineering

El feature engineering es el proceso de crear nuevas características a partir de los datos originales para mejorar el rendimiento del modelo. Es el puente entre datos crudos sin estructurar y entradas listas para modelar. Esta etapa es crucial porque nos ayuda a:
- **Mejorar precisión**: Las características bien diseñadas pueden capturar patrones complejos en los datos que los modelos pueden aprovechar para hacer mejores predicciones.
- **Reducir sobreajuste**: Al crear características más relevantes, podemos ayudar a los modelos a generalizar mejor a datos no vistos, reduciendo el riesgo de sobreajuste.
- **Facilitar la interpretación**: Las características bien diseñadas pueden hacer que los modelos sean más interpretables, lo que es especialmente importante en aplicaciones donde la explicabilidad es crucial.
- **Aumentar la eficiencia**: Al reducir la dimensionalidad de los datos o crear características más informativas, podemos mejorar la eficiencia del entrenamiento del modelo.

Algunas técnicas fundamentales de feature engineering incluyen:

### Transformaciones Numéricas

- **Escalado**: Útil para modelos sensibles a magnitudes (Regresión, SVM, KNN, redes neuronales).
    - Min-Max Scaling: Lleva valores a rango [0,1]
    - Standardization (Z-score): media 0, desviación 1
    - Robust Scaling: usa mediana y rango intercuartílico (mejor con outliers)

- **Transformaciones no lineales**: Cuando la relación no es lineal.
    - Log transform: `log(x)`
    - Raíz cuadrada: `sqrt(x)`
    - Box-Cox: `((x + 1)^λ - 1) / λ` (para λ ≠ 0) o `log(x + 1)` (para λ = 0)
    - Yeo-Johnson: Similar a Box-Cox pero para datos con valores negativos
    Muy útil cuando hay distribuciones muy sesgadas.

### Variables Categóricas

- **One-Hot Encoding**: Convierte categorías en columnas binarias.

Ejemplo:

```
Color: [Rojo, Azul, Verde]

Pasan a ser:

Rojo  Azul  Verde
1     0     0
```

- **Ordinal Encoding**: Cuando hay orden:

```
Bajo < Medio < Alto
```

- **Target Encoding**: Reemplaza categoría por promedio del target:

```
Ciudad → promedio de ventas
```

- **Frequency Encoding**: Reemplaza categoría por frecuencia de aparición.

### Features Temporales

Si se trabaja con fechas:

* Año
* Mes
* Día
* Día de la semana
* Es fin de semana
* Trimestre
* Diferencia entre fechas
* Tiempo desde último evento

- **Codificación cíclica**: Para variables como hora o mes:

```
sin(2π * hora / 24)
cos(2π * hora / 24)
```

Evita que 23 y 0 parezcan "lejanos".

### Interacciones entre Variables

A veces la combinación importa más que la variable sola.

- **Producto de variables**: `x1 * x2`
- **Polinomios**: `x^2`, `x^3`
- **Ratios**: `precio / tamaño`
- **Diferencias**: `fecha_pago - fecha_registro`

Muy usado en modelos lineales.

### Binning (Discretización)

Convertir numéricos en categorías:

- **Binning uniforme**
- **Binning por cuantiles**
- **Binning basado en negocio**

Ejemplo:

```
Edad → [0-18], [19-35], [36-60], 60+
```

### Manejo de Outliers

- **Clipping**
- **Winsorizing**
- **Log transform**
- **Crear feature binaria**: `es_outlier`

### Features basadas en agrupaciones

Muy potente en datasets transaccionales.

Ejemplo:

* Promedio de compras por usuario
* Número de pedidos
* Tiempo desde última compra
* Máximo / mínimo histórico

### Feature Selection

No todo es crear - también eliminar.

* Correlación
* Mutual information
* RFE
* Lasso (L1)
* Feature importance (árboles)

El feature engineering es una de las habilidades más valiosas en la ciencia de datos, ya que puede marcar la diferencia entre un modelo mediocre y uno excepcional.

## 6. Entrenamiento de modelos

Una vez que los datos están preparados y las características han sido diseñadas, el siguiente paso es entrenar un modelo de aprendizaje automático.

En esta etapa, se selecciona un algoritmo de aprendizaje automático adecuado para el problema definido y se ajusta a los datos de entrenamiento. El proceso de entrenamiento implica alimentar el modelo con los datos y permitir que aprenda patrones y relaciones para hacer predicciones.

Lo primero que debemos tener en cuenta antes de empezar es la división de los datos (datasets) en conjuntos de entrenamiento, validación y prueba. Esto es crucial para evaluar el rendimiento del modelo de manera justa y evitar el sobreajuste:
- **Conjunto de entrenamiento (Training Set) - (70-80%)**: Es el conjunto de datos que se utiliza para entrenar el modelo. El modelo aprende a partir de estos datos, ajustando sus parámetros para minimizar el error en las predicciones.
- **Conjunto de validación (Validation Set) - (10-15%)**: Es un conjunto de datos separado que se utiliza para ajustar los hiperparámetros del modelo y tomar decisiones sobre la arquitectura del modelo. El modelo no se entrena directamente con estos datos, pero se utilizan para evaluar su rendimiento durante el proceso de entrenamiento.
- **Conjunto de prueba (Test Set) - (10-15%)**: Es un conjunto de datos completamente separado que se utiliza para evaluar el rendimiento final del modelo después de que se ha completado el entrenamiento y la selección de hiperparámetros. Este conjunto no se utiliza en absoluto durante el proceso de entrenamiento o validación, lo que permite obtener una evaluación imparcial del modelo.

> Como dato, si utilizas agentes de IA para el desarrollo de software, una buena práctica es utilizar distintas sesiones o agentes para cada etapa del desarrollo, un agente para la generación de código, otro para la revisión y otro para las pruebas. En este otro caso ayuda a que la IA no sea autoreferencial y pueda detectar errores que un mismo agente podría pasar por alto.

Para el entrenamiento del modelo, se selecciona un algoritmo de aprendizaje automático adecuado para el tipo de problema que se está abordando (clasificación, regresión, clustering, etc.). Algunos ejemplos de algoritmos comunes, como ya los vimos son:
- **Regresión lineal**: Modelo simple para relaciones lineales, rápido, interpretable, pero limitado a relaciones lineales.
- **Árboles de decisión**: Modelos basados en reglas, fáciles de interpretar, pero propensos a sobreajuste.
- **Random Forest**: Conjunto de árboles de decisión, reduce sobreajuste, pero menos interpretable.
- **Gradient Boosting (XGBoost, LightGBM)**: Potente para datos tabulares, pero puede ser lento y propenso a sobreajuste si no se ajusta correctamente.
- **Redes neuronales**: Modelos inspirados en el cerebro, capaces de capturar relaciones complejas, pero requieren grandes cantidades de datos y son menos interpretables.
- **Support Vector Machines (SVM)**: Efectivo para problemas de clasificación, pero puede ser lento con grandes conjuntos de datos.

## 7. Evaluación del modelo

Una vez que el modelo ha sido entrenado, es crucial evaluar su rendimiento utilizando el conjunto de validación y el conjunto de prueba. La evaluación del modelo implica medir su capacidad para hacer predicciones precisas y generalizar a datos no vistos.
Las métricas de evaluación varían según el tipo de problema que se esté abordando. Para problemas de clasificación, algunas métricas comunes incluyen:
- **Precisión**: Proporción de predicciones correctas sobre el total de predicciones realizadas.
- **Recall (Sensibilidad)**: Proporción de verdaderos positivos sobre el total de positivos reales.
- **F1-score**: La media armónica de la precisión y el recall, útil cuando hay un desequilibrio entre clases.
- **AUC-ROC**: Área bajo la curva ROC, que mide la capacidad del modelo para distinguir entre clases.
Para problemas de regresión, algunas métricas comunes incluyen:
- **Error cuadrático medio (MSE)**: Promedio de los cuadrados de los errores entre las predicciones y los valores reales.
- **Error absoluto medio (MAE)**: Promedio de los valores absolutos de los errores entre las predicciones y los valores reales.
- **R² (Coeficiente de determinación)**: Proporción de la varianza en la variable dependiente que es predecible a partir de las variables independientes.

### Matriz de confusión
Una herramienta útil para evaluar modelos de clasificación es la matriz de confusión, que muestra el número de verdaderos positivos, falsos positivos, verdaderos negativos y falsos negativos. Esto permite entender mejor el rendimiento del modelo y las áreas donde puede estar cometiendo errores.
|               | Predicción Positiva | Predicción Negativa |
|---------------|---------------------|---------------------|
| **Real Positivo** | Verdaderos Positivos (TP) | Falsos Negativos (FN) |
| **Real Negativo** | Falsos Positivos (FP) | Verdaderos Negativos (TN) |

### Curva ROC
La curva ROC (Receiver Operating Characteristic) es una herramienta gráfica que muestra la relación entre la tasa de verdaderos positivos (TPR) y la tasa de falsos positivos (FPR) a medida que se varía el umbral de clasificación. El área bajo la curva ROC (AUC-ROC) es una métrica que mide la capacidad del modelo para distinguir entre clases, con un valor de 1 indicando un modelo perfecto y un valor de 0.5 indicando un modelo sin capacidad de discriminación.

### Curva Precision-Recall
La curva Precision-Recall es otra herramienta gráfica que muestra la relación entre la precisión y el recall a medida que se varía el umbral de clasificación. Esta curva es especialmente útil cuando hay un desequilibrio entre clases, ya que se enfoca en la capacidad del modelo para identificar correctamente la clase minoritaria.

## 8. Implementación y despliegue

Una vez que el modelo ha sido entrenado y evaluado, el siguiente paso es implementarlo en un entorno de producción para que pueda ser utilizado por los usuarios finales o integrado en sistemas existentes. La implementación y el despliegue de modelos de aprendizaje automático pueden ser desafiantes debido a la necesidad de garantizar la escalabilidad, la seguridad y la mantenibilidad del modelo en un entorno de producción. Algunas consideraciones clave para la implementación y el despliegue de modelos de aprendizaje automático incluyen:
- **APIs**: Exponer el modelo a través de una API RESTful o gRPC para que pueda ser consumido por otras aplicaciones o servicios.
- **Aplicaciones web**: Integrar el modelo en una aplicación web para que los usuarios puedan interactuar con él a través de una interfaz gráfica.
- **Integraciones con sistemas existentes**: Integrar el modelo en sistemas empresariales existentes, como CRM, ERP o sistemas de recomendación.
- **Contenedores y orquestación**: Utilizar contenedores (Docker) y herramientas de orquestación (Kubernetes) para facilitar el despliegue, la escalabilidad y la gestión del modelo en producción.
- **Monitoreo y mantenimiento**: Implementar sistemas de monitoreo para rastrear el rendimiento del modelo en producción, detectar posibles problemas y realizar actualizaciones o retrainings según sea necesario.

## 9. Monitoreo y mantenimiento

Una vez que el modelo está en producción, es crucial monitorear su rendimiento de manera continua para asegurarse de que sigue siendo efectivo y relevante. El monitoreo del modelo implica rastrear métricas clave, detectar posibles problemas y realizar ajustes o retrainings según sea necesario. Algunos problemas que pueden surgir en esta etapa incluyen:
- **Deriva de datos (Data Drift)**: Ocurre cuando la distribución de los datos de entrada cambia con el tiempo, lo que puede afectar negativamente el rendimiento del modelo. Es importante monitorear la distribución de los datos y realizar retrainings si se detecta una deriva significativa.
- **Deriva de concepto (Concept Drift)**: Ocurre cuando la relación entre las características y la variable objetivo cambia con el tiempo, lo que puede hacer que el modelo sea menos efectivo. Es importante monitorear el rendimiento del modelo y realizar ajustes o retrainings si se detecta una deriva de concepto.
- **Training-serving skew**: Ocurre cuando hay diferencias entre los datos utilizados para entrenar el modelo y los datos que se encuentran en producción, lo que puede afectar negativamente el rendimiento del modelo. Es importante asegurarse de que los datos de entrenamiento sean representativos de los datos en producción y realizar ajustes si se detecta un skew significativo.

Para lograr un buen monitoreo se pueden tomar algunas buenas prácticas, como:
- **Definir KPIs claros**: Establecer métricas clave de rendimiento (KPIs) para monitorear el modelo, como precisión, recall, F1-score, AUC-ROC, etc.
- **Implementar alertas**: Configurar alertas para notificar al equipo cuando el rendimiento del modelo cae por debajo de un umbral predefinido o cuando se detecta una deriva significativa.
- **Diversificar metricas**: Monitorear múltiples métricas para obtener una visión completa del rendimiento del modelo y detectar posibles problemas desde diferentes ángulos.
- **Automatizar retrainings**: Configurar procesos automatizados para realizar retrainings del modelo cuando se detecta una deriva significativa o cuando el rendimiento cae por debajo de un umbral predefinido.
- **Documentar cambios**: Mantener un registro de los cambios realizados en el modelo, como ajustes de hiperparámetros, cambios en los datos de entrenamiento, etc., para facilitar la trazabilidad y la comprensión de las decisiones tomadas.
- **Versionar modelos**: Utilizar herramientas de versionado de modelos para mantener un historial de las diferentes versiones del modelo y facilitar la gestión de cambios y actualizaciones.

Normalmente el proceso de mantenimiento lleva un proceso como el siguiente:
1. **Monitoreo continuo**: Rastrear el rendimiento del modelo en producción utilizando las métricas clave definidas.
2. **Detección de problemas**: Identificar posibles problemas, como deriva de datos, deriva de concepto o training-serving skew, a través del monitoreo de métricas y alertas.
3. **Análisis de causas**: Investigar las causas subyacentes de los problemas detectados, como cambios en la distribución de los datos, cambios en el comportamiento de los usuarios, etc.
4. **Ajustes o retrainings**: Realizar ajustes en el modelo o realizar retrainings utilizando nuevos datos para abordar los problemas detectados y mejorar el rendimiento del modelo.
5. **Validar y desplegar**: Validar el rendimiento del modelo ajustado o retrained utilizando el conjunto de validación y luego desplegar la nueva versión del modelo en producción.

Algunas herramientas populares para el monitoreo y mantenimiento de modelos de aprendizaje automático incluyen:
- **Prometheus**: Sistema de monitoreo y alerta de código abierto que se puede utilizar para rastrear métricas de rendimiento del modelo en producción.
- **Grafana**: Plataforma de visualización de datos que se puede integrar con Prometheus para crear paneles de control personalizados para monitorear el rendimiento del modelo.
- **MLflow**: Plataforma de código abierto para la gestión del ciclo de vida de los modelos de aprendizaje automático, que incluye funcionalidades para el monitoreo y mantenimiento de modelos en producción.
- **Evidently AI**: Evidently AI es una plataforma de código abierto y basada en la nube para evaluar, probar y supervisar sistemas de IA y aprendizaje automático.


---

## Caso práctico: Predicción de abandono (churn) en una fintech

Haremos un recorrido por un caso práctico simulado de un proyecto de aprendizaje automático para predecir el abandono (churn) en una fintech de suscripciones digitales. En este caso ilustraremos el conocimiento que tenemos hasta ahora sobre el flujo de un proyecto de aprendizaje automático.

**Contexto del negocio**

Una fintech de suscripciones digitales tiene:

* **120,000 usuarios activos**
* Suscripción mensual promedio: **$25**
* Ingreso mensual recurrente (MRR): **$3,000,000**
* Tasa de abandono mensual (churn): **8%**

Eso significa que cada mes:

```
120,000 × 8% = 9,600 usuarios cancelan
```

Pérdida mensual estimada:

```
9,600 × $25 = $240,000
```

La empresa quiere reducir el churn al **6%**, lo que implicaría ahorrar:

```
2% × 120,000 × $25 = $60,000 mensuales
```

El objetivo del proyecto de Machine Learning es **identificar usuarios con alta probabilidad de cancelar en los próximos 30 días**, para enviarles una campaña de retención personalizada.

### Definición del problema

- **Identificación del problema**

Reducir la tasa de abandono mensual del 8% al 6%.

- **Variable objetivo**

`churn_30d`:

```
1 - Cancela en los próximos 30 días
0 - No cancela
```

- **Tipo de problema**

Clasificación binaria.

- **Métrica de negocio clave**

No basta con accuracy (es decir , la tasa de acierto general). Lo importante es:

```
Recall de la clase churn
ROI de la campaña de retención
```

¿Por qué? Porque queremos identificar correctamente a los usuarios que van a cancelar (recall) y asegurarnos de que la campaña de retención sea rentable (ROI).

### Recopilación de datos

Se recopilaron datos de:

- **Fuentes internas**
```
* Historial de pagos
* Frecuencia de uso de la app
* Tiempo desde último login
* Tickets de soporte
* Tipo de plan
* Método de pago
* Historial de fallos de pago
```
- **Volumen de datos**
```
* 18 meses de histórico
* 1.5 millones de registros mensuales
* Dataset final: **95,000 usuarios únicos** con historial completo
```
### Preprocesamiento

Problemas detectados:
```
* 7% valores nulos en "último login"
* 3% registros duplicados
* Variables categóricas con alta cardinalidad (ciudades)
```
Acciones tomadas:
```
* Imputación con mediana para variables numéricas
* Eliminación de duplicados
* Agrupación de ciudades poco frecuentes como "Otras"
```
Tiempo invertido en esta etapa: **72% del proyecto**

### Análisis Exploratorio

Hallazgos clave:

- **Insight 1**

Usuarios que no inician sesión en 14 días tienen:
```
* 22% probabilidad de churn
  vs
* 4% en usuarios activos recientes
```

- **Insight 2**

Usuarios con más de 2 fallos de pago en 60 días:
```
* 35% probabilidad de churn
```

- **Insight 3**

Usuarios que abrieron más de 3 tickets de soporte:
```
* 18% churn
* Principal causa: problemas técnicos
```

Esto nos cambia el enfoque: no solo es un problema de retención, sino también de experiencia del usuario y soporte técnico. Estos datos nos están diciendo que los usuarios que tienen problemas técnicos o dificultades para usar la app son mucho más propensos a cancelar, lo que sugiere que una campaña de retención efectiva también debería abordar estos problemas y mejorar la experiencia del usuario.

###  Feature Engineering

Se crearon variables como:

* `dias_desde_ultimo_login`: Es la cantidad de días desde la última vez que el usuario inició sesión en la aplicación. Esta variable es importante porque, como se descubrió en el análisis exploratorio, los usuarios que no inician sesión en un período prolongado tienen una mayor probabilidad de cancelar su suscripción.
* `numero_fallos_pago_60d`: Es el número de fallos de pago que un usuario ha tenido en los últimos 60 días. Como se descubrió en el EDA, los usuarios con más de 2 fallos de pago en este período tienen una probabilidad significativamente mayor de cancelar su suscripción.
* `promedio_uso_semanal`: Es el promedio de uso de la aplicación por semana. Esta variable puede ayudar a capturar el nivel de compromiso del usuario con la aplicación, lo que puede ser un indicador importante de su probabilidad de cancelar.
* `tiempo_cliente_meses`: Usuarios que han sido clientes por más tiempo pueden tener una menor probabilidad de cancelar.
* `tickets_soporte_90d`: Es el número de tickets de soporte que un usuario ha abierto en los últimos 90 días. Dado que se descubrió que los usuarios que abren más de 3 tickets de soporte tienen una mayor probabilidad de cancelar, esta variable puede ser un indicador importante del riesgo de churn.
* `ratio_fallos_pago = fallos / intentos`: Este ratio puede ser un indicador más preciso del riesgo de churn relacionado con los problemas de pago, ya que tiene en cuenta tanto el número de fallos como el número total de intentos de pago.
* Variable binaria: `es_usuario_nuevo (<3 meses)`: Los usuarios nuevos pueden tener un riesgo diferente de churn en comparación con los usuarios más antiguos, por lo que esta variable puede ayudar a capturar esa diferencia.

También se creó:

```
riesgo_inactividad = dias_desde_ultimo_login × (1 / promedio_uso)
```
Esta variable compuesta puede ser un indicador poderoso del riesgo de churn, ya que combina la información sobre la inactividad del usuario (días desde el último login) con su nivel de compromiso (promedio de uso semanal). Un valor alto de `riesgo_inactividad` indicaría que un usuario no ha iniciado sesión en mucho tiempo y tiene un bajo nivel de uso, lo que podría ser un fuerte indicador de que está en riesgo de cancelar su suscripción.

### Entrenamiento de modelos

Se dividieron datos:

* 75% entrenamiento
* 15% validación
* 10% prueba

Se probaron:

| Modelo              | AUC-ROC | Recall churn |
| ------------------- | ------- | ------------ |
| Regresión Logística | 0.76    | 0.58         |
| Random Forest       | 0.84    | 0.71         |
| XGBoost             | 0.87    | 0.78         |
| Red neuronal        | 0.85    | 0.73         |

Aunque XGBoost tenía mejor métrica, se eligió **Random Forest** inicialmente porque:

* Era más interpretable
* Menor riesgo de sobreajuste
* Más fácil de mantener

Esto es clave: **la mejor métrica no siempre es la mejor decisión de negocio**.

### Evaluación

En el conjunto de prueba:

* 9% churn real
* Modelo detectó 76% de los churners
* Falsos positivos: 18%

Simulación:

Se decide intervenir solo en usuarios con probabilidad > 0.65.

Usuarios marcados como "riesgo alto": 11,000

De esos:

* 6,800 realmente iban a cancelar
* 4,200 eran falsos positivos

Costo campaña:

```
11,000 × $2 = $22,000
```

Clientes salvados (tasa de éxito campaña 40%):

```
6,800 × 40% = 2,720 clientes retenidos
```

Ingreso recuperado mensual:

```
2,720 × $25 = $68,000
```

ROI mensual:

```
$68,000 - $22,000 = $46,000 beneficio neto
```

Objetivo cumplido.

### Implementación

El modelo se desplegó como:

* API REST en FastAPI
* Contenedor Docker
* Job nocturno que recalcula riesgo diario
* Integración con CRM para disparar campañas automáticas

Tiempo de inferencia por usuario: 12 ms.

### Monitoreo en producción

Después de 4 meses:

La tasa de churn volvió a subir a 7.4%.

Se detectó:

* Nuevo competidor con descuento agresivo
* Cambio en comportamiento de usuarios jóvenes

Se identificó **concept drift**, es decir, el modelo ya no estaba capturando correctamente los patrones de churn debido a cambios en el mercado y en el comportamiento de los usuarios.

Se hizo retraining con datos recientes.

Nuevo modelo:

* Mejoró recall a 81%
* Redujo churn nuevamente a 6.2%

---

¿Que podemos aprender de este caso? Primero, **el modelo no era el centro — el proceso sí**. El éxito no vino de un algoritmo sofisticado, sino de un proceso bien ejecutado que incluyó:

* Buen EDA
* Buen feature engineering
* Definir correctamente la métrica de negocio

Segundo, accuracy no era la métrica correcta, aqui ya nos importaba ponerle ojo al ROI, porque no solo queríamos un modelo que fuera bueno en métricas técnicas, sino que también generara un impacto positivo en el negocio.
Y es que como ya hemos dicho, **el modelo es parte de un sistema** que incluye otros componentes como marketing, CRM, infraestructura, monitoreo y retraining. El éxito del proyecto depende de la integración efectiva de todos estos componentes, no solo del modelo en sí.

Tercero, el proyecto nunca termina, **es un ciclo continuo**, el monitoreo y mantenimiento son tan importantes como el entrenamiento inicial, porque el entorno cambia, los usuarios cambian, el mercado cambia, y el modelo debe adaptarse para seguir siendo efectivo.

---

