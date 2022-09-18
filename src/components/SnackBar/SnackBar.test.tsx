import { screen } from '@testing-library/react';
import SnackBar from '.';
import configureStore from 'redux-mock-store';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { Provider } from 'react-redux';
import { RootState } from 'store';
import { render } from '@testing-library/react';
import { SearchStep, SnackBarType } from 'types';

describe('<SnackBar />', () => {
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

  it('should render the SnackBar', () => {
    render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme()}>
          <Provider store={mockedStore}>
            <SnackBar />
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    );

    expect(screen.getByText(/Success/)).toBeInTheDocument();
  });
});
