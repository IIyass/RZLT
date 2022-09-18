import configureStore from 'redux-mock-store';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { render, screen } from '@testing-library/react';
import Card from '.';
import { SearchStep, SnackBarType } from 'types';
import { Provider } from 'react-redux';
import { RootState } from 'store';

describe('<Card />', () => {
  it('should render the Card', () => {
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

    render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme()}>
          <Provider store={mockedStore}>
            <Card
              avatarUrl="avatar.png"
              name="ilyass"
              bio="i love coding"
              email="ilyass@ilyass.com"
              followers={12}
              following={12}
              login="iiyass"
              url="github/iiyass"
            />
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    );

    expect(screen.getByText('ilyass')).toBeInTheDocument();
    expect(screen.getByText(/ilyass@ilyass.com/)).toBeInTheDocument();
    expect(screen.getByText(/i love coding/)).toBeInTheDocument();
  });
});
