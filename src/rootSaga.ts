import { fork, all } from 'redux-saga/effects';
import { watcherUserSagas } from 'state/user/handler';

export function* rootSaga() {
  yield all([fork(watcherUserSagas)]);
}
