import { PayloadAction } from '@reduxjs/toolkit';
import { fetchGithubUser, fetchGithubUserRepos } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { StorageKeys } from 'storage/StorageKeys';
import { GithubUser, SearchStep, SnackBarType } from 'types';
import {
  setLoading,
  setSnackBar,
  getGithubUser,
  setGithubUser,
  getGithubUserRepos,
  setGithubUserRepos,
  setSearchHistory,
  loadSearchHistory,
  setSearchStep,
} from './slice';

export function* getGithubUserSaga(action: PayloadAction<string>) {
  try {
    yield put(setSearchStep(SearchStep.USER));
    yield put(setLoading(true));
    const response: GithubUser = yield call(fetchGithubUser, action.payload);
    yield put(setGithubUser(response));
    yield put(setLoading(false));
    const searchHistory = window.localStorage.getItem(
      StorageKeys.SearchHistory
    );

    window.localStorage.setItem(
      StorageKeys.SearchHistory,
      JSON.stringify([
        ...JSON.parse(searchHistory ? `${searchHistory}` : '[]'),
        { name: action.payload },
      ])
    );
  } catch (error: any) {
    yield put(setLoading(false));
    yield put(
      setSnackBar({
        snackBarStatus: SnackBarType.ERROR,
        openSnackBar: true,
        messages: error.response.data.message,
      })
    );
  }
}

export function* getGithubUserRepoSaga(
  action: PayloadAction<{ rowsPerPage: number; page: number; search: string }>
) {
  try {
    yield put(setLoading(true));
    const { rowsPerPage, page, search } = action.payload;
    const response: unknown = yield call(
      fetchGithubUserRepos,
      search,
      rowsPerPage,
      page
    );
    yield put(setGithubUserRepos(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    yield put(
      setSnackBar({
        snackBarStatus: SnackBarType.ERROR,
        openSnackBar: true,
        messages: 'Error accured, please try again',
      })
    );
  }
}

export function* loadSearchHistorySaga() {
  try {
    yield put(setLoading(true));

    const searchHistory = window.localStorage.getItem(
      StorageKeys.SearchHistory
    );
    yield put(setSearchHistory(JSON.parse(searchHistory ?? '[]').reverse()));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    yield put(
      setSnackBar({
        snackBarStatus: SnackBarType.ERROR,
        openSnackBar: true,
        messages: 'Error accured, please try again',
      })
    );
  }
}

export function* watcherUserSagas() {
  yield takeLatest(getGithubUser.type, getGithubUserSaga);
  yield takeLatest(getGithubUserRepos.type, getGithubUserRepoSaga);
  yield takeLatest(loadSearchHistory.type, loadSearchHistorySaga);
}
