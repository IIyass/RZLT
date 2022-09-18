import { TablePagination } from '@mui/material';

interface Props {
  count: number;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (page: number) => void;
}
const Pagination = ({
  count,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}: Props) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, 100]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
