import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  box404: {
    backgroundColor: 'beige',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '900%',
    textAlign: 'center',
  },
  text404: {
    margin: '0px',
  },
  subtext: {
    marginTop: '0px',
    fontSize: '20%',
  },
  homelink: {
    color: '',
    textDecoration: 'none',
  },
});

/**
 * asdfas
 *
 * @export
 * @return {*}
 */
export default function Page404() {
  const classes = useStyles();
  return (
    <div className={classes.box404}>
      <div>
        <p className={classes.text404}>404</p>
        <p className={classes.subtext}>You tried accessing an invalid page!
          <a href="/" className={classes.homelink}> Click Here</a> to go home.
        </p>
      </div>
    </div>
  );
};
