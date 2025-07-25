'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function LifeExpectancyDashboard() {
  const [chartsLoaded, setChartsLoaded] = useState(false);

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js"
        onLoad={() => setChartsLoaded(true)}
      />
      
      <div className="life-expectancy-dashboard">
        {/* Copy the complete dashboard HTML here */}
        <div className="text-center p-4">
          <h2 className="text-3xl font-bold">Life Expectancy Dashboard</h2>
          <p>Chart.js Status: {chartsLoaded ? 'Loaded ✓' : 'Loading...'}</p>
        </div>
      </div>
    </>
  );
}