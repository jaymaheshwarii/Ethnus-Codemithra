import React from 'react';

function Statistics({ statistics }) {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale Amount: ${statistics.totalSaleAmount.toFixed(2)}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
}

export default Statistics;