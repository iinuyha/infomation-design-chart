import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import layouts from './layouts';
import Chart1 from './components/chart/Chart1';
import Chart2_1 from './components/chart/Chart2_1';
import Chart2_2 from './components/chart/Chart2_2';
import Chart3 from './components/chart/Chart3';
import Chart4 from './components/chart/Chart4';
import Chart5 from './components/chart/Chart5';
import Chart6 from './components/chart/Chart6';
import Filtering from './components/Filtering';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('Korea');

  const handleYearChange = (year) => {
    setSelectedYear(year);
    console.log('dashboard', year);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    console.log('dashboard', country);
  };

  return (
    <div>
      <h1>Luxury Consumption Trend</h1>
      <ResponsiveGridLayout className="layout" layouts={layouts}>
        <div key="chart1" className="main-chart-container"><Chart1 /></div>
        <div key="filtering" className="chart-container">
          <Filtering onYearChange={handleYearChange} />
        </div>
          {selectedYear === 'All'
            ? (<div key="chart2" className="chart-container"><Chart2_2 onCountryChange={handleCountryChange} /></div>)
            : (<div key="chart2" className="chart-container"><Chart2_1 selectedYearData={selectedYear} onCountryChange={handleCountryChange} /></div>)
          }
        <div key="chart3/4" className="chart-container" style={{ display: 'flex' }}>
          <div className="chart3-container" style={{ flex: 2 }}>
            <Chart3 selectedCountryData={selectedCountry} />
          </div>
          <div className="chart4-container" style={{ flex: 1 }}>
            <Chart4 selectedCountryData={selectedCountry}/>
          </div>
        </div>
        <div key="chart5" className="chart-container"><Chart5 /></div>
        <div key="chart6" className="chart-container"><Chart6 /></div>
        {/* Add more chart components based on your layout configuration */}
      </ResponsiveGridLayout>
    </div> 
  );
};

export default Dashboard;
