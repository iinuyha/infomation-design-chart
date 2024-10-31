import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/gauge';
import global_market_size from "../../data/Global_Luxury_Market_Size.csv";

const Chart4 = ({ selectedCountryData }) => {
  const [parsedData, setParsedData] = useState([]);
  const chartContainerRef = useRef(null);
  const myChartRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(global_market_size);
      const data = await response.text();
      setParsedData(parseCSV(data));
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 마운트 시 한 번 실행

  useEffect(() => {
    if (selectedCountryData && chartContainerRef.current) {
      drawValue();
    }
  }, [selectedCountryData, parsedData]);

  const parseCSV = (csv) => {
    const rows = csv.split('\n').map(row => row.split(','));
    const parsedData = rows.slice(1).map(row => {
      const country = row[0].replace(/"/g, ''); // 쌍따옴표 제거
      const marketSizeValue = row.slice(1).map(value => parseFloat(value.replace(/"/g, ''))); // 각 연도별 데이터를 숫자로 변환합니다.
      return { country, marketSizeValue };
    });
    return parsedData;
  };

  // 성장률 계산
  const calculateGrowth = (data) => {
    const startYearValue = parseFloat(data[0]);
    const endYearValue = parseFloat(data[data.length - 1]);
    const growth = ((endYearValue - startYearValue) / startYearValue) * 100;
    return growth.toFixed(1); // 소수점 첫 자리까지 
  };

  const drawValue = () => {
    const countryData = parsedData.find(data => data.country === selectedCountryData);
  
    if (!countryData || !countryData.country) {
      console.error('Invalid or missing data for the selected country.');
      return;
    }
  
    const growth = calculateGrowth(countryData.marketSizeValue);
    const growthColor = parseFloat(growth) < 0 ? '#CB6F9D' : '#5687A8';
    const isClockwise = parseFloat(growth) >= 0; // growth가 양수이면 시계방향, 음수이면 반시계방향
  
    // ECharts 차트 렌더링
    if (!myChartRef.current) {
      myChartRef.current = echarts.init(chartContainerRef.current);
    }
  
    const option = {
      title: {
        text: '     Growth Rate\nfrom 2018 to 2021',
        textStyle: {
          fontFamily: 'PyeongChangPeace-Bold',
          fontSize: 20,
          color: 'white'
        },
      },
      series: [
        {
          type: 'gauge',
          roundCap: true,    // 진행 막대의 끝을 둥글게 설정
          max: 100,          // 한 바퀴의 최대값은 100
          progress: {
            show: true,
            width: 10,
            overlap : true,
            itemStyle: {
              color: growthColor, // growth에 따라 색상 설정
              borderColor : 'white',
              borderWidth : 0.5,
            },
            roundCap: true
          },
          startAngle: isClockwise ? 90 : -270, // growth에 따라 시작 각도 조절
          endAngle: isClockwise ? -270 : 90, // growth에 따라 시작 각도 조절
          clockwise: isClockwise, // growth에 따라 회전 방향 조절
          axisLine: {
            lineStyle: {
              width: 5,
              color: [[1, '#5b5b5b']], // growth에 따라 색상 설정
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 5,
            lineStyle: {
              width: 2,
              color: '#5b5b5b',
            },
          },
          axisLabel: {
            show: false,
          },
          pointer: {
            show: false,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 25,
            fontFamily: 'Roboto Mono, monospace',
            color: 'white',
            offsetCenter: ['0%', '0%'],
            formatter: isClockwise ? `{value}%` : `-{value}%`, // growth 값을 포함하도록 포맷 설정
          },
          data: [
            {
              value: parseFloat(isClockwise ? growth : -growth),
            },
          ],
        },
      ],
    };

    const chart = echarts.init(document.getElementById('gauge-chart-container'));
    chart.setOption(option);
  };

  // 컴포넌트 언마운트 시 차트 해제
  useEffect(() => {
    return () => {
      if (myChartRef.current) {
        myChartRef.current.dispose();
      }
    };
  }, []);

  return (
    <>
      <div id='gauge-chart-container' style={{ width: '200px', height: '330px' }} ref={chartContainerRef}></div>
    </>
  );
};

export default Chart4;
