import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/Pagination';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import colors from 'theme/colors.module.scss';
import { GithubUserRepo, RepoColumn } from 'types';

interface Props {
  data: GithubUserRepo[];
  page: number;
  rowsPerPage: number;
  count: number;
  setPage: (page: number) => any;
  setRowsPerPage: (page: number) => any;
  columns: RepoColumn[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      overflow: 'hidden',
      '&  .MuiTableContainer-root': {
        maxHeight: '70vh',
        minHeight: '360px',
      },
    },

    headerCell: {
      backgroundColor: `${theme.palette.primary.main}`,
      color: `${colors.white}`,
    },
    row: {
      cursor: 'pointer',
      minHeight: '100px !important',
    },
  })
);

export default function RepositoriesTable({
  data,
  page,
  rowsPerPage,
  count,
  setPage,
  setRowsPerPage,
  columns,
}: Props) {
  const classes = useStyles();

  return (
    <Paper
      variant="outlined"
      className={classes.paper}
      data-testid="repos_table"
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(
                (column) =>
                  column.id !== 'svnUrl' && (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                      className={classes.headerCell}
                    >
                      {column.label}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  onClick={() => {
                    window.location.replace(row['svnUrl']);
                  }}
                  className={classes.row}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      column.id !== 'svnUrl' && (
                        <TableCell key={column.id}>
                          {column.convert
                            ? column.convert(value.toString())
                            : value.toString()}
                        </TableCell>
                      )
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Paper>
  );
}
