import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, 
  RadarChart, Radar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, ComposedChart, LabelList
} from 'recharts';
import { 
  Globe, TrendingUp, TrendingDown, Award, MapPin, Brain, Heart, Users, 
  DollarSign, Shield, Gift, ChevronRight, Download, Filter,
  BarChart3, PieChartIcon, Activity, Sparkles, Target, AlertCircle,
  ArrowUpRight, ArrowDownRight, Calendar, Zap, Flag, Crown
} from 'lucide-react';

// TypeScript interfaces for data structures
interface GlobalTrendData {
  year: number;
  meanHappiness: number;
  stdDev: number;
  countries: number;
  topScore: number;
  bottomScore: number;
  gini: number;
}

interface CountryData {
  country: string;
  score: number;
  rank: number;
  gdp: number;
  social: number;
  health: number;
  freedom: number;
  trust: number;
  generosity: number;
  continent: string;
}

interface RegionalData {
  region: string;
  score2015: number;
  score2019: number;
  change: number;
  countries: number;
  avgGDP: number;
  avgTrust: number;
  population: number;
}

interface FactorCorrelation {
  factor: string;
  correlation: number;
  importance: number;
  description: string;
  icon: React.ComponentType<any>;
}

interface CountryProgress {
  country: string;
  change: number;
  category: string;
  startRank: number;
  endRank: number;
}

interface DistributionData {
  range: string;
  count: number;
  percentage: number;
  label: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number | string;
    color: string;
  }>;
  label?: string;
}

interface ScatterShapeProps {
  cx?: number;
  cy?: number;
  payload?: CountryData;
}

type RankColors = {
  [key: number]: string;
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<any>;
}

const HappinessAnalysisDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2019');
  // Removed unused state variables: selectedRegion, tooltipContent
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setAnimationComplete(true);
  }, []);

  // Enhanced color palette
  const colors = {
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A'
    },
    success: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D'
    },
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309'
    },
    danger: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C'
    },
    neutral: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B'
    },
    chart: ['#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F97316', '#FCD34D', '#84CC16', '#10B981', '#14B8A6', '#06B6D4']
  };

  // Enhanced data with more insights
  const globalTrends: GlobalTrendData[] = [
    { year: 2015, meanHappiness: 5.376, stdDev: 1.145, countries: 158, topScore: 7.587, bottomScore: 2.839, gini: 0.213 },
    { year: 2016, meanHappiness: 5.382, stdDev: 1.139, countries: 157, topScore: 7.526, bottomScore: 2.905, gini: 0.212 },
    { year: 2017, meanHappiness: 5.354, stdDev: 1.131, countries: 155, topScore: 7.537, bottomScore: 2.693, gini: 0.211 },
    { year: 2018, meanHappiness: 5.376, stdDev: 1.108, countries: 156, topScore: 7.632, bottomScore: 2.694, gini: 0.206 },
    { year: 2019, meanHappiness: 5.407, stdDev: 1.113, countries: 156, topScore: 7.769, bottomScore: 2.853, gini: 0.206 }
  ];

  const topCountries2019: CountryData[] = [
    { country: 'Finland', score: 7.769, rank: 1, gdp: 1.340, social: 1.587, health: 0.986, freedom: 0.596, trust: 0.393, generosity: 0.153, continent: 'Europe' },
    { country: 'Denmark', score: 7.600, rank: 2, gdp: 1.383, social: 1.573, health: 0.996, freedom: 0.592, trust: 0.410, generosity: 0.252, continent: 'Europe' },
    { country: 'Norway', score: 7.554, rank: 3, gdp: 1.488, social: 1.582, health: 1.028, freedom: 0.603, trust: 0.341, generosity: 0.271, continent: 'Europe' },
    { country: 'Iceland', score: 7.494, rank: 4, gdp: 1.380, social: 1.624, health: 1.026, freedom: 0.591, trust: 0.118, generosity: 0.354, continent: 'Europe' },
    { country: 'Netherlands', score: 7.488, rank: 5, gdp: 1.396, social: 1.522, health: 0.999, freedom: 0.557, trust: 0.298, generosity: 0.322, continent: 'Europe' },
    { country: 'Switzerland', score: 7.480, rank: 6, gdp: 1.452, social: 1.526, health: 1.052, freedom: 0.572, trust: 0.343, generosity: 0.263, continent: 'Europe' },
    { country: 'Sweden', score: 7.343, rank: 7, gdp: 1.387, social: 1.487, health: 1.009, freedom: 0.574, trust: 0.373, generosity: 0.267, continent: 'Europe' },
    { country: 'New Zealand', score: 7.307, rank: 8, gdp: 1.303, social: 1.557, health: 1.026, freedom: 0.585, trust: 0.383, generosity: 0.330, continent: 'Oceania' },
    { country: 'Canada', score: 7.278, rank: 9, gdp: 1.365, social: 1.505, health: 1.039, freedom: 0.584, trust: 0.400, generosity: 0.285, continent: 'North America' },
    { country: 'Austria', score: 7.246, rank: 10, gdp: 1.376, social: 1.475, health: 1.016, freedom: 0.532, trust: 0.481, generosity: 0.244, continent: 'Europe' }
  ];

  const regionalData: RegionalData[] = [
    { region: 'Western Europe', score2015: 6.89, score2019: 6.91, change: 0.02, countries: 21, avgGDP: 1.39, avgTrust: 0.37, population: 420 },
    { region: 'North America', score2015: 7.23, score2019: 7.15, change: -0.08, countries: 2, avgGDP: 1.35, avgTrust: 0.39, population: 368 },
    { region: 'Australia and New Zealand', score2015: 7.29, score2019: 7.27, change: -0.02, countries: 2, avgGDP: 1.30, avgTrust: 0.38, population: 30 },
    { region: 'Middle East', score2015: 5.41, score2019: 5.47, change: 0.06, countries: 15, avgGDP: 1.12, avgTrust: 0.18, population: 371 },
    { region: 'Southeast Asia', score2015: 5.32, score2019: 5.47, change: 0.15, countries: 9, avgGDP: 0.85, avgTrust: 0.32, population: 655 },
    { region: 'Central and Eastern Europe', score2015: 5.33, score2019: 5.48, change: 0.15, countries: 29, avgGDP: 1.05, avgTrust: 0.13, population: 295 },
    { region: 'Latin America', score2015: 6.14, score2019: 6.02, change: -0.12, countries: 20, avgGDP: 0.96, avgTrust: 0.08, population: 641 },
    { region: 'Sub-Saharan Africa', score2015: 4.30, score2019: 4.31, change: 0.01, countries: 34, avgGDP: 0.56, avgTrust: 0.11, population: 1078 },
    { region: 'South Asia', score2015: 4.58, score2019: 4.42, change: -0.16, countries: 7, avgGDP: 0.75, avgTrust: 0.14, population: 1814 },
    { region: 'East Asia', score2015: 5.63, score2019: 5.68, change: 0.05, countries: 6, avgGDP: 1.18, avgTrust: 0.25, population: 1673 }
  ];

  const factorCorrelations: FactorCorrelation[] = [
    { factor: 'GDP per Capita', correlation: 0.794, importance: 95, description: 'Economic prosperity strongly predicts happiness', icon: DollarSign },
    { factor: 'Social Support', correlation: 0.777, importance: 93, description: 'Having someone to count on in times of trouble', icon: Users },
    { factor: 'Healthy Life Expectancy', correlation: 0.780, importance: 94, description: 'Physical health and longevity contribute significantly', icon: Heart },
    { factor: 'Freedom', correlation: 0.566, importance: 68, description: 'Freedom to make life choices matters', icon: Shield },
    { factor: 'Trust in Government', correlation: 0.422, importance: 51, description: 'Low corruption builds societal trust', icon: Brain },
    { factor: 'Generosity', correlation: 0.132, importance: 16, description: 'Giving behavior shows weak correlation', icon: Gift }
  ];

  const countryProgressData: CountryProgress[] = [
    { country: 'Benin', change: 1.087, category: 'Exceptional Growth', startRank: 155, endRank: 102 },
    { country: 'Nicaragua', change: 0.764, category: 'Strong Growth', startRank: 88, endRank: 45 },
    { country: 'Bulgaria', change: 0.578, category: 'Strong Growth', startRank: 130, endRank: 97 },
    { country: 'Latvia', change: 0.530, category: 'Moderate Growth', startRank: 89, endRank: 53 },
    { country: 'Uzbekistan', change: 0.498, category: 'Moderate Growth', startRank: 63, endRank: 41 },
    { country: 'Venezuela', change: -1.684, category: 'Severe Decline', startRank: 23, endRank: 108 },
    { country: 'Syria', change: -0.877, category: 'Major Decline', startRank: 83, endRank: 149 },
    { country: 'Botswana', change: -0.850, category: 'Major Decline', startRank: 128, endRank: 148 },
    { country: 'India', change: -0.747, category: 'Significant Decline', startRank: 117, endRank: 140 },
    { country: 'Yemen', change: -0.728, category: 'Significant Decline', startRank: 141, endRank: 151 }
  ];

  const distributionData: DistributionData[] = [
    { range: '7.0-8.0', count: 7, percentage: 4.5, label: 'Very Happy' },
    { range: '6.0-7.0', count: 35, percentage: 22.4, label: 'Happy' },
    { range: '5.0-6.0', count: 51, percentage: 32.7, label: 'Moderately Happy' },
    { range: '4.0-5.0', count: 42, percentage: 26.9, label: 'Less Happy' },
    { range: '3.0-4.0', count: 18, percentage: 11.5, label: 'Unhappy' },
    { range: '2.0-3.0', count: 3, percentage: 1.9, label: 'Very Unhappy' }
  ];

  // Custom tooltip component
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(3) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Enhanced Section Header
  const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon }) => (
    <div className="mb-10 text-center">
      <div className="flex items-center justify-center mb-4">
        {Icon && (
          <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
            <Icon className="w-8 h-8 text-blue-700" />
          </div>
        )}
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-3">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Modern Header - SHADCN Style */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  World Happiness Report
                </h1>
                <p className="text-sm text-gray-600">
                  Comprehensive Analysis of Global Well-being (2015-2019)
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-full text-sm text-blue-700">
                <Calendar className="h-4 w-4" />
                <span>2015 - 2019 Dataset</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Prominent Creative Navigation - Large & Centered */}
      <nav className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b border-blue-200 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/95 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Large Centered Navigation */}
          <div className="flex items-center justify-center">
            {/* Main Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 bg-white/80 backdrop-blur p-3 rounded-2xl shadow-lg border border-blue-100">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue' },
                { id: 'trends', label: 'Trends', icon: TrendingUp, color: 'green' },
                { id: 'regions', label: 'Regions', icon: Globe, color: 'purple' },
                { id: 'factors', label: 'Factors', icon: Brain, color: 'amber' },
                { id: 'distribution', label: 'Distribution', icon: PieChartIcon, color: 'rose' },
                { id: 'changes', label: 'Changes', icon: Activity, color: 'orange' },
                { id: 'insights', label: 'Insights', icon: Sparkles, color: 'indigo' }
              ].map((section) => {
                const Icon = section.icon;
                const colorClasses = {
                  blue: activeSection === section.id ? 'bg-blue-500 text-white shadow-blue-200' : 'text-blue-600 hover:bg-blue-50 border-blue-200',
                  green: activeSection === section.id ? 'bg-green-500 text-white shadow-green-200' : 'text-green-600 hover:bg-green-50 border-green-200',
                  purple: activeSection === section.id ? 'bg-purple-500 text-white shadow-purple-200' : 'text-purple-600 hover:bg-purple-50 border-purple-200',
                  amber: activeSection === section.id ? 'bg-amber-500 text-white shadow-amber-200' : 'text-amber-600 hover:bg-amber-50 border-amber-200',
                  rose: activeSection === section.id ? 'bg-rose-500 text-white shadow-rose-200' : 'text-rose-600 hover:bg-rose-50 border-rose-200',
                  orange: activeSection === section.id ? 'bg-orange-500 text-white shadow-orange-200' : 'text-orange-600 hover:bg-orange-50 border-orange-200',
                  indigo: activeSection === section.id ? 'bg-indigo-500 text-white shadow-indigo-200' : 'text-indigo-600 hover:bg-indigo-50 border-indigo-200'
                };
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`inline-flex items-center px-6 py-4 text-base font-semibold rounded-xl transition-all duration-300 whitespace-nowrap border-2 transform hover:scale-105 active:scale-95 ${
                      activeSection === section.id
                        ? `${colorClasses[section.color as keyof typeof colorClasses]} shadow-lg`
                        : `bg-white ${colorClasses[section.color as keyof typeof colorClasses]} hover:shadow-md`
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {section.label}
                  </button>
                );
              })}
            </div>
            
          </div>
        </div>
        
        {/* Mobile Navigation - Vertical Pills */}
        <div className="lg:hidden px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue' },
              { id: 'trends', label: 'Trends', icon: TrendingUp, color: 'green' },
              { id: 'regions', label: 'Regions', icon: Globe, color: 'purple' },
              { id: 'factors', label: 'Factors', icon: Brain, color: 'amber' },
              { id: 'distribution', label: 'Distribution', icon: PieChartIcon, color: 'rose' },
              { id: 'changes', label: 'Changes', icon: Activity, color: 'orange' },
              { id: 'insights', label: 'Insights', icon: Sparkles, color: 'indigo' }
            ].map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <SectionHeader 
              title="Executive Dashboard" 
              subtitle="Key metrics and insights from 5 years of global happiness data"
              icon={Crown}
            />
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="text-xs font-medium">0.6%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">5.41</h3>
                  <p className="text-sm text-gray-600">Global Happiness Index</p>
                  <p className="text-xs text-gray-500 mt-1">2019 Average</p>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">#1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Finland</h3>
                  <p className="text-sm text-gray-600">Happiest Country</p>
                  <p className="text-xs text-gray-500 mt-1">Score: 7.769</p>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 rounded-md bg-amber-100 flex items-center justify-center">
                    <Flag className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex items-center space-x-1 text-amber-600">
                    <Globe className="w-3 h-3" />
                    <span className="text-xs font-medium">98%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">156</h3>
                  <p className="text-sm text-gray-600">Countries Analyzed</p>
                  <p className="text-xs text-gray-500 mt-1">98% world population</p>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 rounded-md bg-red-100 flex items-center justify-center">
                    <Target className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex items-center space-x-1 text-red-600">
                    <ArrowDownRight className="w-3 h-3" />
                    <span className="text-xs font-medium">2.3%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">4.92</h3>
                  <p className="text-sm text-gray-600">Happiness Gap</p>
                  <p className="text-xs text-gray-500 mt-1">Top & bottom difference</p>
                </div>
              </div>
            </div>

                              {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600">79.4%</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Economic Impact</h4>
                <p className="text-sm text-gray-600">GDP per capita shows the strongest correlation with happiness scores</p>
              </div>
              <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-green-100">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-green-600">W. Europe</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Regional Leader</h4>
                <p className="text-sm text-gray-600">Western Europe maintains highest average happiness (6.91) across all years</p>
              </div>
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-purple-600">+1.087</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Biggest Improvement</h4>
                <p className="text-sm text-gray-600">Benin showed the largest happiness increase from 2015 to 2019</p>
              </div>
            </div>

            {/* Happiness Distribution Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Global Happiness Distribution (2019)</h3>
              <div className="mb-6 text-center">
                <p className="text-gray-600">Distribution of 156 countries across happiness score ranges</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={distributionData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary[500]} stopOpacity={0.9}/>
                      <stop offset="95%" stopColor={colors.primary[500]} stopOpacity={0.3}/>
                    </linearGradient>
                    <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                      <path d="M0,4 l4,-4 M-1,1 l2,-2 M3,5 l2,-2" stroke={colors.primary[400]} strokeWidth="0.5" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="label" 
                    tick={{ fontSize: 11 }} 
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    stroke={colors.primary[600]}
                    label={{ value: 'Number of Countries', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke={colors.warning[600]}
                    label={{ value: 'Percentage (%)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar
                    yAxisId="left"
                    dataKey="count"
                    fill="url(#colorGradient)"
                    stroke={colors.primary[600]}
                    strokeWidth={1}
                    name="Number of Countries"
                    radius={[8, 8, 0, 0]}
                  >
                    <LabelList 
                      dataKey="count" 
                      position="top" 
                      style={{ fontSize: '12px', fontWeight: '600', fill: colors.neutral[700] }}
                    />
                  </Bar>
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="percentage"
                    stroke={colors.warning[500]}
                    strokeWidth={3}
                    dot={{ fill: colors.warning[500], r: 6, strokeWidth: 2, stroke: '#fff' }}
                    name="Percentage %"
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {distributionData.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mr-3 flex-shrink-0`} style={{ backgroundColor: colors.chart[index] }}></div>
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">{item.label}</p>
                      <p className="text-gray-600">{item.count} countries ({item.percentage}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Trends Section */}
        {activeSection === 'trends' && (
          <div className="space-y-8">
            <SectionHeader 
              title="Temporal Analysis" 
              subtitle="Evolution of global happiness metrics over time"
              icon={Activity}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Global Trends Chart */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Global Happiness Trends</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={globalTrends}>
                    <defs>
                      <linearGradient id="happinessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary[500]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.primary[500]} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[5.3, 5.45]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="meanHappiness" 
                      stroke={colors.primary[500]} 
                      fillOpacity={1}
                      fill="url(#happinessGradient)"
                      strokeWidth={3}
                      name="Mean Happiness"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Inequality Trends */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Happiness Inequality (Gini Coefficient)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={globalTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0.2, 0.22]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="gini" 
                      stroke={colors.danger[500]} 
                      strokeWidth={3}
                      dot={{ fill: colors.danger[500], r: 6 }}
                      name="Inequality Index"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Countries Performance */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Top 10 Countries Performance (2019)</h3>
              <p className="text-sm text-gray-600 mb-6">Happiness scores of the world's happiest nations</p>
              
              {/* Custom visualization instead of standard bar chart */}
              <div className="space-y-3 max-w-4xl mx-auto">
                {topCountries2019.map((country, index) => (
                  <div key={country.country} className="relative">
                    <div className="flex items-center">
                      {/* Rank badge */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg mr-4 ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                        'bg-gradient-to-br from-blue-400 to-blue-500'
                      }`}>
                        {country.rank}
                      </div>
                      
                      {/* Country info and bar */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-800">{country.country}</h4>
                          <span className="text-lg font-bold text-gray-800">{country.score.toFixed(3)}</span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="relative w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div 
                            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${
                              index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                              index < 3 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                              'bg-gradient-to-r from-blue-300 to-blue-500'
                            }`}
                            style={{ 
                              width: `${(country.score / 8) * 100}%`,
                              transition: 'width 0.8s ease-out'
                            }}
                          >
                            {/* Inner gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                          </div>
                          
                          {/* Score label inside bar */}
                          <div className="absolute inset-0 flex items-center justify-end pr-3">
                            <span className="text-sm font-semibold text-gray-700">{country.score.toFixed(3)}</span>
                          </div>
                        </div>
                        
                        {/* Additional metrics */}
                        <div className="flex items-center mt-2 text-xs text-gray-600 space-x-4">
                          <span>GDP: {country.gdp.toFixed(2)}</span>
                          <span>•</span>
                          <span>Social: {country.social.toFixed(2)}</span>
                          <span>•</span>
                          <span>Health: {country.health.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Animation styles removed - using CSS transitions instead */}
              
              {/* Summary stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-xl font-bold text-gray-800">
                    {(topCountries2019.reduce((sum, c) => sum + c.score, 0) / 10).toFixed(3)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Score Range</p>
                  <p className="text-xl font-bold text-gray-800">
                    {(topCountries2019[0].score - topCountries2019[9].score).toFixed(3)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Nordic Countries</p>
                  <p className="text-xl font-bold text-gray-800">5/10</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Regions Section */}
        {activeSection === 'regions' && (
          <div className="space-y-8">
            <SectionHeader 
              title="Regional Analysis" 
              subtitle="Comparative happiness metrics across world regions"
              icon={Globe}
            />

            {/* Regional Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionalData.slice(0, 6).map((region, index) => (
                <div key={region.region} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800">{region.region}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      region.change > 0 
                        ? 'bg-green-100 text-green-800' 
                        : region.change < 0 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {region.change > 0 ? '+' : ''}{region.change.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">2019 Score</span>
                      <span className="text-lg font-bold text-gray-800">{region.score2019.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Countries</span>
                      <span className="text-sm font-semibold text-gray-700">{region.countries}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg GDP</span>
                      <span className="text-sm font-semibold text-gray-700">{region.avgGDP.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(region.score2019 / 8) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Regional Comparison Radar */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Regional Characteristics Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={[
                  { factor: 'Happiness Score', 'W. Europe': 6.91, 'N. America': 7.15, 'Latin America': 6.02, 'Asia': 5.47 },
                  { factor: 'GDP Level', 'W. Europe': 1.39, 'N. America': 1.35, 'Latin America': 0.96, 'Asia': 0.85 },
                  { factor: 'Social Support', 'W. Europe': 1.45, 'N. America': 1.48, 'Latin America': 1.23, 'Asia': 1.15 },
                  { factor: 'Trust Level', 'W. Europe': 0.37, 'N. America': 0.39, 'Latin America': 0.08, 'Asia': 0.32 },
                  { factor: 'Freedom', 'W. Europe': 0.55, 'N. America': 0.58, 'Latin America': 0.52, 'Asia': 0.48 }
                ]}>
                  <PolarGrid strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 'auto']} />
                  <Radar name="W. Europe" dataKey="W. Europe" stroke={colors.primary[500]} fill={colors.primary[500]} fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="N. America" dataKey="N. America" stroke={colors.success[500]} fill={colors.success[500]} fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="Latin America" dataKey="Latin America" stroke={colors.warning[500]} fill={colors.warning[500]} fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="Asia" dataKey="Asia" stroke={colors.danger[500]} fill={colors.danger[500]} fillOpacity={0.3} strokeWidth={2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Enhanced Factors Section */}
        {activeSection === 'factors' && (
          <div className="space-y-8">
            <SectionHeader 
              title="Happiness Determinants" 
              subtitle="Understanding what drives national happiness levels"
              icon={Brain}
            />

            {/* Factor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {factorCorrelations.map((factor, index) => {
                const Icon = factor.icon;
                
                // Determine colors based on index
                const getColorClasses = (index: number) => {
                  if (index < 3) {
                    return {
                      background: 'bg-gradient-to-br from-green-50 to-green-100',
                      icon: 'text-green-600'
                    };
                  } else if (index < 5) {
                    return {
                      background: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
                      icon: 'text-yellow-600'
                    };
                  } else {
                    return {
                      background: 'bg-gradient-to-br from-red-50 to-red-100',
                      icon: 'text-red-600'
                    };
                  }
                };
                
                const colorClasses = getColorClasses(index);
                
                return (
                  <div key={factor.factor} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${colorClasses.background}`}>
                        <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">{(factor.correlation * 100).toFixed(0)}%</p>
                        <p className="text-xs text-gray-500">correlation</p>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{factor.factor}</h4>
                    <p className="text-sm text-gray-600 mb-4">{factor.description}</p>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            Impact Level
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {factor.importance}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                        <div 
                          style={{ width: `${factor.importance}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-400 to-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Factor Scatter Plot */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">GDP vs Happiness Score (2019)</h3>
              <ResponsiveContainer width="100%" height={500}>
                <ScatterChart margin={{ top: 40, right: 40, bottom: 60, left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="gdp" 
                    name="GDP per Capita" 
                    domain={[1.25, 1.55]}
                    label={{ value: 'GDP per Capita', position: 'insideBottom', offset: -10, style: { fontSize: 14 } }}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.toFixed(2)}
                  />
                  <YAxis 
                    dataKey="score" 
                    name="Happiness Score" 
                    domain={[7.1, 7.85]}
                    label={{ value: 'Happiness Score', angle: -90, position: 'insideLeft', style: { fontSize: 14 } }}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                            <p className="font-semibold text-gray-800">{data.country}</p>
                            <p className="text-sm text-gray-600">GDP: {data.gdp.toFixed(3)}</p>
                            <p className="text-sm text-gray-600">Happiness: {data.score.toFixed(3)}</p>
                            <p className="text-sm text-gray-600">Rank: #{data.rank}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    name="Countries" 
                    data={topCountries2019}
                    shape={(props: ScatterShapeProps) => {
                      const { cx, cy, payload } = props;
                      const rankColors: RankColors = {
                        1: '#FFD700', // Gold
                        2: '#C0C0C0', // Silver
                        3: '#CD7F32', // Bronze
                      };
                      const fillColor = (payload && rankColors[payload.rank]) || '#3B82F6';
                      return (
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={8} 
                          fill={fillColor}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      );
                    }}
                  />
                  <defs>
                    <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  {/* Add trend line */}
                  <line 
                    x1="10%" 
                    y1="85%" 
                    x2="90%" 
                    y2="15%" 
                    stroke="url(#trendLine)" 
                    strokeWidth={2}
                    strokeDasharray="5,5"
                  />
                </ScatterChart>
              </ResponsiveContainer>
              
              {/* Country labels as a separate legend */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Country Rankings</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {topCountries2019.map((country, index) => (
                    <div key={country.country} className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                        style={{ 
                          backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : colors.chart[index % colors.chart.length] 
                        }}
                      />
                      <span className="text-sm">
                        <span className="font-medium">{country.rank}.</span> {country.country}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>The scatter plot shows a positive correlation between GDP per capita and happiness scores</p>
                <p className="font-semibold mt-1">R² = 0.631 | Correlation = 0.794</p>
              </div>
            </div>
          </div>
        )}

        {/* Distribution Section */}
        {activeSection === 'distribution' && (
          <div className="space-y-8">
            <SectionHeader 
              title="Happiness Distribution Analysis" 
              subtitle="Understanding the global spread of well-being across 156 nations"
              icon={PieChartIcon}
            />

            {/* Key Distribution Insights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100">
                <div className="flex items-center justify-between mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span className="text-2xl font-bold text-indigo-700">4.5%</span>
                </div>
                <p className="text-sm font-semibold text-gray-800">Very Happy Nations</p>
                <p className="text-xs text-gray-600 mt-1">Score above 7.0</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">55.1%</span>
                </div>
                <p className="text-sm font-semibold text-gray-800">Above Average</p>
                <p className="text-xs text-gray-600 mt-1">Score above 5.0</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-100">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-amber-600" />
                  <span className="text-2xl font-bold text-amber-700">5.407</span>
                </div>
                <p className="text-sm font-semibold text-gray-800">Median Score</p>
                <p className="text-xs text-gray-600 mt-1">Global midpoint</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-100">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-2xl font-bold text-red-700">13.4%</span>
                </div>
                <p className="text-sm font-semibold text-gray-800">Critical Need</p>
                <p className="text-xs text-gray-600 mt-1">Score below 4.0</p>
              </div>
            </div>

            {/* Main Distribution Visualization */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Distribution Overview</h3>
                  <p className="text-sm text-gray-600 mt-1">Countries grouped by happiness score ranges</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Data sourced from World Happiness Report
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Interactive Bar Chart */}
                <div>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart 
                      data={distributionData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <defs>
                        <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#DC2626" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#DC2626" stopOpacity={0.6}/>
                        </linearGradient>
                        <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EA580C" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#EA580C" stopOpacity={0.6}/>
                        </linearGradient>
                        <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D97706" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#D97706" stopOpacity={0.6}/>
                        </linearGradient>
                        <linearGradient id="barGradient4" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#CA8A04" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#CA8A04" stopOpacity={0.6}/>
                        </linearGradient>
                        <linearGradient id="barGradient5" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#16A34A" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#16A34A" stopOpacity={0.6}/>
                        </linearGradient>
                        <linearGradient id="barGradient6" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.6}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                      <XAxis 
                        dataKey="label" 
                        tick={{ fontSize: 11 }} 
                        angle={-20}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        label={{ value: 'Number of Countries', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                <p className="font-semibold text-gray-800">{data.label}</p>
                                <p className="text-sm text-gray-600">Countries: {data.count}</p>
                                <p className="text-sm text-gray-600">Percentage: {data.percentage}%</p>
                                <p className="text-sm text-gray-600">Score Range: {data.range}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`url(#barGradient${index + 1})`} />
                        ))}
                        <LabelList 
                          dataKey="count" 
                          position="top" 
                          style={{ fontSize: '12px', fontWeight: '600', fill: '#374151' }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Modern Donut Chart */}
                <div>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <defs>
                        {distributionData.map((entry, index) => (
                          <linearGradient key={`gradient-${index}`} id={`pieGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={colors.chart[index]} stopOpacity={0.9}/>
                            <stop offset="100%" stopColor={colors.chart[index]} stopOpacity={0.6}/>
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percentage }) => `${percentage}%`}
                        outerRadius={140}
                        innerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`url(#pieGradient${index})`} />
                        ))}
                      </Pie>
                      <Tooltip />
                      {/* Center text */}
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-800">
                        156
                      </text>
                      <text x="50%" y="50%" dy={25} textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-600">
                        Countries
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Distribution Details Cards */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {distributionData.map((item, index) => {
                  const gradients = [
                    'from-red-500 to-red-600',
                    'from-orange-500 to-orange-600',
                    'from-amber-500 to-amber-600',
                    'from-yellow-500 to-yellow-600',
                    'from-green-500 to-green-600',
                    'from-blue-500 to-blue-600'
                  ];
                  
                  return (
                    <div key={index} className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r rounded-t-xl" 
                           style={{ background: `linear-gradient(to right, ${colors.chart[index]}, ${colors.chart[index]}dd)` }}></div>
                      
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{item.label}</h4>
                          <p className="text-sm text-gray-600">Score: {item.range}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-white font-bold shadow-lg`}>
                          {item.count}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Percentage</span>
                          <span className="text-sm font-semibold">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${item.percentage}%`,
                              background: `linear-gradient(to right, ${colors.chart[index]}, ${colors.chart[index]}dd)`
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          {index === 0 ? 'Urgent intervention needed' :
                           index === 1 ? 'Significant challenges' :
                           index === 2 ? 'Below global average' :
                           index === 3 ? 'Room for improvement' :
                           index === 4 ? 'Performing well' :
                           'Leading in happiness'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Statistical Insights */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Statistical Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Standard Deviation</p>
                  <p className="text-2xl font-bold text-gray-800">1.113</p>
                  <p className="text-xs text-gray-500 mt-1">Moderate spread</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Skewness</p>
                  <p className="text-2xl font-bold text-gray-800">-0.247</p>
                  <p className="text-xs text-gray-500 mt-1">Slightly left-skewed</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Kurtosis</p>
                  <p className="text-2xl font-bold text-gray-800">2.893</p>
                  <p className="text-xs text-gray-500 mt-1">Near normal distribution</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Interquartile Range</p>
                  <p className="text-2xl font-bold text-gray-800">1.487</p>
                  <p className="text-xs text-gray-500 mt-1">Q3 - Q1 spread</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Key Finding:</strong> The distribution shows a slight negative skew, indicating more countries 
                  cluster above the mean (5.407) than below it. This suggests that while extreme unhappiness is rare, 
                  achieving very high happiness scores remains challenging for most nations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Changes Section */}
        {activeSection === 'changes' && (
          <div className="space-y-8">
            <SectionHeader 
              title="Dynamic Changes Analysis" 
              subtitle="Countries with significant happiness score movements (2015-2019)"
              icon={Activity}
            />

            {/* Progress Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Improvers */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-3" />
                  Greatest Improvements
                </h3>
                <div className="space-y-4">
                  {countryProgressData.filter(c => c.change > 0).slice(0, 5).map((country, index) => (
                    <div key={country.country} className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{country.country}</h4>
                        <span className="text-2xl font-bold text-green-600">
                          +{country.change.toFixed(3)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>Rank: {country.startRank}</span>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="font-semibold">{country.endRank}</span>
                        <span className="ml-auto text-green-600 font-semibold">
                          ↑ {country.startRank - country.endRank} positions
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biggest Declines */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
                  <TrendingDown className="w-8 h-8 mr-3" />
                  Significant Declines
                </h3>
                <div className="space-y-4">
                  {countryProgressData.filter(c => c.change < 0).slice(0, 5).map((country, index) => (
                    <div key={country.country} className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{country.country}</h4>
                        <span className="text-2xl font-bold text-red-600">
                          {country.change.toFixed(3)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>Rank: {country.startRank}</span>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="font-semibold">{country.endRank}</span>
                        <span className="ml-auto text-red-600 font-semibold">
                          ↓ {country.endRank - country.startRank} positions
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Change Categories */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Change Distribution by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { category: 'Exceptional Growth', count: 1, color: colors.success[600] },
                  { category: 'Strong Growth', count: 2, color: colors.success[500] },
                  { category: 'Moderate Growth', count: 2, color: colors.success[400] },
                  { category: 'Stable', count: 120, color: colors.neutral[400] },
                  { category: 'Moderate Decline', count: 18, color: colors.danger[400] },
                  { category: 'Significant Decline', count: 10, color: colors.danger[500] },
                  { category: 'Severe Decline', count: 3, color: colors.danger[600] }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                      <Cell key={`cell-${index}`} fill={index < 3 ? colors.success[500] : index === 3 ? colors.neutral[400] : colors.danger[500]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Enhanced Insights Section */}
        {activeSection === 'insights' && (
          <div className="space-y-8">
            <SectionHeader 
              title="Strategic Insights & Recommendations" 
              subtitle="Evidence-based findings for policy makers and researchers"
              icon={Sparkles}
            />

            {/* Key Findings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <Globe className="w-8 h-8 text-blue-700 mr-3" />
                  <h3 className="text-xl font-bold text-blue-900">Global Stability Pattern</h3>
                </div>
                <p className="text-blue-800 mb-4">
                  Despite regional variations and individual country changes, global average happiness 
                  remained remarkably stable at 5.38±0.02 over the 5-year period.
                </p>
                <div className="bg-blue-200 bg-opacity-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-900">Implication:</p>
                  <p className="text-sm text-blue-800">
                    Happiness is a stable metric that requires sustained, long-term interventions 
                    rather than short-term policy changes.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="w-8 h-8 text-green-700 mr-3" />
                  <h3 className="text-xl font-bold text-green-900">Economic Foundation</h3>
                </div>
                <p className="text-green-800 mb-4">
                  GDP per capita shows the strongest correlation (r=0.794) with happiness, 
                  but diminishing returns appear after $15,000 per capita.
                </p>
                <div className="bg-green-200 bg-opacity-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-900">Implication:</p>
                  <p className="text-sm text-green-800">
                    Economic development is crucial but not sufficient. Countries should focus 
                    on inclusive growth and social factors after basic needs are met.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg border border-purple-200">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-purple-700 mr-3" />
                  <h3 className="text-xl font-bold text-purple-900">Social Capital Matters</h3>
                </div>
                <p className="text-purple-800 mb-4">
                  Social support (r=0.777) and healthy life expectancy (r=0.780) are nearly 
                  as important as GDP, highlighting the multidimensional nature of happiness.
                </p>
                <div className="bg-purple-200 bg-opacity-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-purple-900">Implication:</p>
                  <p className="text-sm text-purple-800">
                    Policies should balance economic growth with investments in healthcare, 
                    community building, and social safety nets.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 shadow-lg border border-amber-200">
                <div className="flex items-center mb-4">
                  <Crown className="w-8 h-8 text-amber-700 mr-3" />
                  <h3 className="text-xl font-bold text-amber-900">Nordic Model Success</h3>
                </div>
                <p className="text-amber-800 mb-4">
                  Nordic countries consistently dominate top rankings through a combination 
                  of high GDP, strong social support, low corruption, and personal freedom.
                </p>
                <div className="bg-amber-200 bg-opacity-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-amber-900">Implication:</p>
                  <p className="text-sm text-amber-800">
                    The Nordic model provides a replicable framework combining market economy 
                    with comprehensive welfare systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Evidence-Based Policy Framework</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-gray-800 flex items-center">
                    <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                    Immediate Actions
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Strengthen Social Safety Nets</h5>
                        <p className="text-sm text-gray-600">Implement unemployment insurance, healthcare access, and pension systems to provide security.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Combat Corruption</h5>
                        <p className="text-sm text-gray-600">Establish transparent governance systems and independent oversight bodies.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Invest in Mental Health</h5>
                        <p className="text-sm text-gray-600">Expand access to mental health services and reduce stigma through public campaigns.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-gray-800 flex items-center">
                    <Target className="w-6 h-6 text-green-500 mr-2" />
                    Long-term Strategies
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">A</div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Build Social Capital</h5>
                        <p className="text-sm text-gray-600">Foster community connections through public spaces, civic engagement, and social programs.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">B</div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Sustainable Economic Growth</h5>
                        <p className="text-sm text-gray-600">Focus on inclusive growth that reduces inequality and provides opportunities for all.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">C</div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Measure Beyond GDP</h5>
                        <p className="text-sm text-gray-600">Adopt well-being indicators in policy making and track progress holistically.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-red-200">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Critical Considerations</h4>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• Countries experiencing conflict or economic crisis show rapid happiness declines</li>
                    <li>• Cultural factors may influence happiness reporting and should be considered</li>
                    <li>• Policy changes require 3-5 years to show measurable impact on happiness scores</li>
                    <li>• One-size-fits-all approaches fail; context-specific solutions are essential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">About This Report</h4>
              <p className="text-sm text-gray-300">
                Comprehensive analysis of World Happiness Report data (2015-2019), 
                examining trends, factors, and policy implications for global well-being.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Data Sources</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• World Happiness Report (2015-2019)</li>
                <li>• Gallup World Poll</li>
                <li>• UN Sustainable Development Solutions Network</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Methodology</h4>
              <p className="text-sm text-gray-300">
                Analysis includes correlation studies, temporal trends, regional comparisons, 
                and factor analysis using statistical methods and data visualization.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              ©World Happiness Analysis Dashboard | Prepared by Lloyd dela Cruz 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HappinessAnalysisDashboard;