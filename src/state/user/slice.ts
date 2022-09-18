import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import {
  GithubUser,
  GithubUserRepo,
  SearchHistory,
  SearchStep,
  SnackBarType,
} from 'types';

interface SnackBar {
  snackBarStatus: SnackBarType | undefined;
  openSnackBar: boolean;
  messages?: any;
}

export interface UserState {
  loading: boolean;
  githubUser?: GithubUser;
  githubUserRepos: GithubUserRepo[];
  snackBar: SnackBar;
  step: SearchStep;
  searchHistory: SearchHistory[];
  searchTerm: string;
}

export const initialState: UserState = {
  loading: false,
  githubUser: undefined,
  githubUserRepos: [],
  snackBar: {
    openSnackBar: false,
    snackBarStatus: undefined,
    messages: null,
  },
  step: SearchStep.USER,
  searchHistory: [],
  searchTerm: '',
};
export const getGithubUser = createAction<string>('getGithubUser');

export const loadSearchHistory = createAction('loadSearchHistory');

export const getGithubUserRepos = createAction<{
  search: string;
  rowsPerPage: number;
  page: number;
}>('getGithubUserRepos');

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setSnackBar: (state: UserState, action: PayloadAction<SnackBar>) => {
      state.snackBar.snackBarStatus = action.payload.snackBarStatus;
      state.snackBar.openSnackBar = action.payload.openSnackBar;
      state.snackBar.messages = action.payload.messages;
    },

    setGithubUser: (state: UserState, action: PayloadAction<any>) => {
      state.githubUser = action.payload;
    },

    setGithubUserRepos: (state: UserState, action: PayloadAction<any>) => {
      state.githubUserRepos = action.payload;
    },
    setSearchStep: (state: UserState, action: PayloadAction<SearchStep>) => {
      state.step = action.payload;
    },

    setSearchHistory: (
      state: UserState,
      action: PayloadAction<SearchHistory[]>
    ) => {
      state.searchHistory = action.payload;
    },

    setSearchTerm: (state: UserState, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});
export const {
  setLoading,
  setSnackBar,
  setGithubUser,
  setGithubUserRepos,
  setSearchStep,
  setSearchHistory,
  setSearchTerm,
} = user.actions;

export const selectSnackBar = (state: RootState) => ({
  status: state.user.snackBar.snackBarStatus,
  open: state.user.snackBar.openSnackBar,
  messages: state.user.snackBar.messages,
});
export const selectLoading = (state: RootState) => state.user.loading;
export const selectGithubUser = (state: RootState) => state.user.githubUser;
export const selectGithubUserRepos = (state: RootState) =>
  state.user.githubUserRepos;
export const selectSearchStep = (state: RootState) => state.user.step;
export const selectSearchHistory = (state: RootState) =>
  state.user.searchHistory;

export const selectSearchTerm = (state: RootState) => state.user.searchTerm;

export default user.reducer;
