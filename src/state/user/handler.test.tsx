import { AxiosError } from 'axios';
import { expectSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  getGithubUser,
  setGithubUser,
  setLoading,
  setSearchStep,
  setSnackBar,
} from './slice';
import { fetchGithubUser } from 'api';
import { githubUser } from 'testData';
import { getGithubUserSaga } from './handler';
import { SearchStep, SnackBarType } from 'types';
import { StorageKeys } from 'storage/StorageKeys';

describe('User Handler', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Get github User data', () => {
    it('should get user data', () => {
      return expectSaga(getGithubUserSaga, {
        type: getGithubUser.type,
        payload: 'iiyass',
      })
        .provide([[call(fetchGithubUser, 'iiyass'), githubUser]])
        .run()
        .then((result: { effects: any }) => {
          const { effects } = result;
          expect(effects.put).toHaveLength(4);
          expect(effects.put[0]).toEqual(put(setSearchStep(SearchStep.USER)));
          expect(effects.put[1]).toEqual(put(setLoading(true)));
          expect(effects.put[2]).toEqual(put(setGithubUser(githubUser)));
          expect(effects.put[3]).toEqual(put(setLoading(false)));
        });
    });

    it('should get save history to localStorage', async () => {
      jest.spyOn(Storage.prototype, 'setItem');
      Storage.prototype.setItem = jest.fn();

      await expectSaga(getGithubUserSaga, {
        type: getGithubUser.type,
        payload: 'iiyass',
      })
        .provide([[call(fetchGithubUser, 'iiyass'), githubUser]])
        .run();

      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        1,
        StorageKeys.SearchHistory,
        JSON.stringify([{ name: 'iiyass' }])
      );
    });

    it('should do error handling properly - SnackBar should pop-up', () => {
      const error = {
        message: 'Unexpected error!',
        response: { status: 500, data: { message: 'Unexpected error!' } },
        isAxiosError: true,
      } as AxiosError;

      return expectSaga(getGithubUserSaga, {
        type: getGithubUser.type,
        payload: 'iiyass',
      })
        .provide([[call(fetchGithubUser, 'iiyass'), throwError(error)]])
        .run()
        .then((result: { effects: any }) => {
          const { effects } = result;
          expect(effects.put).toHaveLength(4);
          expect(effects.put[0]).toEqual(put(setSearchStep(SearchStep.USER)));
          expect(effects.put[1]).toEqual(put(setLoading(true)));
          expect(effects.put[2]).toEqual(put(setLoading(false)));
          expect(effects.put[3]).toEqual(
            put(
              setSnackBar({
                snackBarStatus: SnackBarType.ERROR,
                openSnackBar: true,
                messages: 'Unexpected error!',
              })
            )
          );
        });
    });
  });
});
