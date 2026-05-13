// frontend/src/components/work/population-health/surrogate.ts
import data from './surrogate-data.json'

export interface InputVector {
  schooling: number
  gdp: number
  immunization: number
  hiv: number
}

export interface Country {
  code: string
  name: string
  baseline: number
  sigma: number
  defaults: InputVector
}

export interface Weights {
  schooling: number
  gdp: number
  immunization: number
  hiv: number
}

export interface PredictionResult {
  value: number
  ci90: number
}

export interface Attribution {
  field: keyof InputVector
  label: string
  delta: number
}

const FIELD_LABELS: Record<keyof InputVector, string> = {
  schooling: 'Schooling (yrs)',
  gdp: 'GDP per capita',
  immunization: 'Immunization coverage',
  hiv: 'HIV deaths / 1k',
}

export function predict(country: Country, x: InputVector, w: Weights): PredictionResult {
  const value =
    country.baseline +
    w.schooling * (x.schooling - country.defaults.schooling) +
    w.gdp * (x.gdp - country.defaults.gdp) +
    w.immunization * (x.immunization - country.defaults.immunization) +
    w.hiv * (x.hiv - country.defaults.hiv)
  return { value, ci90: country.sigma * 1.645 }
}

export function attributions(country: Country, x: InputVector, w: Weights): Attribution[] {
  const all: Attribution[] = (Object.keys(FIELD_LABELS) as Array<keyof InputVector>).map((field) => ({
    field,
    label: FIELD_LABELS[field],
    delta: w[field] * (x[field] - country.defaults[field]),
  }))
  return all.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
}

export const COUNTRIES: Country[] = data.countries
export const WEIGHTS: Weights = data.weights
