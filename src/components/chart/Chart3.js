import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import global_market_size from "../../data/Global_Luxury_Market_Size.csv";
import {color10Series, darkColor10Series} from '../..//Design.js';

const Chart3 = ({ selectedCountryData }) => {
  const [parsedData, setParsedData] = useState([]);

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
    if (selectedCountryData) {
      console.log('Selected Country Data:', selectedCountryData);
      console.log('Parsed Data:', parsedData);
      drawLineChart();
    }
  }, [selectedCountryData, parsedData])

  const parseCSV = (csv) => {
    const rows = csv.split('\n').map(row => row.split(','));
    const parsedData = rows.slice(1).map(row => {
      const country = row[0];
      const marketSizeValue = row.slice(1).map(value => parseFloat(value.replace(/"/g, '')));
      // Remove double quotes and convert to numbers
      return { country, marketSizeValue };
    });
    return parsedData;
  };

  const drawLineChart = () => {
    const countryData = parsedData.find(data => data.country === selectedCountryData);
  
    if (!countryData || !countryData.country) {
      console.error('Invalid or missing data for selected country.');
      return;
    }
  
    const marketSizeValues = Object.values(countryData.marketSizeValue).map(value => parseFloat(value));
  
    const existingChart = echarts.getInstanceByDom(document.getElementById('line-chart-container'));
    if (existingChart) {
      echarts.dispose(existingChart);
    }
    
  
    const option = {
      title: {
        text: `Growth Rate of the Luxury Market in ${countryData.country}`,
        textStyle: {
          fontFamily: 'PyeongChangPeace-Bold',
          fontSize : 25,
          color: 'white'
        },
      },
      tooltip: {
        trigger: 'axis',
        borderColor: darkColor10Series[countryData.country], // 테두리 색상을 여기에 원하는 색상값으로 설정합니다.
        textStyle:{
          fontFamily: 'Roboto Mono, monospace',
          color: 'black'
        }
      },

      grid: {
        left: '20%',
        right: '10%',
        top:'25%',
        bottom : '20%',
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#5b5b5b',
          }
        },
        axisLabel: {
          margin: 20,
          fontSize: 16,
          fontFamily: 'Roboto Mono, monospace',
          color: 'white'
        },
        data: ['2018', '2019', '2020', '2021'],
        axisLine: {
          lineStyle: {
            color: 'white',
          },
        }
      },
      yAxis: {
        type: 'value',
        name: 'Market Size', // 여기에 제목 추가
        nameLocation: 'middle', // 제목 위치
        nameGap: 85, // 제목과 축 간격
        nameRotate: 90,
        nameTextStyle: {
          fontFamily: 'Roboto Mono, monospace',
          fontSize: 13,
          color: 'white',
        },
        axisLabel: {
          fontFamily: 'Roboto Mono, monospace',
          fontSize: 16,
          color: 'white',
          formatter: '{value}',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#5b5b5b',
          },
        },
        offset: 0, // 그래프랑 y축 사이 간격
      },
      graphic: [
        {
          type: 'text',
          right: '9%', // 그래프 상단 오른쪽 끝에 위치
          top: '20%', // 그래프 상단에서의 위치
          z: 100, // 다른 그래픽과 겹치지 않도록 높은 값
          style: {
            text: '(unit : million dollars)',
            textAlign: 'left',
            fill: 'white',
            fontFamily: 'Roboto Mono, monospace',
            fontSize: 14,
          },
        },
      ],
      series: [
        {
          name: 'Market Size (Bar)',
          type: 'bar',
          data: marketSizeValues,
          barWidth: 30,
          tooltip: {
            show: false,
          },
          emphasis: {focus: 'series'},
          itemStyle: {
            normal: {
              color: color10Series[countryData.country],  // 일반 차트 바 색상
              opacity: 0.8
            },
            emphasis: {
              color : darkColor10Series[countryData.country],  // 마우스 오버 했을 때 바 색상
            }
          },
        },
        {
          name: 'Market Size',
          type: 'line',
          symbolSize: 10,
          emphasis: false,
          data: marketSizeValues,
          color : darkColor10Series[countryData.country],
          smooth: true,
          lineStyle: {
            width: 5, // 라인의 너비 조절
          },
        },
      ],
    };
  
    const chart = echarts.init(document.getElementById('line-chart-container'));
    chart.setOption(option);
  };
  

  return (
    <>
      <div id="line-chart-container" style={{height: '300px' }}></div>
    </>
  );
};

export default Chart3;
