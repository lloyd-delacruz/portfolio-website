'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Define types for chart data
interface TabContentProps {
  id: string
  isActive: boolean
  children: React.ReactNode
}

const TabContent: React.FC<TabContentProps> = ({ id, isActive, children }) => (
  <div 
    id={id} 
    className={`tab-content ${isActive ? 'active' : 'hidden'}`}
    style={{ display: isActive ? 'block' : 'none' }}
  >
    {children}
  </div>
)

interface MetricCardProps {
  value: string
  label: string
  detail: string
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label, detail }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl text-center border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
      {value}
    </div>
    <div className="text-gray-300 mb-3">{label}</div>
    <div className="text-green-400 text-sm">{detail}</div>
  </motion.div>
)

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, description, children, className = "" }) => (
  <div className={`bg-gray-800 p-10 rounded-xl border border-gray-700 ${className}`}>
    <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">{title}</h3>
    {description && (
      <p className="text-center text-gray-400 mb-6 text-sm">{description}</p>
    )}
    {children}
  </div>
)

export function LifeExpectancyDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [chartsInitialized, setChartsInitialized] = useState(false)
  const chartRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({})

  const setChartRef = (id: string) => (ref: HTMLCanvasElement | null) => {
    chartRefs.current[id] = ref
  }

  useEffect(() => {
    const loadChartJS = async () => {
      try {
        // Load Chart.js dynamically
        const ChartJS = await import('chart.js/auto')
        const Chart = ChartJS.default

        // Set Chart.js defaults
        Chart.defaults.color = '#ffffff'
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)'

        // Initialize all charts
        initializeCharts(Chart)
        setChartsInitialized(true)
      } catch (error) {
        console.error('Error loading Chart.js:', error)
      }
    }

    loadChartJS()
  }, [])

  const initializeCharts = (Chart: any) => {
    try {
      // 1. Development Status Chart
      if (chartRefs.current.devChart) {
        new Chart(chartRefs.current.devChart, {
          type: 'bar',
          data: {
            labels: ['2000', '2005', '2010', '2015'],
            datasets: [{
              label: 'Developed Countries',
              data: [77.6, 78.4, 79.5, 80.9],
              backgroundColor: 'rgba(102, 126, 234, 0.8)',
              borderColor: '#667eea',
              borderWidth: 2
            }, {
              label: 'Developing Countries',
              data: [64.8, 66.2, 67.9, 69.7],
              backgroundColor: 'rgba(118, 75, 162, 0.8)',
              borderColor: '#764ba2',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                min: 60,
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              },
              x: {
                grid: { display: false }
              }
            }
          }
        })
      }

      // 2. Income Groups Chart
      if (chartRefs.current.incomeChart) {
        new Chart(chartRefs.current.incomeChart, {
          type: 'doughnut',
          data: {
            labels: ['High Income (80.4)', 'Upper Middle (74.6)', 'Lower Middle (68.3)', 'Low Income (61.2)'],
            datasets: [{
              data: [80.4, 74.6, 68.3, 61.2],
              backgroundColor: [
                'rgba(74, 222, 128, 0.8)',
                'rgba(102, 126, 234, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)'
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        })
      }

      // 3. Gap Over Time Chart
      if (chartRefs.current.gapChart) {
        new Chart(chartRefs.current.gapChart, {
          type: 'line',
          data: {
            labels: Array.from({length: 16}, (_, i) => (2000 + i).toString()),
            datasets: [{
              label: 'Life Expectancy Gap (Years)',
              data: [12.8, 12.6, 12.5, 12.3, 12.2, 12.2, 12.0, 11.9, 11.8, 11.7, 11.6, 11.5, 11.4, 11.3, 11.2, 11.2],
              borderColor: '#667eea',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: false,
                min: 10,
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        })
      }

      // 4. Group Comparison Chart
      if (chartRefs.current.groupChart) {
        new Chart(chartRefs.current.groupChart, {
          type: 'bar',
          data: {
            labels: ['G7', 'G20 (non-G7)', 'OECD (non-G20)', 'Others'],
            datasets: [{
              label: 'Average Life Expectancy',
              data: [81.8, 76.2, 79.5, 67.3],
              backgroundColor: ['#4ade80', '#667eea', '#f59e0b', '#ef4444']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { 
                beginAtZero: false,
                min: 60,
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        })
      }

      // 5. Trends Tab Charts
      if (chartRefs.current.trendsProgressChart) {
        new Chart(chartRefs.current.trendsProgressChart, {
          type: 'line',
          data: {
            labels: ['2000', '2005', '2010', '2015'],
            datasets: [
              {
                label: 'Top 10 Countries',
                data: [79.2, 80.1, 81.3, 82.5],
                borderColor: '#4ade80',
                backgroundColor: 'rgba(74, 222, 128, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Bottom 10 Countries',
                data: [47.8, 50.2, 54.1, 58.6],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Global Average',
                data: [65.5, 66.8, 68.2, 69.7],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                min: 40,
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        })
      }

      if (chartRefs.current.improvementChart) {
        new Chart(chartRefs.current.improvementChart, {
          type: 'bar',
          data: {
            labels: ['Rwanda', 'Ethiopia', 'Niger', 'Malawi', 'Uganda', 'Cambodia', 'Laos', 'Afghanistan', 'Chad', 'Guinea'],
            datasets: [{
              label: 'Life Expectancy Improvement (Years)',
              data: [19.8, 15.2, 14.8, 14.3, 13.9, 13.7, 13.5, 13.2, 12.8, 12.5],
              backgroundColor: 'rgba(74, 222, 128, 0.8)',
              borderColor: '#4ade80',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: 'rgba(255, 255, 255, 0.1)' } },
              y: { grid: { display: false } }
            }
          }
        })
      }

      // 6. Healthcare Efficiency Charts
      if (chartRefs.current.efficiencyScatterChart) {
        new Chart(chartRefs.current.efficiencyScatterChart, {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Countries',
              data: [
                {x: 2.5, y: 72}, {x: 3.1, y: 74}, {x: 4.2, y: 76}, {x: 5.8, y: 78},
                {x: 7.2, y: 80}, {x: 8.5, y: 81}, {x: 9.1, y: 82}, {x: 10.2, y: 83},
                {x: 11.5, y: 84}, {x: 13.2, y: 85}, {x: 15.1, y: 83}, {x: 17.8, y: 82}
              ],
              backgroundColor: 'rgba(102, 126, 234, 0.6)',
              borderColor: '#667eea',
              pointRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                title: { display: true, text: 'Health Expenditure (% of GDP)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              },
              y: {
                title: { display: true, text: 'Life Expectancy (Years)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        })
      }

      if (chartRefs.current.efficiencyLeadersChart) {
        new Chart(chartRefs.current.efficiencyLeadersChart, {
          type: 'bar',
          data: {
            labels: ['Bangladesh', 'Nepal', 'Sri Lanka', 'Vietnam', 'India', 'Indonesia'],
            datasets: [{
              label: 'Life Expectancy',
              data: [72.3, 69.6, 74.9, 75.4, 68.3, 69.1],
              backgroundColor: 'rgba(74, 222, 128, 0.8)',
              yAxisID: 'y'
            }, {
              label: 'Health Expenditure (% GDP)',
              data: [2.8, 3.1, 3.5, 4.1, 4.2, 2.9],
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              yAxisID: 'y1'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                type: 'linear',
                position: 'left',
                title: { display: true, text: 'Life Expectancy (Years)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              },
              y1: {
                type: 'linear',
                position: 'right',
                title: { display: true, text: 'Health Expenditure (% GDP)' },
                grid: { display: false }
              }
            }
          }
        })
      }

      // 7. Key Determinants Charts
      if (chartRefs.current.correlationChart) {
        new Chart(chartRefs.current.correlationChart, {
          type: 'bar',
          data: {
            labels: ['Income Composition', 'Education', 'GDP per Capita', 'Healthcare Spending', 'Immunization', 'BMI'],
            datasets: [{
              label: 'Correlation with Life Expectancy',
              data: [0.893, 0.751, 0.742, 0.632, 0.598, -0.123],
              backgroundColor: [
                'rgba(74, 222, 128, 0.8)',
                'rgba(102, 126, 234, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(239, 68, 68, 0.8)'
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                min: -0.2,
                max: 1,
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        })
      }

      if (chartRefs.current.educationImpactChart) {
        new Chart(chartRefs.current.educationImpactChart, {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Countries',
              data: [
                {x: 2.1, y: 52}, {x: 4.5, y: 58}, {x: 6.2, y: 64}, {x: 8.1, y: 68},
                {x: 9.8, y: 72}, {x: 11.2, y: 75}, {x: 12.8, y: 78}, {x: 14.1, y: 80},
                {x: 15.2, y: 82}, {x: 16.1, y: 83}
              ],
              backgroundColor: 'rgba(102, 126, 234, 0.6)',
              borderColor: '#667eea',
              pointRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                title: { display: true, text: 'Years of Schooling' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              },
              y: {
                title: { display: true, text: 'Life Expectancy (Years)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        })
      }

      // 8. Disease Impact Charts
      if (chartRefs.current.diseaseFactorsChart) {
        new Chart(chartRefs.current.diseaseFactorsChart, {
          type: 'radar',
          data: {
            labels: ['HIV/AIDS', 'Measles', 'Hepatitis B', 'Polio', 'Diphtheria', 'Malaria'],
            datasets: [{
              label: 'Sub-Saharan Africa',
              data: [8.2, 1.5, 2.1, 0.1, 0.3, 6.8],
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              pointBackgroundColor: '#ef4444'
            }, {
              label: 'Global Average',
              data: [1.2, 0.3, 0.8, 0.0, 0.1, 1.1],
              borderColor: '#667eea',
              backgroundColor: 'rgba(102, 126, 234, 0.2)',
              pointBackgroundColor: '#667eea'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                max: 10,
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              }
            }
          }
        })
      }

      if (chartRefs.current.mortalityChart) {
        new Chart(chartRefs.current.mortalityChart, {
          type: 'line',
          data: {
            labels: ['2000', '2005', '2010', '2015'],
            datasets: [{
              label: 'Infant Mortality (per 1000)',
              data: [62.8, 53.2, 43.1, 35.2],
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
              yAxisID: 'y'
            }, {
              label: 'Under-5 Mortality (per 1000)',
              data: [87.5, 74.2, 59.1, 46.8],
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
              yAxisID: 'y'
            }, {
              label: 'Adult Mortality (per 1000)',
              data: [238, 225, 210, 195],
              borderColor: '#667eea',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              tension: 0.4,
              yAxisID: 'y1'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                type: 'linear',
                position: 'left',
                title: { display: true, text: 'Child Mortality (per 1000)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
              },
              y1: {
                type: 'linear',
                position: 'right',
                title: { display: true, text: 'Adult Mortality (per 1000)' },
                grid: { display: false }
              }
            }
          }
        })
      }

    } catch (error) {
      console.error('Error initializing charts:', error)
    }
  }

  const showTab = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto p-5">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-12 shadow-2xl"
        >
          <h1 className="text-6xl font-bold mb-5 text-shadow">Global Life Expectancy Analysis</h1>
          <p className="text-xl mb-3 opacity-95">Comprehensive Analysis of 193 Countries (2000-2015)</p>
          <p className="opacity-80">Data Sources: WHO, World Bank, IMF | Cleaned & Validated Dataset</p>
        </motion.div>

        {/* Key Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-10 rounded-xl mb-10 border border-gray-700"
        >
          <h2 className="text-blue-400 mb-5 text-3xl">🔍 Key Insights & Findings</h2>
          <div className="space-y-4">
            <div className="pl-5 relative">
              <span className="absolute left-0 text-blue-400">▸</span>
              <strong>Global Progress:</strong> Developing countries improved 48% faster than developed countries (4.9 vs 3.3 years)
            </div>
            <div className="pl-5 relative">
              <span className="absolute left-0 text-blue-400">▸</span>
              <strong>Gap Reduction:</strong> Life expectancy gap narrowed from 12.8 to 11.2 years (-12.5%)
            </div>
            <div className="pl-5 relative">
              <span className="absolute left-0 text-blue-400">▸</span>
              <strong>Success Story:</strong> Rwanda achieved +19.8 years improvement through healthcare reforms
            </div>
            <div className="pl-5 relative">
              <span className="absolute left-0 text-blue-400">▸</span>
              <strong>Efficiency Champion:</strong> Bangladesh achieves 72 years life expectancy with only 3% GDP on health
            </div>
            <div className="pl-5 relative">
              <span className="absolute left-0 text-blue-400">▸</span>
              <strong>Critical Threshold:</strong> Countries above $4,000 GDP/capita show accelerated health improvements
            </div>
            <div className="pl-5 relative">
              <span className="absolute left-0 text-blue-400">▸</span>
              <strong>Education Impact:</strong> Each additional year of schooling correlates with ~2 years life expectancy
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <MetricCard value="69.7" label="Global Average Life Expectancy (2015)" detail="+4.2 years since 2000" />
          <MetricCard value="11.2" label="Development Gap (Years)" detail="-1.6 years improvement" />
          <MetricCard value="193" label="Countries Analyzed" detail="With validated data" />
          <MetricCard value="+19.8" label="Highest Improvement" detail="Rwanda: 48.3 → 68.1 years" />
          <MetricCard value="0.893" label="Strongest Predictor" detail="Income Composition Index" />
          <MetricCard value="7%" label="Optimal Health Spending" detail="Diminishing returns above this" />
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 mb-10 bg-gray-800 p-4 rounded-xl border border-gray-700"
        >
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'trends', label: 'Trends & Progress' },
            { id: 'efficiency', label: 'Healthcare Efficiency' },
            { id: 'determinants', label: 'Key Determinants' },
            { id: 'diseases', label: 'Disease Impact' },
            { id: 'countries', label: 'Country Rankings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => showTab(tab.id)}
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:border-blue-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Overview Tab */}
          <TabContent id="overview" isActive={activeTab === 'overview'}>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <ChartContainer 
                title="Life Expectancy by Development Status" 
                description="Tracking progress of developed vs developing nations"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('devChart')}></canvas>
                </div>
              </ChartContainer>
              <ChartContainer 
                title="Life Expectancy by Income Group (2015)" 
                description="Clear correlation between income and health outcomes"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('incomeChart')}></canvas>
                </div>
              </ChartContainer>
            </div>
            
            <ChartContainer 
              title="Development Gap Over Time" 
              description="The narrowing gap shows global health equity improving"
              className="mb-8"
            >
              <div className="h-96 w-full">
                <canvas ref={setChartRef('gapChart')}></canvas>
              </div>
            </ChartContainer>
            
            <ChartContainer title="G7 vs G20 vs OECD vs Others (2015)">
              <div className="h-96 w-full">
                <canvas ref={setChartRef('groupChart')}></canvas>
              </div>
            </ChartContainer>
          </TabContent>

          {/* Trends & Progress Tab */}
          <TabContent id="trends" isActive={activeTab === 'trends'}>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <ChartContainer 
                title="Life Expectancy Progress by Country Groups" 
                description="Comparing top performers, global average, and struggling nations"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('trendsProgressChart')}></canvas>
                </div>
              </ChartContainer>
              <ChartContainer 
                title="Top 10 Countries with Highest Improvement" 
                description="Countries that achieved the most significant gains (2000-2015)"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('improvementChart')}></canvas>
                </div>
              </ChartContainer>
            </div>
            
            <div className="bg-gray-800 p-10 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">Key Trends & Insights</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-green-400 mb-4">Success Stories</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Rwanda:</strong> +19.8 years improvement through healthcare system overhaul and universal health insurance
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Ethiopia:</strong> +15.2 years via community health workers and vaccination programs
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Niger:</strong> +14.8 years through maternal health initiatives and nutrition programs
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4">Global Patterns</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Convergence:</strong> Developing countries are catching up at 48% faster rate
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Acceleration:</strong> Post-2000 MDGs drove unprecedented global health progress
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Inequality:</strong> Gap remains significant at 11.2 years between richest and poorest
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Healthcare Efficiency Tab */}
          <TabContent id="efficiency" isActive={activeTab === 'efficiency'}>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <ChartContainer 
                title="Healthcare Efficiency Analysis" 
                description="Life expectancy vs health expenditure (% of GDP)"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('efficiencyScatterChart')}></canvas>
                </div>
              </ChartContainer>
              <ChartContainer 
                title="Efficiency Leaders" 
                description="Countries achieving high life expectancy with low health spending"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('efficiencyLeadersChart')}></canvas>
                </div>
              </ChartContainer>
            </div>
            
            <div className="bg-gray-800 p-10 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">Healthcare Efficiency Insights</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-green-400 mb-4">Efficiency Champions</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Bangladesh:</strong> 72 years with only 2.8% GDP spending
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Sri Lanka:</strong> 75 years with 3.5% GDP spending
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Vietnam:</strong> 75 years with 4.1% GDP spending
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4">Key Findings</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Optimal Range:</strong> 7-9% GDP spending shows best returns
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Diminishing Returns:</strong> Benefits plateau above 12% GDP
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>System Quality:</strong> Organization matters more than spending
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-purple-400 mb-4">Success Factors</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-purple-400">
                      <strong>Primary Care:</strong> Strong community health systems
                    </div>
                    <div className="pl-4 border-l-2 border-purple-400">
                      <strong>Prevention:</strong> Focus on vaccination and maternal health
                    </div>
                    <div className="pl-4 border-l-2 border-purple-400">
                      <strong>Universal Coverage:</strong> Equitable access to basic services
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Key Determinants Tab */}
          <TabContent id="determinants" isActive={activeTab === 'determinants'}>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <ChartContainer 
                title="Factor Correlation Analysis" 
                description="Correlation strength with life expectancy outcomes"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('correlationChart')}></canvas>
                </div>
              </ChartContainer>
              <ChartContainer 
                title="Education Impact Analysis" 
                description="Years of schooling vs life expectancy relationship"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('educationImpactChart')}></canvas>
                </div>
              </ChartContainer>
            </div>
            
            <div className="bg-gray-800 p-10 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">Key Determinants Analysis</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-green-400 mb-4">Top Predictive Factors</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Income Composition (r=0.893):</strong> Economic development quality most critical
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Education (r=0.751):</strong> Each year of schooling = ~2 years life expectancy
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>GDP per Capita (r=0.742):</strong> Economic prosperity enables health investments
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Healthcare Spending (r=0.632):</strong> Strategic investment in health systems
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4">Critical Thresholds</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>$4,000 GDP/capita:</strong> Accelerated health improvement threshold
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>12 years education:</strong> Significant health behavior improvement
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>5% health spending:</strong> Minimum for comprehensive healthcare
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>90% immunization:</strong> Herd immunity and disease prevention
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl border border-blue-500/30">
                <h4 className="text-xl font-semibold text-blue-300 mb-4">Policy Implications</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <strong className="text-green-300">High-Impact Interventions:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Invest in women's education and economic participation</li>
                      <li>• Strengthen primary healthcare and community health systems</li>
                      <li>• Focus on universal basic education programs</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-yellow-300">Resource Optimization:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Target 7-9% GDP healthcare spending for optimal returns</li>
                      <li>• Prioritize prevention over treatment interventions</li>
                      <li>• Develop robust health information systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Disease Impact Tab */}
          <TabContent id="diseases" isActive={activeTab === 'diseases'}>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <ChartContainer 
                title="Disease Burden by Region" 
                description="Major infectious diseases impact comparison (deaths per 100k)"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('diseaseFactorsChart')}></canvas>
                </div>
              </ChartContainer>
              <ChartContainer 
                title="Mortality Trends (2000-2015)" 
                description="Progress in reducing different mortality types"
              >
                <div className="h-96 w-full">
                  <canvas ref={setChartRef('mortalityChart')}></canvas>
                </div>
              </ChartContainer>
            </div>
            
            <div className="bg-gray-800 p-10 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">Disease Impact Analysis</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-red-400 mb-4">Highest Impact Diseases</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-red-400">
                      <strong>HIV/AIDS:</strong> 8.2 deaths/100k in Sub-Saharan Africa
                    </div>
                    <div className="pl-4 border-l-2 border-red-400">
                      <strong>Malaria:</strong> 6.8 deaths/100k, mostly preventable
                    </div>
                    <div className="pl-4 border-l-2 border-red-400">
                      <strong>Hepatitis B:</strong> 2.1 deaths/100k, vaccine available
                    </div>
                    <div className="pl-4 border-l-2 border-red-400">
                      <strong>Measles:</strong> 1.5 deaths/100k, outbreaks in low vaccination areas
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-green-400 mb-4">Success Stories</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Polio:</strong> Near-eradicated globally (0.1 deaths/100k)
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Diphtheria:</strong> Controlled through immunization (0.3/100k)
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Child Mortality:</strong> 44% reduction in infant deaths
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Under-5 Mortality:</strong> 46% reduction since 2000
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4">Prevention Impact</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Immunization:</strong> 90%+ coverage prevents outbreaks
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Maternal Health:</strong> Skilled birth attendance critical
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Nutrition:</strong> Malnutrition underlies 45% child deaths
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Sanitation:</strong> Clean water reduces infectious disease
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-xl border border-red-500/30">
                <h4 className="text-xl font-semibold text-red-300 mb-4">Critical Health Challenges</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <strong className="text-red-300">Immediate Priorities:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Scale up HIV prevention and treatment programs</li>
                      <li>• Distribute insecticide-treated bed nets for malaria</li>
                      <li>• Strengthen routine immunization systems</li>
                      <li>• Improve maternal and neonatal care quality</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-orange-300">Long-term Solutions:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Build resilient health systems for pandemic preparedness</li>
                      <li>• Address social determinants of health inequity</li>
                      <li>• Invest in health workforce training and retention</li>
                      <li>• Develop sustainable financing mechanisms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Country Rankings Tab */}
          <TabContent id="countries" isActive={activeTab === 'countries'}>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-800 p-10 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-semibold text-green-400 mb-6 text-center">Top 15 Countries (2015)</h3>
                <div className="space-y-3">
                  {[
                    {rank: 1, country: 'Japan', years: 83.7, change: '+3.2'},
                    {rank: 2, country: 'Switzerland', years: 83.4, change: '+3.8'},
                    {rank: 3, country: 'Singapore', years: 83.1, change: '+4.1'},
                    {rank: 4, country: 'Australia', years: 82.8, change: '+3.5'},
                    {rank: 5, country: 'Spain', years: 82.8, change: '+3.9'},
                    {rank: 6, country: 'Iceland', years: 82.7, change: '+2.8'},
                    {rank: 7, country: 'Italy', years: 82.7, change: '+3.2'},
                    {rank: 8, country: 'Israel', years: 82.5, change: '+3.6'},
                    {rank: 9, country: 'Sweden', years: 82.4, change: '+2.9'},
                    {rank: 10, country: 'France', years: 82.4, change: '+3.1'},
                    {rank: 11, country: 'Luxembourg', years: 82.3, change: '+3.4'},
                    {rank: 12, country: 'Norway', years: 81.8, change: '+2.7'},
                    {rank: 13, country: 'Malta', years: 81.8, change: '+4.2'},
                    {rank: 14, country: 'Netherlands', years: 81.9, change: '+2.8'},
                    {rank: 15, country: 'Canada', years: 82.2, change: '+3.1'}
                  ].map((item) => (
                    <div key={item.rank} className="flex items-center justify-between py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                          {item.rank}
                        </span>
                        <span className="font-medium">{item.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white font-semibold">{item.years}</span>
                        <span className="text-green-400 text-sm">{item.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-800 p-10 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-semibold text-red-400 mb-6 text-center">Bottom 15 Countries (2015)</h3>
                <div className="space-y-3">
                  {[
                    {rank: 179, country: 'Chad', years: 53.1, change: '+12.8'},
                    {rank: 180, country: 'Angola', years: 52.4, change: '+9.2'},
                    {rank: 181, country: 'Central African Rep.', years: 52.0, change: '+5.1'},
                    {rank: 182, country: 'Somalia', years: 51.8, change: '+6.8'},
                    {rank: 183, country: 'Guinea-Bissau', years: 51.6, change: '+8.9'},
                    {rank: 184, country: 'Lesotho', years: 50.0, change: '-3.2'},
                    {rank: 185, country: 'Mali', years: 49.7, change: '+8.1'},
                    {rank: 186, country: 'Burkina Faso', years: 49.2, change: '+9.4'},
                    {rank: 187, country: 'Afghanistan', years: 48.8, change: '+13.2'},
                    {rank: 188, country: 'Nigeria', years: 48.3, change: '+7.8'},
                    {rank: 189, country: 'Niger', years: 47.8, change: '+14.8'},
                    {rank: 190, country: 'Mozambique', years: 46.7, change: '+6.9'},
                    {rank: 191, country: 'Ivory Coast', years: 46.5, change: '+8.3'},
                    {rank: 192, country: 'Guinea', years: 45.6, change: '+12.5'},
                    {rank: 193, country: 'South Sudan', years: 42.7, change: '+3.1'}
                  ].map((item) => (
                    <div key={item.rank} className="flex items-center justify-between py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {item.rank}
                        </span>
                        <span className="font-medium">{item.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white font-semibold">{item.years}</span>
                        <span className={`text-sm ${parseFloat(item.change) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-10 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center">Regional Performance Analysis</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-green-400 mb-4">Top Performers</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>Western Europe:</strong> Average 81.2 years, led by Switzerland (83.4)
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>East Asia:</strong> Japan (83.7) and Singapore (83.1) leading globally
                    </div>
                    <div className="pl-4 border-l-2 border-green-400">
                      <strong>North America:</strong> Canada (82.2) outperforming USA (79.3)
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4">Rapid Improvers</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Rwanda:</strong> +19.8 years, fastest improvement globally
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Ethiopia:</strong> +15.2 years, strong healthcare reforms
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-400">
                      <strong>Niger:</strong> +14.8 years, maternal health focus
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-red-400 mb-4">Challenges</h4>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-red-400">
                      <strong>Sub-Saharan Africa:</strong> Average 58.2 years, HIV/AIDS impact
                    </div>
                    <div className="pl-4 border-l-2 border-red-400">
                      <strong>Conflict Zones:</strong> South Sudan (42.7), Afghanistan (48.8)
                    </div>
                    <div className="pl-4 border-l-2 border-red-400">
                      <strong>Poverty Impact:</strong> 40+ year gap between richest and poorest
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-xl border border-blue-500/30">
                <h4 className="text-xl font-semibold text-blue-300 mb-4">Key Observations</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <strong className="text-green-300">Success Patterns:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Universal healthcare systems in top performers</li>
                      <li>• Strong primary care and preventive medicine</li>
                      <li>• High education levels and economic stability</li>
                      <li>• Effective public health infrastructure</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-yellow-300">Improvement Drivers:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Political stability and good governance</li>
                      <li>• International aid and technical assistance</li>
                      <li>• Focus on maternal and child health</li>
                      <li>• Disease-specific intervention programs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center py-12 mt-20 border-t border-gray-700 text-gray-400"
        >
          <p><strong>Data Analysis & Visualization by Lloyd Dela Cruz</strong></p>
          <p>Powered by WHO, World Bank, and IMF Data | Built with Next.js & Chart.js</p>
          <p>Note: All population-based calculations use verified World Bank data. Country classifications follow IMF standards.</p>
        </motion.div>
      </div>
    </div>
  )
}