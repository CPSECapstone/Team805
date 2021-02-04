import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {IconButton} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'max-content',
    margin: 'auto',
    borderRadius: theme.shape.borderRadius,
  },
  search: {
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    fontSize: '24pt',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

/**
   * Renders searchbar for vendor marketplace
   * @return {div} - Returns the searchbar with text input and icon
   */
export default function SearchBar() {
  const classes = useStyles();

  const search = () => {
    document.getElementById('searchInput').value = '';
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <InputBase
              id='searchInput'
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
          <IconButton color='inherit' aria-label='Search' onClick={search}>
            <SearchIcon fontSize='large'/>
          </IconButton>
          <div className={classes.root} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
