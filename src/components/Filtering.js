import React, { useState, useEffect } from 'react';

const Filtering = ({ onYearChange }) => {
  const [filterYear, setFilterYear] = useState('All');

  const handleFilterYearChange = (event) => {
    const selectedValue = event.target.value;
    setFilterYear(selectedValue);
  };

  // useEffect를 사용하여 필터 값이 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    onYearChange(filterYear);
  }, [filterYear, onYearChange]);

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: '0px'}}>
      <strong style={{ color: 'white', fontSize: '20px' }}>Year : </strong>
      <select
        value={filterYear}
        onChange={handleFilterYearChange}
        style={{
          fontSize: '15px',
          padding: '5px',
          borderRadius: '4px',
          border: '0px solid white',
          backgroundColor: '#AAA9A9',
          color: '#000',
          fontFamily: 'PyeongChangPeace-Bold'
        }}
      >
        <option value="All">All</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
      </select>
    </div>
  );
};

export default Filtering;
