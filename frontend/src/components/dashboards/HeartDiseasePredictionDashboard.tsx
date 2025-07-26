"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart,
  Activity,
  TrendingUp,
  Target,
  BarChart3,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Brain,
  Database,
  Download,
  Play,
  RotateCcw
} from "lucide-react";

// Mock data for ML model results
const getInitialModelPerformance = () => ({
  accuracy: 87.7,
  precision: 89.1,
  recall: 84.6,
  f1Score: 86.8,
  rocAuc: 0.93
});

const mockData = {
  modelPerformance: getInitialModelPerformance(),
  featureImportance: [
    { feature: "chest_pain_type", importance: 0.23, description: "Type of chest pain experienced" },
    { feature: "max_heart_rate", importance: 0.19, description: "Maximum heart rate achieved" },
    { feature: "exercise_angina", importance: 0.16, description: "Exercise induced angina" },
    { feature: "st_depression", importance: 0.14, description: "ST depression induced by exercise" },
    { feature: "cholesterol", importance: 0.12, description: "Cholesterol level (mg/dl)" },
    { feature: "age", importance: 0.11, description: "Patient age" },
    { feature: "resting_bp", importance: 0.05, description: "Resting blood pressure" }
  ],
  modelComparison: [
    { model: "Random Forest", accuracy: 87.7, precision: 89.1, recall: 84.6, selected: true },
    { model: "Logistic Regression", accuracy: 84.2, precision: 86.3, recall: 81.8, selected: false },
    { model: "SVM (RBF)", accuracy: 82.9, precision: 84.1, recall: 81.2, selected: false },
    { model: "Decision Tree", accuracy: 79.3, precision: 81.7, recall: 76.4, selected: false },
    { model: "K-Nearest Neighbors", accuracy: 78.1, precision: 79.9, recall: 75.8, selected: false }
  ],
  datasetStats: {
    totalPatients: 303,
    features: 14,
    heartDiseasePositive: 165,
    heartDiseaseNegative: 138,
    ageRange: "29-77",
    malePatients: 207,
    femalePatients: 96
  },
  clinicalMetrics: [
    { 
      metric: "Age Distribution", 
      lowRisk: "< 45 years", 
      highRisk: "≥ 55 years", 
      value: "54.4 avg",
      riskLevel: "medium"
    },
    { 
      metric: "Cholesterol", 
      lowRisk: "< 200 mg/dl", 
      highRisk: "≥ 240 mg/dl", 
      value: "246.3 avg",
      riskLevel: "high"
    },
    { 
      metric: "Max Heart Rate", 
      lowRisk: "≥ 150 bpm", 
      highRisk: "< 120 bpm", 
      value: "149.6 avg",
      riskLevel: "medium"
    },
    { 
      metric: "Resting BP", 
      lowRisk: "< 130 mmHg", 
      highRisk: "≥ 140 mmHg", 
      value: "131.6 avg",
      riskLevel: "medium"
    }
  ],
  predictionExample: {
    inputData: {
      age: 63,
      sex: "Male",
      chestPain: "Typical Angina",
      restingBP: 145,
      cholesterol: 233,
      fastingBS: 1,
      restingECG: "Normal",
      maxHR: 150,
      exerciseAngina: "Yes"
    },
    prediction: {
      probability: 0.847,
      risk: "High",
      confidence: "87.7%"
    }
  }
};

export function HeartDiseasePredictionDashboard() {
  const [selectedModel, setSelectedModel] = useState("Random Forest");
  const [activeTab, setActiveTab] = useState("overview");
  const [isRunningPrediction, setIsRunningPrediction] = useState(false);
  const [modelPerformance, setModelPerformance] = useState(getInitialModelPerformance());
  const [patientData, setPatientData] = useState({
    age: 63,
    sex: "Male",
    chestPain: "Typical Angina",
    restingBP: 145,
    cholesterol: 233,
    fastingBS: 1,
    restingECG: "Normal",
    maxHR: 150,
    exerciseAngina: "Yes"
  });
  const [predictionResult, setPredictionResult] = useState({
    probability: 0.847,
    risk: "High",
    confidence: "87.7%"
  });

  const runPrediction = () => {
    setIsRunningPrediction(true);
    setTimeout(() => {
      const selectedModelData = mockData.modelComparison.find(m => m.model === selectedModel);
      const baseProb = Math.random() * 0.4 + 0.3; // Random between 0.3-0.7
      const adjustedProb = selectedModelData ? baseProb * (selectedModelData.accuracy / 100) : baseProb;
      
      setPredictionResult({
        probability: adjustedProb,
        risk: adjustedProb > 0.6 ? "High" : adjustedProb > 0.4 ? "Medium" : "Low",
        confidence: selectedModelData ? `${selectedModelData.accuracy}%` : "87.7%"
      });
      setIsRunningPrediction(false);
    }, 2000);
  };

  const updatePatientData = (field: string, value: any) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  const getModelInsight = (modelName: string) => {
    const insights = {
      "Random Forest": {
        description: "Ensemble method using multiple decision trees",
        strengths: "Excellent for handling complex feature interactions and reducing overfitting",
        significance: "Provides robust predictions by averaging multiple tree predictions, making it less sensitive to outliers"
      },
      "Logistic Regression": {
        description: "Linear model using logistic function for binary classification",
        strengths: "Interpretable coefficients and fast training/prediction",
        significance: "Shows direct relationship between features and outcome probability, ideal for understanding feature importance"
      },
      "SVM (RBF)": {
        description: "Support Vector Machine with Radial Basis Function kernel",
        strengths: "Effective in high-dimensional spaces and memory efficient",
        significance: "Creates non-linear decision boundaries, excellent for complex patterns but less interpretable"
      },
      "Decision Tree": {
        description: "Tree-like model making decisions through feature splits",
        strengths: "Highly interpretable and requires minimal data preparation",
        significance: "Provides clear decision paths but prone to overfitting with complex datasets"
      },
      "K-Nearest Neighbors": {
        description: "Instance-based learning using similarity to k nearest neighbors",
        strengths: "Simple algorithm that adapts to local data patterns",
        significance: "Makes predictions based on similar patient profiles but sensitive to irrelevant features"
      }
    };
    return insights[modelName as keyof typeof insights] || insights["Random Forest"];
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-600" />
            Heart Disease Prediction Dashboard
          </h2>
          <p className="text-gray-600">
            Machine Learning model performance & clinical decision support system
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <select 
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              // Update model performance metrics based on selection
              const selectedModelData = mockData.modelComparison.find(m => m.model === e.target.value);
              if (selectedModelData) {
                setModelPerformance({
                  accuracy: selectedModelData.accuracy,
                  precision: selectedModelData.precision,
                  recall: selectedModelData.recall,
                  f1Score: (selectedModelData.precision + selectedModelData.recall) / 2,
                  rocAuc: selectedModelData.accuracy / 100 * 0.95 + Math.random() * 0.05
                });
              }
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {mockData.modelComparison.map(model => (
              <option key={model.model} value={model.model}>{model.model}</option>
            ))}
          </select>
          <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {["overview", "model", "prediction"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab 
                ? 'text-red-600 border-b-2 border-red-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'overview' && 'Dataset Overview'}
            {tab === 'model' && 'Model Performance'}
            {tab === 'prediction' && 'Live Prediction'}
          </button>
        ))}
      </div>

      {/* Dataset Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Dataset Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div className="text-center">
                <Database className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-600 text-sm font-medium">Total Patients</p>
                <p className="text-xl font-bold text-blue-800">{mockData.datasetStats.totalPatients}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div className="text-center">
                <BarChart3 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-green-600 text-sm font-medium">Features</p>
                <p className="text-xl font-bold text-green-800">{mockData.datasetStats.features}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
              <div className="text-center">
                <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-red-600 text-sm font-medium">Positive Cases</p>
                <p className="text-xl font-bold text-red-800">{mockData.datasetStats.heartDiseasePositive}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
              <div className="text-center">
                <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-purple-600 text-sm font-medium">Negative Cases</p>
                <p className="text-xl font-bold text-purple-800">{mockData.datasetStats.heartDiseaseNegative}</p>
              </div>
            </motion.div>
          </div>

          {/* Clinical Risk Factors */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              Clinical Risk Factors Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {mockData.clinicalMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className={`p-4 rounded-lg border ${getRiskColor(metric.riskLevel)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                    <span className="text-lg font-bold">{metric.value}</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-green-600">Low Risk:</span>
                      <span>{metric.lowRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">High Risk:</span>
                      <span>{metric.highRisk}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Model Performance Tab */}
      {activeTab === "model" && (
        <div className="space-y-8">
          {/* Model Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div className="text-center">
                <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-green-600 text-sm font-medium">Accuracy</p>
                <p className="text-xl font-bold text-green-800">{modelPerformance.accuracy}%</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div className="text-center">
                <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-600 text-sm font-medium">Precision</p>
                <p className="text-xl font-bold text-blue-800">{modelPerformance.precision}%</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-purple-600 text-sm font-medium">Recall</p>
                <p className="text-xl font-bold text-purple-800">{modelPerformance.recall}%</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <div className="text-center">
                <Brain className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-orange-600 text-sm font-medium">F1-Score</p>
                <p className="text-xl font-bold text-orange-800">{modelPerformance.f1Score.toFixed(1)}%</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
              <div className="text-center">
                <PieChart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-red-600 text-sm font-medium">ROC-AUC</p>
                <p className="text-xl font-bold text-red-800">{modelPerformance.rocAuc.toFixed(2)}</p>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feature Importance */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Importance</h3>
              <div className="space-y-4">
                {mockData.featureImportance.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{feature.feature}</span>
                      <span className="text-sm font-bold text-red-600">{(feature.importance * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.importance * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Comparison */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Algorithm Comparison</h3>
              <div className="space-y-3">
                {mockData.modelComparison.map((model, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className={`p-4 rounded-lg border ${
                      model.selected ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{model.model}</h4>
                      {model.selected && <CheckCircle className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Accuracy</p>
                        <p className="font-bold text-green-600">{model.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Precision</p>
                        <p className="font-bold text-blue-600">{model.precision}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Recall</p>
                        <p className="font-bold text-purple-600">{model.recall}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Prediction Tab */}
      {activeTab === "prediction" && (
        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-red-600" />
              Clinical Decision Support Demo
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Parameters */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Patient Parameters</h4>
                
                {/* Age */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Age</span>
                  <input
                    type="number"
                    value={patientData.age}
                    onChange={(e) => updatePatientData('age', parseInt(e.target.value))}
                    className="w-20 p-1 border border-gray-300 rounded text-center text-sm"
                    min="20"
                    max="100"
                  />
                </div>

                {/* Sex */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Sex</span>
                  <select
                    value={patientData.sex}
                    onChange={(e) => updatePatientData('sex', e.target.value)}
                    className="p-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Chest Pain */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Chest Pain</span>
                  <select
                    value={patientData.chestPain}
                    onChange={(e) => updatePatientData('chestPain', e.target.value)}
                    className="p-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="Typical Angina">Typical Angina</option>
                    <option value="Atypical Angina">Atypical Angina</option>
                    <option value="Non-Anginal">Non-Anginal</option>
                    <option value="Asymptomatic">Asymptomatic</option>
                  </select>
                </div>

                {/* Resting BP */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Resting BP</span>
                  <input
                    type="number"
                    value={patientData.restingBP}
                    onChange={(e) => updatePatientData('restingBP', parseInt(e.target.value))}
                    className="w-20 p-1 border border-gray-300 rounded text-center text-sm"
                    min="80"
                    max="200"
                  />
                </div>

                {/* Cholesterol */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Cholesterol</span>
                  <input
                    type="number"
                    value={patientData.cholesterol}
                    onChange={(e) => updatePatientData('cholesterol', parseInt(e.target.value))}
                    className="w-20 p-1 border border-gray-300 rounded text-center text-sm"
                    min="100"
                    max="400"
                  />
                </div>

                {/* Fasting BS */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Fasting BS > 120</span>
                  <select
                    value={patientData.fastingBS}
                    onChange={(e) => updatePatientData('fastingBS', parseInt(e.target.value))}
                    className="p-1 border border-gray-300 rounded text-sm"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                {/* Resting ECG */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Resting ECG</span>
                  <select
                    value={patientData.restingECG}
                    onChange={(e) => updatePatientData('restingECG', e.target.value)}
                    className="p-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="Normal">Normal</option>
                    <option value="ST-T Abnormal">ST-T Abnormal</option>
                    <option value="LV Hypertrophy">LV Hypertrophy</option>
                  </select>
                </div>

                {/* Max HR */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Max HR</span>
                  <input
                    type="number"
                    value={patientData.maxHR}
                    onChange={(e) => updatePatientData('maxHR', parseInt(e.target.value))}
                    className="w-20 p-1 border border-gray-300 rounded text-center text-sm"
                    min="60"
                    max="220"
                  />
                </div>

                {/* Exercise Angina */}
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Exercise Angina</span>
                  <select
                    value={patientData.exerciseAngina}
                    onChange={(e) => updatePatientData('exerciseAngina', e.target.value)}
                    className="p-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {/* Prediction Results */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-gray-800">Prediction Results</h4>
                  <button
                    onClick={runPrediction}
                    disabled={isRunningPrediction}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    {isRunningPrediction ? (
                      <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <motion.div
                  animate={{ scale: isRunningPrediction ? 1.02 : 1 }}
                  className={`p-6 bg-white rounded-lg border-2 ${
                    predictionResult.risk === 'High' ? 'border-red-200' : 
                    predictionResult.risk === 'Medium' ? 'border-yellow-200' : 'border-green-200'
                  }`}
                >
                  <div className="text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                      predictionResult.risk === 'High' ? 'bg-red-100' : 
                      predictionResult.risk === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      {predictionResult.risk === 'High' ? (
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                      ) : predictionResult.risk === 'Medium' ? (
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                      ) : (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className={`text-2xl font-bold ${
                        predictionResult.risk === 'High' ? 'text-red-600' : 
                        predictionResult.risk === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>{predictionResult.risk} Risk</p>
                      <p className="text-lg text-gray-700">
                        {(predictionResult.probability * 100).toFixed(1)}% Probability
                      </p>
                      <p className="text-sm text-gray-500">
                        Model Confidence: {predictionResult.confidence}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          predictionResult.risk === 'High' ? 'bg-red-500' : 
                          predictionResult.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${predictionResult.probability * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>

                <div className={`p-4 rounded-lg border ${
                  predictionResult.risk === 'High' 
                    ? 'bg-red-50 border-red-200 text-red-800' 
                    : predictionResult.risk === 'Medium'
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                    : 'bg-green-50 border-green-200 text-green-800'
                }`}>
                  <p className="text-sm">
                    <strong>Clinical Recommendation:</strong> {
                      predictionResult.risk === 'High'
                        ? 'Patient shows high risk indicators. Consider immediate cardiac evaluation and stress testing.'
                        : predictionResult.risk === 'Medium'
                        ? 'Patient shows moderate risk. Schedule routine cardiac screening and lifestyle counseling.'
                        : 'Patient shows low risk indicators. Continue with regular preventive care and healthy lifestyle.'
                    }
                  </p>
                </div>

                {/* Model Insight */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Selected Model: {selectedModel}</h5>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Description:</strong> {getModelInsight(selectedModel).description}</p>
                    <p><strong>Strengths:</strong> {getModelInsight(selectedModel).strengths}</p>
                    <p><strong>Clinical Significance:</strong> {getModelInsight(selectedModel).significance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dataset Source */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-800 font-medium">
                Dataset: Kaggle Heart Disease UCI Dataset (303 patients, 14 clinical features)
              </p>
            </div>
            <p className="text-xs text-blue-600 ml-8">
              Features include age, sex, chest pain type, resting BP, cholesterol, fasting blood sugar, resting ECG, max heart rate, exercise-induced angina, and more
            </p>
          </div>
        </div>
      )}
    </div>
  );
}