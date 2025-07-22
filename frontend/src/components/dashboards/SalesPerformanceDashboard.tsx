"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  MapPin,
  Award,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw
} from "lucide-react";

// Mock data for pharmaceutical sales performance
const mockData = {
  kpis: {
    totalSales: 1200000,
    quota: 1000000,
    quotaAchievement: 120,
    newClients: 45,
    territories: 8,
    products: 12,
    growthRate: 20,
    customerSatisfaction: 92
  },
  monthlyPerformance: [
    { month: "Jan 2009", sales: 78000, quota: 75000, clients: 28, conversion: 34 },
    { month: "Mar 2009", sales: 85000, quota: 80000, clients: 32, conversion: 38 },
    { month: "May 2009", sales: 92000, quota: 85000, clients: 35, conversion: 41 },
    { month: "Jul 2009", sales: 105000, quota: 90000, clients: 38, conversion: 44 },
    { month: "Sep 2009", sales: 118000, quota: 95000, clients: 42, conversion: 47 },
    { month: "Nov 2009", sales: 125000, quota: 100000, clients: 45, conversion: 52 }
  ],
  territoryData: [
    { 
      territory: "Metro Manila - ENT Specialists", 
      sales: 280000, 
      quota: 250000, 
      clients: 15,
      growth: 25,
      status: "Exceed"
    },
    { 
      territory: "Cebu - General Practice", 
      sales: 210000, 
      quota: 200000, 
      clients: 12,
      growth: 18,
      status: "Exceed" 
    },
    { 
      territory: "Davao - Hospitals", 
      sales: 185000, 
      quota: 180000, 
      clients: 8,
      growth: 15,
      status: "Exceed"
    },
    { 
      territory: "Iloilo - Clinics", 
      sales: 165000, 
      quota: 170000, 
      clients: 10,
      growth: 12,
      status: "Behind"
    }
  ],
  productPerformance: [
    { 
      product: "Antibiotics - ENT Line", 
      sales: 450000, 
      marketShare: 32, 
      growth: 30,
      adoptionRate: 78
    },
    { 
      product: "Respiratory Care", 
      sales: 320000, 
      marketShare: 24, 
      growth: 22,
      adoptionRate: 65
    },
    { 
      product: "Pain Management", 
      sales: 280000, 
      marketShare: 18, 
      growth: 15,
      adoptionRate: 58
    },
    { 
      product: "Pediatric Solutions", 
      sales: 150000, 
      marketShare: 12, 
      growth: 8,
      adoptionRate: 42
    }
  ],
  clientAnalysis: [
    { segment: "ENT Specialists", clients: 15, revenue: 420000, avgDeal: 28000, satisfaction: 96 },
    { segment: "General Practitioners", clients: 18, revenue: 310000, avgDeal: 17200, satisfaction: 91 },
    { segment: "Hospitals", clients: 8, revenue: 285000, avgDeal: 35600, satisfaction: 94 },
    { segment: "Specialty Clinics", clients: 12, revenue: 185000, avgDeal: 15400, satisfaction: 88 }
  ]
};

export function SalesPerformanceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("2009");
  const [selectedTerritory, setSelectedTerritory] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Exceed": return "text-green-600 bg-green-50";
      case "Meet": return "text-blue-600 bg-blue-50";
      case "Behind": return "text-orange-600 bg-orange-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth >= 20) return "text-green-600";
    if (growth >= 10) return "text-blue-600";
    return "text-orange-600";
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Pharmaceutical Sales Dashboard
          </h2>
          <p className="text-gray-600">
            United Laboratories - Territory performance & product analytics
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="2008">2008</option>
            <option value="2009">2009-2010</option>
            <option value="2010">2010</option>
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="text-center">
            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-green-600 text-xs font-medium">Total Sales</p>
            <p className="text-lg font-bold text-green-800">${(mockData.kpis.totalSales / 1000).toFixed(0)}K</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="text-center">
            <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-600 text-xs font-medium">Quota</p>
            <p className="text-lg font-bold text-blue-800">{mockData.kpis.quotaAchievement}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="text-center">
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-purple-600 text-xs font-medium">New Clients</p>
            <p className="text-lg font-bold text-purple-800">{mockData.kpis.newClients}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="text-center">
            <MapPin className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-orange-600 text-xs font-medium">Territories</p>
            <p className="text-lg font-bold text-orange-800">{mockData.kpis.territories}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-xl border border-cyan-200">
          <div className="text-center">
            <BarChart3 className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
            <p className="text-cyan-600 text-xs font-medium">Products</p>
            <p className="text-lg font-bold text-cyan-800">{mockData.kpis.products}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-emerald-600 text-xs font-medium">Growth</p>
            <p className="text-lg font-bold text-emerald-800">{mockData.kpis.growthRate}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
          <div className="text-center">
            <Award className="w-6 h-6 text-pink-600 mx-auto mb-2" />
            <p className="text-pink-600 text-xs font-medium">Satisfaction</p>
            <p className="text-lg font-bold text-pink-800">{mockData.kpis.customerSatisfaction}%</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
          <div className="text-center">
            <Activity className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-indigo-600 text-xs font-medium">Performance</p>
            <p className="text-lg font-bold text-indigo-800">Excellent</p>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Performance Trends */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Monthly Sales Performance
          </h3>
          <div className="space-y-4">
            {mockData.monthlyPerformance.map((data, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${data.sales >= data.quota ? 'text-green-600' : 'text-orange-600'}`}>
                      {((data.sales / data.quota) * 100).toFixed(0)}% of quota
                    </span>
                    {data.sales >= data.quota ? 
                      <CheckCircle className="w-4 h-4 text-green-500" /> :
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                    }
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                  <div>
                    <p className="text-gray-500">Sales</p>
                    <p className="font-bold text-green-600">${(data.sales / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Clients</p>
                    <p className="font-bold text-blue-600">{data.clients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversion</p>
                    <p className="font-bold text-purple-600">{data.conversion}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${data.sales >= data.quota ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${Math.min((data.sales / data.quota) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Territory Performance */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Territory Performance
          </h3>
          <div className="space-y-4">
            {mockData.territoryData.map((territory, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900 text-sm">{territory.territory}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(territory.status)}`}>
                    {territory.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Sales</p>
                    <p className="font-semibold text-green-600">${(territory.sales / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Clients</p>
                    <p className="font-semibold text-blue-600">{territory.clients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Growth</p>
                    <p className={`font-semibold ${getGrowthColor(territory.growth)}`}>{territory.growth}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min((territory.sales / territory.quota) * 100, 100)}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Performance */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            Product Performance Analysis
          </h3>
          <div className="space-y-4">
            {mockData.productPerformance.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">{product.product}</h4>
                  <span className="text-sm text-green-600 font-medium">{product.adoptionRate}% adoption</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Sales</p>
                    <p className="font-bold text-green-600">${(product.sales / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Market Share</p>
                    <p className="font-bold text-blue-600">{product.marketShare}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Growth</p>
                    <p className={`font-bold ${getGrowthColor(product.growth)}`}>{product.growth}%</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-green-500 h-1 rounded-full"
                      style={{ width: `${product.marketShare * 2}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Segment Analysis */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-600" />
            Client Segment Analysis
          </h3>
          <div className="space-y-4">
            {mockData.clientAnalysis.map((segment, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">{segment.segment}</h4>
                  <span className="text-sm text-blue-600 font-medium">{segment.satisfaction}% satisfied</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Clients</p>
                    <p className="font-bold text-purple-600">{segment.clients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-bold text-green-600">${(segment.revenue / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg Deal</p>
                    <p className="font-bold text-orange-600">${(segment.avgDeal / 1000).toFixed(1)}K</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-cyan-500 h-2 rounded-full"
                      style={{ width: `${segment.satisfaction}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800 font-medium">
            Sales Performance Summary (2008-2010): Exceeded targets and expanded market reach
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-green-700 ml-8">
          <div>✓ $1M+ total sales achieved</div>
          <div>✓ 120% quota achievement</div>
          <div>✓ 30% market growth in ENT segment</div>
          <div>✓ 25% territory expansion</div>
        </div>
      </div>
    </div>
  );
}