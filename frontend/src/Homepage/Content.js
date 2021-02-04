import React, {useState, useEffect} from 'react';
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
import axios from 'axios';

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
  const [services, setServices] = useState([]);

  useEffect(() => {
    /** Obtains list of subscribed services for current user
     *  @return {null} - Returns nothing, only updates state
     */
    async function fetchServices() {
      try {
        const response = await axios.get('/users/0/services');
        setServices(response.data[0].subscribedServices);
      } catch (error) {
        console.log(error);
        setServices([]);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {services.map((elem) => (
          <Grid item xs={3} key={services.indexOf(elem)}>
            <Card>
              <CardActionArea>
                <CardHeader
                  title={`${elem.name}`}
                />
                <CardContent>
                </CardContent>
              </CardActionArea>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {}}>
                  {elem.isFavorite ? <StarIcon /> : <StarOutline />}
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
