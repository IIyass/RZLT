import { TextField, Theme } from '@mui/material';
import { Box } from '@mui/system';
import colors from 'theme/colors.module.scss';
import { createStyles, makeStyles } from '@mui/styles';

interface Props {
  error?: string;
  touched?: boolean;
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: colors.white,
      backgroundColor: theme.palette.error.main,
      margin: 0,
      padding: '5px',
    },
  })
);

const Input = ({
  error,
  touched,
  label,
  id,
  type,
  value,
  onChange,
  onBlur,
}: Props) => {
  const classes = useStyles();
  return (
    <Box>
      <TextField
        label={label}
        id={id}
        type={type}
        variant="outlined"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && touched && <p className={classes.error}>{error}</p>}
    </Box>
  );
};

export default Input;
