"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Heart,
  UserCheck,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Download,
  RefreshCw
} from "lucide-react";

// Mock data for healthcare analytics
const mockData = {
  patientMetrics: {
    totalPatients: 2847,
    activePatients: 1924,
    dischargedThisWeek: 156,
    averageStay: 4.2,
    readmissionRate: 8.3,
    satisfactionScore: 94.2
  },
  departmentData: [
    { 
      name: "Neurology", 
      patients: 342, 
      occupancy: 87, 
      avgStay: 5.8, 
      satisfaction: 95.1,
      waitTime: 18 
    },
    { 
      name: "General Surgery", 
      patients: 298, 
      occupancy: 92, 
      avgStay: 3.2, 
      satisfaction: 93.8,
      waitTime: 22 
    },
    { 
      name: "Orthopedics/Trauma", 
      patients: 267, 
      occupancy: 89, 
      avgStay: 4.1, 
      satisfaction: 94.7,
      waitTime: 15 
    },
    { 
      name: "ICU", 
      patients: 89, 
      occupancy: 95, 
      avgStay: 8.9, 
      satisfaction: 92.3,
      waitTime: 5 
    },
    { 
      name: "Rehabilitation", 
      patients: 156, 
      occupancy: 78, 
      avgStay: 12.4, 
      satisfaction: 96.8,
      waitTime: 12 
    }
  ],
  monthlyTrends: [
    { month: "Jul", admissions: 456, discharges: 432, satisfaction: 93.2 },
    { month: "Aug", admissions: 478, discharges: 451, satisfaction: 94.1 },
    { month: "Sep", admissions: 492, discharges: 467, satisfaction: 93.8 },
    { month: "Oct", admissions: 467, discharges: 478, satisfaction: 94.5 },
    { month: "Nov", admissions: 489, discharges: 456, satisfaction: 94.2 },
    { month: "Dec", admissions: 434, discharges: 398, satisfaction: 95.1 }
  ],
  qualityMetrics: [
    { metric: "Patient Safety", score: 97.8, trend: "up", target: 95.0 },
    { metric: "Care Quality", score: 94.2, trend: "up", target: 90.0 },
    { metric: "Staff Efficiency", score: 91.5, trend: "stable", target: 88.0 },
    { metric: "Resource Utilization", score: 86.7, trend: "up", target: 85.0 }
  ],
  equipmentStatus: [
    { item: "Wheelchairs", total: 284, available: 178, inUse: 89, maintenance: 17 },
    { item: "Patient Beds", total: 456, available: 78, inUse: 367, maintenance: 11 },
    { item: "Monitors", total: 189, available: 45, inUse: 134, maintenance: 10 },
    { item: "IV Pumps", total: 145, available: 67, inUse: 72, maintenance: 6 }
  ]
};

export function HealthcareAnalyticsDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [timeRange, setTimeRange] = useState("6m");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 90) return "text-red-600 bg-red-50";
    if (occupancy >= 80) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>;
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-600" />
            Healthcare Analytics Dashboard
          </h2>
          <p className="text-gray-600">
            Vancouver Coastal Health - Multi-site patient care analytics
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-600 text-xs font-medium">Total Patients</p>
            <p className="text-xl font-bold text-blue-800">{mockData.patientMetrics.totalPatients.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="text-center">
            <UserCheck className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-green-600 text-xs font-medium">Active Patients</p>
            <p className="text-xl font-bold text-green-800">{mockData.patientMetrics.activePatients.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="text-center">
            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-purple-600 text-xs font-medium">Discharged</p>
            <p className="text-xl font-bold text-purple-800">{mockData.patientMetrics.dischargedThisWeek}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="text-center">
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-orange-600 text-xs font-medium">Avg Stay</p>
            <p className="text-xl font-bold text-orange-800">{mockData.patientMetrics.averageStay} days</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <div className="text-center">
            <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-red-600 text-xs font-medium">Readmission</p>
            <p className="text-xl font-bold text-red-800">{mockData.patientMetrics.readmissionRate}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-xl border border-cyan-200">
          <div className="text-center">
            <Heart className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
            <p className="text-cyan-600 text-xs font-medium">Satisfaction</p>
            <p className="text-xl font-bold text-cyan-800">{mockData.patientMetrics.satisfactionScore}%</p>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Department Performance */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-600" />
            Department Performance
          </h3>
          <div className="space-y-4">
            {mockData.departmentData.map((dept, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">{dept.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOccupancyColor(dept.occupancy)}`}>
                    {dept.occupancy}% occupied
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Patients</p>
                    <p className="font-semibold text-blue-600">{dept.patients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg Stay</p>
                    <p className="font-semibold text-purple-600">{dept.avgStay}d</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Satisfaction</p>
                    <p className="font-semibold text-green-600">{dept.satisfaction}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Wait Time</p>
                    <p className="font-semibold text-orange-600">{dept.waitTime}min</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Equipment Status */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Equipment & Resource Status
          </h3>
          <div className="space-y-4">
            {mockData.equipmentStatus.map((equipment, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">{equipment.item}</span>
                  <span className="text-sm text-gray-500">Total: {equipment.total}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                  <div>
                    <p className="text-gray-500">Available</p>
                    <p className="font-bold text-green-600">{equipment.available}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">In Use</p>
                    <p className="font-bold text-blue-600">{equipment.inUse}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Maintenance</p>
                    <p className="font-bold text-orange-600">{equipment.maintenance}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(equipment.inUse / equipment.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Metrics & Monthly Trends */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quality Metrics */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Quality & Performance Metrics
          </h3>
          <div className="space-y-4">
            {mockData.qualityMetrics.map((metric, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{metric.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">{metric.score}%</span>
                    {getTrendIcon(metric.trend)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Target: {metric.target}%</span>
                  <span className={`font-medium ${metric.score >= metric.target ? 'text-green-600' : 'text-orange-600'}`}>
                    {metric.score >= metric.target ? '✓ Above Target' : '△ Below Target'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full ${metric.score >= metric.target ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${Math.min(metric.score, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            6-Month Patient Flow Trends
          </h3>
          <div className="space-y-4">
            {mockData.monthlyTrends.map((data, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{data.month} 2024</span>
                  <span className="text-sm text-green-600 font-medium">{data.satisfaction}% satisfaction</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Admissions</p>
                    <p className="font-bold text-blue-600">{data.admissions}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Discharges</p>
                    <p className="font-bold text-purple-600">{data.discharges}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VCH Integration Status */}
      <div className="mt-8 p-4 bg-cyan-50 border border-cyan-200 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-cyan-800 font-medium">
            Vancouver Coastal Health Integration: Multi-site data aggregation from VGH, Richmond Hospital, and Lions Gate Hospital
          </p>
        </div>
        <p className="text-xs text-cyan-600 mt-1 ml-6">
          Real-time analytics supporting 200+ patient care plans annually across rehabilitation and multidisciplinary teams
        </p>
      </div>
    </div>
  );
}