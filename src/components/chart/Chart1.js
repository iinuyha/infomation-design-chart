import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3'; // D3 라이브러리 import
import './Chart1.css'; // CSS 파일 import

const Chart1 = () => {
  const [data, setData] = useState([3100, 3500]);
  const [growthRate, setGrowthRate] = useState(null);
  const arrowRef = useRef(null); // D3를 적용할 요소에 대한 Ref

  useEffect(() => {
    // 데이터 배열에서 성장률을 계산
    const startValue = data[0];
    const endValue = data[1];
    const growthRateValue = ((endValue - startValue) / startValue) * 100;

    // 성장률을 소수점 두 자리까지 문자열로 변환
    const formattedGrowthRate = growthRateValue.toFixed(2);

    // 성장률을 상태에 저장
    setGrowthRate(formattedGrowthRate);

    // D3를 사용하여 삼각형 그리기
    if (arrowRef.current) {
      const svg = d3.select(arrowRef.current);

      const rect = svg
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 150)
        .attr('height', 80)
        .style('fill', '#9c86f7') // 보라색으로 변경
        .style('transform', 'translate(5%, 24%) scale(0.5)');

      const triangle = svg
        .append('polygon')
        .attr('points', '0, 0 100,50 0, 100')
        .style('fill', '#9c86f7') // 보라색으로 변경
        .style('transform', 'translate(30%, 17%) scale(0.6)');

      const growthText = svg
        .append('text')
        .attr('id', 'growth')
        .attr('x', 25) // x 좌표 설정
        .attr('y', 62) // y 좌표 설정
        .style('font-size', '20px') // 텍스트 크기 조절
        .style('fill', 'white') // 흰색이면서 투명도 50%
        .text(`+ ${growthRate}%`);

      const text = svg
        .append('text')
        .attr('id', 'growth')
        .attr('x', 17) // x 좌표 설정
        .attr('y', 15) // y 좌표 설정
        .style('font-size', '20px') // 텍스트 크기 조절
        .style('fill', '#cdcdcd')
        .style('letter-spacing', '2px') // 자간 조절
        .text(`worldwide`);

    }
  }, [data, growthRate]);

  return (
    <div>
      <div id='box'>
        <div id='2018'>
          <p className='year'>2018</p>
          <p className='number'>{data[0]}</p>
          <p className='million'>billon dollars</p>
        </div>
        <div id='arrow'>
          {/* {growthRate !== null && <p id='growth'>+ {growthRate}%</p>} */}
          {/* D3를 적용할 요소에 Ref 적용 */}
          <svg ref={arrowRef}></svg>
        </div>
        <div id='2021'>
          <p className='year'>2021</p>
          <p className='number'>{data[1]}</p>
          <p className='million'>billon dollars</p>
        </div>
      </div>
    </div>
  );
};

export default Chart1;
