import axios from 'axios';
import Config from 'config';
import { camelizeKeys } from 'humps';
import { GithubUser, GithubUserRepo } from 'types';

const fetchGithubUser = async (username: string): Promise<GithubUser> => {
  const response = await axios.get(`${Config.baseUrl}/${username}`);
  return camelizeKeys(response.data) as GithubUser;
};

const fetchGithubUserRepos = async (
  username: string,
  perPage: number,
  page: number
): Promise<GithubUserRepo> => {
  const response = await axios.get(`${Config.baseUrl}/${username}/repos`, {
    params: { per_page: perPage, page: page + 1 },
  });
  return camelizeKeys(response.data) as GithubUserRepo;
};

export { fetchGithubUser, fetchGithubUserRepos };
