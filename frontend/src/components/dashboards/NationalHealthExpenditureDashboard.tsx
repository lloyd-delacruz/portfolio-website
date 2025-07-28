import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Activity, Users, Building, MapPin, Calendar, ChevronRight, ArrowUpRight, ArrowDownRight, FileText, Download, Filter, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NationalHealthExpenditureDashboard = () => {
  const router = useRouter();
  const [chartType, setChartType] = useState('total');
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2022);

  // Enhanced data with realistic values
  const healthData = {
    years: [] as number[],
    totalExpenditure: [] as number[],
    perCapita: [] as number[],
    gdpPercentage: [] as number[],
  };

  // Actual data points for key years
  const actualDataPoints: Record<number, { total: number; perCapita: number; gdp: number }> = {
    1975: { total: 12199.44, perCapita: 527.13, gdp: 7.02 },
    1980: { total: 22298.37, perCapita: 909.56, gdp: 7.22 },
    1985: { total: 39842.37, perCapita: 1541.76, gdp: 8.37 },
    1990: { total: 61099.98, perCapita: 2206.48, gdp: 9.14 },
    1995: { total: 74254.88, perCapita: 2534.10, gdp: 9.26 },
    2000: { total: 99857.23, perCapita: 3253.76, gdp: 8.99 },
    2005: { total: 145991.45, perCapita: 4521.05, gdp: 10.31 },
    2010: { total: 197808.24, perCapita: 5769.87, gdp: 11.90 },
    2015: { total: 230598.64, perCapita: 6423.46, gdp: 11.67 },
    2020: { total: 296549.85, perCapita: 7816.13, gdp: 13.49 },
    2021: { total: 310925.92, perCapita: 8128.10, gdp: 12.82 },
    2022: { total: 329570.80, perCapita: 8448.74, gdp: 12.54 }
  };

  // Interpolate data
  for (let year = 1975; year <= 2022; year++) {
    healthData.years.push(year);
    
    if (actualDataPoints[year]) {
      healthData.totalExpenditure.push(actualDataPoints[year].total);
      healthData.perCapita.push(actualDataPoints[year].perCapita);
      healthData.gdpPercentage.push(actualDataPoints[year].gdp);
    } else {
      // Interpolate between known points
      const years = Object.keys(actualDataPoints).map(Number).sort((a, b) => a - b);
      const prevYear = years.filter(y => y < year).pop();
      const nextYear = years.filter(y => y > year).shift();
      
      if (prevYear && nextYear) {
        const prevData = actualDataPoints[prevYear];
        const nextData = actualDataPoints[nextYear];
        const ratio = (year - prevYear) / (nextYear - prevYear);
        
        healthData.totalExpenditure.push(prevData.total + (nextData.total - prevData.total) * ratio);
        healthData.perCapita.push(prevData.perCapita + (nextData.perCapita - prevData.perCapita) * ratio);
        healthData.gdpPercentage.push(prevData.gdp + (nextData.gdp - prevData.gdp) * ratio);
      }
    }
  }

  const getChartData = () => {
    const startIdx = healthData.years.indexOf(startYear);
    const endIdx = healthData.years.indexOf(endYear) + 1;
    const years = healthData.years.slice(startIdx, endIdx);
    
    let data: number[], label: string, color: string;
    
    switch(chartType) {
      case 'total':
        data = healthData.totalExpenditure.slice(startIdx, endIdx);
        label = 'Total Expenditure (Millions $)';
        color = '#0066FF';
        break;
      case 'percapita':
        data = healthData.perCapita.slice(startIdx, endIdx);
        label = 'Per Capita Expenditure ($)';
        color = '#00C781';
        break;
      case 'gdp':
        data = healthData.gdpPercentage.slice(startIdx, endIdx);
        label = 'Percentage of GDP (%)';
        color = '#FFB800';
        break;
      case 'growth':
        data = [];
        for (let i = startIdx + 1; i < endIdx; i++) {
          const growth = ((healthData.totalExpenditure[i] - healthData.totalExpenditure[i-1]) / healthData.totalExpenditure[i-1]) * 100;
          data.push(growth);
        }
        years.shift();
        label = 'Year-over-Year Growth (%)';
        color = '#FF3B30';
        break;
      default:
        data = healthData.totalExpenditure.slice(startIdx, endIdx);
        label = 'Total Expenditure (Millions $)';
        color = '#0066FF';
    }
    
    return years.map((year, index) => ({
      year,
      value: data[index]
    }));
  };

  const sectorData = [
    { name: 'Provincial', value: 116145, color: '#0066FF' },
    { name: 'Private Sector', value: 151448, color: '#00C781' },
    { name: 'Federal', value: 13407, color: '#FFB800' },
    { name: 'Other Public', value: 48571, color: '#FF3B30' }
  ];

  const recentTrendsData = [
    { year: 2018, total: 264.1, perCapita: 7068, gdp: 11.0, growth: 4.2 },
    { year: 2019, total: 280.8, perCapita: 7423, gdp: 11.3, growth: 6.3 },
    { year: 2020, total: 296.5, perCapita: 7816, gdp: 13.5, growth: 5.6 },
    { year: 2021, total: 310.9, perCapita: 8128, gdp: 12.8, growth: 4.9 },
    { year: 2022, total: 329.6, perCapita: 8449, gdp: 12.5, growth: 6.0 }
  ];

  // Normalize data to base year 2000 = 100
  const baseYearIdx = healthData.years.indexOf(2000);
  const comparisonData = healthData.years.map((year, index) => ({
    year,
    totalExpenditure: (healthData.totalExpenditure[index] / healthData.totalExpenditure[baseYearIdx]) * 100,
    perCapita: (healthData.perCapita[index] / healthData.perCapita[baseYearIdx]) * 100,
    gdpPercentage: (healthData.gdpPercentage[index] / healthData.gdpPercentage[baseYearIdx]) * 100
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      let formattedValue = '';
      
      if (chartType === 'total') {
        formattedValue = `$${data.value.toFixed(1)}M`;
      } else if (chartType === 'percapita') {
        formattedValue = `$${data.value.toFixed(0)}`;
      } else {
        formattedValue = `${data.value.toFixed(1)}%`;
      }
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-800 font-semibold">{label}</p>
          <p className="text-sm" style={{ color: data.color }}>
            {data.name}: {formattedValue}
          </p>
        </div>
      );
    }
    return null;
  };

  const chartData = getChartData();
  const color = chartType === 'total' ? '#0066FF' : 
                chartType === 'percapita' ? '#00C781' :
                chartType === 'gdp' ? '#FFB800' : '#FF3B30';

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
                <h1 className="text-3xl font-bold text-gray-900">Canadian National Health Expenditure Dashboard</h1>
                <p className="text-gray-600 mt-1">1975 - 2022 Dataset</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full text-sm text-blue-700">
                <Calendar className="h-4 w-4" />
                <span>1975 - 2022 Dataset</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">2022</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">$329.6B</div>
            <div className="text-sm text-gray-600 mt-1">Total Expenditure (2022)</div>
            <div className="flex items-center mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">6.0% from 2021</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Per Person</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">$8,449</div>
            <div className="text-sm text-gray-600 mt-1">Per Capita Spending</div>
            <div className="flex items-center mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">3.9% from 2021</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">GDP</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">12.5%</div>
            <div className="text-sm text-gray-600 mt-1">Percentage of GDP</div>
            <div className="flex items-center mt-3 text-sm">
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">0.3% from 2021</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <Building className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Growth</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">27x</div>
            <div className="text-sm text-gray-600 mt-1">Growth Since 1975</div>
            <div className="flex items-center mt-3 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">Continuous growth</span>
            </div>
          </div>
        </div>
        
        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Expenditure Trends</h2>
                <p className="text-sm text-gray-600 mt-1">Historical spending patterns and projections</p>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">Live</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
                <select 
                  value={chartType} 
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="total">Total Expenditure</option>
                  <option value="percapita">Per Capita</option>
                  <option value="gdp">% of GDP</option>
                  <option value="growth">Growth Rate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                <input 
                  type="number" 
                  min="1975" 
                  max="2022" 
                  value={startYear} 
                  onChange={(e) => setStartYear(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                <input 
                  type="number" 
                  min="1975" 
                  max="2022" 
                  value={endYear} 
                  onChange={(e) => setEndYear(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={3}
                  fill="url(#colorGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Sector Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => `$${(value / 1000).toFixed(1)}B`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Key Finding:</strong>
              </p>
              <p className="text-sm text-gray-600">
                Private sector accounts for 46% of total health spending, 
                highlighting the significant role of private healthcare in Canada.
              </p>
            </div>
          </div>
        </div>
        
        {/* Insights and Table Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-1">Pandemic Impact</h3>
                <p className="text-sm text-gray-600">2020 saw the highest GDP percentage (13.5%) due to COVID-19 response measures</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-1">Consistent Growth</h3>
                <p className="text-sm text-gray-600">Average annual growth of 7.3% over 48 years, outpacing inflation</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-1">Provincial Leadership</h3>
                <p className="text-sm text-gray-600">Provincial governments remain the largest public spender at 35.2%</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-1">Per Capita Milestone</h3>
                <p className="text-sm text-gray-600">Crossed $8,000 per person for the first time in 2021</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Trends</h2>
                <p className="text-sm text-gray-600 mt-1">Last 5 years of health expenditure data</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Year</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total (Millions)</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Per Capita</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">% of GDP</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">YoY Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrendsData.map((row) => (
                    <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm font-medium text-gray-900">{row.year}</td>
                      <td className="py-3 px-2 text-sm text-gray-700">${row.total.toFixed(1)}</td>
                      <td className="py-3 px-2 text-sm text-gray-700">${row.perCapita.toFixed(0)}</td>
                      <td className="py-3 px-2 text-sm text-gray-700">{row.gdp.toFixed(1)}%</td>
                      <td className="py-3 px-2 text-sm">
                        <span className={`font-medium ${row.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {row.growth > 0 ? '↑' : '↓'} {Math.abs(row.growth)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Comparison Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Multi-Metric Comparison</h2>
              <p className="text-sm text-gray-600 mt-1">Normalized view of key health expenditure metrics (Base year 2000 = 100)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                formatter={(value: any, name: string) => [`${value.toFixed(0)}`, name]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="totalExpenditure" 
                stroke="#0066FF" 
                strokeWidth={2}
                name="Total Expenditure"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="perCapita" 
                stroke="#00C781" 
                strokeWidth={2}
                name="Per Capita"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="gdpPercentage" 
                stroke="#FFB800" 
                strokeWidth={2}
                name="% of GDP"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default NationalHealthExpenditureDashboard;