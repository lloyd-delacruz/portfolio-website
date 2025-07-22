"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Wrench,
  Users,
  Calendar,
  Filter,
  RefreshCw,
  Download
} from "lucide-react";

// Mock data for wheelchair inventory
const mockData = {
  totalWheelchairs: 284,
  available: 178,
  inUse: 89,
  maintenance: 17,
  sitesData: [
    { id: 1, name: "Vancouver General Hospital", total: 125, available: 78, inUse: 38, maintenance: 9, utilization: 62.4 },
    { id: 2, name: "Richmond Hospital", total: 89, available: 52, inUse: 31, maintenance: 6, utilization: 58.4 },
    { id: 3, name: "Lions Gate Hospital", total: 70, available: 48, inUse: 20, maintenance: 2, utilization: 45.7 }
  ],
  utilizationTrend: [
    { month: "Jan", utilization: 68, maintenance: 15 },
    { month: "Feb", utilization: 72, maintenance: 12 },
    { month: "Mar", utilization: 65, maintenance: 18 },
    { month: "Apr", utilization: 71, maintenance: 14 },
    { month: "May", utilization: 69, maintenance: 16 },
    { month: "Jun", utilization: 74, maintenance: 11 }
  ],
  maintenanceSchedule: [
    { id: 1, wheelchairId: "WC-001", issue: "Brake adjustment", priority: "Medium", dueDate: "2024-01-15", technician: "M. Johnson" },
    { id: 2, wheelchairId: "WC-047", issue: "Wheel replacement", priority: "High", dueDate: "2024-01-12", technician: "A. Smith" },
    { id: 3, wheelchairId: "WC-089", issue: "Routine service", priority: "Low", dueDate: "2024-01-20", technician: "P. Wilson" }
  ],
  alerts: [
    { id: 1, type: "warning", message: "Low inventory at Richmond Hospital (58% utilization)", timestamp: "10 mins ago" },
    { id: 2, type: "info", message: "Maintenance completed on WC-023", timestamp: "2 hours ago" },
    { id: 3, type: "alert", message: "High demand detected in ICU ward", timestamp: "4 hours ago" }
  ]
};

export function InventoryManagementDashboard() {
  const [selectedSite, setSelectedSite] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 70) return "text-red-600 bg-red-50";
    if (utilization >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Wheelchair Inventory Management System
          </h2>
          <p className="text-gray-600">
            Real-time inventory tracking across Vancouver Coastal Health sites
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <select 
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Sites</option>
            {mockData.sitesData.map(site => (
              <option key={site.id} value={site.name}>{site.name}</option>
            ))}
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Inventory</p>
              <p className="text-2xl font-bold text-blue-800">{mockData.totalWheelchairs}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Available</p>
              <p className="text-2xl font-bold text-green-800">{mockData.available}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">In Use</p>
              <p className="text-2xl font-bold text-purple-800">{mockData.inUse}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Maintenance</p>
              <p className="text-2xl font-bold text-orange-800">{mockData.maintenance}</p>
            </div>
            <Wrench className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Site Distribution */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Site Distribution & Utilization
          </h3>
          <div className="space-y-4">
            {mockData.sitesData.map((site) => (
              <motion.div
                key={site.id}
                whileHover={{ x: 5 }}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">{site.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUtilizationColor(site.utilization)}`}>
                    {site.utilization}% utilized
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Available</p>
                    <p className="font-semibold text-green-600">{site.available}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">In Use</p>
                    <p className="font-semibold text-purple-600">{site.inUse}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Maintenance</p>
                    <p className="font-semibold text-orange-600">{site.maintenance}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${site.utilization}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Utilization Trends */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            6-Month Utilization Trends
          </h3>
          <div className="space-y-4">
            {mockData.utilizationTrend.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="font-medium text-gray-700">{data.month}</span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Utilization</p>
                    <p className="font-bold text-blue-600">{data.utilization}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Maintenance</p>
                    <p className="font-bold text-orange-600">{data.maintenance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Schedule & Alerts */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        {/* Maintenance Schedule */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Upcoming Maintenance
          </h3>
          <div className="space-y-3">
            {mockData.maintenanceSchedule.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{item.wheelchairId}</p>
                    <p className="text-sm text-gray-600">{item.issue}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Due: {item.dueDate}</span>
                  <span className="text-blue-600">{item.technician}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            System Alerts
          </h3>
          <div className="space-y-3">
            {mockData.alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'alert' ? 'bg-red-50 border-red-400' :
                  'bg-blue-50 border-blue-400'
                }`}
              >
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-blue-800 font-medium">
            Cerner Integration Status: Proposed - Awaiting Implementation Approval
          </p>
        </div>
        <p className="text-xs text-blue-600 mt-1 ml-6">
          Real-time data sync with EHR system will enable automated workflows and enhanced patient care coordination
        </p>
      </div>
    </div>
  );
}