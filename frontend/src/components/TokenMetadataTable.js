import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TokenTable() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/token-metadata');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <tabl >
      <thead>
        <tr>
          <th>Total Supply</th>
          <th>Current USD Price</th>
          <th>Name</th>
          <th>Symbol</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.total_supply}</td>
          <td>${data.current_usd_price.toFixed(2)}</td>
          <td>{data.name}</td>
          <td>{data.symbol}</td>
        </tr>
      </tbody>
    </tabl>
  );
}

export default TokenTable;
