import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddIcon from '@material-ui/icons/Add';

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
   * @param {searchInput} props - text from the search bar
   * @return {Grid} - Returns Grid of cards
   */
export default function Content(props) {
  const classes = useStyles();
  const dataFromDB = [
    {name: 'Email', favorite: 1},
    {name: 'Slack', favorite: 0},
    {name: 'OneDrive', favorite: 1},
    {name: 'Super', favorite: 1},
    {name: 'Spreadsheets', favorite: 1},
    {name: 'Google Sheets', favorite: 1},
  ];
  const data = dataFromDB.filter((service) =>
    service.name.toLowerCase().includes(
        props.searchInput.toLowerCase()));
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
                  onClick={() => setClicked(true)}>
                  {clicked ? <AddIcon /> : <CheckCircleIcon />}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );

  Content.propTypes = {
    searchInput: PropTypes.string,
  };
}
