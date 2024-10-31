import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import search_Trend from '../../data/luxury_brand_searching.csv';
import Papa from 'papaparse';
import {color6Series} from '../..//Design.js';


const Chart6 = () => {
  useEffect(() => {
    const dom = document.getElementById('container');
    const myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const fetchData = async () => {
      try {
        const response = await fetch(search_Trend);
        const data = await response.text();
        // CSV 데이터 파싱
        const parsedData = parseCSV(data);
        // 차트 설정 적용
        applyChartOptions(parsedData);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    const parseCSV = (data) => {
      // CSV 데이터 파싱
      const rows = Papa.parse(data, { header: true }).data;
    
      if (!rows[0].hasOwnProperty('week')) {
        console.error('week 필드가 존재하지 않습니다. 헤더 정보:', rows[0]);
        return [];
      }
    
      const parsedData = rows.map(row => {
        const yearMonth = row.week.substring(0, 7); // YYYY-MM 형식의 년도와 월 추출
        const Dior = parseFloat(row.Dior);
        const Celine = parseFloat(row.Celine);
        const Hermes = parseFloat(row.Hermes);
        const RouisVuitton = parseFloat(row.RouisVuitton);
        const Channel = parseFloat(row.Channel);
        const Average = parseFloat(row.Average);
    
        return { yearMonth, Dior, Celine, Hermes, RouisVuitton, Channel, Average };
      });
    
      return parsedData;
    };
    
    
    const applyChartOptions = (data) => {
      const option = {
        title: {
          text: 'Search Volume for Luxury in Korea (2018-2021)',
          textStyle: {
            fontFamily: 'PyeongChangPeace-Bold',
            fontSize : 25,
            color: 'white'
          },
        },
        tooltip: {
          trigger: 'axis',
          textStyle:{
            fontFamily: 'Roboto Mono, monospace',
            color: 'black'
          }
        },
        legend: {
          top: '15%',
          right: '10%',
          data: ['Average', 'Dior', 'Celine', 'Hermes', 'RouisVuitton', 'Channel'],
          textStyle: {
            fontFamily: 'Roboto Mono, monospace',
            color: 'white',
            fontSize: 15
          }
        },
        grid: {
          left: '5%',
          right: '10%',
          top:'25%',
          bottom : '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.map(item => item.yearMonth), // yearMonth 필드를 사용
          axisLabel: {
            interval: 5,// x축 라벨 간격을 조정, 2로 설정하면 3개월 간격이 됩니다.
            fontFamily: 'Roboto Mono, monospace',
            fontSize : 15,
            color: 'white'
          },
          axisLine: {
            lineStyle: {
              color: 'white',
            },
          },
          offset: 20,    // 그래프랑 y축 사이 간격
        },
        yAxis: {
          type: 'value',
          max : '100',
          axisLabel: {
            fontFamily: 'Roboto Mono, monospace',
            fontSize : 16,
            color: 'white'
          },
          name:'Search Volume',
          nameLocation:'center',
          nameGap: 40,
          nameRotate: 90,
          nameTextStyle:{
            fontFamily: 'Roboto Mono, monospace',
            fontSize : 13,
            color: 'white'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#5b5b5b',
            }
          },
          offset: 5,    // 그래프랑 y축 사이 간격
        },

        graphic: [
          {
            type: 'text',
            right: '10%', // 그래프 상단 오른쪽 끝에 위치
            top: '22%', // 그래프 상단에서의 위치
            z: 100, // 다른 그래픽과 겹치지 않도록 높은 값
            style: {
              text: '(unit : %)',
              textAlign: 'left',
              fill: 'white',
              fontFamily: 'Roboto Mono, monospace',
              fontSize: 14,
            },
          },
        ],
        
        series: [
          {
            name: 'Average',
            type: 'line',
            symbol: 'none',
            data: data.map(item => item['Average']),
            itemStyle: {
              color: color6Series['Average'],
            },
            lineStyle: {
              width: 4,
            },
          },
          {
            name: 'Dior',
            type: 'line',
            symbol: 'none',
            data: data.map(item => item['Dior']),
            itemStyle: {
              color: color6Series['Dior'],
            },
          },
          {
            name: 'Celine',
            type: 'line',
            symbol: 'none',
            data: data.map(item => item['Celine']),
            itemStyle: {
              color: color6Series['Celine'],
            },
          },
          {
            name: 'Hermes',
            type: 'line',
            symbol: 'none',
            data: data.map(item => item['Hermes']),
            itemStyle: {
              color: color6Series['Hermes'],
            },
          },
          {
            name: 'RouisVuitton',
            type: 'line',
            symbol: 'none',
            data: data.map(item => item['RouisVuitton']),
            itemStyle: {
              color: color6Series['RouisVuitton'],
            },
          },
          {
            name: 'Channel',
            type: 'line',
            symbol: 'none',
            data: data.map(item => item['Channel']),
            itemStyle: {
              color: color6Series['Channel'],
            },
          },
        ]
      };

      myChart.setOption(option);

      window.addEventListener('resize', () => myChart.resize());
    };

    fetchData();

    return () => {
      window.removeEventListener('resize', () => myChart.resize());
    };
  }, []);

  return <div id="container" style={{ height: '500px' }} />;
};

export default Chart6;
