import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import StarIcon from '@material-ui/icons/Star';
import StarOutline from '@material-ui/icons/Star';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingTop: 25,
    paddingLeft: 100,
  },
  card: {
    maxWidth: 345,
  },
});

/**
   * Renders cards for applications on homepage
   * @return {Grid} - Returns Grid of cards
   */
export default function Content() {
  const classes = useStyles();
  const data = [
    {name: 'Sample Flow', favorite: 1, link: 'sampleflow'},
    {name: 'Email', favorite: 1, link: '/'},
    {name: 'Slack', favorite: 0, link: '/'},
    {name: 'OneDrive', favorite: 1, link: '/'},
  ];
  const [clicked, setClicked] = useState();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {data.map((elem) => (
          <Grid item xs={3} key={data.indexOf(elem)}>
            <Card>
              <CardActionArea component={Link} to={`${elem.link}`}>
                <CardHeader
                  title={`${elem.name}`}
                />
                <CardContent>
                </CardContent>
              </CardActionArea>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => setClicked(true)}>
                  {clicked ? <StarIcon /> : <StarOutline />}
                </IconButton>
                <IconButton>
                  <NotificationsIcon/>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
