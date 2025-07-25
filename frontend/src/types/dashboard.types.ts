// Dashboard-specific TypeScript definitions

export interface DashboardMetric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface DashboardConfig {
  title: string;
  description: string;
  refreshInterval?: number;
  dateRange?: string;
}

export interface HappinessData {
  overallMetrics: {
    happinessIndex: number;
    totalParticipants: number;
    satisfactionRate: number;
    wellbeingScore: number;
    stressLevel: number;
    workLifeBalance: number;
  };
  departmentHappiness: Array<{
    department: string;
    happiness: number;
    satisfaction: number;
    stress: number;
    participants: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  monthlyHappinessTrends: Array<{
    month: string;
    happiness: number;
    satisfaction: number;
    wellbeing: number;
  }>;
  happinessFactors: Array<{
    factor: string;
    impact: number;
    satisfaction: number;
  }>;
  moodDistribution: Array<{
    mood: string;
    count: number;
    percentage: number;
    color: string;
  }>;
}

export interface LifeExpectancyData {
  // Define structure based on your life expectancy dashboard
  [key: string]: any;
}

export interface InventoryData {
  // Define structure based on your inventory dashboard
  [key: string]: any;
}