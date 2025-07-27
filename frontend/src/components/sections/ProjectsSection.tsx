"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Activity, MapPin, Database, Heart, Eye, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Wheelchair Inventory Optimization System",
    subtitle: "Cerner Integration & Data-Driven Healthcare Management",
    description: "Proposed integration system for wheelchair inventory management at Vancouver General Hospital, designed to integrate with Cerner EHR for data-driven decision-making and streamlined maintenance processes.",
    longDescription: "Spearheaded project proposal for Vancouver Coastal Health to optimize wheelchair inventory across multiple sites (VGH, Richmond Hospital, Lions Gate Hospital). The proposed system integrates with existing Cerner infrastructure to enable real-time tracking, automated maintenance scheduling, and data analytics for improved patient care delivery.",
    image: "/images/Wheelchair_tracking.png",
    category: "Healthcare Operations",
    status: "Project Proposal - VCH",
    impact: {
      hospitals: "3 Sites",
      patients: "200+",
      efficiency: "Proposed"
    },
    technologies: [
      "SQL", "Python", "Tableau", "Cerner Integration", 
      "Excel", "Data Analysis", "Process Optimization"
    ],
    features: [
      "Cerner EHR integration proposal",
      "Inventory tracking optimization", 
      "Maintenance scheduling automation",
      "Data-driven decision making",
      "Multi-site coordination system"
    ],
    links: {
      demo: "#",
      github: "#",
      case_study: "/case-studies/wheelchair-inventory-optimization"
    },
    color: "blue",
    icon: Activity
  },
  {
    id: 2,
    title: "Project Management Analytics Dashboard", 
    subtitle: "Lean Six Sigma & Performance Optimization",
    description: "Comprehensive project analytics solution implementing Lean Six Sigma methodologies for large-scale construction and engineering projects, achieving 15% timeline reduction and 20% cost savings.",
    longDescription: "Developed for IEQ Global PTE LTD, this analytics platform transformed project management processes through data-driven insights. Implemented advanced financial planning models and variance analysis, resulting in 35% increase in successful bids and improved stakeholder communication across government agencies and contractors.",
    image: "/images/Project_Management.png",
    category: "Project Management",
    status: "Successfully Implemented",
    impact: {
      savings: "20%",
      timeline: "15%↓", 
      bids: "35%↑"
    },
    technologies: [
      "Excel Advanced", "SQL", "Lean Six Sigma", "Financial Modeling", 
      "Risk Assessment", "Tableau", "Process Analytics"
    ],
    features: [
      "Advanced financial planning & analysis",
      "Variance reporting & insights",
      "Lean Six Sigma implementation",
      "Cross-functional coordination tools",
      "Risk assessment frameworks"
    ],
    links: {
      demo: "#",
      github: "#", 
      case_study: "/case-studies/project-management-analytics"
    },
    color: "purple",
    icon: MapPin
  },
  {
    id: 3,
    title: "World Happiness Analytics Dashboard",
    subtitle: "Global Well-being Data Analysis & Visualization Platform", 
    description: "Comprehensive happiness analytics platform analyzing 5 years of World Happiness Report data (2015-2019) across 156 countries, examining socioeconomic factors, regional trends, and policy implications for global well-being.",
    longDescription: "Advanced data visualization and analytics project utilizing the World Happiness Report dataset to uncover global well-being patterns and determinants. Features comprehensive statistical analysis, interactive dashboards, and policy recommendations to identify key factors influencing national happiness levels across different countries and regions.",
    image: "/images/World_Happiness.png",
    category: "Data Analytics",
    status: "Live Demo Available",
    impact: {
      countries: "156",
      years: "5",
      factors: "6 Key"
    },
    technologies: [
      "Python", "Pandas", "NumPy", "React", "TypeScript", "Next.js", "Recharts", "Tailwind CSS",
      "Framer Motion", "Statistical Analysis", "Data Visualization", "Claude AI", "Perplexity AI", "Model Context Protocol",
    ],
    features: [
      "Global happiness trend analysis",
      "Regional comparison dashboards",
      "Factor correlation studies", 
      "Country progress tracking",
      "Policy recommendation framework"
    ],
    links: {
      demo: "/dashboards/happiness-analytics",
      github: "#",
      case_study: "/case-studies/world-happiness-analytics"
    },
    color: "cyan",
    icon: Globe
  },
  {
    id: 4,
    title: "Heart Disease Prediction Dashboard",
    subtitle: "Machine Learning & Interactive Analytics Platform",
    description: "Comprehensive heart disease prediction system using Kaggle's Heart Disease UCI dataset. Features ML model comparison, interactive Tableau dashboard, and clinical decision support tools with 87.7% Random Forest accuracy.",
    longDescription: "Built using the renowned Heart Disease UCI dataset from Kaggle (303 patients, 14 clinical attributes including age, chest pain type, cholesterol, and exercise-induced angina). This end-to-end ML project demonstrates the complete data science pipeline from EDA to deployment, combining statistical analysis, feature engineering, and multiple algorithm comparison with clinical interpretability for healthcare decision support.",
    image: "/images/Heart_Prediction.png",
    category: "Healthcare ML & Analytics",
    status: "Live Demo Available",
    impact: {
      accuracy: "87.7%",
      precision: "89.1%",
      recall: "84.6%"
    },
    technologies: [
      "Python", "Scikit-learn", "Pandas", "NumPy", "Tableau", 
      "Jupyter", "Seaborn", "Matplotlib", "SHAP", "Statistical Analysis"
    ],
    features: [
      "Complete ML pipeline: EDA → Feature Engineering → Model Training → Validation",
      "5 Algorithm comparison: Random Forest (87.7%), Logistic Regression, SVM, Decision Tree, KNN",
      "Interactive Tableau dashboard with 8+ clinical visualizations",
      "Feature importance analysis using SHAP values and permutation importance",
      "Comprehensive model evaluation: Confusion Matrix, ROC-AUC (0.93), Precision-Recall curves",
      "Statistical significance testing and correlation analysis of clinical features",
      "Cross-validation with hyperparameter tuning using GridSearchCV",
      "Clinical decision support with probability thresholds and risk categorization"
    ],
    methodology: {
      dataset: "Kaggle Heart Disease UCI Dataset (303 patients, 14 clinical features)",
      preprocessing: "Missing value analysis, outlier detection, feature scaling with StandardScaler",
      algorithms: ["Random Forest", "Logistic Regression", "SVM (RBF)", "Decision Tree", "K-Nearest Neighbors"],
      validation: "5-fold Cross-validation with stratified sampling",
      metrics: "Accuracy, Precision, Recall, F1-Score, ROC-AUC, Confusion Matrix"
    },
    codeExamples: {
      dataPreprocessing: `# Data preprocessing and feature engineering
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Load and explore dataset
df = pd.read_csv('heart_disease_uci.csv')
print(f"Dataset shape: {df.shape}")
print(df.info())

# Feature engineering
df['age_group'] = pd.cut(df['age'], bins=[0, 40, 55, 70, 100], labels=['<40', '40-55', '55-70', '70+'])
df['high_cholesterol'] = (df['chol'] > 240).astype(int)

# Handle categorical variables
df = pd.get_dummies(df, columns=['chest_pain_type', 'rest_ecg'], drop_first=True)

# Scale numerical features
scaler = StandardScaler()
numerical_cols = ['age', 'resting_bp', 'chol', 'max_heart_rate']
df[numerical_cols] = scaler.fit_transform(df[numerical_cols])`,
      
      modelTraining: `# Model training and comparison
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.metrics import classification_report, roc_auc_score

# Split data
X = df.drop('target', axis=1)
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Random Forest with hyperparameter tuning
rf_params = {
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7, None],
    'min_samples_split': [2, 5, 10]
}
rf_grid = GridSearchCV(RandomForestClassifier(random_state=42), rf_params, cv=5, scoring='accuracy')
rf_grid.fit(X_train, y_train)

# Best model evaluation
best_rf = rf_grid.best_estimator_
y_pred = best_rf.predict(X_test)
accuracy = best_rf.score(X_test, y_test)
roc_auc = roc_auc_score(y_test, best_rf.predict_proba(X_test)[:, 1])

print(f"Random Forest Accuracy: {accuracy:.3f}")
print(f"ROC-AUC Score: {roc_auc:.3f}")
print(f"Best parameters: {rf_grid.best_params_}")`,
      
      visualization: `# Comprehensive visualizations and feature importance
import matplotlib.pyplot as plt
import seaborn as sns
import shap

# Feature importance analysis
feature_importance = best_rf.feature_importances_
feature_names = X.columns
importance_df = pd.DataFrame({
    'feature': feature_names,
    'importance': feature_importance
}).sort_values('importance', ascending=False)

plt.figure(figsize=(10, 8))
sns.barplot(data=importance_df.head(10), x='importance', y='feature')
plt.title('Top 10 Feature Importance - Random Forest')
plt.xlabel('Importance Score')
plt.tight_layout()
plt.show()

# SHAP explanations
explainer = shap.TreeExplainer(best_rf)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values[1], X_test, max_display=10)

# Correlation heatmap
plt.figure(figsize=(12, 10))
correlation_matrix = df.select_dtypes(include=[np.number]).corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Feature Correlation Matrix')
plt.tight_layout()
plt.show()`
    },
    dashboard: {
      description: "Interactive Tableau dashboard with 8 comprehensive visualizations",
      visualizations: [
        "Age distribution by heart disease status with statistical significance",
        "Chest pain types correlation with heart disease probability",
        "Cholesterol levels vs. Maximum heart rate scatter plot with trend analysis",
        "Exercise-induced angina impact on heart disease prediction",
        "Model performance comparison across 5 algorithms with ROC curves",
        "Feature importance ranking with SHAP value explanations",
        "Confusion matrix heatmap with precision/recall breakdown",
        "Risk categorization dashboard for clinical decision support"
      ]
    },
    links: {
      demo: "https://public.tableau.com/views/HeartDiseasePrediction/Dashboard",
      github: "https://github.com/lloyddelacruz/heart-disease-prediction",
      case_study: "/case-studies/heart-disease-prediction"
    },
    color: "red",
    icon: Heart
  },
  {
    id: 5,
    title: "Global Life Expectancy Analytics Dashboard",
    subtitle: "WHO Health Data Analysis & Visualization Platform",
    description: "Comprehensive life expectancy analysis platform using WHO Global Health Observatory data, examining socioeconomic factors, healthcare indicators, and demographic trends across 193 countries over 15 years (2000-2015).",
    longDescription: "Advanced data analytics project utilizing the WHO Life Expectancy dataset to uncover global health patterns and determinants. Features comprehensive exploratory data analysis, statistical modeling, and interactive visualizations to identify key factors influencing life expectancy across different countries and regions. Combines healthcare domain expertise with advanced analytical techniques to deliver actionable insights for public health policy and healthcare system optimization.",
    image: "/images/Life_Expectancy.png",
    category: "Healthcare Analytics",
    status: "Live Demo Available",
    impact: {
      countries: "193",
      years: "15+", 
      factors: "22"
    },
    technologies: [
      "PostgreSQL", "Tableau", "Excel", "ChatGPT", "Claude AI", "Perplexity"
    ],
    features: [
      "Multi-country life expectancy trend analysis",
      "Socioeconomic factor correlation studies", 
      "Healthcare indicator impact assessment",
      "Regional comparison dashboards",
      "Predictive modeling for health outcomes"
    ],
    links: {
      demo: "#",
      github: "https://github.com/lloyd-delacruz/LifeExpectancy.git", 
      case_study: "/case-studies/life-expectancy-analytics"
    },
    color: "green",
    icon: TrendingUp
  },
  {
    id: 6,
    title: "Hospital Spending Analytics Dashboard",
    subtitle: "Canadian Healthcare Expenditure Analysis & Insights",
    description: "Comprehensive hospital spending analysis platform using Canadian MIS Database data, examining healthcare expenditure patterns, regional distributions, and cost trends across provinces (2005-2023).",
    longDescription: "Advanced healthcare expenditure analytics project utilizing the Canadian MIS Database to uncover hospital spending patterns and cost drivers. Features comprehensive analysis of compensation, supplies, drugs, and infrastructure costs across different provinces and territories, providing insights for healthcare policy and budget optimization.",
    image: "/images/Hospital_Spending.png",
    category: "Healthcare Analytics",
    status: "Live Demo Available",
    impact: {
      provinces: "11",
      years: "18+",
      categories: "7"
    },
    technologies: [
      "React", "TypeScript", "Recharts", "Excel", "Data Analysis", "Healthcare Data"
    ],
    features: [
      "Multi-provincial spending trend analysis",
      "Expense category breakdown and evolution",
      "Compensation vs operational cost analysis",
      "Year-over-year growth tracking",
      "Regional comparison dashboards"
    ],
    links: {
      demo: "/dashboards/hospital-spending",
      github: "#",
      case_study: "/case-studies/hospital-spending-analytics"
    },
    color: "blue",
    icon: Activity
  },
  {
    id: 7,
    title: "National Health Expenditure Dashboard",
    subtitle: "Canadian Health Spending Trends & Policy Analysis",
    description: "Interactive national health expenditure platform analyzing Canadian health spending from 1975-2022, examining total expenditure, per capita costs, GDP percentage, and sector distribution for policy insights.",
    longDescription: "Comprehensive national health expenditure analysis using 48 years of Canadian health spending data. Features interactive visualizations, sector distribution analysis, and policy-relevant insights for understanding healthcare cost trends and their impact on the Canadian economy.",
    image: "/images/National_Health_Expenditure.png",
    category: "Healthcare Policy Analytics",
    status: "Live Demo Available",
    impact: {
      years: "48",
      growth: "27x",
      sectors: "4"
    },
    technologies: [
      "React", "TypeScript", "Chart.js", "Next.js", "Statistical Analysis", "Policy Research"
    ],
    features: [
      "48-year historical spending analysis",
      "Per capita expenditure tracking",
      "GDP percentage trend analysis",
      "Public vs private sector breakdown",
      "Multi-metric comparison dashboard"
    ],
    links: {
      demo: "/dashboards/national-health-expenditure",
      github: "#",
      case_study: "/case-studies/national-health-expenditure"
    },
    color: "purple",
    icon: TrendingUp
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function ProjectsSection() {
  const getDashboardRoute = (projectId: number) => {
    switch (projectId) {
      case 1: return '/dashboards/inventory-management';
      case 2: return '/dashboards/operational-optimization';
      case 3: return '/dashboards/happiness-analytics';
      case 4: return '/dashboards/heart-disease-prediction';
      case 5: return '/dashboards/life-expectancy';
      case 6: return '/dashboards/hospital-spending';
      case 7: return '/dashboards/national-health-expenditure';
      default: return '/projects';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {projects.map((project, index) => (
            <React.Fragment key={project.id}>
              <motion.div
                variants={cardVariants}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
              {/* Project Image/Visual */}
              <div className="lg:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg bg-white p-4"
                >
                  <div className="relative rounded-xl overflow-hidden bg-gray-50">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-contain object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="lg:w-1/2 space-y-6">
                {/* Project Header */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 ${
                      project.color === 'blue' ? 'bg-blue-100 text-blue-800' : 
                      project.color === 'purple' ? 'bg-purple-100 text-purple-800' : 
                      project.color === 'red' ? 'bg-red-100 text-red-800' : 
                      project.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-cyan-100 text-cyan-800'
                    } rounded-full text-sm font-semibold`}>
                      {project.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  
                  <h4 className={`text-xl ${
                    project.color === 'blue' ? 'text-blue-600' : 
                    project.color === 'purple' ? 'text-purple-600' : 
                    project.color === 'red' ? 'text-red-600' : 
                    project.color === 'green' ? 'text-green-600' : 'text-cyan-600'
                  } font-semibold mb-4`}>
                    {project.subtitle}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.impact).map(([key, value]) => (
                    <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-bold ${
                        project.color === 'blue' ? 'text-blue-600' : 
                        project.color === 'purple' ? 'text-purple-600' : 
                        project.color === 'red' ? 'text-red-600' : 
                        project.color === 'green' ? 'text-green-600' : 'text-cyan-600'
                      }`}>
                        {value}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {key.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Key Features</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-2 h-2 ${
                          project.color === 'blue' ? 'bg-blue-500' : 
                          project.color === 'purple' ? 'bg-purple-500' : 
                          project.color === 'red' ? 'bg-red-500' : 
                          project.color === 'green' ? 'bg-green-500' : 'bg-cyan-500'
                        } rounded-full`}></div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href={getDashboardRoute(project.id)}>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center px-6 py-3 ${
                        project.color === 'blue' ? 'bg-blue-600' : 
                        project.color === 'purple' ? 'bg-purple-600' : 
                        project.color === 'red' ? 'bg-red-600' : 
                        project.color === 'green' ? 'bg-green-600' : 'bg-cyan-600'
                      } text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all`}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.button>
                  </Link>
                  
                  
                  <Link href={project.links.case_study}>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Case Study
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </div>
              </motion.div>
            
            </React.Fragment>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 mb-6">
            Want to see more of my work and detailed case studies?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}