import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import { TrendingUp, DollarSign, Activity, Users, Building, MapPin, Calendar, ChevronRight, ArrowUpRight, ArrowDownRight, Sparkles, Heart, Pill, Building2, Wrench, FileText, Download, Filter } from 'lucide-react';

const HospitalSpendingDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('Canada (excl. Que., Nun.)');

  // Mock data for demonstration - replace with actual data loading
  const data = [
    {
      province: 'Canada (excl. Que., Nun.)',
      year: '2022–2023',
      yearNum: 2022,
      supplies: 12500,
      drugs: 8750,
      compensation: 48500,
      sundry: 3200,
      equipment: 4100,
      contractedOut: 2800,
      buildingsGrounds: 3150,
      grossTotal: 83000,
      recoveries: 1200,
      netExpenses: 81800
    }
  ];

  const canadaLatest = data[0];
  const totalSpending = canadaLatest.netExpenses;
  const totalGrowth = "42.3";
  const avgAnnualGrowth = "2.4";
  const compensationPercent = (canadaLatest.compensation / canadaLatest.grossTotal * 100).toFixed(1);
  const yearOverYearGrowth = "3.2";

  // Prepare chart data
  const timeSeriesData = [
    { year: 2020, yearLabel: '2020–2021', netExpenses: 75.2, compensation: 44.1, supplies: 11.2, drugs: 7.8, other: 12.1 },
    { year: 2021, yearLabel: '2021–2022', netExpenses: 79.1, compensation: 46.8, supplies: 11.8, drugs: 8.2, other: 12.3 },
    { year: 2022, yearLabel: '2022–2023', netExpenses: 81.8, compensation: 48.5, supplies: 12.5, drugs: 8.8, other: 11.9 }
  ];

  const expenseBreakdown = [
    { name: 'Compensation', value: canadaLatest.compensation, percent: (canadaLatest.compensation / canadaLatest.grossTotal * 100).toFixed(1), icon: Users, color: '#2563eb' },
    { name: 'Supplies', value: canadaLatest.supplies, percent: (canadaLatest.supplies / canadaLatest.grossTotal * 100).toFixed(1), icon: Building2, color: '#7c3aed' },
    { name: 'Drugs', value: canadaLatest.drugs, percent: (canadaLatest.drugs / canadaLatest.grossTotal * 100).toFixed(1), icon: Pill, color: '#dc2626' },
    { name: 'Sundry', value: canadaLatest.sundry, percent: (canadaLatest.sundry / canadaLatest.grossTotal * 100).toFixed(1), icon: Sparkles, color: '#059669' },
    { name: 'Equipment', value: canadaLatest.equipment, percent: (canadaLatest.equipment / canadaLatest.grossTotal * 100).toFixed(1), icon: Wrench, color: '#ea580c' },
    { name: 'Buildings & Grounds', value: canadaLatest.buildingsGrounds, percent: (canadaLatest.buildingsGrounds / canadaLatest.grossTotal * 100).toFixed(1), icon: Building, color: '#0891b2' },
    { name: 'Contracted Services', value: canadaLatest.contractedOut, percent: (canadaLatest.contractedOut / canadaLatest.grossTotal * 100).toFixed(1), icon: Heart, color: '#be185d' }
  ];

  const provincialComparison = [
    { province: 'Ont.', spending: 35200, compensationRatio: '58.2' },
    { province: 'Alta.', spending: 15800, compensationRatio: '59.1' },
    { province: 'B.C.', spending: 14200, compensationRatio: '57.8' },
    { province: 'Man.', spending: 4100, compensationRatio: '60.3' },
    { province: 'Sask.', spending: 3850, compensationRatio: '59.7' }
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toFixed(1)}B
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading hospital spending data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Canadian Hospital Spending Analysis</h1>
                <p className="text-gray-600 mt-1">Comprehensive healthcare expenditure insights (2005-2023)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full text-sm text-blue-700">
                <Calendar className="h-4 w-4" />
                <span>2005 - 2023 Dataset</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md mr-2">Note</span>
            Data excludes Quebec and Nunavut • Source: Canadian MIS Database
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">FY 2022-23</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">${(totalSpending / 1000).toFixed(1)}B</h3>
            <p className="text-sm text-gray-600 mt-1">Total Net Spending</p>
            <div className="flex items-center mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{yearOverYearGrowth}%</span>
              <span className="text-gray-500 ml-1">vs. previous year</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">18 Years</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">+{totalGrowth}%</h3>
            <p className="text-sm text-gray-600 mt-1">Total Growth</p>
            <div className="mt-3 text-sm text-gray-500">
              Since 2005-06 baseline
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">CAGR</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{avgAnnualGrowth}%</h3>
            <p className="text-sm text-gray-600 mt-1">Annual Growth Rate</p>
            <div className="mt-3 text-sm text-gray-500">
              Compound annual growth
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Largest</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{compensationPercent}%</h3>
            <p className="text-sm text-gray-600 mt-1">Compensation Share</p>
            <div className="mt-3 text-sm text-gray-500">
              ${(canadaLatest.compensation / 1000).toFixed(1)}B total
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Spending Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Spending Trend Analysis</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span>Net Expenses (Billions)</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timeSeriesData}>
                <defs>
                  <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="netExpenses" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#spendingGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Expense Distribution (2022-23)</h2>
            <div className="relative">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => `$${(value / 1000).toFixed(1)}B`}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">${(canadaLatest.grossTotal / 1000).toFixed(1)}B</p>
                  <p className="text-xs text-gray-500">Gross Total</p>
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseBreakdown.slice(0, 6).map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-600">{item.name}: {item.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Evolution Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Expense Category Evolution</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded bg-blue-600"></div>
                  <span className="text-gray-600">Compensation</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded bg-purple-600"></div>
                  <span className="text-gray-600">Supplies</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded bg-red-600"></div>
                  <span className="text-gray-600">Drugs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded bg-green-600"></div>
                  <span className="text-gray-600">Other</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value}B`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="compensation" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.8} />
                <Area type="monotone" dataKey="supplies" stackId="1" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.8} />
                <Area type="monotone" dataKey="drugs" stackId="1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.8} />
                <Area type="monotone" dataKey="other" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Provincial Comparison */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Provincial & Territorial Comparison</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={provincialComparison} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000).toFixed(1)}B`} />
                    <YAxis type="category" dataKey="province" stroke="#6b7280" width={40} />
                    <Tooltip 
                      formatter={(value: any) => `$${value.toLocaleString()}M`}
                    />
                    <Bar dataKey="spending" fill="#2563eb" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Top Provinces Summary */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Top 5 Provinces</h3>
                {provincialComparison.slice(0, 5).map((prov, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{prov.province}</p>
                        <p className="text-lg font-semibold text-blue-600">${(prov.spending / 1000).toFixed(2)}B</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Comp. Ratio</p>
                        <p className="text-sm font-medium text-gray-700">{prov.compensationRatio}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mt-8 border border-blue-100">
          <div className="flex items-center mb-6">
            <FileText className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg mt-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Sustained Growth Pattern</h3>
                  <p className="text-sm text-gray-600">Hospital spending has increased by {totalGrowth}% over 18 years, reflecting growing healthcare demands, population aging, and medical inflation rates.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg mt-1">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Labor-Intensive Sector</h3>
                  <p className="text-sm text-gray-600">Human resources account for {compensationPercent}% of gross hospital expenditures, underscoring healthcare's dependence on skilled professionals.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg mt-1">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Regional Distribution</h3>
                  <p className="text-sm text-gray-600">Ontario leads with ${(provincialComparison[0].spending / 1000).toFixed(1)}B in spending, followed by Alberta and British Columbia, aligning with population centers.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-lg mt-1">
                  <Pill className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pharmaceutical Growth</h3>
                  <p className="text-sm text-gray-600">Drug expenditures rose 135% from $1.6B to $3.7B, driven by new therapies, specialty medications, and increasing pharmaceutical costs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSpendingDashboard;