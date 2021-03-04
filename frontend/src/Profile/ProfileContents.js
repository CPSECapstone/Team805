import React, {Component} from 'react';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';

const useStyles = (theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardStyle: {
    display: 'block',
    width: '50vw',
    height: '50vw',
  },
  cardItems: {
    paddingTop: 25,
    paddingLeft: 50,
  },
});

/**
   * Renders profile info
   * @return {Grid} - Returns Grid of cards
   */
class ProfileContents extends Component {
  /**
   * Sets up props to be used in components
   * Should add more state fields later when we have a route for profile info
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
  }
  /**
   * Function needed for eslint to be happy
   */
  static get propTypes() {
    return {
      classes: PropTypes.any,
    };
  }
  /**
   * Returns data from the db. Should later use the profile route
   */
  componentDidMount() {
    axios.get('/users/0/')
        .then((response) => {
          this.setState({
            username: response.data.username,
            email: response.data.email,
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log('error', error);
        });
  }

  /**
   * Render function
   * @return {Grid}
   */
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{minHeight: '50vh'}}
        >
          <Grid item xs={3}>
            <Card className={classes.cardStyle}>
              <div className={classes.cardItems}>
                <Avatar className={classes.large}>T</Avatar>
                <h4> First Name</h4>
                <p>Test</p>
                <h4> Last Name</h4>
                <p>User</p>
                <h4>Username</h4>
                <p>{this.state.username}</p>
                <h4>Email</h4>
                <p>{this.state.email}</p>
                <Link href="#">Edit Info</Link>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(ProfileContents);

