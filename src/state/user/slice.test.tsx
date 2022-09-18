import {
  initialState,
  selectGithubUser,
  setGithubUser,
  UserState,
} from './slice';
import userRuducer from './slice';
import { githubUser } from 'testData';
import { RootState } from 'store';

describe('User Slice', () => {
  describe('Reducers', () => {
    it('should return initial state', () => {
      expect(userRuducer(initialState, { type: 'unkown' })).toEqual(
        initialState
      );
    });

    it('should set shows on setEmployee', () => {
      const finalState: UserState = {
        ...initialState,
        githubUser: githubUser,
      };

      expect(userRuducer(initialState, setGithubUser(githubUser))).toEqual(
        finalState
      );
    });
  });
  describe('Selectors tests', () => {
    const state: UserState = {
      ...initialState,
      githubUser,
    };

    const rootState = {
      user: state,
    } as RootState;

    it('should return employee', () => {
      expect(selectGithubUser(rootState)).toEqual(githubUser);
    });
  });
});
