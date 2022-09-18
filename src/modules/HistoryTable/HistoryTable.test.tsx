import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { historyColumn } from 'constants/columns';
import { setSearchTerm } from 'state/user/slice';
import { searchHistory } from 'testData';
import { SearchStep, SnackBarType } from 'types';
import HistoryTable from '.';
import configureStore from 'redux-mock-store';
import { RootState } from 'store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const initialState: Pick<RootState, 'user'> = {
  user: {
    loading: false,
    githubUser: {
      name: '',
      avatarUrl: '',
      followers: 0,
      following: 0,
      publicRepos: 0,
      login: '',
      htmlUrl: '',
    },
    githubUserRepos: [],
    snackBar: {
      openSnackBar: true,
      snackBarStatus: SnackBarType.SUCCESS,
      messages: 'Success',
    },
    step: SearchStep.USER,
    searchHistory: [],
    searchTerm: '',
  },
};
const mockStore = configureStore();
const mockedStore = mockStore(initialState);

const renderHistoryTable = () => {
  const history = createMemoryHistory();

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
        <Provider store={mockedStore}>
          <Router location={'/history'} navigator={history}>
            <HistoryTable
              data={searchHistory}
              page={0}
              rowsPerPage={5}
              count={3}
              setPage={() => jest.fn()}
              setRowsPerPage={() => jest.fn()}
              columns={historyColumn}
            />
          </Router>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const mockedUsedNavigate = jest.fn();
const mockedUseDispatchFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as any),
  useDispatch: () => mockedUseDispatchFn,
}));

describe('<HistoryTable />', () => {
  it('should render history table with column headers', () => {
    renderHistoryTable();
    expect(screen.getByText(/Name/)).toBeInTheDocument();
  });

  it('should render history names', () => {
    renderHistoryTable();

    expect(screen.getByText('jack')).toBeInTheDocument();
  });

  it('should trigger setSearchTerm, when clicking in a history item', async () => {
    renderHistoryTable();
    userEvent.click(screen.getByText('alex'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');

    expect(mockedUseDispatchFn).toHaveBeenCalledWith(setSearchTerm('alex'));
  });
});
