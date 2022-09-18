import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'rootSaga';
import user from 'state/user/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: user,
  },

  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
