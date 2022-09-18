import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchStep } from 'state/user/slice';
import { SearchStep } from 'types';
import { createStyles, makeStyles } from '@mui/styles';

interface Props {
  name?: string;
  avatarUrl: string;
  bio?: string;
  email?: string;
  followers: number;
  following: number;
  login: string;
  url: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    cardActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& button': {
        margin: '0px',
      },
    },
  })
);

export default function UserCard({
  avatarUrl,
  name,
  bio,
  email,
  followers,
  following,
  login,
  url,
}: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card sx={{ maxWidth: 345 }} data-testid="user_card">
      <CardMedia component="img" height="140" image={avatarUrl} alt="avatar" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name ? name : login}
        </Typography>
        {email && (
          <Typography gutterBottom variant="h5" component="div">
            {email}
          </Typography>
        )}
        {bio && (
          <Typography variant="body2" color="text.secondary">
            {bio}
          </Typography>
        )}
      </CardContent>
      <CardContent>
        <Typography variant="body1" color="primary">
          followers: {followers}
        </Typography>
        <Typography variant="body1" color="primary">
          following: {following}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          onClick={() => dispatch(setSearchStep(SearchStep.REPOSITORIES))}
          variant="contained"
          color="primary"
        >
          Repos
        </Button>
        <Link href={url}>See github Profile</Link>
      </CardActions>
    </Card>
  );
}
