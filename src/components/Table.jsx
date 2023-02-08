import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  Box,
  Collapse,
  Divider,
  Button,
  TableContainer,
  Table as MuiTable,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@mui/material';

import { styled } from '@mui/material/styles';
import CopyToClipboard from './CopyToClipboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // striping
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

function Table({
  tableName,
  tableDescription,
  reportName,
  reportDetails,
  firstColumnHeader,
  rows
}) {
  const [open, setOpen] = useState(false);
  // The first column header is usually the question, sometimes it's a blank
  const headers = [firstColumnHeader || '', 'Number of Residents', '% of Total Residents'];

  const handleToggle = () => {
    setOpen(!open);
  };

  const ExpandMore = styled(({ ...props }) => {
    return (
      <Box
        sx={{
          display: 'flex-start',
          alignItems: 'center',
          marginLeft: 1
        }}>
        <Typography
          variant="caption"
          component="span"
          sx={{
            marginRight: -2
          }}>
          {reportName}
        </Typography>
        <Button gutterBottom {...props} />
      </Box>
    );
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }));

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        my: 2,
        padding: 1.2
      }}>
      {tableDescription && <Typography variant="subtitle2">{tableDescription}</Typography>}
      <ExpandMore expand={open} onClick={handleToggle} aria-expanded={open} aria-label="show more">
        <ExpandMoreIcon fontSize="small" />
      </ExpandMore>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          marginLeft: 2,
          marginTop: -1
        }}>
        {reportDetails}
      </Collapse>
      <Divider />
      <TableContainer
        sx={{
          maxHeight: 500
        }}>
        <MuiTable aria-label={`${tableName} table`} size="small" stickyHeader>
          <TableHead>
            <StyledTableRow>
              {headers.map((header) => (
                <TableCell key={`${tableName}-${header}`} align="left">
                  {header}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={`${tableName}-${index}`}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="left">
                  <CopyToClipboard text={row.numberOfResidents} />
                </TableCell>
                <TableCell align="left">
                  <CopyToClipboard text={row.percentOfTotalResidents} />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  );
}

Table.propTypes = {
  tableName: PropTypes.string.isRequired,
  reportName: PropTypes.string.isRequired,
  reportDetails: PropTypes.node,
  tableDescription: PropTypes.string,
  firstColumnHeader: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      numberOfResidents: PropTypes.number.isRequired,
      percentOfTotalResidents: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Table;
