import { Box, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      width: '100%',
      maxWidth: '1200px',
      margin: 'auto',
      display: 'flex',
      padding: '20px',
      justifyContent: 'flex-end',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        '& a': {
          marginBottom: '20px',
        },
      },
    },
  })
);

const Navigation = () => {
  const classes = useStyles();
  const location = useLocation();

  const renderNavigation = () => {
    switch (location.pathname) {
      case '/':
        return <Link to="/history">history</Link>;
      case '/?search':
        return <Link to="/history">history</Link>;
      case '/history':
        return <Link to="/">Search</Link>;
    }
  };

  return <Box className={classes.actions}>{renderNavigation()}</Box>;
};

export default Navigation;
