import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import global_market_size from "../../data/Global_Luxury_Market_Size.csv";
import {color10Series, darkColor10Series} from '../..//Design.js';


const Chart2_1 = ({ selectedYearData, onCountryChange }) => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [filterCountry, setFilterCounty] = useState('Korea');

  const handleFilterCountryChange = (country) => {
    setFilterCounty(country);
  };

  useEffect(() => {
    onCountryChange(filterCountry);
  }, [filterCountry, onCountryChange]);

  useEffect(() => {
    const readCsv = async () => {
      try {
        const file = await d3.csv(global_market_size, (d) => ({
          country: d.country,
          '2018': +((d['2018'] || '').replace(/,/g, '')),
          '2019': +((d['2019'] || '').replace(/,/g, '')),
          '2020': +((d['2020'] || '').replace(/,/g, '')),
          '2021': +((d['2021'] || '').replace(/,/g, '')),
        }));

        console.log(file);
        setData(file);
      } catch (error) {
        console.error('CSV 읽기 오류:', error);
      }
    };

    readCsv();
  }, []);

  useEffect(() => {
    setSelectedYear(selectedYearData);
  }, [selectedYearData]);

  useEffect(() => {
    drawBarChart();
  }, [data, selectedYear]);

  const drawBarChart = () => {
    d3.select('#chart-container').select('svg').remove();

    // 여백 및 제목 위치 조절
    const margin = { top: 70, right: 210, bottom: 20, left: 150 };
    const width = 1000 - margin.left - margin.right;
    const height = 420 - margin.top - margin.bottom;
  
    const svg = d3.select('#chart-container').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // 그래프 제목 추가
    svg.append('text')
      .attr('x', -145)
      .attr('y', -48)
      .style('text-anchor', 'start')
      .style('font-size', '25px')
      .style('font-family', 'PyeongChangPeace-Bold')
      .attr('fill', 'white')  // fill 속성을 사용하여 텍스트 색상을 지정합니다.
      .text(`Global Luxury Market Size in ${selectedYear}`);

    // 색상스케일을 Design.js 파일에서 만든 color10Series객체로 지정
    const colorScale = d3.scaleOrdinal()
      .domain(Object.keys(color10Series))
      .range(Object.values(color10Series));
  
    // 데이터 필터링
    const filteredData = data.map(d => ({
      country: d.country,
      value: +d[selectedYear],
    }));
  
    filteredData.sort((a, b) => b.value - a.value);
  
    const xScale = d3.scaleLinear()
    // .domain([0, 90000])이라고 하면 연도별로 x축 고정
      .domain([0, 90000])
      .range([0, width]);
  
    const yScale = d3.scaleBand()
      .domain(filteredData.map(d => d.country))
      .range([0, height-margin.bottom-20])
      .paddingInner(0.1);
  
    // 툴팁 생성
    const tooltip = d3.select('#chart-container')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'white') // 배경색
      .style('border', d => `1px solid rgba(0, 0, 0, 0.2)`)
      .style('border-radius', '4px') // 테두리 둥글기
      .style('padding', '10px')
      .style('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.2)') // 그림자 효과
      .style('font-size', '14px') // 텍스트 크기
      .style('font-family', 'Roboto Mono, monospace')
      .style('color', 'black');

    svg.append('g')
      .attr('class', 'x-axis-grid')
      .attr('transform', `translate(0,${height-margin.bottom-20})`)
      .call(d3.axisBottom(xScale).tickSize(-height + margin.bottom).tickFormat(''))
      .selectAll('.tick line')
      .attr('stroke', '#5b5b5b');
  
    // 막대 생성
    const bars = svg.selectAll('rect')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', d => yScale(d.country))
      .attr('width', 0)
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d.country)) // 나라 이름에 따라 색상 지정
      .on('mouseover', function (event, d) {
        d3.select(this).style('cursor', 'pointer');  // 마우스 오버 시 커서 스타일 변경
        tooltip.style('visibility', 'visible');
        tooltip.style('width', '160px');
        tooltip.html(`${d.country}<br>Market Size <strong>${d3.format(',.0f')(d.value)}</strong>`);        d3.select(this)
        .attr('fill', darkColor10Series[d.country]);
      })
      .on('mousemove', function (event) {
        tooltip.style('position', 'absolute')
          .style('top', (event.pageY - 260) + 'px')
          .style('left', (event.pageX) + 'px');
      })
      
      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
        d3.select(this)
        .attr('fill', d => colorScale(d.country));
      })
      .on('click', function (event, d) {
        handleFilterCountryChange(d.country);
        d3.select(this)
        .attr('fill', darkColor10Series[d.country]);
      });
  
    // 막대 애니메이션
    bars.transition()
      .duration(1000)
      .attr('width', d => xScale(d.value));
  
    // X 축 추가
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height-margin.bottom-20})`)
      .call(d3.axisBottom(xScale)
        .tickSize(5)
        .tickPadding(10)
        .tickFormat(d => d))
      .selectAll('text')  // X 축 레이블에 대한 스타일 적용
      .style('font-size', '15px') // 원하는 크기로 조절
      .style('font-family', 'Roboto Mono, monospace')
      .attr('fill', 'white');

    // x축 텍스트
    svg.append('text')
      .attr('x', width/2+40)
      .attr('y', height - margin.bottom + 27)
      .style('text-anchor', 'end')
      .style('font-size', '13px')
      .style('font-family', 'Roboto Mono, monospace')
      .attr('fill', 'white')
      .text('Market Size');
    
    svg.append('text')
      .attr('x', width * 0.69) // 그래프 상단 오른쪽 끝에 위치
      .attr('y', -10) // 그래프 상단 오른쪽 끝에 위치

      .style('font-family', 'Roboto Mono, monospace')
      .style('font-size', 14)
      .style('fill', 'white')
      .text('(unit : million dollars)');

    //x축 선
    svg.selectAll('.x-axis path')
      .style('stroke', 'white');
      
    svg.selectAll('.x-axis line')
      .style('stroke', 'white');

    // Y 축 추가
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).tickSize(0).tickPadding(10))
      .selectAll('text')  // X 축 레이블에 대한 스타일 적용
      .style('font-size', '15px') // 원하는 크기로 조절
      .style('font-family', 'Roboto Mono, monospace')
      .style('fill', 'white');

    //y축 선
    svg.selectAll('.y-axis path')
      .style('stroke', 'white');
        


  };

  return (
    <div id="chart-container" style={{ height: '400px' }}></div>
  );
};

export default Chart2_1;

