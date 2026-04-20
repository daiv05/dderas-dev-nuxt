---
id: 'machine-learning-paradigms-and-mathematical-foundations'
title: 'Machine learning paradigms and mathematical foundations'
slug: 'machine-learning-paradigms-and-mathematical-foundations'
date: 2026-04-06
summary: 'Types of machine learning, common algorithms and essential mathematical foundations for understanding how machine learning models work.'
tags: ['Machine Learning', 'Artificial Intelligence', 'Python', 'Data Science', 'Machine Learning']
image: /blog/machine-learning-paradigms-and-mathematical-foundations/shared/ml-paradigms.webp
author: David Deras
lastmod: 2026-04-06
sitemap:
  priority: 0.7
  loc: /es/blog/machine-learning-paradigms-and-mathematical-foundations
  lastmod: 2026-04-06
---

We continue learning about Machine Learning, this time we will delve into the different paradigms of machine learning and the mathematical foundations that support these models.

Previous article: [Machine Learning Fundamentals](https://deras.dev/blog/machine-learning-fundamentals)

::table-of-contents
::

---

## Machine Learning Paradigms

In the previous article, we already mentioned the types of machine learning, in this section we will review them and then move on to the mathematical foundations.

### Supervised Learning

Supervised learning requires a dataset where each input example X is associated with a label or output Y. The objective of the model is to learn a function that maps inputs to correct outputs.

Based on this, the training dataset is represented as a set of pairs $$\{(x_1, y_1), (x_2, y_2), ..., (x_n, y_n)\}$$, where $$x_i$$ is the input and $$y_i$$ is the corresponding label. The supervised learning model attempts to find a function f that can predict the output Y from the input X:

$$
f: X \rightarrow Y
$$

Depending on the type of output, supervised learning can be divided into:

- **Classification**: When the output Y is a discrete category (that is, a categorical value). For example, classifying whether an image contains a cat or a dog, whether a number is even or odd, or whether an email is spam or not spam.
- **Regression**: When the output Y is a continuous value (that is, a real number). For example, making predictions about future sales based on historical data, predicting the price of a house based on its features, or estimating the temperature of a city based on climatic factors.

---

### Unsupervised Learning

In unsupervised learning, the model receives only the inputs X without associated labels: $$\{x_1, x_2, ..., x_n\}$$. The objective is to find underlying patterns or structures in the data.
Some examples of unsupervised learning techniques include:

- **Clustering**: Grouping similar data points into clusters. For example, segmenting customers into groups based on their purchasing behaviors.

- **Dimensionality Reduction**: Reducing the number of variables in a dataset while preserving as much information as possible. For example, using PCA (Principal Component Analysis) to visualize data in 2D or 3D.

---

### Reinforcement Learning

Reinforcement learning is based on the idea that an agent learns to make decisions by interacting with an environment. The agent receives rewards or penalties based on the actions it takes, and its objective is to maximize the accumulated reward over time.
In this paradigm, the agent learns an action policy that allows it to make optimal decisions based on the current state of the environment. A classic example of reinforcement learning is the game of chess, where the agent learns to play better as it plays more games and receives feedback about its moves.

1. **Agent**: The system that makes decisions.
2. **Environment**: The world with which the agent interacts.
3. **Reward**: The feedback that the agent receives after taking an action.
4. **Policy**: The strategy that the agent follows to make decisions.

Its applications include games, robotics, and recommendation systems.

---

## Mathematical Foundations

It is important to understand that machine learning is based on concepts from linear algebra, calculus, probability, and statistics. These fundamentals are essential for understanding how **models work** and how they are **optimized**.

### Regression

What is a regression problem? It is a type of problem where the objective is to predict a continuous value by finding the best line (or plane) that fits the data. We have already discussed application examples such as price calculation, sales forecasting, etc.

The simplest form of regression is linear regression, which can be mathematically expressed as:
$$
y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p + \epsilon
$$

Where:
- $$y$$ is the dependent variable (what we want to predict).
- $$x_1, x_2, ..., x_p$$ are the independent variables (the features).
- $$\beta_0$$ is the intercept (the value of $$y$$ when all $$x$$ are 0).
- $$\beta_1, \beta_2, ..., \beta_p$$ are the coefficients that represent the influence of each feature on the dependent variable.
- $$\epsilon$$ is the error or noise value, which represents the variability not explained by the model, that is, what affects $$y$$ but is not included in the independent variables.

The objective of the regression model is to find the values of the coefficients $$\beta$$ that minimize the difference between the model's predictions and the real values of $$y$$. This can be achieved using techniques such as the least squares method.

The **intercept** is represented as the first element of the coefficient vector $$\boldsymbol{\beta}$$, and it is the value of $$\mathbf{y}$$ when all the independent variables in $$\mathbf{X}$$ are zero, that is, it represents the point where the regression line crosses the Y-axis.

The **slope** is represented by the remaining coefficients in the vector $$\boldsymbol{\beta}$$, and each coefficient indicates the amount of change in the dependent variable $$\mathbf{y}$$ for each unit change in the corresponding independent variable in $$\mathbf{X}$$, keeping all other independent variables constant.
Graphically we can see it as follows:

![Linear regression graph](/blog/machine-learning-paradigms-and-mathematical-foundations/shared/regression-model.webp)
_Linear Regression Graph_

Each black point represents a training data point, and the red line represents the model.

The key point here is to understand that **the main objective** is to find the values of the coefficients $$\boldsymbol{\beta}$$ that make the predictions $$\mathbf{y}$$ (the red line) as close as possible to the actual values.

That is, we do not seek to predict with perfect accuracy, as (in reality) there will always be some error or difference between what the model predicts and what actually happens. The term $$\boldsymbol{\epsilon}$$ is the difference between the values predicted by the model and the actual values:

$$
\boldsymbol{\epsilon _i} = \mathbf{y_i} - \hat{\mathbf{y_i}}
$$

Which can also be expressed as:

$$
\boldsymbol{\epsilon _i} = \mathbf{y_i} - (\boldsymbol{\beta_0} + \beta_1 x_{i})
$$

To measure the error we can use a loss function. In the case of linear regression, a commonly used loss function is the mean squared error (MSE, for its acronym in English), which is defined as:

$$
MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y_i})^2
$$

Where:
- $$n$$ is the number of examples in the dataset.
- $$y_i$$ is the actual value of the dependent variable for example $$i$$.
- $$\hat{y}_i$$ is the model's prediction for example $$i$$.

Minimizing the MSE is equivalent to minimizing the sum of squared errors:

$$
\sum_{i=1}^{n} (y_i - \hat{y_i})^2
$$

Or also:
$$
\sum_{i=1}^{n} (y_i - (\beta_0 + \beta_1 x_i))^2
$$

This is known as the **least squares method**, and it is a commonly used technique to find the coefficients $$\boldsymbol{\beta}$$ that best fit the data.

> Why are squares used? Because by squaring the differences, larger errors are penalized more, which helps to find a better fitting line for the data.

Let's now see how we obtain those coefficients $$\boldsymbol{\beta}$$ using the least squares method. To find the values of $$\beta_0$$ and $$\beta_1$$, we can use the following formulas, which are obtained by taking the derivative of the MSE loss function with respect to the coefficients and setting the derivatives equal to zero:

$$
\beta_1 = \frac{n \sum (x_i y_i) - \sum x_i \sum y_i}{n \sum (x_i^2) - (\sum x_i)^2}
$$

$$
\beta_0 = \bar{y} - \beta_1 \bar{x}
$$

Where:
- $$n$$ is the number of examples in the dataset.
- $$x_i$$ and $$y_i$$ are the values of the independent and dependent variables for each example.
- $$\bar{x}$$ and $$\bar{y}$$ are the means (or averages) of the independent and dependent variables, respectively.

Let's do an example to understand how to apply it. Suppose we have a dataset with the following characteristics:

| Size (m²) | Price (USD) |
|-----------|-------------|
| 50        | 100,000     |
| 100       | 200,000     |
| 150       | 300,000     |

We want to build a linear regression model to **predict the price** of a house based on its size. In this case, the independent variable is the size (X) and the dependent variable is the price (Y). The linear regression model can be expressed as:

$$
y = \beta_0 + \beta_1 x + \epsilon
$$

Where:
- $$y$$ is the price of the house.
- $$x$$ is the size of the house.
- $$\beta_0$$ is the y-intercept.
- $$\beta_1$$ is the slope.
- $$\epsilon$$ is the error or noise, which for this example we will assume is zero for simplicity.

To find the values of $$\beta_0$$ and $$\beta_1$$, we can use the least squares method with the formula we mentioned earlier:
$$
\beta_1 = \frac{n \sum (x_i y_i) - \sum x_i \sum y_i}{n \sum (x_i^2) - (\sum x_i)^2}
$$
$$
\beta_0 = \bar{y} - \beta_1 \bar{x}
$$
Where:
- $$n$$ is the number of examples (in this case, 3).
- $$x_i$$ and $$y_i$$ are the values of size and price for each example.
- $$\bar{x}$$ and $$\bar{y}$$ are the means of the independent and dependent variables, respectively.

We have then for this case:
$$
\beta_1 = \frac{3(50*100000 + 100*200000 + 150*300000) - (50 + 100 + 150)(100000 + 200000 + 300000)}{3(50^2 + 100^2 + 150^2) - (50 + 100 + 150)^2}
$$
$$
\beta_0 = \frac{100000 + 200000 + 300000}{3} - \beta_1 \frac{50 + 100 + 150}{3}
$$

Solving these formulas, we obtain the values ​​of $$\beta_0 = 0$$ and $$\beta_1 = 2000$$, which allow us to build the following model:
$$
\hat{y} = 0 + 2000x
$$
$$
\hat{y} = 2000x
$$

We can now make predictions for new size values. For example, for a 120 m² house, the model predicts a price of:
$$
\hat{y} = 2000 * 120 = 240,000
$$

Our calculations have yielded the best coefficients that **minimize** the mean squared error (but do not eliminate it completely). To measure the error of our model, we can calculate the MSE using the formula mentioned earlier:

$$
MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y_i})^2
$$

Where:
- $$n$$ is the number of examples (in this case, 3).
- $$y_i$$ are the real values of price for each example.
- $$\hat{y}_i$$ are the model predictions for each example, which are calculated using the linear regression model.

1. We calculate the predictions for each example:

- For 50 m²: $$\hat{y_1} = 2000 * 50 = 100,000$$
- For 100 m²: $$\hat{y_2} = 2000 * 100 = 200,000$$
- For 150 m²: $$\hat{y_3} = 2000 * 150 = 300,000$$

2. We calculate the errors for each example:

$$
e_i = y_i - \hat{y_i}
$$

- Error for 50 m²: $$e_1 = 100000 - 100000 = 0$$
- Error for 100 m²: $$e_2 = 200000 - 200000 = 0$$
- Error for 150 m²: $$e_3 = 300000 - 300000 = 0$$

3. We square the errors and average them to obtain the MSE:

$$
MSE = \frac{1}{3} (0^2 + 0^2 + 0^2) = 0
$$

For this case, an MSE of 0 indicates that the model predicts the real values perfectly for **this training dataset**. Of course, in practice, real data will contain noise and will be even more variable, so the epsilon $$\epsilon$$ will not be zero.

To explore more with regression, you can use this Google Colab that contains a complete example of linear regression with Python: <a href="https://colab.research.google.com/drive/1yi8-fVw2Ak7pqYOzZsiT7NO_zccZrQir?usp=sharing" target="_blank" rel="noopener noreferrer">linear_regression</a>

---

### Classification

A classification problem aims to predict a categorical output variable based on a set of input variables. For example, predicting whether an email is spam or not spam based on its content, or determining whether an image contains a cat or a dog.

There are three main types of classification:
- **Binary Classification**: When there are two possible classes. For example, classifying whether a patient has a disease (yes/no).
- **Multi-class Classification**: When there are more than two possible classes. For example, classifying the type of flower (could be setosa, versicolor or virginica) based on its characteristics.
- **Multi-label Classification**: When each example can belong to multiple classes, such as classifying the labels of a news article (politics, economy, sports) where an article can belong to several categories.

> The difference between multi-class and multi-label classification is that in the former each example can only belong to one class, while in the latter an example can belong to multiple classes simultaneously.

Let's look a bit more at binary classification. In this case, the objective is to find a function that maps the inputs to one of the two possible classes.

The question that the binary classification model attempts to answer is: **What is the probability that an example belongs to class 1 given a set of features?** This can be expressed mathematically as:
$$ P(y=1|x) = f(x) $$
Where:
- $$P(y=1|x)$$ is the probability that the class is 1 given the feature vector x.
- $$f(x)$$ is the function that maps the features to the probability.

The most common model for binary classification is the **logistic regression**, which has the following process:

1. We calculate a **linear combination** of the features:

$$
z = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p
$$

2. We apply the **sigmoid function** to obtain a probability:

$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

3. Class probability:
$$
P(y=1|x) = \sigma(z) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p)}}
$$

Where:
- $$\beta_0$$ is the intercept.
- $$\beta_1, \beta_2, ..., \beta_p$$ are the coefficients that represent the influence of each feature on the dependent variable.
- $$x_1, x_2, ..., x_p$$ are the features or independent variables.
- $$P(y=1|x)$$ is the probability that the class is 1 given the feature vector x.

Each feature provides evidence for or against a particular class. For example, if the word "free" appears in an email, it might increase the probability that it is spam. On the other hand, if the word "meeting" appears, it might decrease the probability of it being spam.

> This gives us not only a classification but also a measure of confidence in that classification through the probability calculated by the sigmoid function.

The sigmoid function transforms any real value into a value between 0 and 1. The formula as shown above is:
$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$
Where:
- $$z$$ is the linear combination of the features, that is, $$z = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p$$.
- $$e$$ is Euler's number, approximately equal to 2.71828.
- $$\sigma(z)$$ is the output of the sigmoid function, which represents the probability of the class being 1 given the value of z (range between 0 and 1).

Visually it looks something like this (with z on the X-axis and $$\sigma(z)$$ on the Y-axis):
![Sigmoid Function Graph](/blog/machine-learning-paradigms-and-mathematical-foundations/shared/sigmoid-function.webp)
_Sigmoid Function Graph_

From this we can draw some important conclusions:
- When z is very negative, $$\sigma(z)$$ approaches 0, indicating a low probability that the class is 1.
- When z is very positive, $$\sigma(z)$$ approaches 1, indicating a high probability that the class is 1.
- When z is 0, $$\sigma(z)$$ is 0.5, indicating an equal probability that the class is 0 or 1.

The value of 0.5 **is commonly used as a threshold**, so that:
- If $$\sigma(z) \geq 0.5$$, it is classified as class 1.
- If $$\sigma(z) < 0.5$$, it is classified as class 0.

> Key properties:
> - Bounded range between 0 and 1
> - Monotonicity: if z increases, $$\sigma(z)$$ also increases
> - Asymptotic: $$\sigma(z) \to 1$$ when $$z \to \infty$$ and $$\sigma(z) \to 0$$ when $$z \to -\infty$$

**How do we measure error in classification?** Here we use metrics like **cross-entropy** or **log loss**:

Loss for a single sample:
$$
L = -[y \cdot \log(\hat{y}) + (1 - y) \cdot \log(1 - \hat{y})]
$$

Average loss (or cost function) for the entire dataset:
$$
J = -\frac{1}{n} \sum_{i=1}^{n} [y_i \cdot \log(\hat{y_i}) + (1 - y_i) \cdot \log(1 - \hat{y_i})]
$$

Where:
- $$n$$ is the number of examples in the dataset.
- $$y_i$$ is the true label (0 or 1) for example $$i$$.
- $$\hat{y_i}$$ is the predicted probability by the model for example $$i$$ (value between 0 and 1).

Why is cross-entropy used?
1. It penalizes incorrect predictions with high confidence more heavily.
2. It is a convex loss function, which makes optimization easier using methods like gradient descent.
3. It has a probabilistic interpretation, as it is based on the predicted probability by the model.

The behavior of the loss function is shown in the following graph:

![Cross-Entropy Loss Function Graph](/blog/machine-learning-paradigms-and-mathematical-foundations/shared/cross-entropy.webp)
_Cross-Entropy Loss Function Graph_

The function penalizes more heavily the incorrect predictions with high confidence, which is reflected in the shape of the curve.
1. When the true label is 1 (y=1) (blue line):
- The formula simplifies to $$L = -\log(\hat{y})$$
- If $$\hat{y}$$ approaches 1, the loss approaches 0 (good prediction).
- If $$\hat{y}$$ approaches 0, the loss shoots to infinity (bad prediction).
2. When the true label is 0 (y=0) (red line):
- The formula simplifies to $$L = -\log(1 - \hat{y})$$
- If $$\hat{y}$$ approaches 0, the loss approaches 0 (good prediction).
- If $$\hat{y}$$ approaches 1, the loss shoots to infinity (bad prediction).

The logarithmic nature of the function ensures that the model is heavily penalized when it is "confident but wrong", forcing it to adjust its weights more aggressively to improve predictions.

## Validation and Optimization

### Evaluation Metrics

For **regression**, the common metrics include:
- **Mean Squared Error (MSE)**: Average of the squares of the differences between the actual values and the predictions.
- **Root Mean Squared Error (RMSE)**: Square root of the MSE, which has the same unit as the dependent variable.
- **Coefficient of Determination (R²)**: Proportion of the variance in the dependent variable that is explained by the model.

For **classification**, the common metrics include:
- **Accuracy**: Proportion of correct predictions over the total number of examples.
- **Precision**: Proportion of true positives over the total number of positive predictions.
- **Recall (Sensitivity)**: Proportion of true positives over the total number of actual positive examples.
- **F1 Score**: Harmonic mean of precision and recall, providing a balanced measure between both.

> The choice of the appropriate metric depends on the context of the problem and the consequences of classification errors. For example, in a fraud detection problem, it is more important to minimize false negatives (failing to detect fraud) than false positives (marking a legitimate transaction as fraud), so recall could be a more relevant metric than precision.

### Optimization

Optimization of machine learning models refers to the process of adjusting the model parameters to **minimize the loss function**. This can be achieved through techniques like gradient descent, which iteratively adjusts the model weights in the direction that reduces the loss.

Gradient descent can be mathematically expressed as:
$$
\theta = \theta - \alpha \nabla J(\theta)
$$  
Where:
- $$\theta$$ represents the model parameters (for example, the coefficients in regression).
- $$\alpha$$ is the learning rate, which controls the size of the steps taken in each iteration.
- $$\nabla J(\theta)$$ is the gradient of the loss function with respect to the parameters, indicating the direction of greatest increase in the loss.

The optimization process continues until a convergence criterion is met, such as a maximum number of iterations or a minimum improvement in the loss function.

- It has a **learning rate** ($$\alpha$$) that controls the size of the steps taken in each iteration (typically a small value like 0.01 or 0.001).
- The **gradient** ($$\nabla J(\theta)$$) is a vector containing the partial derivatives of the loss function with respect to each parameter, indicating the direction of greatest increase in the loss.
- The optimization process continues until a **convergence** criterion is met, such as a maximum number of iterations or a minimum improvement in the loss function.

Graphically:

![Graphical representation of the gradient descent optimization process](/blog/machine-learning-paradigms-and-mathematical-foundations/shared/gradient-descent.webp)
_Optimization with Gradient Descent_

1. The process starts with a random point on the loss function (INITIAL POINT).
2. The gradient is calculated at that point, indicating the direction of greatest increase in the loss.
3. The model parameters are updated in the opposite direction of the gradient, with a step size controlled by the learning rate (LEARNING RATE / STEP SIZE).
4. This process is repeated iteratively until a local or global minimum of the loss function is reached, indicating that the model has been optimized.

The learning rate is crucial for the success of the optimization process:
- **DIVERGENCE**: If the learning rate is too **high**, the model may diverge, jumping over the minimum and increasing the loss.
- **SLOW CONVERGENCE**: If the learning rate is too **low**, the optimization process may be very slow, taking a long time to converge or getting stuck in a local minimum.
- **OPTIMAL CONVERGENCE**: An appropriate learning rate allows the model to converge efficiently towards a global or local minimum, effectively optimizing the loss function.

## The Machine Learning Process

We can summarize the ML process in:

1. **Learning Paradigm**: Choose the type of learning (supervised, unsupervised, reinforcement) based on the problem to solve.
    - Define the type of problem and available data.
2. **Mathematical Model**: Select an appropriate model (regression, classification, clustering) and understand its mathematical formulation.
    - Establish the mathematical relationship between input and output.
3. **Loss/Cost Function**: Define a loss function that measures the model's error and can be optimized.
    - Quantifies how bad the model is in its predictions.
4. **Optimization**: Use techniques like gradient descent to adjust the model parameters and minimize the loss function.
    - Finds the best parameters for the model to make good predictions.
5. **Evaluation**: Measure the model's performance using appropriate metrics for the problem type (MSE for regression, accuracy/recall for classification, etc.).
    - Validates the performance of the model and its ability to generalize to unseen data.
