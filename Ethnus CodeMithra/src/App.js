import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [month, setMonth] = useState('March');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/combined?month=${month}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Transaction Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      {data && (
        <>
          <TransactionsTable transactions={data.transactions} />
          <Statistics statistics={data.statistics} />
          <BarChart data={data.barChart} />
          <PieChart data={data.pieChart} />
        </>
      )}
    </div>
  );
}

export default App;