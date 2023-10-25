import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // Replace with your API endpoint
    const apiUrl = 'http://0.0.0.0:8000/token-metadata/0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Total Supply</TableCell>
            <TableCell align="right">Current USD Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && (
            <TableRow>
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="right">{data.symbol}</TableCell>
              <TableCell align="right">{data.total_supply}</TableCell>
              <TableCell align="right">{data.current_usd_price}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



