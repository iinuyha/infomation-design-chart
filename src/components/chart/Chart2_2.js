import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import Global_Ranking from "../../data/Global_Ranking.csv";
import {color10Series, darkColor10Series, emphasizeKorea10Series} from '../..//Design.js';


const Chart2_2 = ({onCountryChange}) => {
  const [parsedData, setParsedData] = useState([]);
  const [filterCountry, setFilterCounty] = useState('Korea');

  const handleFilterCountryChange = (event) => {
    const selectedValue = event.target.value;
    setFilterCounty(selectedValue);
    console.log("클릭된 국가 : filterCountry")
  };

  useEffect(() => {
    onCountryChange(filterCountry);
  }, [filterCountry, onCountryChange]);

  const fetchData = async () => {
    try {
      const response = await fetch(Global_Ranking);
      const data = await response.text();
      setParsedData(parseCSV(data));
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const parseCSV = (csv) => {
    const rows = csv.split('\n').map(row => row.split(','));

    // 데이터 구조 변경
    const parsedData = rows.slice(1).map(row => {
      const country = row[0];
      const rankings = row.slice(1).map(ranking => parseFloat(ranking));
      return { country, rankings };
    });

    return parsedData;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (parsedData.length > 0) {
      drawBumpChart();
    }
  }, [parsedData]);

  // 순위 e차트 디자인
  const generateSeriesList = () => {
    const seriesList = parsedData.map(data => {
      return {
        name: data.country,
        symbolSize: 10,       // 꺾은선 그래프의 내부 동그라미 크기        
        type: 'line',
        data: data.rankings,
        smooth: true,         // 선이 곡선느낌
        emphasis: {
          focus: 'series',
          lineStyle: {
            width: 4,
            color: darkColor10Series[data.country],  // 마우스 오버 했을 때 선 색상
          },
        },
        endLabel: {           // 선 오른쪽 끝에 값 표시
          show: true,
          formatter: '{a}',
          distance: 20,
          fontSize: 15,
          fontFamily: 'Roboto Mono, monospace',
          color: 'white'
        },
        lineStyle: {
          width: 4,
          color: emphasizeKorea10Series[data.country],   // 선의 기본 색상
        },   // 선 두께 
        itemStyle: {
          normal: {color: emphasizeKorea10Series[data.country],  // symbol 기본 테두리 색상
          },
          emphasis:{color: darkColor10Series[data.country], // 마우스 오버 했을 때 symbol에 채워지는 색상
          },
        },
      };
    });
    return seriesList;
  };

  // 순위 e차트
  const drawBumpChart = () => {
    const seriesList = generateSeriesList();

    const option = {
      title: {
        text: 'Global Luxury Market Size Ranking',
        textStyle: {
          fontFamily: 'PyeongChangPeace-Bold',
          fontSize : 25,
          color: 'white'
        },
      },
      tooltip: {
        trigger: 'item',
        textStyle:{
          fontFamily: 'Roboto Mono, monospace',
          color: 'black'
        },
      },
      grid: {
        left: '10%',
        right: '27%',
        top:'20%',
        bottom : '10%',
        containLabel: false
      },
      xAxis: {
        type: 'category',
        data: ['2018', '2019', '2020', '2021'], // 연도 데이터
        axisLabel: {
          margin: 20,
          fontSize: 16,
          fontFamily: 'Roboto Mono, monospace',
          color: 'white'
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
      
        // 축 있는게 나은지 없는게 나은지???
        axisLine: {
          lineStyle: {
            color: '#5b5b5b',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'Ranking by Year', // 여기에 제목 추가
        nameLocation: 'middle', // 제목 위치
        nameGap: 135, // 제목과 축 간격
        nameRotate: 90,
        nameTextStyle: {
          fontFamily: 'Roboto Mono, monospace',
          fontSize: 13,
          color: 'white',
        },
        axisLabel: {
          margin: 100,
          fontSize: 16,
          formatter: '#{value}',
          fontFamily: 'Roboto Mono, monospace',
          color: 'white'
        },
        splitLine: {
          lineStyle: {
            color:'#828181',
          }         
        },
        inverse: true,
        interval: 1,
        min: 1,
        offset : -80,
      },
      series: seriesList,
    };

    const chart = echarts.init(document.getElementById('chart-container'));
    chart.setOption(option);

    ///////////////////여기서부터 새롭게 추가한 내용////////////////////
    chart.on('click', function (params) {
      // 클릭한 시리즈의 이름
      const clickedSeriesName = params.seriesName;
  
      // 클릭한 시리즈에 해당하는 스타일
      const clickedSeriesStyle = {
        lineStyle: {
          width: 5,
          color: darkColor10Series[clickedSeriesName],
        },
        itemStyle: {
          normal: {
            color: darkColor10Series[clickedSeriesName],
          },
          emphasis: {
            color: darkColor10Series[clickedSeriesName],
          },
        },
      };
  
      // 모든 시리즈의 스타일 초기화
      option.series.forEach(series => {
        series.lineStyle = {
          width: 2,
          color: '#5b5b5b',
        };
        series.itemStyle = {
          normal: {
            color: color10Series[series.name],
          },
          emphasis: {
            color: color10Series[series.name],
          },
        };
      });
  
      // 클릭한 시리즈에 대한 스타일 적용
      option.series.find(series => series.name === clickedSeriesName).lineStyle = clickedSeriesStyle.lineStyle;
      option.series.find(series => series.name === clickedSeriesName).itemStyle = clickedSeriesStyle.itemStyle;
  
      // 차트 업데이트
      chart.setOption(option);
  
  
      const event = {
        target: {
          value: clickedSeriesName,
        },
      };
      handleFilterCountryChange(event);
    });

  };

  return <div id="chart-container" style={{ height: '400px' }}></div>;
};

export default Chart2_2;
