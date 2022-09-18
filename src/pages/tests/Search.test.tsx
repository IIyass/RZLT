import { render, screen } from '@testing-library/react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { RootState } from 'store';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { SearchStep, SnackBarType } from 'types';
import Search from 'pages/Search';
import { getGithubUser, getGithubUserRepos } from 'state/user/slice';

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
const mockedStore = (state: RootState) => mockStore(state);

const renderSearchForm = (state: RootState) => {
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
        <Provider store={mockedStore(state)}>
          <Search />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('Search Form', () => {
  it('should match snapshot', () => {
    const { container } = renderSearchForm({
      user: {
        ...initialState.user,
        githubUser: {
          name: 'ilyass',
          avatarUrl: 'avatar.svg',
          followers: 10,
          following: 20,
          publicRepos: 20,
          login: 'iiyass',
          htmlUrl: 'url',
        },
      },
    });
    expect(container).toMatchSnapshot();
  });

  it('should get user information, if search term is available initially', async () => {
    renderSearchForm({
      user: {
        ...initialState.user,
        searchTerm: 'ilyass',
      },
    });
    expect(mockedUseDispatchFn).toHaveBeenCalledWith(getGithubUser('ilyass'));
  });

  it('should get user repositories information', async () => {
    renderSearchForm({
      user: {
        ...initialState.user,
        step: SearchStep.REPOSITORIES,
        githubUser: {
          name: 'ilyass',
          avatarUrl: 'avatar.svg',
          followers: 10,
          following: 20,
          publicRepos: 20,
          login: 'iiyass',
          htmlUrl: 'url',
        },
      },
    });
    expect(mockedUseDispatchFn).toHaveBeenCalledWith(
      getGithubUserRepos({ search: 'iiyass', rowsPerPage: 5, page: 1 })
    );
  });

  it('should render Go Back button, if search is repositories', () => {
    renderSearchForm({
      user: {
        ...initialState.user,
        step: SearchStep.REPOSITORIES,
        githubUser: {
          name: 'ilyass',
          avatarUrl: 'avatar.svg',
          followers: 10,
          following: 20,
          publicRepos: 20,
          login: 'iiyass',
          htmlUrl: 'url',
        },
      },
    });
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('should not render Go Back button, if search is user data', () => {
    renderSearchForm({
      user: {
        ...initialState.user,
        step: SearchStep.USER,
        githubUser: {
          name: 'ilyass',
          avatarUrl: 'avatar.svg',
          followers: 10,
          following: 20,
          publicRepos: 20,
          login: 'iiyass',
          htmlUrl: 'url',
        },
      },
    });
    expect(screen.queryByText('Go Back')).not.toBeInTheDocument();
  });

  it('should render loading circle, if data is not available yet.', async () => {
    renderSearchForm({
      user: {
        ...initialState.user,
        loading: true,
      },
    });
    expect(screen.getByTestId('loading_circle')).toBeInTheDocument();
  });

  it('should render user card, if seach step is USER', async () => {
    renderSearchForm({
      user: {
        ...initialState.user,
        step: SearchStep.USER,
        githubUser: {
          name: 'ilyass',
          avatarUrl: 'avatar.svg',
          followers: 10,
          following: 20,
          publicRepos: 20,
          login: 'iiyass',
          htmlUrl: 'url',
        },
      },
    });
    expect(screen.getByTestId('user_card')).toBeInTheDocument();
  });

  it('should render repositories table, if seach step is REPOSITORIES', async () => {
    renderSearchForm({
      user: {
        ...initialState.user,
        step: SearchStep.REPOSITORIES,
        githubUser: {
          name: 'ilyass',
          avatarUrl: 'avatar.svg',
          followers: 10,
          following: 20,
          publicRepos: 20,
          login: 'iiyass',
          htmlUrl: 'url',
        },
      },
    });
    expect(screen.getByTestId('repos_table')).toBeInTheDocument();
  });
});
