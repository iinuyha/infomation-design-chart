import React from 'react';
import ReactECharts from 'echarts-for-react';
import {color3Series} from '../..//Design.js';


const Chart5 = () => {
  const option = { //옵션설정
    title: { //제목
      text: 'Diverse Economic Growth Rates in Korea (2018-2021)',
      textStyle: {
        fontFamily: 'PyeongChangPeace-Bold',
        fontSize : 25,
        color: 'white'
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      top:'20%',
      bottom : '20%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      textStyle:{
        fontFamily: 'Roboto Mono, monospace',
        color: 'black',
        fontSize: 17
      },
    },
    legend: {
      left: '2%', // 또는 필요한 위치로 조정
      top:'65%',
      orient: 'vertical',
      itemGap: 20,
      data: ['Income(%)', 'Consumption(%)', 'Luxury Consumption(%)'],
      textStyle: {
        fontFamily: 'Roboto Mono, monospace',
        fontSize: 15,
        color:'white'
      }
    },
    radar: [ //레이더 설정
      {
        indicator: [
          { text: 'under 20s', max: 100, color: 'white' },
          { text: '30s', max: 100, color: 'white' },
          { text: '40s', max: 100, color: 'white' },
          { text: '50s', max: 100, color: 'white' },
          { text: 'over 60s', max:100, color: 'white' },
        ],
        center: ['55%', '55%'], //레이더 차트의 중심위치
        radius: 150, //레이더의 반지름
        axisName : {
          fontSize : 16,
          fontFamily: 'Roboto Mono, monospace',
        },
        splitArea: {
          areaStyle: {
            color: '#999999',    // 오각형 배경 색
            opacity: '0.2'
          },
        },
        splitLine: {
          lineStyle: {
            color:'#7C7C7C',
          }
        },
        axisLine: {
          symbol: 'none'
        }
      }
      
    ],
    series: [ // 실제 데이터입력되고 레이더 차트가 생성되는 부분
      {
        type: 'radar',
        tooltip: {
          trigger: 'item',
          textStyle:{
            fontFamily: 'Roboto Mono, monospace',
            color: 'black',
            fontSize: 14
          }
        },
        areaStyle: {},
        data: [ //실제 데이터
          
          {
            value: [13.91, 10.06, 14.55, 14.81, 4.65],
            name: 'Income(%)',
            itemStyle: {
              color: color3Series['Income'],
            },
          },
          {
            value: [30.86, 24.81, 12.72, 10.57, 6.1],
            name: 'Consumption(%)',
            itemStyle: {
              color: color3Series['Consumption'],
            },
          },
          {
            value: [75.68, 70.22, 66.41, 60.96, 65.05],
            name: 'Luxury Consumption(%)',
            itemStyle: {
              color: color3Series['Luxury Consumption'],
            },
          },
        ],
      }
    ],
    
  };

  return ( //ReactEcharts컴포넌트사용하여 이차트를 리액트 컴포넌트에 통합
    <ReactECharts option={option} style={{ height: '100%' }} />
  );
};


export default Chart5;
