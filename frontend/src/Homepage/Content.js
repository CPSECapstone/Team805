import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    paddingLeft: 300,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: 300,
  },
  fullWidth: {
    width: '100%',
  },
}));
/**
   * Renders form using Renderer to generate components
   * @return {Grid} - Returns the rendered form
   */
export default function Content() {
  const classes = useStyles();

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <div className={classes.title}>
        <Typography variant='h5'>Welcome, User</Typography>
      </div>
      <div className={classes.content}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
          nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem
          felis nec erat
        </Typography>
      </div>
    </main>
  );
}
