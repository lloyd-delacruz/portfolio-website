'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function LifeExpectancyDashboard() {
  const [isChartsLoaded, setIsChartsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isChartsLoaded && typeof window !== 'undefined') {
      setTimeout(() => initializeAllCharts(), 100);
    }
  }, [isChartsLoaded, activeTab]);

  const initializeAllCharts = () => {
    // @ts-ignore
    const Chart = window.Chart;
    if (!Chart) return;
    
    // Set Chart.js defaults
    Chart.defaults.color = '#ffffff';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    
    try {
      // Clear existing charts
      Chart.helpers?.each(Chart.instances, (instance: any) => {
        instance.destroy();
      });

      // Initialize charts based on active tab
      switch(activeTab) {
        case 'overview':
          initOverviewCharts(Chart);
          break;
        case 'trends':
          initTrendsCharts(Chart);
          break;
        case 'efficiency':
          initEfficiencyCharts(Chart);
          break;
        case 'determinants':
          initDeterminantsCharts(Chart);
          break;
        case 'diseases':
          initDiseaseCharts(Chart);
          break;
        case 'countries':
          initCountriesCharts(Chart);
          break;
      }
    } catch (error) {
      console.error('Error initializing charts:', error);
    }
  };

  const initOverviewCharts = (Chart: any) => {
    // 1. Development Status Chart
    const devCtx = document.getElementById('devChart') as HTMLCanvasElement;
    if (devCtx) {
      new Chart(devCtx, {
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
      });
    }

    // 2. Income Groups Chart
    const incomeCtx = document.getElementById('incomeChart') as HTMLCanvasElement;
    if (incomeCtx) {
      new Chart(incomeCtx, {
        type: 'doughnut',
        data: {
          labels: ['High Income (80.4 years)', 'Upper Middle (74.6 years)', 'Lower Middle (68.3 years)', 'Low Income (61.2 years)'],
          datasets: [{
            data: [80.4, 74.6, 68.3, 61.2],
            backgroundColor: [
              'rgba(74, 222, 128, 0.8)',
              'rgba(102, 126, 234, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ],
            borderWidth: 2,
            borderColor: '#1a1a1a'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              position: 'bottom',
              labels: { padding: 20 }
            }
          }
        }
      });
    }

    // 3. Gap Over Time
    const gapCtx = document.getElementById('gapChart') as HTMLCanvasElement;
    if (gapCtx) {
      new Chart(gapCtx, {
        type: 'line',
        data: {
          labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
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
      });
    }

    // 4. Group Comparison
    const groupCtx = document.getElementById('groupChart') as HTMLCanvasElement;
    if (groupCtx) {
      new Chart(groupCtx, {
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
      });
    }
  };

  const initTrendsCharts = (Chart: any) => {
    // Top Improvements
    const improvementCtx = document.getElementById('improvementChart') as HTMLCanvasElement;
    if (improvementCtx) {
      new Chart(improvementCtx, {
        type: 'bar',
        data: {
          labels: ['Rwanda', 'Ethiopia', 'Niger', 'Malawi', 'Uganda', 'Liberia', 'Tanzania', 
                  'Zambia', 'Senegal', 'Cambodia', 'Mozambique', 'Kenya', 'Madagascar', 
                  'Haiti', 'Burkina Faso', 'Angola', 'Ghana', 'Bangladesh', 'Nepal', 'India'],
          datasets: [{
            label: 'Years Gained (2000-2015)',
            data: [19.8, 15.6, 14.8, 14.2, 13.7, 13.4, 12.6, 12.1, 11.8, 11.5, 
                  11.2, 10.9, 10.5, 10.2, 9.8, 9.5, 9.2, 8.9, 8.6, 8.3],
            backgroundColor: '#4ade80'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: { legend: { display: false } }
        }
      });
    }

    // Declining Countries
    const declineCtx = document.getElementById('declineChart') as HTMLCanvasElement;
    if (declineCtx) {
      new Chart(declineCtx, {
        type: 'bar',
        data: {
          labels: ['Syria', 'Saint Vincent', 'Libya', 'Paraguay', 'Yemen', 'Romania', 'Iraq'],
          datasets: [{
            label: 'Years Lost',
            data: [-8.1, -5.8, -5.3, -5.0, -2.3, -2.0, -1.1],
            backgroundColor: '#ef4444'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      });
    }

    // Regional Progress
    const regionalCtx = document.getElementById('regionalChart') as HTMLCanvasElement;
    if (regionalCtx) {
      new Chart(regionalCtx, {
        type: 'radar',
        data: {
          labels: ['Life Expectancy', 'GDP Growth', 'Education', 'Immunization', 'Healthcare Access'],
          datasets: [{
            label: 'Sub-Saharan Africa',
            data: [65, 45, 55, 75, 40],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.2)'
          }, {
            label: 'South Asia',
            data: [72, 65, 70, 85, 50],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.2)'
          }, {
            label: 'East Asia',
            data: [78, 80, 85, 95, 70],
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.2)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }
      });
    }
  };

  const initEfficiencyCharts = (Chart: any) => {
    // Efficiency Scatter
    const efficiencyCtx = document.getElementById('efficiencyChart') as HTMLCanvasElement;
    if (efficiencyCtx) {
      new Chart(efficiencyCtx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Efficient Systems',
            data: [
              {x: 3.08, y: 72.0}, {x: 3.55, y: 74.9}, {x: 3.60, y: 74.9},
              {x: 3.76, y: 75.9}, {x: 4.92, y: 83.1}
            ],
            backgroundColor: '#4ade80',
            pointRadius: 8
          }, {
            label: 'Average Efficiency',
            data: [
              {x: 6.14, y: 74.6}, {x: 7.21, y: 73.4},
              {x: 8.21, y: 79.2}, {x: 9.21, y: 80.4}
            ],
            backgroundColor: '#f59e0b',
            pointRadius: 8
          }, {
            label: 'High Spending',
            data: [
              {x: 10.93, y: 83.7}, {x: 11.88, y: 83.4}, {x: 16.84, y: 79.2}
            ],
            backgroundColor: '#ef4444',
            pointRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: 'Health Expenditure (% GDP)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
              title: { display: true, text: 'Life Expectancy (Years)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }
      });
    }

    // Optimal Spending
    const spendingCtx = document.getElementById('spendingChart') as HTMLCanvasElement;
    if (spendingCtx) {
      new Chart(spendingCtx, {
        type: 'line',
        data: {
          labels: ['<3%', '3-5%', '5-7%', '7-10%', '>10%'],
          datasets: [{
            label: 'Developed Countries',
            data: [76.2, 79.8, 80.9, 81.3, 81.7],
            borderColor: '#667eea',
            tension: 0.4
          }, {
            label: 'Developing Countries',
            data: [65.8, 72.1, 73.4, 74.2, 75.1],
            borderColor: '#764ba2',
            tension: 0.4
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
            }
          }
        }
      });
    }
  };

  const initDeterminantsCharts = (Chart: any) => {
    // Key Factors
    const factorsCtx = document.getElementById('factorsChart') as HTMLCanvasElement;
    if (factorsCtx) {
      new Chart(factorsCtx, {
        type: 'bar',
        data: {
          labels: ['Income Composition', 'Education', 'Adult Mortality', 'HIV/AIDS', 'Immunization', 'GDP/Capita'],
          datasets: [{
            label: 'Correlation Coefficient',
            data: [0.893, 0.847, -0.831, -0.724, 0.651, 0.548],
            backgroundColor: function(context: any) {
              return context.parsed.y > 0 ? '#4ade80' : '#ef4444';
            }
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              min: -1, max: 1,
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }
      });
    }

    // Education Impact
    const educationCtx = document.getElementById('educationChart') as HTMLCanvasElement;
    if (educationCtx) {
      new Chart(educationCtx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Countries',
            data: [
              {x: 5, y: 55}, {x: 8, y: 62}, {x: 10, y: 68}, 
              {x: 12, y: 72}, {x: 15, y: 78}, {x: 18, y: 82}
            ],
            backgroundColor: '#667eea'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: 'Years of Schooling' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
              title: { display: true, text: 'Life Expectancy' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }
      });
    }

    // GDP Impact
    const gdpCtx = document.getElementById('gdpChart') as HTMLCanvasElement;
    if (gdpCtx) {
      new Chart(gdpCtx, {
        type: 'line',
        data: {
          labels: ['$500', '$1k', '$2k', '$4k', '$8k', '$16k', '$32k', '$64k'],
          datasets: [{
            label: 'Life Expectancy vs GDP',
            data: [55, 60, 65, 70, 73, 76, 79, 81],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              min: 50,
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }
      });
    }
  };

  const initDiseaseCharts = (Chart: any) => {
    // HIV Impact
    const hivCtx = document.getElementById('hivChart') as HTMLCanvasElement;
    if (hivCtx) {
      new Chart(hivCtx, {
        type: 'bar',
        data: {
          labels: ['<0.5', '0.5-2', '2-5', '5-10', '>10'],
          datasets: [{
            label: 'Average Life Expectancy',
            data: [74.8, 68.9, 64.2, 58.7, 54.3],
            backgroundColor: function(context: any) {
              const value = context.parsed.y;
              if (value > 70) return '#4ade80';
              if (value > 60) return '#f59e0b';
              return '#ef4444';
            }
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: false,
              min: 50,
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
              title: { display: true, text: 'HIV/AIDS Deaths per 1,000' }
            }
          }
        }
      });
    }

    // Immunization Impact
    const immunCtx = document.getElementById('immunChart') as HTMLCanvasElement;
    if (immunCtx) {
      new Chart(immunCtx, {
        type: 'line',
        data: {
          labels: ['<70%', '70-79%', '80-89%', '90-94%', '≥95%'],
          datasets: [{
            label: 'Life Expectancy',
            data: [61.7, 65.3, 69.4, 72.8, 76.2],
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            tension: 0.4,
            fill: true
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
              title: { display: true, text: 'Immunization Coverage' }
            }
          }
        }
      });
    }
  };

  const initCountriesCharts = (Chart: any) => {
    // Success Stories
    const successCtx = document.getElementById('successChart') as HTMLCanvasElement;
    if (successCtx) {
      new Chart(successCtx, {
        type: 'bubble',
        data: {
          datasets: [{
            label: 'Low Income Success',
            data: [
              {x: 711, y: 68.1, r: 20}, // Rwanda
              {x: 645, y: 66.8, r: 18}, // Ethiopia
              {x: 359, y: 62.8, r: 15}  // Niger
            ],
            backgroundColor: '#4ade80'
          }, {
            label: 'Lower Middle Success',
            data: [
              {x: 1987, y: 72.0, r: 25}, // Bangladesh
              {x: 2500, y: 75.9, r: 22}, // Vietnam
              {x: 3500, y: 74.9, r: 20}  // Thailand
            ],
            backgroundColor: '#667eea'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'logarithmic',
              title: { display: true, text: 'GDP Per Capita (USD)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
              title: { display: true, text: 'Life Expectancy (Years)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        }
      });
    }
  };

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js"
        onLoad={() => setIsChartsLoaded(true)}
      />
      
      <div className="w-full">
        <style jsx>{`
          .dashboard-container {
            background: #0a0a0a;
            color: #ffffff;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          
          .dashboard-header {
            text-align: center;
            padding: 50px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            margin-bottom: 40px;
            position: relative;
            overflow: hidden;
          }
          
          .dashboard-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            transform: translateX(-100%);
            animation: shimmer 3s infinite;
          }
          
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
          
          .key-insights {
            background: #1a1a1a;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            border: 1px solid #333;
          }
          
          .insight-item {
            margin-bottom: 15px;
            padding-left: 20px;
            position: relative;
            line-height: 1.6;
          }
          
          .insight-item:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #667eea;
          }
          
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
          }
          
          .metric-card {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            border: 1px solid #333;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .metric-card:hover {
            transform: translateY(-5px);
            border-color: #667eea;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          }
          
          .metric-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
          }
          
          .metric-value {
            font-size: 3em;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
          }
          
          .metric-label {
            color: #ccc;
            font-size: 1em;
            margin-bottom: 10px;
          }
          
          .metric-detail {
            color: #4ade80;
            font-size: 0.9em;
          }
          
          .tabs {
            display: flex;
            gap: 15px;
            margin-bottom: 40px;
            flex-wrap: wrap;
            background: #1a1a1a;
            padding: 15px;
            border-radius: 20px;
            border: 1px solid #333;
          }
          
          .tab-btn {
            padding: 15px 30px;
            background: #2a2a2a;
            border: 1px solid #333;
            color: #fff;
            border-radius: 15px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            font-weight: 500;
          }
          
          .tab-btn:hover {
            background: #3a3a3a;
            border-color: #667eea;
          }
          
          .tab-btn.active {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-color: transparent;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
          }
          
          .tab-content {
            display: none;
            animation: fadeIn 0.5s ease;
          }
          
          .tab-content.active {
            display: block;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .chart-container {
            background: #1a1a1a;
            padding: 40px;
            border-radius: 20px;
            margin-bottom: 30px;
            border: 1px solid #333;
          }
          
          .chart-title {
            font-size: 1.8em;
            margin-bottom: 10px;
            text-align: center;
            color: #667eea;
          }
          
          .chart-description {
            text-align: center;
            color: #888;
            margin-bottom: 30px;
          }
          
          .chart-wrapper {
            position: relative;
            height: 400px;
            width: 100%;
          }
          
          .chart-wrapper-tall {
            height: 600px;
          }
          
          .chart-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 30px;
          }
          
          @media (max-width: 768px) {
            .chart-grid { grid-template-columns: 1fr; }
            .chart-wrapper { height: 300px; }
            .chart-wrapper-tall { height: 400px; }
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          
          th {
            background: #2a2a2a;
            padding: 15px;
            text-align: left;
            font-weight: bold;
            color: #667eea;
            border-bottom: 2px solid #667eea;
          }
          
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #333;
          }
          
          tr:hover {
            background: #2a2a2a;
          }
          
          .success { color: #4ade80; }
          .warning { color: #f59e0b; }
          .danger { color: #ef4444; }
          
          .loading {
            text-align: center;
            padding: 40px;
            font-size: 1.2em;
            color: #667eea;
          }
          
          .section-divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #667eea, transparent);
            margin: 40px 0;
          }
        `}</style>

        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="text-5xl font-bold mb-4">Global Life Expectancy Analysis</h1>
            <p className="text-xl opacity-90">Comprehensive Analysis of 193 Countries (2000-2015)</p>
            <p className="text-sm opacity-80 mt-2">Data Sources: WHO, World Bank, IMF | Cleaned & Validated Dataset</p>
          </div>

          <div className="key-insights">
            <h2 className="text-2xl font-bold mb-6" style={{color: '#667eea'}}>🔍 Key Insights & Findings</h2>
            <div className="insight-item"><strong>Global Progress:</strong> Developing countries improved 48% faster than developed countries (4.9 vs 3.3 years)</div>
            <div className="insight-item"><strong>Gap Reduction:</strong> Life expectancy gap narrowed from 12.8 to 11.2 years (-12.5%)</div>
            <div className="insight-item"><strong>Success Story:</strong> Rwanda achieved +19.8 years improvement through healthcare reforms</div>
            <div className="insight-item"><strong>Efficiency Champion:</strong> Bangladesh achieves 72 years life expectancy with only 3% GDP on health</div>
            <div className="insight-item"><strong>Critical Threshold:</strong> Countries above $4,000 GDP/capita show accelerated health improvements</div>
            <div className="insight-item"><strong>Education Impact:</strong> Each additional year of schooling correlates with ~2 years life expectancy</div>
            <div className="insight-item"><strong>HIV/AIDS Effect:</strong> Countries with >10 deaths/1000 have 20+ years lower life expectancy</div>
            <div className="insight-item"><strong>Immunization Power:</strong> 95%+ coverage associated with 15 years higher life expectancy</div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">69.7</div>
              <div className="metric-label">Global Average Life Expectancy (2015)</div>
              <div className="metric-detail">+4.2 years since 2000</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">11.2</div>
              <div className="metric-label">Development Gap (Years)</div>
              <div className="metric-detail">-1.6 years improvement</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">193</div>
              <div className="metric-label">Countries Analyzed</div>
              <div className="metric-detail">With validated data</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">+19.8</div>
              <div className="metric-label">Highest Improvement</div>
              <div className="metric-detail">Rwanda: 48.3 → 68.1 years</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">0.893</div>
              <div className="metric-label">Strongest Predictor</div>
              <div className="metric-detail">Income Composition Index</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">7%</div>
              <div className="metric-label">Optimal Health Spending</div>
              <div className="metric-detail">Diminishing returns above this</div>
            </div>
          </div>

          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'trends' ? 'active' : ''}`}
              onClick={() => setActiveTab('trends')}
            >
              Trends & Progress
            </button>
            <button 
              className={`tab-btn ${activeTab === 'efficiency' ? 'active' : ''}`}
              onClick={() => setActiveTab('efficiency')}
            >
              Healthcare Efficiency
            </button>
            <button 
              className={`tab-btn ${activeTab === 'determinants' ? 'active' : ''}`}
              onClick={() => setActiveTab('determinants')}
            >
              Key Determinants
            </button>
            <button 
              className={`tab-btn ${activeTab === 'diseases' ? 'active' : ''}`}
              onClick={() => setActiveTab('diseases')}
            >
              Disease Impact
            </button>
            <button 
              className={`tab-btn ${activeTab === 'countries' ? 'active' : ''}`}
              onClick={() => setActiveTab('countries')}
            >
              Country Rankings
            </button>
          </div>

          {/* OVERVIEW TAB */}
          <div className={`tab-content ${activeTab === 'overview' ? 'active' : ''}`}>
            <div className="chart-grid">
              <div className="chart-container">
                <h3 className="chart-title">Life Expectancy by Development Status</h3>
                <p className="chart-description">Tracking progress of developed vs developing nations</p>
                <div className="chart-wrapper">
                  <canvas id="devChart"></canvas>
                </div>
              </div>
              <div className="chart-container">
                <h3 className="chart-title">Life Expectancy by Income Group (2015)</h3>
                <p className="chart-description">Clear correlation between income and health outcomes</p>
                <div className="chart-wrapper">
                  <canvas id="incomeChart"></canvas>
                </div>
              </div>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">Development Gap Over Time</h3>
              <p className="chart-description">The narrowing gap shows global health equity improving</p>
              <div className="chart-wrapper">
                <canvas id="gapChart"></canvas>
              </div>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">G7 vs G20 vs OECD vs Others (2015)</h3>
              <div className="chart-wrapper">
                <canvas id="groupChart"></canvas>
              </div>
            </div>
          </div>

          {/* TRENDS TAB */}
          <div className={`tab-content ${activeTab === 'trends' ? 'active' : ''}`}>
            <div className="chart-container">
              <h3 className="chart-title">Top 20 Countries: Greatest Improvements (2000-2015)</h3>
              <p className="chart-description">African countries dominate due to HIV/AIDS treatment expansion</p>
              <div className="chart-wrapper chart-wrapper-tall">
                <canvas id="improvementChart"></canvas>
              </div>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">Countries with Declining Life Expectancy</h3>
              <p className="chart-description">Conflict and political instability are primary drivers</p>
              <div className="chart-wrapper">
                <canvas id="declineChart"></canvas>
              </div>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">Regional Progress Comparison</h3>
              <div className="chart-wrapper">
                <canvas id="regionalChart"></canvas>
              </div>
            </div>
          </div>

          {/* EFFICIENCY TAB */}
          <div className={`tab-content ${activeTab === 'efficiency' ? 'active' : ''}`}>
            <div className="chart-container">
              <h3 className="chart-title">Healthcare Efficiency: Life Expectancy vs Health Spending</h3>
              <p className="chart-description">Some countries achieve more with less through efficient systems</p>
              <div className="chart-wrapper">
                <canvas id="efficiencyChart"></canvas>
              </div>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">Optimal Healthcare Spending Levels</h3>
              <p className="chart-description">Diminishing returns evident above 7% GDP for developed countries</p>
              <div className="chart-wrapper">
                <canvas id="spendingChart"></canvas>
              </div>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">Most Efficient Health Systems</h3>
              <table>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Life Expectancy</th>
                    <th>Health Spending (% GDP)</th>
                    <th>Efficiency Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Bangladesh</td><td>72.0</td><td>3.08%</td><td className="success">23.4</td><td>Very Efficient</td></tr>
                  <tr><td>Thailand</td><td>74.9</td><td>3.55%</td><td className="success">21.1</td><td>Very Efficient</td></tr>
                  <tr><td>Sri Lanka</td><td>74.9</td><td>3.60%</td><td className="success">20.8</td><td>Very Efficient</td></tr>
                  <tr><td>Vietnam</td><td>75.9</td><td>3.76%</td><td className="success">20.2</td><td>Very Efficient</td></tr>
                  <tr><td>Singapore</td><td>83.1</td><td>4.92%</td><td className="success">16.9</td><td>Very Efficient</td></tr>
                  <tr><td>Japan</td><td>83.7</td><td>10.93%</td><td className="warning">7.7</td><td>Moderate</td></tr>
                  <tr><td>USA</td><td>79.2</td><td>16.84%</td><td className="danger">4.7</td><td>Low Efficiency</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* DETERMINANTS TAB */}
          <div className={`tab-content ${activeTab === 'determinants' ? 'active' : ''}`}>
            <div className="chart-container">
              <h3 className="chart-title">Key Factors Affecting Life Expectancy (Correlation Analysis)</h3>
              <p className="chart-description">Education and human development are stronger predictors than GDP</p>
              <div className="chart-wrapper">
                <canvas id="factorsChart"></canvas>
              </div>
            </div>
            
            <div className="chart-grid">
              <div className="chart-container">
                <h3 className="chart-title">Education Impact on Life Expectancy</h3>
                <div className="chart-wrapper">
                  <canvas id="educationChart"></canvas>
                </div>
              </div>
              <div className="chart-container">
                <h3 className="chart-title">GDP vs Life Expectancy</h3>
                <div className="chart-wrapper">
                  <canvas id="gdpChart"></canvas>
                </div>
              </div>
            </div>
          </div>

          {/* DISEASE IMPACT TAB */}
          <div className={`tab-content ${activeTab === 'diseases' ? 'active' : ''}`}>
            <div className="chart-grid">
              <div className="chart-container">
                <h3 className="chart-title">HIV/AIDS Impact on Life Expectancy</h3>
                <p className="chart-description">Devastating impact in Sub-Saharan Africa</p>
                <div className="chart-wrapper">
                  <canvas id="hivChart"></canvas>
                </div>
              </div>
              <div className="chart-container">
                <h3 className="chart-title">Immunization Coverage Effect</h3>
                <p className="chart-description">Clear dose-response relationship</p>
                <div className="chart-wrapper">
                  <canvas id="immunChart"></canvas>
                </div>
              </div>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">Disease Burden by Region</h3>
              <table>
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>HIV Deaths/1000</th>
                    <th>Infant Mortality/1000</th>
                    <th>Immunization %</th>
                    <th>Life Expectancy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Sub-Saharan Africa</td><td className="danger">8.5</td><td className="danger">54.2</td><td className="warning">75%</td><td>61.2</td></tr>
                  <tr><td>South Asia</td><td className="warning">1.2</td><td className="warning">31.7</td><td className="warning">85%</td><td>68.3</td></tr>
                  <tr><td>East Asia</td><td className="success">0.3</td><td className="success">12.3</td><td className="success">95%</td><td>74.6</td></tr>
                  <tr><td>Europe</td><td className="success">0.1</td><td className="success">4.8</td><td className="success">96%</td><td>80.4</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* COUNTRIES TAB */}
          <div className={`tab-content ${activeTab === 'countries' ? 'active' : ''}`}>
            <div className="chart-container">
              <h3 className="chart-title">Top 25 Countries by Life Expectancy (2015)</h3>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Country</th>
                    <th>Life Expectancy</th>
                    <th>Status</th>
                    <th>GDP/Capita</th>
                    <th>Health Exp %</th>
                    <th>Schooling</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>Slovenia</td><td className="success">88.0</td><td>Developed</td><td>$2,730</td><td>8.5%</td><td>17.3</td></tr>
                  <tr><td>2</td><td>Denmark</td><td className="success">86.0</td><td>Developed</td><td>$5,315</td><td>10.8%</td><td>19.2</td></tr>
                  <tr><td>3</td><td>Cyprus</td><td className="success">85.0</td><td>Developed</td><td>$2,375</td><td>6.8%</td><td>14.3</td></tr>
                  <tr><td>4</td><td>Chile</td><td className="success">85.0</td><td>Developed</td><td>$13,653</td><td>7.8%</td><td>16.3</td></tr>
                  <tr><td>5</td><td>Japan</td><td className="success">83.7</td><td>Developed</td><td>$34,474</td><td>10.9%</td><td>15.3</td></tr>
                  <tr><td>6</td><td>Switzerland</td><td className="success">83.4</td><td>Developed</td><td>$8,990</td><td>11.9%</td><td>16.2</td></tr>
                  <tr><td>7</td><td>Singapore</td><td className="success">83.1</td><td>Developed</td><td>$53,630</td><td>4.9%</td><td>15.4</td></tr>
                  <tr><td>8</td><td>Spain</td><td className="success">82.8</td><td>Developed</td><td>$25,684</td><td>9.0%</td><td>17.6</td></tr>
                  <tr><td>9</td><td>Australia</td><td className="success">82.8</td><td>Developed</td><td>$56,554</td><td>9.4%</td><td>20.4</td></tr>
                  <tr><td>10</td><td>Iceland</td><td className="success">82.7</td><td>Developed</td><td>$5,734</td><td>8.3%</td><td>19.0</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">Success Stories: Low-Income Countries Achieving High Life Expectancy</h3>
              <div className="chart-wrapper">
                <canvas id="successChart"></canvas>
              </div>
            </div>
          </div>

          {!isChartsLoaded && (
            <div className="loading">
              <p>Loading interactive charts...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}