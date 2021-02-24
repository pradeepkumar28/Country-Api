import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'material-ui-search-bar';
import {StyledTableCell,StyledTableRow, useStyles} from './styles'


const useSortableData = (items, config = null) => {

  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {

    let sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {

        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;

      });
    }

    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  return { items: sortedItems, requestSort };
}



export default function TableFun({ data }) {

  const classes = useStyles();
  const { items, requestSort, sortConfig } = useSortableData(data);
  const [tableContent, setTableContent] = useState([]);
  const [searched, setSearched] = useState("")


  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const requestSearch = (searchedVal) => {
    let filteredRows = items.filter((row) => {

      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setTableContent(filteredRows);



  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  useEffect(() => {

    setTableContent(items);

  }, [items]);





  return (

    <TableContainer componen={Paper} >
      <Table className={classes.table} aria-label="customized table">
        <Box boxShadow={5}>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />

          <TableHead>
            <TableRow>
              <StyledTableCell>
                <button
                  type="button"
                  onClick={() => requestSort('name')}
                  className={getClassNamesFor('name')}
                  className={classes.reset}
                >
                  Name
                     </button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <button
                  type="button"
                  onClick={() => requestSort('callingCodes')}
                  className={getClassNamesFor('callingCodes')}
                  className={classes.reset}
                >
                  Calling Codes
            </button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <button
                  type="button"
                  onClick={() => requestSort('curriencies[0]')}
                  className={getClassNamesFor('curriencies[0]')}
                  className={classes.reset}
                >
                  Curriency&nbsp;
            </button>
              </StyledTableCell>
                <StyledTableCell align="right">
                Flag&nbsp;
                </StyledTableCell>
              <StyledTableCell align="right">
                
                <button
                  type="button"
                  onClick={() => requestSort('population')}
                  className={getClassNamesFor('population')}
                  className={classes.reset}
                >
                  Population&nbsp;
               </button>
               
              </StyledTableCell>
              
              <StyledTableCell align="right">
               
                <button
                  type="button"
                  onClick={() => requestSort('timezones[0]')}
                  className={getClassNamesFor('timezones[0]')}
                  className={classes.reset}
                 >
                  Time Zone&nbsp;
                </button>
             
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableContent.map((row) => (
              <StyledTableRow key={row.name}>
               
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
               
                <TableCell align="right">{row.callingCodes}</TableCell>
               
                <TableCell align="right">{row.currencies[0].name}</TableCell>
                
                <TableCell align="right"><img height='30px' width='50px' src={row.flag} alt='Flag' /></TableCell>
                
                <TableCell align="right">{row.population}</TableCell>
                
                <TableCell align="right">{row.timezones[0]}</TableCell>
              
              </StyledTableRow>
            ))}
          </TableBody>
        </Box>
      </Table>
    </TableContainer>

  );

}