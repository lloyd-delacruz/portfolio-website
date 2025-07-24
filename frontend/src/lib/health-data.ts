export type HealthData = {
  id: string
  country: string
  countryCode: string
  region: string
  ageGroup: string
  gender: string
  lifeExpectancy: number
  wellnessScore: number
  healthcareAccess: number
  mentalHealthScore: number
  physicalActivityLevel: number
  nutritionScore: number
  airQualityIndex: number
  socialSupportScore: number
  economicStability: number
  diseasePrevalence: number
  vaccinationRate: number
}

export const countries = [
  'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile',
  'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
  'Norway', 'Sweden', 'Denmark', 'Finland', 'Switzerland', 'Austria',
  'Russia', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Ukraine',
  'China', 'Japan', 'South Korea', 'India', 'Thailand', 'Singapore',
  'Australia', 'New Zealand', 'Indonesia', 'Philippines', 'Vietnam',
  'South Africa', 'Nigeria', 'Egypt', 'Kenya', 'Ghana', 'Morocco',
  'Israel', 'Turkey', 'Iran', 'Saudi Arabia', 'UAE', 'Jordan'
]

export const countryCodes: Record<string, string> = {
  'United States': 'US', 'Canada': 'CA', 'Mexico': 'MX', 'Brazil': 'BR',
  'Argentina': 'AR', 'Chile': 'CL', 'United Kingdom': 'GB', 'Germany': 'DE',
  'France': 'FR', 'Italy': 'IT', 'Spain': 'ES', 'Netherlands': 'NL',
  'Norway': 'NO', 'Sweden': 'SE', 'Denmark': 'DK', 'Finland': 'FI',
  'Switzerland': 'CH', 'Austria': 'AT', 'Russia': 'RU', 'Poland': 'PL',
  'Czech Republic': 'CZ', 'Hungary': 'HU', 'Romania': 'RO', 'Ukraine': 'UA',
  'China': 'CN', 'Japan': 'JP', 'South Korea': 'KR', 'India': 'IN',
  'Thailand': 'TH', 'Singapore': 'SG', 'Australia': 'AU', 'New Zealand': 'NZ',
  'Indonesia': 'ID', 'Philippines': 'PH', 'Vietnam': 'VN', 'South Africa': 'ZA',
  'Nigeria': 'NG', 'Egypt': 'EG', 'Kenya': 'KE', 'Ghana': 'GH',
  'Morocco': 'MA', 'Israel': 'IL', 'Turkey': 'TR', 'Iran': 'IR',
  'Saudi Arabia': 'SA', 'UAE': 'AE', 'Jordan': 'JO'
}

export const regions = [
  'North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania', 'Middle East'
]

export const ageGroups = [
  '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75+'
]

export const genders = [
  'Male', 'Female', 'Non-binary'
]

const regionMapping: Record<string, string> = {
  'United States': 'North America', 'Canada': 'North America', 'Mexico': 'North America',
  'Brazil': 'South America', 'Argentina': 'South America', 'Chile': 'South America',
  'United Kingdom': 'Europe', 'Germany': 'Europe', 'France': 'Europe', 'Italy': 'Europe',
  'Spain': 'Europe', 'Netherlands': 'Europe', 'Norway': 'Europe', 'Sweden': 'Europe',
  'Denmark': 'Europe', 'Finland': 'Europe', 'Switzerland': 'Europe', 'Austria': 'Europe',
  'Russia': 'Europe', 'Poland': 'Europe', 'Czech Republic': 'Europe', 'Hungary': 'Europe',
  'Romania': 'Europe', 'Ukraine': 'Europe', 'China': 'Asia', 'Japan': 'Asia',
  'South Korea': 'Asia', 'India': 'Asia', 'Thailand': 'Asia', 'Singapore': 'Asia',
  'Indonesia': 'Asia', 'Philippines': 'Asia', 'Vietnam': 'Asia', 'Australia': 'Oceania',
  'New Zealand': 'Oceania', 'South Africa': 'Africa', 'Nigeria': 'Africa', 'Egypt': 'Africa',
  'Kenya': 'Africa', 'Ghana': 'Africa', 'Morocco': 'Africa', 'Israel': 'Middle East',
  'Turkey': 'Middle East', 'Iran': 'Middle East', 'Saudi Arabia': 'Middle East',
  'UAE': 'Middle East', 'Jordan': 'Middle East'
}

function generateHealthData(): HealthData[] {
  const data: HealthData[] = []
  let id = 1

  countries.forEach(country => {
    ageGroups.forEach(ageGroup => {
      genders.forEach(gender => {
        // Generate 2-3 records per combination for variety
        const recordCount = Math.floor(Math.random() * 2) + 2
        
        for (let i = 0; i < recordCount; i++) {
          // Base life expectancy by region with realistic variations
          const region = regionMapping[country]
          let baseLifeExpectancy = 75
          
          switch (region) {
            case 'Europe':
              baseLifeExpectancy = 82
              break
            case 'North America':
              baseLifeExpectancy = 79
              break
            case 'Asia':
              baseLifeExpectancy = country === 'Japan' ? 85 : country === 'Singapore' ? 83 : 76
              break
            case 'Oceania':
              baseLifeExpectancy = 82
              break
            case 'South America':
              baseLifeExpectancy = 76
              break
            case 'Middle East':
              baseLifeExpectancy = 75
              break
            case 'Africa':
              baseLifeExpectancy = 65
              break
          }

          // Age and gender adjustments
          const ageMultiplier = ageGroup === '18-24' ? 1.02 : 
                              ageGroup === '25-34' ? 1.01 : 
                              ageGroup === '35-44' ? 1.0 : 
                              ageGroup === '45-54' ? 0.99 : 
                              ageGroup === '55-64' ? 0.97 : 
                              ageGroup === '65-74' ? 0.95 : 0.92

          const genderMultiplier = gender === 'Female' ? 1.05 : gender === 'Male' ? 0.98 : 1.01

          const lifeExpectancy = Math.round((baseLifeExpectancy * ageMultiplier * genderMultiplier) + (Math.random() * 8 - 4))

          // Correlated health metrics
          const wellnessScore = Math.max(20, Math.min(100, Math.round(
            (lifeExpectancy - 50) * 1.2 + (Math.random() * 20 - 10)
          )))

          const healthcareAccess = Math.max(30, Math.min(100, Math.round(
            wellnessScore * 0.8 + (Math.random() * 20 - 10)
          )))

          const mentalHealthScore = Math.max(25, Math.min(100, Math.round(
            wellnessScore * 0.9 + (Math.random() * 15 - 7.5)
          )))

          const physicalActivityLevel = Math.max(20, Math.min(100, Math.round(
            wellnessScore * 0.75 + (Math.random() * 25 - 12.5)
          )))

          const nutritionScore = Math.max(30, Math.min(100, Math.round(
            wellnessScore * 0.85 + (Math.random() * 15 - 7.5)
          )))

          const airQualityIndex = Math.max(20, Math.min(150, Math.round(
            120 - (wellnessScore * 0.6) + (Math.random() * 30 - 15)
          )))

          const socialSupportScore = Math.max(30, Math.min(100, Math.round(
            wellnessScore * 0.9 + (Math.random() * 20 - 10)
          )))

          const economicStability = Math.max(25, Math.min(100, Math.round(
            wellnessScore * 0.95 + (Math.random() * 20 - 10)
          )))

          const diseasePrevalence = Math.max(5, Math.min(45, Math.round(
            45 - (wellnessScore * 0.4) + (Math.random() * 10 - 5)
          )))

          const vaccinationRate = Math.max(50, Math.min(100, Math.round(
            wellnessScore * 0.85 + (Math.random() * 15 - 7.5)
          )))

          data.push({
            id: id.toString(),
            country,
            countryCode: countryCodes[country],
            region: regionMapping[country],
            ageGroup,
            gender,
            lifeExpectancy,
            wellnessScore,
            healthcareAccess,
            mentalHealthScore,
            physicalActivityLevel,
            nutritionScore,
            airQualityIndex,
            socialSupportScore,
            economicStability,
            diseasePrevalence,
            vaccinationRate
          })
          
          id++
        }
      })
    })
  })

  return data
}

export const healthData = generateHealthData()

// Aggregated data for map visualization
export const countryAggregates = countries.map(country => {
  const countryData = healthData.filter(d => d.country === country)
  return {
    country,
    countryCode: countryCodes[country],
    region: regionMapping[country],
    avgLifeExpectancy: Math.round(countryData.reduce((acc, d) => acc + d.lifeExpectancy, 0) / countryData.length),
    avgWellnessScore: Math.round(countryData.reduce((acc, d) => acc + d.wellnessScore, 0) / countryData.length),
    avgHealthcareAccess: Math.round(countryData.reduce((acc, d) => acc + d.healthcareAccess, 0) / countryData.length),
    population: countryData.length * 1000000 + Math.floor(Math.random() * 50000000)
  }
})