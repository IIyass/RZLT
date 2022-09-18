import { format } from 'date-fns';
import { HistoryColumn, RepoColumn } from 'types';

export const repoColumns: RepoColumn[] = [
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 100,
    convert: (value: string) => format(new Date(value), 'MM/dd/yyyy'),
  },
  {
    id: 'forksCount',
    label: 'Forks Count',
    minWidth: 170,
  },
  {
    id: 'svnUrl',
    label: 'svnUrl',
    minWidth: 170,
  },
];

export const historyColumn: HistoryColumn[] = [
  { id: 'name', label: 'Name', minWidth: 100 },
];
