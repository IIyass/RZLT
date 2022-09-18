import { Button, CircularProgress, Container } from '@mui/material';
import SearchForm from 'modules/SearchForm';
import { Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGithubUser,
  getGithubUserRepos,
  selectGithubUser,
  selectGithubUserRepos,
  selectLoading,
  selectSearchTerm,
  selectSearchStep,
  setSearchStep,
} from 'state/user/slice';
import UserCard from 'components/Card';
import { useEffect, useState } from 'react';
import { repoColumns } from 'constants/columns';
import Table from 'modules/RepositoriesTable';
import { SearchStep } from 'types';

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
  const githubUser = useSelector(selectGithubUser);
  const githubUserRepos = useSelector(selectGithubUserRepos);
  const loading = useSelector(selectLoading);
  const searchStep = useSelector(selectSearchStep);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  useEffect(() => {
    if (searchStep === SearchStep.REPOSITORIES && githubUser) {
      dispatch(
        getGithubUserRepos({ search: githubUser.login, rowsPerPage, page })
      );
    }
  }, [dispatch, rowsPerPage, page, searchStep, githubUser]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(getGithubUser(searchTerm));
    }
  }, [dispatch, searchTerm]);

  const renderSearch = () => {
    if (!githubUser) return;
    switch (searchStep) {
      case SearchStep.USER:
        return (
          <UserCard
            name={githubUser.name}
            avatarUrl={githubUser.avatarUrl}
            bio={githubUser.bio}
            email={githubUser.email}
            followers={githubUser.followers}
            following={githubUser.following}
            login={githubUser.login}
            url={githubUser.htmlUrl}
          />
        );
      case SearchStep.REPOSITORIES:
        return (
          <Table
            data={githubUserRepos}
            page={page}
            rowsPerPage={rowsPerPage}
            count={githubUser.publicRepos}
            setPage={(page: number) => setPage(page)}
            setRowsPerPage={(row: number) => setRowsPerPage(row)}
            columns={repoColumns}
          />
        );
    }
  };

  return (
    <Container>
      <Box className={classes.box}>
        {searchStep === SearchStep.REPOSITORIES && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(setSearchStep(SearchStep.USER))}
          >
            Go Back
          </Button>
        )}

        <SearchForm search={searchTerm} />

        {loading ? (
          <CircularProgress data-testid="loading_circle" />
        ) : (
          renderSearch()
        )}
      </Box>
    </Container>
  );
};

export default Search;
