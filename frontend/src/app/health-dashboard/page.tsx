'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
// import { WorldMap } from '@/components/dashboard/WorldMap'
// import { LifeExpectancyChart } from '@/components/dashboard/LifeExpectancyChart'
// import { HealthMetricsChart } from '@/components/dashboard/HealthMetricsChart'
// import { WellnessDistribution } from '@/components/dashboard/WellnessDistribution'
// import { GenderHealthComparison } from '@/components/dashboard/GenderHealthComparison'
// import { AgeGroupAnalysis } from '@/components/dashboard/AgeGroupAnalysis'
import { realHealthData as healthData, realCountries as countries, availableYears, developmentStatus } from '@/lib/health-data-real'
import { ArrowLeft, Download, Shuffle, Info, TrendingUp, Globe, BarChart3, Heart, Calendar, AlertCircle, Zap, ExternalLink, Filter, X, Search, MapPin, Activity, Target, Play, Shield, Brain, Users } from 'lucide-react'
import Link from 'next/link'

// Statistical insights for enhanced UX
const getDatasetInsights = (data: any[]) => {
  if (data.length === 0) return null
  
  const avgLifeExpectancy = data.reduce((acc, d) => acc + d.lifeExpectancy, 0) / data.length
  const countries = new Set(data.map(d => d.country))
  const developedCount = data.filter(d => d.status === 'Developed').length
  const developingCount = data.filter(d => d.status === 'Developing').length
  
  return {
    avgLifeExpectancy: Math.round(avgLifeExpectancy),
    totalCountries: countries.size,
    developedCount,
    developingCount,
    dataPoints: data.length
  }
}

export default function HealthDashboard() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('2015') // Default to most recent year
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [animationKey, setAnimationKey] = useState(0)
  const [showDatasetInfo, setShowDatasetInfo] = useState(false)

  const filteredData = useMemo(() => {
    return healthData.filter(item => {
      return (selectedCountry === 'all' || item.country === selectedCountry) &&
             (selectedYear === 'all' || item.year.toString() === selectedYear) &&
             (selectedStatus === 'all' || item.status === selectedStatus)
    })
  }, [selectedCountry, selectedYear, selectedStatus])

  const handleRandomize = () => {
    // Sometimes select "all" to show variety
    const randomCountry = Math.random() > 0.3 ? countries[Math.floor(Math.random() * countries.length)] : 'all'
    const randomYear = Math.random() > 0.3 ? availableYears[Math.floor(Math.random() * availableYears.length)].toString() : 'all'
    const randomStatus = Math.random() > 0.3 ? developmentStatus[Math.floor(Math.random() * developmentStatus.length)] : 'all'
    
    setSelectedCountry(randomCountry)
    setSelectedYear(randomYear)
    setSelectedStatus(randomStatus)
    setAnimationKey(prev => prev + 1)
  }

  const clearFilters = () => {
    setSelectedCountry('all')
    setSelectedYear('2015')
    setSelectedStatus('all')
    setAnimationKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-start gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Portfolio
                </Button>
              </Link>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      Global Health Intelligence
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                      WHO Life Expectancy Analytics • Master's Research Dashboard
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Live Data</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span>{countries.length} Countries</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>2013-2015</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowDatasetInfo(!showDatasetInfo)} 
                variant={showDatasetInfo ? "default" : "outline"}
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
              >
                <Info className="h-4 w-4 mr-2" />
                About Dataset
              </Button>
              <Button 
                onClick={handleRandomize} 
                variant="outline" 
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Explore
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Modern Key Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{countries.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Countries Analyzed</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                    <Heart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">WHO Data</span>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(healthData.reduce((acc, item) => acc + item.lifeExpectancy, 0) / healthData.length || 0)}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Avg Life Expectancy</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/50">
                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-xs text-slate-500">{Math.round((new Set(healthData.filter(d => d.status === 'Developed').map(d => d.country)).size / countries.length) * 100)}% Dev</div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(healthData.reduce((acc, item) => acc + item.wellnessScore, 0) / healthData.length || 0)}%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Global Wellness</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50">
                    <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full font-medium">{availableYears.length}Y</span>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{healthData.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Health Records</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dataset Information Panel */}
        {showDatasetInfo && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900">
                    <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">WHO Life Expectancy Dataset</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      Kaggle • World Health Organization • Academic Research Project
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowDatasetInfo(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Dataset Scope
                  </h4>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Countries:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{countries.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Period:</span>
                      <span className="font-medium text-slate-900 dark:text-white">2013-2015</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Indicators:</span>
                      <span className="font-medium text-slate-900 dark:text-white">22</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Academic Context
                  </h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <p>• Master's degree coursework</p>
                    <p>• Statistical analysis & modeling</p>
                    <p>• Data visualization research</p>
                    <p>• Public health informatics</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Key Variables
                  </h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <p>• Life Expectancy</p>
                    <p>• Mortality Rates</p>
                    <p>• Healthcare Spending</p>
                    <p>• Economic Indicators</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Modern Filter Interface */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-md">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Filter className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <CardTitle className="text-slate-900 dark:text-white">Explore Data</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Filter {healthData.length.toLocaleString()} health records across {countries.length} countries
                  </CardDescription>
                </div>
              </div>
              {filteredData.length !== healthData.length && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {filteredData.length} results
                  </Badge>
                  <div className="text-xs text-slate-500">
                    {((filteredData.length / healthData.length) * 100).toFixed(1)}% of data
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  Country Focus
                </label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="h-11 bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-medium">
                      🌍 All Countries ({countries.length})
                    </SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  Time Period
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="h-11 bg-white/50 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-medium">
                      📅 All Years (2013-2015)
                    </SelectItem>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  Development Level
                </label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="h-11 bg-white/50 border-slate-200 focus:border-purple-400 focus:ring-purple-400">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-medium">
                      🌐 All Development Levels
                    </SelectItem>
                    {developmentStatus.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'Developed' ? '🏙️ Developed' : '🌱 Developing'} Countries
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Active Filters & Reset */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-2">
                {selectedCountry !== 'all' && (
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-50 text-blue-700 border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors" 
                    onClick={() => setSelectedCountry('all')}
                  >
                    🌍 {selectedCountry}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {selectedYear !== 'all' && (
                  <Badge 
                    variant="secondary" 
                    className="bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors" 
                    onClick={() => setSelectedYear('all')}
                  >
                    📅 {selectedYear}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {selectedStatus !== 'all' && (
                  <Badge 
                    variant="secondary" 
                    className="bg-purple-50 text-purple-700 border border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors" 
                    onClick={() => setSelectedStatus('all')}
                  >
                    {selectedStatus === 'Developed' ? '🏙️' : '🌱'} {selectedStatus}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
              </div>
              
              {(selectedCountry !== 'all' || selectedYear !== 'all' || selectedStatus !== 'all') && (
                <Button 
                  onClick={clearFilters} 
                  variant="outline" 
                  size="sm"
                  className="text-slate-600 hover:text-slate-900"
                >
                  🔄 Reset All
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interactive World Map */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900">
                  <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-white">Global Health Landscape</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Interactive world map • Click countries to explore data
                  </CardDescription>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  {new Set(filteredData.map(d => d.country)).size} countries
                </div>
                <div className="text-xs text-slate-500">
                  {filteredData.length} health records
                </div>
                {selectedCountry !== 'all' && (
                  <Badge className="bg-blue-100 text-blue-700 text-xs">
                    {selectedCountry} selected
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600">Interactive World Map Component</p>
                <p className="text-sm text-gray-500">Click countries to filter data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <div className="space-y-6">
          {/* Primary Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Life Expectancy Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <p className="text-gray-600">Life Expectancy Chart Component</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <p className="text-gray-600">Health Metrics Chart Component</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Secondary Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Wellness Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <p className="text-gray-600">Wellness Distribution Component</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gender Health Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-yellow-50 to-green-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <p className="text-gray-600">Gender Health Comparison Component</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Comprehensive Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Age Group Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Age Group Analysis Component</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Summary */}
        <Card className="mt-8 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                  <BarChart3 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-white">Analysis Summary</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    {filteredData.length > 0 
                      ? `Current view: ${((filteredData.length / healthData.length) * 100).toFixed(1)}% of dataset` 
                      : 'No data matches current filters'}
                  </CardDescription>
                </div>
              </div>
              {filteredData.length > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {((filteredData.length / healthData.length) * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-slate-500">of total data</div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {filteredData.length.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Health Records</div>
                  <div className="text-xs text-slate-500 mt-1">Data points analyzed</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {Math.round(filteredData.reduce((acc, item) => acc + item.lifeExpectancy, 0) / filteredData.length || 0)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Years</div>
                  <div className="text-xs text-slate-500 mt-1">Average life expectancy</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {Math.round(filteredData.reduce((acc, item) => acc + item.wellnessScore, 0) / filteredData.length || 0)}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Wellness Index</div>
                  <div className="text-xs text-slate-500 mt-1">Computed health score</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {new Set(filteredData.map(item => item.country)).size}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Countries</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Set(filteredData.filter(d => d.status === 'Developed').map(d => d.country)).size} developed, {new Set(filteredData.filter(d => d.status === 'Developing').map(d => d.country)).size} developing
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Data Found</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  The current filter combination doesn't match any records. Try adjusting your filters or clearing them to explore the dataset.
                </p>
                <Button onClick={clearFilters} className="mt-4" variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              WHO Life Expectancy Dataset • Kaggle Research Data • Master's Thesis Project
            </p>
            <p className="text-xs text-slate-500">
              Built with Next.js, TypeScript, Tailwind CSS & Recharts • © {new Date().getFullYear()} Lloyd Dela Cruz
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}