import {withStyles ,makeStyles} from '@material-ui/core/styles'
import TableCell from "@material-ui/core/TableCell";
import  TableRow from "@material-ui/core/TableRow";


 export const   StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  export const  StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  export const useStyles = makeStyles({

    reset: {
      background: 'none',
      color: 'inherit',
      border: 'none',
      padding: '0',
      font: 'inherit',
      cursor: 'pointer',
      outline: 'inherit'
    },
  
    table: {
      minWidth: 650,
      display: 'block',
      width: '60%',
      margin: '40px auto',
  
    },
  });
