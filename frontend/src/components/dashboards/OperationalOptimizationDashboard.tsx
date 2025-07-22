"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Users,
  FileText,
  Settings,
  Download,
  Filter
} from "lucide-react";

// Mock data for project management analytics
const mockData = {
  kpis: {
    totalProjects: 47,
    activeProjects: 12,
    completedProjects: 35,
    onTime: 82,
    onBudget: 78,
    avgTimeReduction: 15,
    avgCostSavings: 20,
    successfulBids: 35
  },
  projects: [
    {
      id: 1,
      name: "Green Building Initiative - Marina Bay",
      client: "Singapore Urban Development",
      status: "In Progress",
      progress: 67,
      budget: 2400000,
      spent: 1608000,
      timeline: "15 months",
      daysLeft: 142,
      riskLevel: "Low",
      teamSize: 18
    },
    {
      id: 2,
      name: "Energy Management System - Orchard District",
      client: "Commercial Properties Ltd",
      status: "Planning",
      progress: 23,
      budget: 1800000,
      spent: 414000,
      timeline: "12 months",
      daysLeft: 287,
      riskLevel: "Medium",
      teamSize: 14
    },
    {
      id: 3,
      name: "HVAC Optimization - Changi Business Park",
      client: "Facilities Management Corp",
      status: "Execution",
      progress: 89,
      budget: 960000,
      spent: 854400,
      timeline: "8 months",
      daysLeft: 33,
      riskLevel: "Low",
      teamSize: 9
    }
  ],
  financialData: [
    { month: "Jan 2011", revenue: 180000, costs: 144000, profit: 36000, margin: 20 },
    { month: "Mar 2011", revenue: 220000, costs: 165000, profit: 55000, margin: 25 },
    { month: "May 2011", revenue: 280000, costs: 196000, profit: 84000, margin: 30 },
    { month: "Jul 2011", revenue: 320000, costs: 217600, profit: 102400, margin: 32 },
    { month: "Sep 2011", revenue: 380000, costs: 247000, profit: 133000, margin: 35 },
    { month: "Nov 2011", revenue: 450000, costs: 279000, profit: 171000, margin: 38 }
  ],
  riskAssessment: [
    { category: "Financial", score: 85, status: "Good", trend: "up" },
    { category: "Timeline", score: 92, status: "Excellent", trend: "up" },
    { category: "Quality", score: 88, status: "Good", trend: "stable" },
    { category: "Resources", score: 76, status: "Fair", trend: "down" },
    { category: "Stakeholder", score: 94, status: "Excellent", trend: "up" }
  ],
  teamPerformance: [
    { team: "Engineering", efficiency: 94, projects: 8, utilization: 87 },
    { team: "Construction", efficiency: 88, projects: 12, utilization: 92 },
    { team: "Design", efficiency: 91, projects: 6, utilization: 76 },
    { team: "Project Management", efficiency: 96, projects: 15, utilization: 89 }
  ]
};

export function OperationalOptimizationDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m");
  const [selectedProject, setSelectedProject] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      case "Execution": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600 bg-green-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "High": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Project Management Analytics Dashboard
          </h2>
          <p className="text-gray-600">
            Lean Six Sigma implementation results & operational optimization metrics
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
            <option value="2y">2010-2012</option>
          </select>
          <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="text-center">
            <p className="text-blue-600 text-xs font-medium">Total Projects</p>
            <p className="text-xl font-bold text-blue-800">{mockData.kpis.totalProjects}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="text-center">
            <p className="text-green-600 text-xs font-medium">Active</p>
            <p className="text-xl font-bold text-green-800">{mockData.kpis.activeProjects}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="text-center">
            <p className="text-purple-600 text-xs font-medium">On Time %</p>
            <p className="text-xl font-bold text-purple-800">{mockData.kpis.onTime}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="text-center">
            <p className="text-orange-600 text-xs font-medium">On Budget %</p>
            <p className="text-xl font-bold text-orange-800">{mockData.kpis.onBudget}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-xl border border-cyan-200">
          <div className="text-center">
            <p className="text-cyan-600 text-xs font-medium">Time Reduction</p>
            <p className="text-xl font-bold text-cyan-800">{mockData.kpis.avgTimeReduction}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
          <div className="text-center">
            <p className="text-emerald-600 text-xs font-medium">Cost Savings</p>
            <p className="text-xl font-bold text-emerald-800">{mockData.kpis.avgCostSavings}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
          <div className="text-center">
            <p className="text-pink-600 text-xs font-medium">Bid Success</p>
            <p className="text-xl font-bold text-pink-800">{mockData.kpis.successfulBids}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
          <div className="text-center">
            <p className="text-indigo-600 text-xs font-medium">Completed</p>
            <p className="text-xl font-bold text-indigo-800">{mockData.kpis.completedProjects}</p>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Active Projects Overview */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Active Projects Portfolio
          </h3>
          <div className="space-y-4">
            {mockData.projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ x: 5 }}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                      {project.riskLevel} Risk
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Progress</p>
                    <p className="font-semibold text-blue-600">{project.progress}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Budget Used</p>
                    <p className="font-semibold text-green-600">
                      ${(project.spent / 1000000).toFixed(1)}M / ${(project.budget / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Team Size</p>
                    <p className="font-semibold text-purple-600">{project.teamSize} members</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="text-gray-500">{project.daysLeft} days remaining</span>
                  <span className="text-gray-600">{project.timeline} timeline</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Financial Performance */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Financial Performance Trends
          </h3>
          <div className="space-y-4">
            {mockData.financialData.map((data, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <span className={`text-sm font-medium ${data.margin > 30 ? 'text-green-600' : data.margin > 25 ? 'text-blue-600' : 'text-orange-600'}`}>
                    {data.margin}% margin
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-bold text-green-600">${(data.revenue / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Costs</p>
                    <p className="font-bold text-red-600">${(data.costs / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Profit</p>
                    <p className="font-bold text-blue-600">${(data.profit / 1000).toFixed(0)}K</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${data.margin}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Risk Assessment Matrix */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Risk Assessment Matrix
          </h3>
          <div className="space-y-4">
            {mockData.riskAssessment.map((risk, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{risk.category}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getScoreColor(risk.score)}`}>
                      {risk.score}/100
                    </span>
                    {risk.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : risk.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : (
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className={`h-2 rounded-full ${getScoreColor(risk.score).includes('green') ? 'bg-green-500' : 
                        getScoreColor(risk.score).includes('blue') ? 'bg-blue-500' :
                        getScoreColor(risk.score).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${risk.score}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    risk.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                    risk.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                    risk.status === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {risk.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Team Performance Analytics
          </h3>
          <div className="space-y-4">
            {mockData.teamPerformance.map((team, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">{team.team}</h4>
                  <span className="text-sm text-gray-500">{team.projects} projects</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Efficiency</p>
                    <p className="font-bold text-green-600">{team.efficiency}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Utilization</p>
                    <p className="font-bold text-blue-600">{team.utilization}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Efficiency</span>
                      <span>{team.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-green-500 h-1 rounded-full"
                        style={{ width: `${team.efficiency}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Utilization</span>
                      <span>{team.utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${team.utilization}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lean Six Sigma Implementation Status */}
      <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-5 h-5 text-purple-600" />
          <p className="text-sm text-purple-800 font-medium">
            Lean Six Sigma Implementation Status: Successfully Deployed (2010-2012)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-700 ml-8">
          <div>✓ 15% reduction in project timelines</div>
          <div>✓ 20% cost savings achieved</div>
          <div>✓ 35% increase in successful bids</div>
        </div>
      </div>
    </div>
  );
}