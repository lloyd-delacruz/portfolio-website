---
title: "Data Science in Healthcare: Building Predictive Analytics for Better Patient Outcomes"
excerpt: "Learn how data science and machine learning are transforming healthcare analytics, from predictive modeling to real-time patient monitoring and population health insights."
date: "2025-11-15"
author: "Lloyd Dela Cruz"
category: "data-science"
tags: ["Data Science", "Healthcare Analytics", "Machine Learning", "Python", "Predictive Modeling"]
readTime: "15 min read"
featured: false
image: "/images/blog/healthcare-data-science.jpg"
video: false
interactive: true
gradient: "from-emerald-600 via-teal-600 to-cyan-800"
published: true
---

# Data Science in Healthcare: Building Predictive Analytics for Better Patient Outcomes

Healthcare generates vast amounts of data every day - from electronic health records and medical imaging to wearable devices and clinical trials. The challenge isn't collecting data; it's transforming this wealth of information into actionable insights that improve patient care and outcomes.

## The Healthcare Data Revolution

Modern healthcare systems collect data from multiple sources:

- **Electronic Health Records (EHR)**: Patient demographics, medical history, medications, lab results
- **Medical Imaging**: X-rays, MRIs, CT scans, ultrasounds
- **Wearable Devices**: Heart rate, steps, sleep patterns, blood oxygen levels
- **Clinical Trials**: Treatment efficacy, side effects, patient responses
- **Population Health**: Disease prevalence, health trends, social determinants

## Building Predictive Models for Healthcare

### 1. **Patient Risk Stratification**

One of the most impactful applications is identifying high-risk patients before complications occur:

```python
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import numpy as np

class PatientRiskModel:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100, 
            max_depth=10, 
            random_state=42
        )
        self.feature_columns = [
            'age', 'bmi', 'systolic_bp', 'diastolic_bp',
            'cholesterol', 'glucose', 'smoking', 'diabetes',
            'heart_disease_family_history', 'exercise_frequency'
        ]
    
    def prepare_features(self, patient_data):
        """Prepare features for model prediction"""
        features = patient_data[self.feature_columns].copy()
        
        # Handle missing values
        features = features.fillna(features.median())
        
        # Create interaction features
        features['bp_product'] = features['systolic_bp'] * features['diastolic_bp']
        features['risk_score'] = (
            features['age'] * 0.1 + 
            features['bmi'] * 0.05 +
            features['cholesterol'] * 0.01
        )
        
        return features
    
    def train(self, training_data, outcomes):
        """Train the risk prediction model"""
        X = self.prepare_features(training_data)
        y = outcomes  # 1 for high risk, 0 for low risk
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        self.model.fit(X_train, y_train)
        
        # Evaluate model
        y_pred = self.model.predict(X_test)
        print(classification_report(y_test, y_pred))
        
        return self.model
    
    def predict_risk(self, patient_data):
        """Predict risk for new patients"""
        features = self.prepare_features(patient_data)
        risk_probability = self.model.predict_proba(features)[:, 1]
        risk_category = self.categorize_risk(risk_probability)
        
        return {
            'risk_probability': risk_probability,
            'risk_category': risk_category,
            'feature_importance': self.get_feature_importance()
        }
    
    def categorize_risk(self, probabilities):
        """Categorize risk levels"""
        categories = []
        for prob in probabilities:
            if prob < 0.3:
                categories.append('Low')
            elif prob < 0.7:
                categories.append('Medium')
            else:
                categories.append('High')
        return categories
    
    def get_feature_importance(self):
        """Get feature importance for model interpretability"""
        importance_df = pd.DataFrame({
            'feature': self.feature_columns + ['bp_product', 'risk_score'],
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        return importance_df

# Usage example
risk_model = PatientRiskModel()

# Sample patient data
patient_data = pd.DataFrame({
    'age': [45, 62, 33, 58],
    'bmi': [28.5, 32.1, 22.3, 29.8],
    'systolic_bp': [140, 155, 118, 145],
    'diastolic_bp': [90, 95, 75, 88],
    'cholesterol': [220, 280, 180, 240],
    'glucose': [110, 140, 85, 125],
    'smoking': [1, 1, 0, 0],
    'diabetes': [0, 1, 0, 0],
    'heart_disease_family_history': [1, 1, 0, 1],
    'exercise_frequency': [2, 1, 5, 3]
})

# Predict risk (after training)
# risk_predictions = risk_model.predict_risk(patient_data)
```

### 2. **Real-Time Patient Monitoring**

For ICU and emergency departments, real-time analytics can save lives:

```python
import asyncio
from datetime import datetime, timedelta
import json

class RealTimePatientMonitor:
    def __init__(self):
        self.alert_thresholds = {
            'heart_rate': {'min': 60, 'max': 100},
            'blood_pressure': {'systolic_max': 140, 'diastolic_max': 90},
            'oxygen_saturation': {'min': 95},
            'respiratory_rate': {'min': 12, 'max': 20},
            'temperature': {'min': 97.0, 'max': 99.5}
        }
        
        self.patient_states = {}
        self.ml_models = {
            'sepsis_risk': self.load_sepsis_model(),
            'cardiac_event': self.load_cardiac_model()
        }
    
    async def process_vital_signs(self, patient_id, vital_data):
        """Process incoming vital signs data"""
        timestamp = datetime.now()
        
        # Store current state
        if patient_id not in self.patient_states:
            self.patient_states[patient_id] = {
                'history': [],
                'current_alerts': []
            }
        
        self.patient_states[patient_id]['history'].append({
            'timestamp': timestamp,
            'vitals': vital_data
        })
        
        # Keep only last 24 hours of data
        cutoff_time = timestamp - timedelta(hours=24)
        self.patient_states[patient_id]['history'] = [
            record for record in self.patient_states[patient_id]['history']
            if record['timestamp'] > cutoff_time
        ]
        
        # Check for immediate alerts
        alerts = self.check_immediate_alerts(vital_data)
        
        # Run ML predictions
        ml_predictions = await self.run_ml_predictions(patient_id, vital_data)
        
        # Combine alerts
        all_alerts = alerts + ml_predictions
        
        if all_alerts:
            await self.send_alerts(patient_id, all_alerts)
        
        return {
            'patient_id': patient_id,
            'timestamp': timestamp,
            'alerts': all_alerts,
            'risk_scores': ml_predictions
        }
    
    def check_immediate_alerts(self, vitals):
        """Check for immediate critical values"""
        alerts = []
        
        # Heart rate alerts
        if vitals.get('heart_rate'):
            hr = vitals['heart_rate']
            if hr < self.alert_thresholds['heart_rate']['min']:
                alerts.append({
                    'type': 'CRITICAL',
                    'message': f'Bradycardia detected: HR {hr} bpm',
                    'priority': 'HIGH'
                })
            elif hr > self.alert_thresholds['heart_rate']['max']:
                alerts.append({
                    'type': 'CRITICAL',
                    'message': f'Tachycardia detected: HR {hr} bpm',
                    'priority': 'HIGH'
                })
        
        # Blood pressure alerts
        if vitals.get('systolic_bp') and vitals.get('diastolic_bp'):
            sys_bp = vitals['systolic_bp']
            dia_bp = vitals['diastolic_bp']
            
            if (sys_bp > self.alert_thresholds['blood_pressure']['systolic_max'] or
                dia_bp > self.alert_thresholds['blood_pressure']['diastolic_max']):
                alerts.append({
                    'type': 'WARNING',
                    'message': f'Hypertension: BP {sys_bp}/{dia_bp} mmHg',
                    'priority': 'MEDIUM'
                })
        
        # Oxygen saturation alerts
        if vitals.get('oxygen_saturation'):
            o2_sat = vitals['oxygen_saturation']
            if o2_sat < self.alert_thresholds['oxygen_saturation']['min']:
                alerts.append({
                    'type': 'CRITICAL',
                    'message': f'Low oxygen saturation: {o2_sat}%',
                    'priority': 'HIGH'
                })
        
        return alerts
    
    async def run_ml_predictions(self, patient_id, current_vitals):
        """Run machine learning predictions"""
        predictions = []
        
        # Get patient history for context
        patient_history = self.patient_states[patient_id]['history']
        
        if len(patient_history) >= 5:  # Need minimum history for predictions
            # Sepsis prediction
            sepsis_risk = await self.predict_sepsis_risk(patient_history, current_vitals)
            if sepsis_risk > 0.7:
                predictions.append({
                    'type': 'ML_PREDICTION',
                    'message': f'High sepsis risk detected: {sepsis_risk:.2%}',
                    'priority': 'HIGH',
                    'model': 'sepsis_risk',
                    'confidence': sepsis_risk
                })
            
            # Cardiac event prediction
            cardiac_risk = await self.predict_cardiac_event(patient_history, current_vitals)
            if cardiac_risk > 0.6:
                predictions.append({
                    'type': 'ML_PREDICTION',
                    'message': f'Elevated cardiac event risk: {cardiac_risk:.2%}',
                    'priority': 'MEDIUM',
                    'model': 'cardiac_event',
                    'confidence': cardiac_risk
                })
        
        return predictions
    
    async def predict_sepsis_risk(self, history, current_vitals):
        """Predict sepsis risk using ML model"""
        # This would use a trained model in practice
        # For demo, we'll simulate based on vital sign trends
        
        # Calculate trends
        recent_temps = [record['vitals'].get('temperature', 98.6) 
                       for record in history[-5:]]
        recent_hrs = [record['vitals'].get('heart_rate', 70) 
                      for record in history[-5:]]
        
        temp_trend = np.polyfit(range(len(recent_temps)), recent_temps, 1)[0]
        hr_trend = np.polyfit(range(len(recent_hrs)), recent_hrs, 1)[0]
        
        # Simplified risk calculation
        risk_score = 0
        
        if current_vitals.get('temperature', 98.6) > 100.4:
            risk_score += 0.3
        if current_vitals.get('heart_rate', 70) > 90:
            risk_score += 0.2
        if temp_trend > 0.1:  # Rising temperature
            risk_score += 0.2
        if hr_trend > 2:  # Rising heart rate
            risk_score += 0.3
        
        return min(risk_score, 1.0)
    
    async def predict_cardiac_event(self, history, current_vitals):
        """Predict cardiac event risk"""
        # Simplified cardiac risk assessment
        risk_score = 0
        
        if current_vitals.get('systolic_bp', 120) > 160:
            risk_score += 0.3
        if current_vitals.get('heart_rate', 70) > 100:
            risk_score += 0.2
        
        # Check for irregular patterns in recent history
        recent_hrs = [record['vitals'].get('heart_rate', 70) 
                      for record in history[-10:]]
        
        if len(recent_hrs) > 5:
            hr_variability = np.std(recent_hrs)
            if hr_variability > 15:  # High heart rate variability
                risk_score += 0.3
        
        return min(risk_score, 1.0)
    
    async def send_alerts(self, patient_id, alerts):
        """Send alerts to healthcare team"""
        # In practice, this would integrate with hospital alert systems
        for alert in alerts:
            print(f"ALERT for Patient {patient_id}: {alert['message']}")
            
            # Log to monitoring system
            self.log_alert(patient_id, alert)
    
    def log_alert(self, patient_id, alert):
        """Log alert for audit trail"""
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'patient_id': patient_id,
            'alert': alert
        }
        
        # In practice, save to database
        print(f"Logged: {json.dumps(log_entry, indent=2)}")
    
    def load_sepsis_model(self):
        """Load trained sepsis prediction model"""
        # In practice, load from saved model file
        return None
    
    def load_cardiac_model(self):
        """Load trained cardiac event prediction model"""
        # In practice, load from saved model file
        return None

# Usage example
monitor = RealTimePatientMonitor()

async def simulate_patient_monitoring():
    """Simulate real-time patient monitoring"""
    patient_id = "PAT001"
    
    # Simulate incoming vital signs
    vital_signs_stream = [
        {'heart_rate': 72, 'systolic_bp': 120, 'diastolic_bp': 80, 'oxygen_saturation': 98, 'temperature': 98.6},
        {'heart_rate': 85, 'systolic_bp': 135, 'diastolic_bp': 85, 'oxygen_saturation': 97, 'temperature': 99.1},
        {'heart_rate': 95, 'systolic_bp': 145, 'diastolic_bp': 90, 'oxygen_saturation': 96, 'temperature': 100.2},
        {'heart_rate': 110, 'systolic_bp': 160, 'diastolic_bp': 95, 'oxygen_saturation': 94, 'temperature': 101.1},
    ]
    
    for vitals in vital_signs_stream:
        result = await monitor.process_vital_signs(patient_id, vitals)
        await asyncio.sleep(1)  # Simulate time delay

# Run simulation
# asyncio.run(simulate_patient_monitoring())
```

## Data Visualization for Healthcare Insights

Effective visualization is crucial for communicating complex healthcare data:

```python
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
from plotly.subplots import make_subplots

class HealthcareDataVisualizer:
    def __init__(self):
        self.style_config = {
            'figure_size': (12, 8),
            'color_palette': 'viridis',
            'font_size': 12
        }
    
    def create_patient_dashboard(self, patient_data):
        """Create comprehensive patient dashboard"""
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('Vital Signs Trend', 'Risk Scores', 
                          'Lab Results', 'Medication Adherence'),
            specs=[[{"secondary_y": True}, {"type": "bar"}],
                   [{"type": "scatter"}, {"type": "pie"}]]
        )
        
        # Vital signs trend
        fig.add_trace(
            go.Scatter(
                x=patient_data['timestamps'],
                y=patient_data['heart_rate'],
                name='Heart Rate',
                line=dict(color='red', width=2)
            ),
            row=1, col=1
        )
        
        fig.add_trace(
            go.Scatter(
                x=patient_data['timestamps'],
                y=patient_data['blood_pressure_systolic'],
                name='Systolic BP',
                yaxis='y2',
                line=dict(color='blue', width=2)
            ),
            row=1, col=1, secondary_y=True
        )
        
        # Risk scores
        fig.add_trace(
            go.Bar(
                x=['Cardiac', 'Diabetes', 'Stroke', 'Infection'],
                y=patient_data['risk_scores'],
                name='Risk Scores',
                marker_color=['red' if x > 0.7 else 'orange' if x > 0.4 else 'green' 
                             for x in patient_data['risk_scores']]
            ),
            row=1, col=2
        )
        
        # Lab results over time
        for lab_test in patient_data['lab_tests']:
            fig.add_trace(
                go.Scatter(
                    x=patient_data['lab_timestamps'],
                    y=patient_data[lab_test],
                    name=lab_test.replace('_', ' ').title(),
                    mode='lines+markers'
                ),
                row=2, col=1
            )
        
        # Medication adherence
        fig.add_trace(
            go.Pie(
                labels=['Taken', 'Missed', 'Late'],
                values=patient_data['medication_adherence'],
                name="Medication Adherence"
            ),
            row=2, col=2
        )
        
        fig.update_layout(
            height=800,
            title_text="Patient Health Dashboard",
            showlegend=True
        )
        
        return fig
    
    def plot_population_health_trends(self, population_data):
        """Visualize population health trends"""
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        
        # Disease prevalence over time
        axes[0, 0].plot(population_data['years'], population_data['diabetes_prevalence'], 
                       marker='o', label='Diabetes')
        axes[0, 0].plot(population_data['years'], population_data['hypertension_prevalence'], 
                       marker='s', label='Hypertension')
        axes[0, 0].plot(population_data['years'], population_data['heart_disease_prevalence'], 
                       marker='^', label='Heart Disease')
        axes[0, 0].set_title('Disease Prevalence Trends')
        axes[0, 0].set_xlabel('Year')
        axes[0, 0].set_ylabel('Prevalence (%)')
        axes[0, 0].legend()
        axes[0, 0].grid(True, alpha=0.3)
        
        # Age distribution of conditions
        age_groups = ['18-30', '31-45', '46-60', '61-75', '75+']
        diabetes_by_age = population_data['diabetes_by_age']
        
        x = np.arange(len(age_groups))
        width = 0.25
        
        axes[0, 1].bar(x - width, diabetes_by_age, width, label='Diabetes', alpha=0.8)
        axes[0, 1].bar(x, population_data['hypertension_by_age'], width, 
                      label='Hypertension', alpha=0.8)
        axes[0, 1].bar(x + width, population_data['heart_disease_by_age'], width, 
                      label='Heart Disease', alpha=0.8)
        
        axes[0, 1].set_title('Disease Prevalence by Age Group')
        axes[0, 1].set_xlabel('Age Group')
        axes[0, 1].set_ylabel('Cases per 1000')
        axes[0, 1].set_xticks(x)
        axes[0, 1].set_xticklabels(age_groups)
        axes[0, 1].legend()
        
        # Healthcare utilization heatmap
        utilization_data = np.array(population_data['utilization_matrix'])
        services = ['Emergency', 'Primary Care', 'Specialist', 'Hospital', 'Pharmacy']
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        im = axes[1, 0].imshow(utilization_data, cmap='YlOrRd', aspect='auto')
        axes[1, 0].set_title('Healthcare Service Utilization Heatmap')
        axes[1, 0].set_xlabel('Month')
        axes[1, 0].set_ylabel('Service Type')
        axes[1, 0].set_xticks(range(len(months)))
        axes[1, 0].set_xticklabels(months)
        axes[1, 0].set_yticks(range(len(services)))
        axes[1, 0].set_yticklabels(services)
        
        # Add colorbar
        plt.colorbar(im, ax=axes[1, 0], label='Utilization Rate')
        
        # Cost analysis
        cost_categories = ['Prevention', 'Treatment', 'Emergency', 'Chronic Care']
        costs_2023 = population_data['costs_2023']
        costs_2024 = population_data['costs_2024']
        
        x = np.arange(len(cost_categories))
        width = 0.35
        
        axes[1, 1].bar(x - width/2, costs_2023, width, label='2023', alpha=0.8)
        axes[1, 1].bar(x + width/2, costs_2024, width, label='2024', alpha=0.8)
        
        axes[1, 1].set_title('Healthcare Costs by Category')
        axes[1, 1].set_xlabel('Cost Category')
        axes[1, 1].set_ylabel('Cost ($ Millions)')
        axes[1, 1].set_xticks(x)
        axes[1, 1].set_xticklabels(cost_categories, rotation=45)
        axes[1, 1].legend()
        
        plt.tight_layout()
        return fig

# Usage example
visualizer = HealthcareDataVisualizer()

# Sample patient data
sample_patient_data = {
    'timestamps': pd.date_range('2024-01-01', periods=30, freq='D'),
    'heart_rate': np.random.normal(75, 10, 30),
    'blood_pressure_systolic': np.random.normal(120, 15, 30),
    'risk_scores': [0.3, 0.6, 0.2, 0.8],
    'lab_tests': ['glucose', 'cholesterol', 'hemoglobin'],
    'lab_timestamps': pd.date_range('2024-01-01', periods=10, freq='3D'),
    'glucose': np.random.normal(95, 20, 10),
    'cholesterol': np.random.normal(180, 30, 10),
    'hemoglobin': np.random.normal(14, 2, 10),
    'medication_adherence': [85, 10, 5]
}

# dashboard = visualizer.create_patient_dashboard(sample_patient_data)
```

## Machine Learning Pipeline for Healthcare

Building robust ML pipelines is essential for production healthcare systems:

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
import joblib
from datetime import datetime
import logging

class HealthcareMLPipeline:
    def __init__(self, problem_type='classification'):
        self.problem_type = problem_type
        self.pipeline = None
        self.feature_names = None
        self.target_name = None
        self.model_metadata = {}
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def create_pipeline(self, model_type='random_forest'):
        """Create ML pipeline with preprocessing and model"""
        
        if model_type == 'random_forest':
            model = RandomForestClassifier(
                n_estimators=100,
                max_depth=10,
                min_samples_split=5,
                min_samples_leaf=2,
                random_state=42
            )
        elif model_type == 'gradient_boosting':
            model = GradientBoostingClassifier(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=6,
                random_state=42
            )
        elif model_type == 'logistic_regression':
            model = LogisticRegression(
                max_iter=1000,
                random_state=42
            )
        else:
            raise ValueError(f"Unsupported model type: {model_type}")
        
        # Create pipeline
        self.pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('model', model)
        ])
        
        return self.pipeline
    
    def prepare_data(self, data, target_column, feature_columns=None):
        """Prepare data for training"""
        
        if feature_columns is None:
            feature_columns = [col for col in data.columns if col != target_column]
        
        self.feature_names = feature_columns
        self.target_name = target_column
        
        # Handle missing values
        X = data[feature_columns].fillna(data[feature_columns].median())
        y = data[target_column]
        
        # Encode categorical variables if necessary
        categorical_columns = X.select_dtypes(include=['object', 'category']).columns
        
        for col in categorical_columns:
            le = LabelEncoder()
            X[col] = le.fit_transform(X[col].astype(str))
        
        self.logger.info(f"Prepared data: {X.shape[0]} samples, {X.shape[1]} features")
        
        return X, y
    
    def train_model(self, X, y, validation_split=0.2, hyperparameter_tuning=True):
        """Train the model with optional hyperparameter tuning"""
        
        if self.pipeline is None:
            raise ValueError("Pipeline not created. Call create_pipeline() first.")
        
        # Record training metadata
        self.model_metadata = {
            'training_date': datetime.now().isoformat(),
            'n_samples': X.shape[0],
            'n_features': X.shape[1],
            'feature_names': self.feature_names,
            'target_name': self.target_name
        }
        
        if hyperparameter_tuning:
            self.logger.info("Starting hyperparameter tuning...")
            
            # Define parameter grid based on model type
            model_name = type(self.pipeline.named_steps['model']).__name__
            
            if 'RandomForest' in model_name:
                param_grid = {
                    'model__n_estimators': [50, 100, 200],
                    'model__max_depth': [5, 10, 15],
                    'model__min_samples_split': [2, 5, 10]
                }
            elif 'GradientBoosting' in model_name:
                param_grid = {
                    'model__n_estimators': [50, 100, 150],
                    'model__learning_rate': [0.05, 0.1, 0.2],
                    'model__max_depth': [3, 6, 9]
                }
            else:
                param_grid = {
                    'model__C': [0.1, 1, 10],
                    'model__penalty': ['l1', 'l2']
                }
            
            # Perform grid search
            grid_search = GridSearchCV(
                self.pipeline,
                param_grid,
                cv=5,
                scoring='roc_auc' if self.problem_type == 'classification' else 'r2',
                n_jobs=-1,
                verbose=1
            )
            
            grid_search.fit(X, y)
            self.pipeline = grid_search.best_estimator_
            
            self.model_metadata['best_params'] = grid_search.best_params_
            self.model_metadata['best_score'] = grid_search.best_score_
            
            self.logger.info(f"Best parameters: {grid_search.best_params_}")
            self.logger.info(f"Best cross-validation score: {grid_search.best_score_:.4f}")
        
        else:
            # Simple training without hyperparameter tuning
            self.pipeline.fit(X, y)
            
            # Cross-validation to estimate performance
            cv_scores = cross_val_score(
                self.pipeline, X, y, 
                cv=5, 
                scoring='roc_auc' if self.problem_type == 'classification' else 'r2'
            )
            
            self.model_metadata['cv_scores'] = cv_scores.tolist()
            self.model_metadata['mean_cv_score'] = cv_scores.mean()
            self.model_metadata['std_cv_score'] = cv_scores.std()
            
            self.logger.info(f"Cross-validation score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
        
        return self.pipeline
    
    def evaluate_model(self, X_test, y_test):
        """Evaluate model on test set"""
        
        if self.pipeline is None:
            raise ValueError("Model not trained. Call train_model() first.")
        
        # Make predictions
        y_pred = self.pipeline.predict(X_test)
        y_pred_proba = None
        
        if hasattr(self.pipeline, 'predict_proba'):
            y_pred_proba = self.pipeline.predict_proba(X_test)[:, 1]
        
        # Calculate metrics
        from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
        
        metrics = {
            'accuracy': accuracy_score(y_test, y_pred),
            'precision': precision_score(y_test, y_pred, average='weighted'),
            'recall': recall_score(y_test, y_pred, average='weighted'),
            'f1_score': f1_score(y_test, y_pred, average='weighted')
        }
        
        if y_pred_proba is not None:
            metrics['roc_auc'] = roc_auc_score(y_test, y_pred_proba)
        
        self.model_metadata['test_metrics'] = metrics
        
        self.logger.info("Test set performance:")
        for metric, value in metrics.items():
            self.logger.info(f"  {metric}: {value:.4f}")
        
        return metrics
    
    def get_feature_importance(self):
        """Get feature importance scores"""
        
        if self.pipeline is None:
            raise ValueError("Model not trained.")
        
        model = self.pipeline.named_steps['model']
        
        if hasattr(model, 'feature_importances_'):
            importance_df = pd.DataFrame({
                'feature': self.feature_names,
                'importance': model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            return importance_df
        else:
            self.logger.warning("Model does not support feature importance")
            return None
    
    def save_model(self, filepath):
        """Save trained model and metadata"""
        
        if self.pipeline is None:
            raise ValueError("No model to save.")
        
        # Save model
        joblib.dump(self.pipeline, f"{filepath}_model.pkl")
        
        # Save metadata
        import json
        with open(f"{filepath}_metadata.json", 'w') as f:
            json.dump(self.model_metadata, f, indent=2)
        
        self.logger.info(f"Model saved to {filepath}")
    
    def load_model(self, filepath):
        """Load trained model and metadata"""
        
        # Load model
        self.pipeline = joblib.load(f"{filepath}_model.pkl")
        
        # Load metadata
        import json
        with open(f"{filepath}_metadata.json", 'r') as f:
            self.model_metadata = json.load(f)
        
        self.feature_names = self.model_metadata.get('feature_names')
        self.target_name = self.model_metadata.get('target_name')
        
        self.logger.info(f"Model loaded from {filepath}")
        
        return self.pipeline

# Usage example
pipeline = HealthcareMLPipeline()

# Create and train a model
pipeline.create_pipeline('random_forest')

# Sample training data
np.random.seed(42)
n_samples = 1000

training_data = pd.DataFrame({
    'age': np.random.randint(18, 80, n_samples),
    'bmi': np.random.normal(25, 5, n_samples),
    'systolic_bp': np.random.normal(120, 20, n_samples),
    'cholesterol': np.random.normal(200, 40, n_samples),
    'smoking': np.random.choice([0, 1], n_samples, p=[0.7, 0.3]),
    'diabetes': np.random.choice([0, 1], n_samples, p=[0.8, 0.2]),
    'heart_disease': np.random.choice([0, 1], n_samples, p=[0.85, 0.15])
})

# Prepare data
X, y = pipeline.prepare_data(training_data, 'heart_disease')

# Train model
# pipeline.train_model(X, y, hyperparameter_tuning=True)

# Get feature importance
# importance = pipeline.get_feature_importance()
# print(importance)
```

## Conclusion

Data science in healthcare is transforming how we understand, predict, and treat medical conditions. From real-time patient monitoring to population health analytics, the applications are vast and impactful.

Key takeaways for implementing healthcare data science:

1. **Start with clear clinical objectives** - Ensure your models address real healthcare needs
2. **Focus on data quality** - Healthcare decisions depend on accurate, complete data
3. **Prioritize interpretability** - Clinicians need to understand AI recommendations
4. **Implement robust validation** - Healthcare models require rigorous testing
5. **Consider ethical implications** - Ensure fair, unbiased algorithms across all populations

The future of healthcare lies in the intelligent use of data to improve patient outcomes, reduce costs, and enhance the quality of care. By combining domain expertise with advanced analytics, we can build systems that truly make a difference in people's lives.

*Ready to implement data science in your healthcare organization? Start with a pilot project focusing on a specific use case and gradually expand your capabilities as you build expertise and confidence in your data-driven approach.*