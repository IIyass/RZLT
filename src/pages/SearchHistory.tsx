import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadSearchHistory,
  selectLoading,
  selectSearchHistory,
} from 'state/user/slice';
import { useEffect, useState } from 'react';
import { historyColumn } from 'constants/columns';
import Table from 'modules/HistoryTable';

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      width: '100%',
      margin: '0 auto',
      padding: '24px',

      '& .MuiPaper-root': {
        margin: 'auto',
      },

      '& button': {
        marginBottom: '20px',
      },
    },
  })
);

const Search = () => {
  const searchHistory = useSelector(selectSearchHistory);
  const loading = useSelector(selectLoading);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSearchHistory());
  }, [dispatch]);

  return (
    <Container>
      <Box className={classes.box}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table
            data={searchHistory}
            page={page}
            rowsPerPage={rowsPerPage}
            count={searchHistory.length}
            setPage={(page: number) => setPage(page)}
            setRowsPerPage={(row: number) => setRowsPerPage(row)}
            columns={historyColumn}
          />
        )}
      </Box>
    </Container>
  );
};

export default Search;
