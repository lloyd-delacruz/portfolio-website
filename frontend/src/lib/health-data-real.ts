export type RealHealthData = {
  id: string
  country: string
  year: number
  status: 'Developed' | 'Developing'
  lifeExpectancy: number
  adultMortality: number
  infantDeaths: number
  alcohol: number
  percentageExpenditure: number
  hepatitisB: number
  measles: number
  bmi: number
  underFiveDeaths: number
  polio: number
  totalExpenditure: number
  diphtheria: number
  hivAids: number
  gdp: number
  population: number
  thinness1_19: number
  thinness5_9: number
  incomeComposition: number
  schooling: number
  // Additional computed fields for dashboard compatibility
  wellnessScore: number
  healthcareAccess: number
  mentalHealthScore: number
  physicalActivityLevel: number
  nutritionScore: number
  socialSupportScore: number
  economicStability: number
  diseasePrevalence: number
  vaccinationRate: number
}

// Processed data from the Life Expectancy CSV
const rawCSVData = [
  {country: "Afghanistan", year: 2015, status: "Developing", lifeExpectancy: 65.0, adultMortality: 263, infantDeaths: 62, alcohol: 0.01, percentageExpenditure: 71.279624, hepatitisB: 65, measles: 1154, bmi: 19.1, underFiveDeaths: 83, polio: 6, totalExpenditure: 8.16, diphtheria: 65, hivAids: 0.1, gdp: 584.259210, population: 33736494, thinness1_19: 17.2, thinness5_9: 17.3, incomeComposition: 0.479, schooling: 10.1},
  {country: "Afghanistan", year: 2014, status: "Developing", lifeExpectancy: 59.9, adultMortality: 271, infantDeaths: 64, alcohol: 0.01, percentageExpenditure: 73.523582, hepatitisB: 62, measles: 492, bmi: 18.6, underFiveDeaths: 86, polio: 58, totalExpenditure: 8.18, diphtheria: 62, hivAids: 0.1, gdp: 612.696514, population: 327582, thinness1_19: 17.5, thinness5_9: 17.5, incomeComposition: 0.476, schooling: 10.0},
  {country: "Afghanistan", year: 2013, status: "Developing", lifeExpectancy: 59.9, adultMortality: 268, infantDeaths: 66, alcohol: 0.01, percentageExpenditure: 73.219243, hepatitisB: 64, measles: 430, bmi: 18.1, underFiveDeaths: 89, polio: 62, totalExpenditure: 8.13, diphtheria: 64, hivAids: 0.1, gdp: 631.744976, population: 31731688, thinness1_19: 17.7, thinness5_9: 17.7, incomeComposition: 0.470, schooling: 9.9},
  {country: "Albania", year: 2015, status: "Developing", lifeExpectancy: 77.8, adultMortality: 74, infantDeaths: 0, alcohol: 4.60, percentageExpenditure: 364.975229, hepatitisB: 99, measles: 0, bmi: 58.0, underFiveDeaths: 0, polio: 99, totalExpenditure: 6.0, diphtheria: 99, hivAids: 0.1, gdp: 3954.227830, population: 28873, thinness1_19: 1.2, thinness5_9: 1.3, incomeComposition: 0.762, schooling: 14.2},
  {country: "Albania", year: 2014, status: "Developing", lifeExpectancy: 77.5, adultMortality: 8, infantDeaths: 0, alcohol: 4.51, percentageExpenditure: 428.749067, hepatitisB: 98, measles: 0, bmi: 57.2, underFiveDeaths: 1, polio: 98, totalExpenditure: 5.88, diphtheria: 98, hivAids: 0.1, gdp: 4575.763787, population: 288914, thinness1_19: 1.2, thinness5_9: 1.3, incomeComposition: 0.761, schooling: 14.2},
  {country: "Algeria", year: 2015, status: "Developing", lifeExpectancy: 75.6, adultMortality: 19, infantDeaths: 21, alcohol: 0.01, percentageExpenditure: 0, hepatitisB: 95, measles: 63, bmi: 59.5, underFiveDeaths: 24, polio: 95, totalExpenditure: 7.32, diphtheria: 95, hivAids: 0.1, gdp: 4132.762920, population: 39871528, thinness1_19: 6.0, thinness5_9: 5.8, incomeComposition: 0.743, schooling: 14.4},
  {country: "Australia", year: 2015, status: "Developed", lifeExpectancy: 82.8, adultMortality: 67, infantDeaths: 1, alcohol: 9.80, percentageExpenditure: 4681.394198, hepatitisB: 93, measles: 2, bmi: 67.9, underFiveDeaths: 1, polio: 93, totalExpenditure: 9.4, diphtheria: 93, hivAids: 0.1, gdp: 56554.387900, population: 23789338, thinness1_19: 1.3, thinness5_9: 1.2, incomeComposition: 0.944, schooling: 20.6},
  {country: "Austria", year: 2015, status: "Developed", lifeExpectancy: 81.5, adultMortality: 68, infantDeaths: 0, alcohol: 12.40, percentageExpenditure: 4896.318320, hepatitisB: 83, measles: 1, bmi: 64.8, underFiveDeaths: 0, polio: 83, totalExpenditure: 7.6, diphtheria: 83, hivAids: 0.1, gdp: 43724.031000, population: 8633169, thinness1_19: 1.5, thinness5_9: 1.4, incomeComposition: 0.885, schooling: 15.9},
  {country: "Belgium", year: 2015, status: "Developed", lifeExpectancy: 81.4, adultMortality: 76, infantDeaths: 0, alcohol: 12.60, percentageExpenditure: 4522.363743, hepatitisB: 95, measles: 2, bmi: 66.8, underFiveDeaths: 0, polio: 95, totalExpenditure: 10.6, diphtheria: 95, hivAids: 0.2, gdp: 40918.510000, population: 11274196, thinness1_19: 1.4, thinness5_9: 1.3, incomeComposition: 0.896, schooling: 16.5},
  {country: "Brazil", year: 2015, status: "Developing", lifeExpectancy: 74.7, adultMortality: 170, infantDeaths: 37, alcohol: 7.20, percentageExpenditure: 947.654351, hepatitisB: 89, measles: 214, bmi: 56.9, underFiveDeaths: 43, polio: 89, totalExpenditure: 3.9, diphtheria: 89, hivAids: 0.5, gdp: 8814.954980, population: 207738724, thinness1_19: 2.8, thinness5_9: 2.9, incomeComposition: 0.754, schooling: 15.4},
  {country: "Canada", year: 2015, status: "Developed", lifeExpectancy: 82.2, adultMortality: 72, infantDeaths: 0, alcohol: 10.20, percentageExpenditure: 4755.160000, hepatitisB: 84, measles: 3, bmi: 65.7, underFiveDeaths: 0, polio: 84, totalExpenditure: 10.4, diphtheria: 84, hivAids: 0.3, gdp: 43441.445000, population: 35939927, thinness1_19: 1.3, thinness5_9: 1.2, incomeComposition: 0.913, schooling: 15.3},
  {country: "China", year: 2015, status: "Developing", lifeExpectancy: 76.1, adultMortality: 85, infantDeaths: 9, alcohol: 7.20, percentageExpenditure: 426.241860, hepatitisB: 99, measles: 52, bmi: 42.7, underFiveDeaths: 11, polio: 99, totalExpenditure: 5.95, diphtheria: 99, hivAids: 0.1, gdp: 8069.216000, population: 1370462561, thinness1_19: 4.5, thinness5_9: 4.4, incomeComposition: 0.738, schooling: 13.1},
  {country: "Denmark", year: 2015, status: "Developed", lifeExpectancy: 80.7, adultMortality: 81, infantDeaths: 0, alcohol: 10.50, percentageExpenditure: 5497.195240, hepatitisB: 96, measles: 0, bmi: 65.4, underFiveDeaths: 0, polio: 96, totalExpenditure: 10.5, diphtheria: 96, hivAids: 0.1, gdp: 53017.910000, population: 5659715, thinness1_19: 1.9, thinness5_9: 1.8, incomeComposition: 0.923, schooling: 18.7},
  {country: "Finland", year: 2015, status: "Developed", lifeExpectancy: 81.1, adultMortality: 69, infantDeaths: 0, alcohol: 10.10, percentageExpenditure: 4332.890000, hepatitisB: 82, measles: 3, bmi: 65.4, underFiveDeaths: 0, polio: 82, totalExpenditure: 9.7, diphtheria: 82, hivAids: 0.1, gdp: 42159.500000, population: 5503457, thinness1_19: 1.8, thinness5_9: 1.7, incomeComposition: 0.879, schooling: 17.8},
  {country: "France", year: 2015, status: "Developed", lifeExpectancy: 82.4, adultMortality: 73, infantDeaths: 0, alcohol: 11.80, percentageExpenditure: 4959.114954, hepatitisB: 90, measles: 364, bmi: 63.4, underFiveDeaths: 0, polio: 90, totalExpenditure: 11.7, diphtheria: 90, hivAids: 0.4, gdp: 36248.995300, population: 64395345, thinness1_19: 1.6, thinness5_9: 1.5, incomeComposition: 0.897, schooling: 15.6},
  {country: "Germany", year: 2015, status: "Developed", lifeExpectancy: 80.6, adultMortality: 78, infantDeaths: 0, alcohol: 11.30, percentageExpenditure: 5551.251378, hepatitisB: 97, measles: 442, bmi: 66.5, underFiveDeaths: 0, polio: 97, totalExpenditure: 11.0, diphtheria: 97, hivAids: 0.2, gdp: 41267.423200, population: 80688545, thinness1_19: 1.4, thinness5_9: 1.3, incomeComposition: 0.916, schooling: 16.9},
  {country: "India", year: 2015, status: "Developing", lifeExpectancy: 68.3, adultMortality: 164, infantDeaths: 44, alcohol: 4.30, percentageExpenditure: 267.418180, hepatitisB: 89, measles: 56, bmi: 19.1, underFiveDeaths: 49, polio: 87, totalExpenditure: 4.69, diphtheria: 87, hivAids: 0.1, gdp: 1581.507245, population: 1311556874, thinness1_19: 43.5, thinness5_9: 45.1, incomeComposition: 0.624, schooling: 11.7},
  {country: "Italy", year: 2015, status: "Developed", lifeExpectancy: 82.7, adultMortality: 69, infantDeaths: 0, alcohol: 7.50, percentageExpenditure: 3259.813000, hepatitisB: 96, measles: 1, bmi: 64.8, underFiveDeaths: 0, polio: 96, totalExpenditure: 9.2, diphtheria: 96, hivAids: 0.4, gdp: 29866.581400, population: 59504499, thinness1_19: 1.7, thinness5_9: 1.6, incomeComposition: 0.873, schooling: 16.3},
  {country: "Japan", year: 2015, status: "Developed", lifeExpectancy: 83.7, adultMortality: 67, infantDeaths: 0, alcohol: 7.20, percentageExpenditure: 4150.124481, hepatitisB: 97, measles: 35, bmi: 22.9, underFiveDeaths: 0, polio: 97, totalExpenditure: 10.9, diphtheria: 97, hivAids: 0.1, gdp: 34524.413700, population: 126573481, thinness1_19: 3.7, thinness5_9: 3.2, incomeComposition: 0.891, schooling: 15.3},
  {country: "Norway", year: 2015, status: "Developed", lifeExpectancy: 81.8, adultMortality: 65, infantDeaths: 0, alcohol: 7.70, percentageExpenditure: 9715.938618, hepatitisB: 93, measles: 5, bmi: 65.2, underFiveDeaths: 0, polio: 93, totalExpenditure: 9.3, diphtheria: 93, hivAids: 0.1, gdp: 74356.452400, population: 5188607, thinness1_19: 1.9, thinness5_9: 1.8, incomeComposition: 0.944, schooling: 17.6},
  {country: "Sweden", year: 2015, status: "Developed", lifeExpectancy: 82.4, adultMortality: 66, infantDeaths: 0, alcohol: 7.20, percentageExpenditure: 5488.519500, hepatitisB: 97, measles: 3, bmi: 64.6, underFiveDeaths: 0, polio: 97, totalExpenditure: 9.2, diphtheria: 97, hivAids: 0.1, gdp: 51165.185000, population: 9779426, thinness1_19: 2.0, thinness5_9: 1.9, incomeComposition: 0.907, schooling: 15.8},
  {country: "Switzerland", year: 2015, status: "Developed", lifeExpectancy: 83.4, adultMortality: 67, infantDeaths: 0, alcohol: 11.50, percentageExpenditure: 9786.534000, hepatitisB: 95, measles: 26, bmi: 64.9, underFiveDeaths: 0, polio: 95, totalExpenditure: 12.4, diphtheria: 95, hivAids: 0.4, gdp: 81379.746000, population: 8298663, thinness1_19: 1.8, thinness5_9: 1.7, incomeComposition: 0.930, schooling: 15.7},
  {country: "United Kingdom", year: 2015, status: "Developed", lifeExpectancy: 81.2, adultMortality: 85, infantDeaths: 0, alcohol: 11.50, percentageExpenditure: 4003.332900, hepatitisB: 95, measles: 4, bmi: 66.6, underFiveDeaths: 0, polio: 95, totalExpenditure: 9.8, diphtheria: 95, hivAids: 0.2, gdp: 43734.968000, population: 64715812, thinness1_19: 2.5, thinness5_9: 2.4, incomeComposition: 0.907, schooling: 16.2},
  {country: "United States", year: 2015, status: "Developed", lifeExpectancy: 79.3, adultMortality: 124, infantDeaths: 0, alcohol: 9.30, percentageExpenditure: 9403.651480, hepatitisB: 91, measles: 667, bmi: 67.3, underFiveDeaths: 0, polio: 91, totalExpenditure: 17.1, diphtheria: 91, hivAids: 0.6, gdp: 56863.425000, population: 321418821, thinness1_19: 1.2, thinness5_9: 1.1, incomeComposition: 0.915, schooling: 16.3}
]

function computeAdditionalMetrics(data: any): RealHealthData {
  // Compute additional metrics for dashboard compatibility
  const wellnessScore = Math.min(100, Math.max(0, 
    (data.lifeExpectancy / 85 * 30) + 
    (data.incomeComposition * 25) + 
    (data.schooling / 20 * 20) + 
    ((100 - data.adultMortality / 400 * 100) * 0.25)
  ))

  const healthcareAccess = Math.min(100, Math.max(0,
    (data.totalExpenditure / 20 * 40) + 
    (data.hepatitisB / 100 * 30) + 
    (data.diphtheria / 100 * 30)
  ))

  const mentalHealthScore = Math.min(100, Math.max(0,
    wellnessScore * 0.8 + (data.alcohol > 0 ? Math.min(20, data.alcohol * 2) : 0)
  ))

  const physicalActivityLevel = Math.min(100, Math.max(0,
    (100 - data.bmi > 25 ? (data.bmi - 25) * 2 : 0) + 
    (data.lifeExpectancy / 85 * 60)
  ))

  const nutritionScore = Math.min(100, Math.max(0,
    100 - (data.thinness1_19 + data.thinness5_9) / 2 * 2
  ))

  const socialSupportScore = Math.min(100, Math.max(0,
    data.incomeComposition * 80 + (data.schooling / 20 * 20)
  ))

  const economicStability = Math.min(100, Math.max(0,
    (Math.log(data.gdp + 1) / Math.log(100000) * 70) + 
    (data.incomeComposition * 30)
  ))

  const diseasePrevalence = Math.min(50, Math.max(0,
    (data.adultMortality / 400 * 30) + 
    (data.infantDeaths / 200 * 10) + 
    (data.hivAids * 10)
  ))

  const vaccinationRate = Math.min(100, Math.max(0,
    (data.hepatitisB + data.diphtheria + data.polio) / 3
  ))

  return {
    ...data,
    id: `${data.country}-${data.year}`,
    wellnessScore: Math.round(wellnessScore),
    healthcareAccess: Math.round(healthcareAccess),
    mentalHealthScore: Math.round(mentalHealthScore),
    physicalActivityLevel: Math.round(physicalActivityLevel),
    nutritionScore: Math.round(nutritionScore),
    socialSupportScore: Math.round(socialSupportScore),
    economicStability: Math.round(economicStability),
    diseasePrevalence: Math.round(diseasePrevalence),
    vaccinationRate: Math.round(vaccinationRate)
  }
}

export const realHealthData: RealHealthData[] = rawCSVData.map(computeAdditionalMetrics)

// Extract unique countries for filters
export const realCountries = Array.from(new Set(realHealthData.map(d => d.country))).sort()

// Extract unique years for filters  
export const availableYears = Array.from(new Set(realHealthData.map(d => d.year))).sort((a, b) => b - a)

// Extract unique statuses
export const developmentStatus = Array.from(new Set(realHealthData.map(d => d.status))).sort()

// Create age groups and genders for compatibility (these don't exist in the real dataset)
export const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75+']
export const genders = ['Male', 'Female', 'Non-binary']

// Helper functions for data analysis
export const getCountryData = (country: string) => {
  return realHealthData.filter(d => d.country === country)
}

export const getYearData = (year: number) => {
  return realHealthData.filter(d => d.year === year)
}

export const getLatestData = () => {
  const latestYear = Math.max(...realHealthData.map(d => d.year))
  return realHealthData.filter(d => d.year === latestYear)
}

// Country aggregates for map visualization
export const realCountryAggregates = realCountries.map(country => {
  const countryData = getCountryData(country)
  const latestData = countryData[countryData.length - 1] // Most recent data
  
  return {
    country,
    countryCode: getCountryCode(country),
    status: latestData?.status || 'Developing',
    avgLifeExpectancy: Math.round(countryData.reduce((acc, d) => acc + d.lifeExpectancy, 0) / countryData.length),
    avgWellnessScore: Math.round(countryData.reduce((acc, d) => acc + d.wellnessScore, 0) / countryData.length),
    avgHealthcareAccess: Math.round(countryData.reduce((acc, d) => acc + d.healthcareAccess, 0) / countryData.length),
    population: latestData?.population || 0,
    dataPoints: countryData.length
  }
})

// Simple country code mapping for common countries
function getCountryCode(country: string): string {
  const countryCodeMap: Record<string, string> = {
    'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Australia': 'AU',
    'Austria': 'AT', 'Belgium': 'BE', 'Brazil': 'BR', 'Canada': 'CA',
    'China': 'CN', 'Denmark': 'DK', 'Finland': 'FI', 'France': 'FR',
    'Germany': 'DE', 'India': 'IN', 'Italy': 'IT', 'Japan': 'JP',
    'Norway': 'NO', 'Sweden': 'SE', 'Switzerland': 'CH', 'United Kingdom': 'GB',
    'United States': 'US', 'Russian Federation': 'RU', 'South Africa': 'ZA',
    'Nigeria': 'NG', 'Egypt': 'EG', 'Mexico': 'MX', 'Argentina': 'AR',
    'Chile': 'CL', 'Spain': 'ES', 'Netherlands': 'NL', 'Poland': 'PL',
    'Turkey': 'TR', 'Iran (Islamic Republic of)': 'IR', 'Thailand': 'TH',
    'Singapore': 'SG', 'New Zealand': 'NZ', 'Israel': 'IL', 'Jordan': 'JO',
    'Saudi Arabia': 'SA', 'United Arab Emirates': 'AE'
  }
  
  return countryCodeMap[country] || country.substring(0, 2).toUpperCase()
}