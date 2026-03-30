---
id: 'machine-learning-fundamentals'
title: 'Machine Learning Fundamentals'
slug: 'machine-learning-fundamentals'
date: 2026-03-30
summary: 'Basic concepts for starting in the world of machine learning'
tags: ['Machine Learning', 'Artificial Intelligence', 'Python', 'Data Science', 'Machine Learning']
image: /blog/machine-learning-fundamentals/shared/ml-fundamentals.webp
author: David Deras
lastmod: 2026-03-30
sitemap:
  priority: 0.7
  loc: /es/blog/machine-learning-fundamentals
  lastmod: 2026-03-30
---

This is the first part of a series of articles where we will explore machine learning, from its basic concepts to neural networks and the creation of a machine learning model. In this first part, we will focus on the fundamentals of machine learning, including what it is, its types and some common algorithms.

::table-of-contents
::

---

## Artificial Intelligence and Machine Learning

You wake up one day, open Netflix and find exactly the series you wanted to watch. Then, you open Google and type something, and the search engine completes your sentence before you finish typing. How do they do this? The answer is: Artificial Intelligence. AI is a discipline focused on developing systems capable of performing tasks that normally require human intelligence, such as **learning**, **reasoning** and **perceiving** our environment, as well as **making decisions**.

There are three types of AI:

- **Weak or Narrow AI (Artificial Narrow Intelligence or ANI)**: This is the AI we have today. It is designed to perform specific tasks, such as voice recognition, product recommendations, or automatic translation. It does not have consciousness or real understanding; it simply follows predefined algorithms and patterns. Large Language Models like GPT, Claude, or Gemini are examples of weak AI, as they are designed to process and generate text, "only" being statistical models that predict text, and not having a deep understanding of the world or being able to perform tasks outside their specific domain. Although they may seem intelligent, in reality, they are only mimicking language patterns based on the data with which they were trained.
- **General AI (Artificial General Intelligence or AGI)**: This is a hypothetical AI that would have the ability to understand, learn, and apply knowledge across a wide range of tasks, similar to human intelligence. It does not exist yet, but it is a long-term goal in the field of AI.
- **Superintelligence (Artificial Superintelligence or ASI)**: This is an AI that would surpass human intelligence in all aspects, including creativity, problem-solving, and decision-making. It is a **theoretical** concept that raises many ethical and philosophical questions about the future of humanity.

Where does Machine Learning fit in? It's very common to confuse AI with Machine Learning, but they aren't exactly the same. We can say that Artificial Intelligence is a broad conceptual umbrella, and under that umbrella lies Machine Learning, a specific subfield that allows computers to learn automatically from data, without the need for a human to program them step by step.

> Recommended resources:
> * [Artificial Intelligence vs Machine Learning vs Deep Learning | Machine Learning 101](https://youtu.be/dKqwnCKrpVI?si=g6qqFa_1G_M5P3LS)

---

## AI Subfields

Within the broad umbrella of AI, there are several subfields that specialize in different aspects of artificial intelligence:

- **Machine Learning**: Focuses on developing algorithms that allow machines to learn from data and improve their performance over time without being explicitly programmed for each specific task.

- **Deep Learning**: Is a branch of machine learning that uses deep neural networks to model and solve complex problems. It is especially effective in tasks such as speech recognition, computer vision, and natural language processing.

- **Natural Language Processing (NLP)**: Focuses on the interaction between computers and human language, allowing machines to understand, interpret, and generate text naturally. This is what makes it possible for chatbots like ChatGPT to maintain coherent conversations with users.

- **Computer Vision**: This field enables machines to understand and process images and videos. It is fundamental for applications such as facial recognition, autonomous driving, and object detection.

- **Robotics**: This field focuses on the design and construction of robots that can perform physical tasks in the real world, from manufacturing to medical assistance.

- **Expert Systems**: These are programs that mimic the decision-making of a human expert in a specific domain, using rules and logic to solve complex problems.

- **Automatic Reasoning**: This field focuses on inferring logical conclusions from formal rules. It is not the same as machine learning. This field includes symbolic logic, problem-solving, and automated planning.

- **Intelligent Agents**: These are systems that can perceive their environment, reason about it, and make decisions to achieve specific goals. They can be as simple as a chatbot or as complex as an autonomous driving system (they can use machine learning, simple rules, logical reasoning, etc.).

- **Distributed AI**: This refers to AI systems that operate across multiple devices or nodes, collaborating to solve problems more efficiently. This is especially relevant in applications such as the Internet of Things (IoT) and cloud computing.

- **Explainable AI (XAI)**: This focuses on developing AI models that are transparent and understandable to humans, allowing users to understand how and why the AI ​​makes certain decisions.

- **AI Ethics and Governance**: This deals with the ethical, legal, and social implications of AI development and use, addressing issues such as privacy, fairness, and transparency.

---

## How a Machine Learns

Everything depends on the data we give it:

- **Supervised Learning**: Here we give the machine clear examples with correct answers already "labeled". For example, if we want the AI to help with a medical diagnosis, we give it thousands of medical histories where we already know which patient was **sick** and which patient was **healthy**. The machine learns to recognize patterns in this data to be able to predict the diagnosis of new patients based on what it has learned.

  A simple example would be something like this:

  | Age | Symptoms          | Test Results         | Diagnosis   |
  |-----|-------------------|----------------------|-------------|
  | 45  | Fever, Cough      | Positive             | Sick        |
  | 30  | Headache          | Negative             | Healthy     |

  The label here is the "Diagnosis", and the machine learns to associate the features (Age, Symptoms, Test Results) with that label to make future predictions.

  Within supervised learning, there are two main types of tasks:
  - **Classification**: Where the machine assigns a label to each example. As in classifying emails as "spam" or "not spam".
  - **Regression**: Where the machine predicts a continuous value. For example, predicting the price of a house based on features like size, location, and number of rooms.

  Basically, if the response we want to predict is a category (or a <a href="https://www.geeksforgeeks.org/maths/difference-between-discrete-and-continuous-variable/" target="_blank" rel="noopener noreferrer" aria-label="discrete variable">discrete variable</a>), it's classification, if the response represents a measurable amount on a continuous scale, it's regression.
  And the requirement for supervised learning to work well is to have a large and representative dataset, with accurate labels. If the data is scarce or the labels are incorrect, the machine will not be able to learn correctly and its predictions will be inaccurate.

  Examples of ML applications are:
  - Fraud detection in financial transactions (classification)
  - Stock price prediction (regression)
  - Image recognition (classification)
  - Sentiment analysis in social media (classification)

---

- **Unsupervised Learning**: Imagine being dropped in an unfamiliar country and having to deduce how society works simply by observing; it's similar. Here, the machine receives unlabeled data and must find hidden patterns on its own. The system will have to analyze similarities, differences, and behaviors to find unusual groupings or patterns. There's no "teacher" to tell it if it's right or wrong.

  Main techniques:
  1. **Clustering (Grouping)**: Groups similar data points together.
    It's typically used for customer segmentation, grouping documents by topic, and automatic image organization, among others. Some algorithms:
      - K-means clustering
      - DBSCAN
      - Hierarchical clustering
  2. **Dimensionality Reduction**: This seeks to reduce the number of variables while maintaining important information. Used for visualizing complex data and preparing data for other models.
      - Principal Component Analysis (PCA)
      - t-SNE
  3. **Anomaly Detection**: Identifies data points that behave differently from the rest. Useful for detecting fraud, system failures, and suspicious behaviors.

  A simple example would be:
  | Age | Annual Income | Monthly Expenses |
  |-----|------------------|------------------|
  | 25  | $30,000          | $1,000           |
  | 40  | $80,000          | $3,000           |
  | 60  | $50,000          | $2,000           |

  The machine could group customers into segments based on their income and expenses, without explicitly telling it what groups exist.
  With this, we can identify consumption patterns, such as young customers tending to spend less than middle-aged customers, or there being a group of customers with high income but low expenses, which could indicate a savings segment.

---

- **Reinforcement Learning**: Think about how you train a pet with treats. The machine (the agent) takes decisions in an environment and receives "rewards" or "penalties". This is how Tesla's autonomous driving systems or robots learn to navigate the physical world. A example I like is a video where <a href="https://youtu.be/PKDMGPf-PEA?si=tAEMO3cETdPrvi_t" target="_blank" rel="noopener noreferrer">they train an agent to play Geometry Dash</a>.

  In this type of learning, there are four main components:
  1. **Agent**: It is the system that takes decisions and learns through interaction with the environment. It can be a robot, a computer program, or any system that can perceive its environment and act upon it.
  2. **Environment**: It is the world in which the agent operates. It can be a physical environment, such as a robot in a room, or a virtual environment, such as a video game.
  3. **Reward**: It is the signal that the agent receives after taking an action. It can be positive (reward) or negative (penalty) and serves to guide the agent's learning.
  4. **Policy**: It is the strategy that the agent uses to decide what action to take based on its current state and the rewards it has received in the past.

  Basically they follow a flow like the following:

  <MermaidDiagram content="graph TD 
    A[Agent] -->|Take action| B(Environment)
    B -->|Provide reward| C[Reward]
    C -->|Update policy| A" />

> Recommended Resources:
> * [What is Supervised and Unsupervised Learning? | DotCSV](https://youtu.be/oT3arRRB2Cw?si=ykU9KQjQLxdn9ggj)
> * [Reinforcement Learning: The Definitive Guide](https://youtu.be/qBtB-xcJp4c?si=c2GuJBCFPorKGN44)

---

## AI Project Pipeline

An AI project typically follows a structured process that includes several key stages:

1. **Problem Definition**: It is essential to clearly understand the problem to be solved and the project objectives. This includes identifying the questions to be answered, the expected results, and the success metrics.

2. **Data Collection**: The data needed to train the AI ​​model is collected. This can include structured data (such as databases) or unstructured data (such as text, images, or videos). It is important to ensure that the data is high-quality and representative of the problem to be solved.

3. **Data Preprocessing**: The collected data often needs to be cleaned and transformed before being used to train the model. This may include removing missing values, normalizing data, coding categorical variables, and splitting the data into training and test sets.

4. **Model Selection**: The most suitable machine learning algorithm is chosen for the problem at hand. This may depend on the nature of the data, the complexity of the problem, and the available resources.

5. **Model Training**: The training dataset is used to train the AI ​​model. During this stage, the model learns from the data and adjusts its parameters to minimize prediction errors.

6. **Model Evaluation**: The model's performance is evaluated using the test set. Specific metrics are used to measure the model's precision, accuracy, sensitivity, and other characteristics, depending on the type of problem (classification, regression, etc.).

7. **Hyperparameter Tuning**: If the model's performance is unsatisfactory, the model's hyperparameters can be tuned to improve its performance. This may include changing the model's architecture, adjusting the learning rate, or modifying other algorithm-specific parameters. 8. **Implementation**: Once the model has been trained and evaluated, it is deployed in a production environment where it can be used to make real-time predictions or process new data.

9. **Maintenance and Updating**: After deployment, it is important to monitor the model's performance and update it regularly to ensure it remains effective as data and environmental conditions change.


## Memorizing vs. Learning

When we talk about learning, whether human or machine, there's a crucial concept we must understand: memorizing is not the same as learning.

**Memorizing** is like copying and pasting information without truly understanding it. For example, if you memorize the formula for the area of ​​a circle (A = πr²) without understanding what each part means, you won't be able to apply it correctly in different contexts. Memory saves you in the short term, but it doesn't give you the ability to adapt to new situations or solve problems you haven't encountered before. In contrast, **learning** involves understanding the underlying concepts and being able to apply them to new situations.

In the world of machine learning, a machine that only memorizes training data might perform excellently on that specific data, but then fail spectacularly when used in real-world environments. Therefore, in machine learning, the true goal isn't to memorize specific patterns, but to generalize: to learn rules and relationships that work beyond the examples seen.

But learning isn't easy either. Sometimes, machines suffer from **overfitting**, which occurs when a model perfectly "memorizes" the training data but fails miserably when faced with new, real-world data. It's exactly like a student who memorizes exam answers without truly understanding the concepts. Conversely, if the model is too simple and learns nothing, it suffers from **underfitting**, like a student who didn't study enough.

> Recommended Resources:
> * [Underfitting and Overfitting: Explained](https://youtu.be/o3DztvnfAJg?si=lorMlPZqLAMa-EV3)


---

## The Components of an AI System

- **Data**: This is the foundation of any AI system. Without data, there is no learning. It must be high-quality, relevant, and representative of the problem to be solved. It should be high-volume and have the least possible <a href="https://www.innovatiana.com/en/post/bias-estimation-in-machine-learning" target="_blank" rel="noopener noreferrer">bias</a>.

- **Algorithms**: These are the recipes the machine follows to learn from the data. There are many types of algorithms, each with its own strengths and weaknesses, and they must be carefully selected according to the specific problem to be solved, configured, and fine-tuned to achieve the best possible performance.

- **Infrastructure**: This is the hardware and software necessary to process the data and run the algorithms. This includes everything from servers (CPUs, GPUs, TPUs) to cloud computing platforms and development tools (AWS, Azure, GCP), as well as data storage and database management systems.

In addition to these components, we have **evaluation**, which is the process of measuring the AI ​​model's performance to ensure it is functioning correctly and meeting the established objectives, as well as the role of **ethics and governance**, which is crucial for considering the ethical and social implications.


---

## Ethics in AI

As artificial intelligence becomes more ubiquitous in our lives, it is crucial to consider the ethical implications of its use. Machine learning models can perpetuate existing biases in the data, which can lead to unfair or discriminatory decisions. For example, if a hiring model is trained on historical data that reflects gender or racial bias, the model is likely to reproduce those biases in its recommendations. Furthermore, data privacy is a major concern. It is essential to ensure that the data used is collected and handled ethically, respecting people's privacy and rights.

- **Transparency**: Systems must be understandable and auditable so that users can understand how they work and why they make certain decisions. One solution to this is explainable AI (XAI).

- **Explainability**: AI models must be able to explain their decisions clearly and comprehensibly to users, which helps build trust and allows users to understand the reasons behind the system's recommendations or actions.
- **Accountability**: It must be clearly established who is responsible for the decisions made by AI systems, especially in cases where those decisions can have a significant impact on people's lives. This is where legal frameworks and regulations come into play, which must be developed to ensure that AI companies and developers are held accountable for their creations.

---

This concludes the first part of this series of articles on machine learning. In the next part, we will explore some machine learning paradigms and certain mathematical foundations that are essential for understanding how the algorithms work.