---
id: "vectors-matrices-machine-learning"
title: "Vectors and Matrices in Machine Learning"
slug: "vectors-matrices-machine-learning"
order: 7
date: 2026-04-25
summary: "Vectors are a fundamental part of machine learning, as they allow for the efficient representation of data and model parameters. In this article, we will explore their definition and application in machine learning algorithms."
tags: ["machine learning", "vectors", "matrices", "linear algebra"]
image: /blog/vectors-matrices-machine-learning/shared/vectors-matrices.webp
author: David Deras
lastmod: 2026-04-25
sitemap:
  priority: 0.7
  loc: /blog/vectors-matrices-machine-learning
  lastmod: 2026-04-25
---

In the previous article of this series, we continued experimenting with the workflow in machine learning projects. In this article, we will take a pause to discuss a fundamental topic in machine learning: vectors and matrices. These concepts are essential for understanding how data is represented and how machine learning algorithms function.

Previous article: [Experimenting with the Titanic Survival Dataset](https://deras.dev/blog/experimenting-with-titanic-dataset)

::table-of-contents
::

---

## Representation of Data in Machine Learning

How does a computer interpret data?
Machine learning algorithms process information in the form of numbers. To represent and process data efficiently, we use mathematical structures like vectors and matrices, fundamentally using core concepts to work with data in machine learning:

- **Vectors**: A vector is an ordered list of numbers that represents a single instance of data. For example, if we have a dataset with features like height, weight, and age, each data instance can be represented as a vector. For instance, a vector could be `[170, 65, 30]`, where each number represents a specific feature.
- **Matrices**: A matrix is a collection of vectors organized in rows and columns. In the context of machine learning, a matrix is used to represent a complete dataset. For example, if we have 100 data instances with 3 features each, we could represent this dataset as a matrix with 100 rows and 3 columns.
- **Tensors**: A tensor is a generalization of vectors and matrices to higher dimensions. In machine learning, especially in neural networks, tensors are used to represent data with multiple dimensions, such as images (which can have dimensions of height, width, and color channels) or text sequences (which can have dimensions of length and features).
- **Operations**: Various operations are performed on vectors and matrices, such as matrix multiplication, transposition, inversion, and decomposition. These operations are fundamental for model training, parameter optimization, and making predictions.

The algorithms convert tables into mathematical structures to process the information. For example:
| Height | Weight | Age |
|--------|--------|-----|
| 170 | 65 | 30 |
| 182 | 75 | 25 |

It becomes a matrix:

$$
\mathbf{X} =
\begin{bmatrix}
170 & 65 & 30 \\
182 & 75 & 25 \\
\vdots & \vdots & \vdots \\
\end{bmatrix}
$$

In this matrix, each row represents a data instance (a person) and each column represents a feature (height, weight, age).

### Vector

A vector is an ordered list of numbers that represents a single instance of data, this can be any series of values organized in a single dimension (row or column). For example, if we have a dataset with features like height, weight and age, each data instance can be represented as a vector.

$$
\mathbf{v} = [v_1, v_2, v_3]
$$

The dimension of a vector refers to the number of elements it contains. In the previous example, the vector `v` has a dimension of 3, since it contains three elements (height, weight and age). The order of the elements in a vector is important, since each position represents a specific feature.

Within the models, vectors are used for various purposes, such as:

- **Representing data instances**: Each row in a data matrix can be a vector representing a specific instance.
- **Representing model parameters**: Weights and biases in machine learning models are also represented as vectors.

Common operations with vectors include:

- **Vector addition**: The corresponding elements of two vectors are added together.

$$
\mathbf{v} + \mathbf{w} = [v_1 + w_1, v_2 + w_2, v_3 + w_3]
$$

- **Dot product**: The corresponding elements of two vectors are multiplied together and the results are summed.

$$
\mathbf{v} \cdot \mathbf{w} = v_1 w_1 + v_2 w_2 + v_3 w_3
$$

- **Norm of a vector**: The length or magnitude of a vector is calculated, which is useful for measuring the distance between vectors.

$$
\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2 + v_3^2}
$$

- **Normalization**: A vector is adjusted to have a length of 1, which is useful for comparing vectors across different scales.

$$
\mathbf{v}_{norm} = \frac{\mathbf{v}}{\|\mathbf{v}\|}
$$

- **Multiplication by a scalar**: All elements of a vector are multiplied by a number (scalar).

$$
\mathbf{v} \cdot c = [v_1 \cdot c, v_2 \cdot c, v_3 \cdot c]
$$

### Matrix

A matrix is ​​a collection of vectors arranged in rows and columns. In the context of machine learning, a matrix is ​​used to represent an entire dataset. For example, if we have 100 data instances with 3 features each, we could represent this dataset as a matrix with 100 rows and 3 columns.

$$
\mathbf{X} =
\begin{bmatrix}
170 & 65 & 30 \\
182 & 75 & 25 \\
\vdots & \vdots & \vdots \\
\end{bmatrix}
$$

A dataset with `m` instances and `n` features is represented as an `m x n` matrix.

Common matrix operations include:

- **Matrix addition**: The corresponding elements of two matrices are added together.
$$
\mathbf{A} + \mathbf{B} =
\begin{bmatrix}
a_{11} + b_{11} & a_{12} + b_{12} & \cdots & a_{1n} + b_{1n} \\
a_{21} + b_{21} & a_{22} + b_{22} & \cdots & a_{2n} + b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} + b_{m1} & a_{m2} + b_{m2} & \cdots & a_{mn} + b_{mn} \\
\end{bmatrix}
$$

- **atrix multiplication**: Two matrices are multiplied following the rule of multiplication of rows by columns.
$$
\mathbf{A} \cdot \mathbf{B} =
\begin{bmatrix}
a_{11}b_{11} + a_{12}b_{21} + \cdots + a_{1n}b_{n1} & a_{11}b_{12} + a_{12}b_{22} + \cdots + a_{1n}b_{n2} & \cdots & a_{11}b_{1p} + a_{12}b_{2p} + \cdots + a_{1n}b_{np} \\
a_{21}b_{11} + a_{22}b_{21} + \cdots + a_{2n}b_{n1} & a_{21}b_{12} + a_{22}b_{22} + \cdots + a_{2n}b_{n2} & \cdots & a_{21}b_{1p} + a_{22}b_{2p} + \cdots + a_{2n}b_{np} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1}b_{11} + a_{m2}b_{21} + \cdots + a_{mn}b_{n1} & a_{m1}b_{12} + a_{m2}b_{22} + \cdots + a_{mn}b_{n2} & \cdots & a_{m1}b_{1p} + a_{m2}b_{2p} + \cdots + a_{mn}b_{np} \\
\end{bmatrix}
$$

- **Transpose**: The rows and columns of a matrix are swapped.
$$
\mathbf{A}^T =
\begin{bmatrix}
a_{11} & a_{21} & \cdots & a_{m1} \\
a_{12} & a_{22} & \cdots & a_{m2} \\
\vdots & \vdots & \ddots & \vdots \\
a_{1p} & a_{2p} & \cdots & a_{mp} \\
\end{bmatrix}
$$

- **Inverse**: The inverse of a matrix is calculated, which is useful for solving systems of linear equations.
$$
\mathbf{A}^{-1} \cdot \mathbf{A} = \mathbf{I}
$$

- **Decomposition**: A matrix is decomposed into simpler factors, such as singular value decomposition (SVD) or LU decomposition, which is useful for dimensionality reduction and model optimization.
$$
\mathbf{A} = \mathbf{U} \Sigma \mathbf{V}^T
$$

- **Matrix-vector product**: A matrix is multiplied by a vector, which is common in the application of linear models.
$$
\mathbf{A} \cdot \mathbf{v} =
\begin{bmatrix}
a_{11}v_1 + a_{12}v_2 + \cdots + a_{1n}v_n \\
a_{21}v_1 + a_{22}v_2 + \cdots + a_{2n}v_n \\
\vdots \\
a_{m1}v_1 + a_{m2}v_2 + \cdots + a_{mn}v_n \\
\end{bmatrix}
$$

One of the most important operations in machine learning is multiplication, whether of matrices or matrices by vectors, as it is fundamental for training models and making predictions. For example, in a linear regression model, the prediction is made by multiplying the feature matrix by the weight vector of the model:
$$
\hat{\mathbf{y}} = \mathbf{X} \cdot \mathbf{w}
$$

To generate predictions, the feature matrix `X` is multiplied by the weight vector `w`, resulting in a vector of predictions `ŷ`.

Let's look at a concrete example to illustrate how vectors and matrices are used in machine learning:

Suppose we have a linear regression model with two features (height and weight) and a dataset with three instances:

| Height | Weight |
|--------|--------|
| 170 | 65 |
| 182 | 75 |
| 160 | 55 |

We can represent this dataset as a matrix `X`:

$$
\mathbf{X} =
\begin{bmatrix}
170 & 65 \\
182 & 75 \\
160 & 55 \\
\end{bmatrix}
$$

If our model has a weight vector `w` that represents the importance of each feature, for example:

$$
\mathbf{w} =
\begin{bmatrix}
0.5 \\
0.3 \\
\end{bmatrix}
$$

We can generate predictions by multiplying the matrix `X` by the vector `w`:

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

> We have omitted the bias in this example to simplify the explanation, but in a real model, a bias term (bias) would also be included that would be added to the predictions: $$\hat{\mathbf{y}} = \mathbf{X} \cdot \mathbf{w} + \mathbf{b} $$

Calculating the product, we get:

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

In this example, the predictions `ŷ` for each data instance are calculated as a linear combination of the features (height and weight) weighted by the model's weights.

| Height | Weight | Prediction (ŷ) |
|--------|--------|------------------|
| 170 | 65 | 104.5 |
| 182 | 75 | 113.5 |
| 160 | 55 | 96.5 |

If the problem we are dealing with is classification, we could apply an activation function (such as the sigmoid function) to the predictions to obtain class probabilities, whereas for regression we could use the predictions directly to evaluate the model's performance (the value could represent perhaps a risk index or a continuous variable estimated from the features).

### Use in Algorithms and Libraries

Specifically, matrix operations are the foundation of many machine learning algorithms:

- **Linear Regression**: Uses matrix multiplication to calculate predictions based on the model's features and weights, and in its closed form employs operations such as matrix transposition and inverse.
- **Neural Networks**: Use matrix operations to calculate activations in each layer of the network, as well as to update weights during training.
- **Logistic Regression**: Uses matrix multiplication to calculate and then obtain class probabilities based on the model's features and weights.

Regarding their use, libraries such as NumPy, TensorFlow, PyTorch, and Scikit-learn provide optimized functions for efficiently performing vector operations:

```python
import numpy as np
# Create a data matrix
X = np.array([[170, 65], [182, 75], [160, 55]])
# Create a weight vector
w = np.array([0.5, 0.3])
# Generate predictions
y_hat = X.dot(w)
print(y_hat)
```

### Practice Exercises

In this Colab you can practice operations with vectors and matrices using NumPy: <a href="https://colab.research.google.com/drive/1P7gBDg7b6wVl1EMlCDf0UCWy5UBJ6b6N?usp=sharing" target="_blank" rel="noopener noreferrer">Vector and Matrix Exercises in Machine Learning</a>

---

That's all for now. In the next article, we'll begin to delve deeper into the field of statistics and probability. See you then!