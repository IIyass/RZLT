import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { RootState } from 'store';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import SearchForm from '.';
import { SearchStep, SnackBarType } from 'types';

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

const renderSearchForm = (searchTerm?: string) => {
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
        <Provider store={mockedStore}>
          <SearchForm search={searchTerm} />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('Search Form', () => {
  const labelSearch = 'Github username';
  const errorSearch = 'Required';
  const validSearch = 'iiyass';

  it('should match snapshot', () => {
    const { container } = renderSearchForm();
    expect(container).toMatchSnapshot();
  });

  it('should have empty search field initially', async () => {
    renderSearchForm();
    await waitFor(() =>
      expect(screen.getByLabelText(labelSearch)).toBeEmptyDOMElement()
    );
  });

  it('should have search field value initially', async () => {
    renderSearchForm('ilyass');
    await screen.findByDisplayValue('ilyass');
  });

  it('should show no errors when filling in search field', async () => {
    renderSearchForm();
    userEvent.type(screen.getByLabelText(labelSearch), validSearch);

    await screen.findByDisplayValue(validSearch);

    await waitFor(() => expect(screen.queryByText(errorSearch)).toBeNull());
  });

  describe('Validation errors', () => {
    it('if search is empty', async () => {
      renderSearchForm();

      await waitFor(() => expect(screen.queryByText(errorSearch)).toBeNull());

      userEvent.type(screen.getByLabelText(labelSearch), '');
      fireEvent.focusOut(screen.getByLabelText(labelSearch));
      await screen.findByText(errorSearch);
    });
  });
});
