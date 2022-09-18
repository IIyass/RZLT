import { ReactNode } from 'react';

export enum SnackBarType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface GithubUser {
  name?: string;
  avatarUrl: string;
  bio?: string;
  email?: string;
  followers: number;
  following: number;
  publicRepos: number;
  login: string;
  htmlUrl: string;
}

export interface GithubUserRepo {
  name: string;
  htmlUrl: string;
  forksCount: number;
  createdAt: string;
  svnUrl: string;
}

export interface SearchHistory {
  name: string;
}

export interface RepoColumn {
  id: 'name' | 'createdAt' | 'htmlUrl' | 'forksCount' | 'svnUrl';
  label: string;
  minWidth?: number;
  convert?: (value: string) => string;
  icon?: () => ReactNode;
}

export interface HistoryColumn {
  id: 'name';
  label: string;
  minWidth?: number;
}

export enum SearchStep {
  USER = 'USER',
  REPOSITORIES = 'REPOSITORIES',
}
