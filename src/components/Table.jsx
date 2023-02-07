import PropTypes from 'prop-types';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import TextField from './TextField';

function Table({ firstColumnHeader, rows, tableName }) {
  // The first column header is usually the question, sometimes it's a blank
  const headers = [firstColumnHeader || '', 'Number of Residents', '% of Total Residents'];

  return (
    <TableContainer
      sx={{
        my: 2
      }}>
      <MuiTable aria-label={`${tableName} table`} size="small">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={`${tableName}-${header}`} align="center">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${tableName}-${index}`}>
              <TableCell component="th" scope="row" width={250}>
                {row.name}
              </TableCell>
              <TableCell align="right">
                <TextField value={row.numberOfResidents} />
              </TableCell>
              <TableCell align="right">
                <TextField value={row.percentOfTotalResidents} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

Table.propTypes = {
  tableName: PropTypes.string.isRequired,
  firstColumnHeader: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.node.isRequired,
      numberOfResidents: PropTypes.number.isRequired,
      percentOfTotalResidents: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Table;
