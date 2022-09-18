import { IconButton, Snackbar, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnackBar, setSnackBar } from 'state/user/slice';
import { SnackBarType } from 'types';
import colors from 'theme/colors.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: `${colors.white}`,
      backgroundColor: 'transparent',
      margin: 0,
      padding: '5px',
      left: '50%',
      transform: 'translate(-50%, 0px)',
      '& .MuiPaper-root': {
        backgroundColor: theme.palette.error.main,
        borderRadius: 0,
      },
    },
    success: {
      color: 'green',
      left: '50%',
      transform: 'translate(-50%, 0px)',
      '& .MuiPaper-root': {
        backgroundColor: theme.palette.success.main,
        borderRadius: 0,
      },
    },
    transparent: {
      display: 'none',
    },
  })
);

const SnackBar = () => {
  const dispatch = useDispatch();
  const snackBar = useSelector(selectSnackBar);

  const classes = useStyles();
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() =>
          dispatch(
            setSnackBar({ snackBarStatus: undefined, openSnackBar: false })
          )
        }
      >
        X
      </IconButton>
    </>
  );

  return (
    <Snackbar
      className={
        snackBar.status === SnackBarType.ERROR
          ? classes.error
          : snackBar.status === SnackBarType.SUCCESS
          ? classes.success
          : classes.transparent
      }
      open={snackBar.open}
      autoHideDuration={300000000}
      onClose={() =>
        dispatch(
          setSnackBar({ snackBarStatus: undefined, openSnackBar: false })
        )
      }
      message={snackBar.messages}
      action={action}
    />
  );
};

export default SnackBar;
