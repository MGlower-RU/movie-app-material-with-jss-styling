import React, { useContext, useState } from 'react';

import { AppBar, Toolbar, Typography, Container, InputBase } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

import { MovieContext } from './Context';

const useStyles = makeStyles(theme => ({
  flex: {
    flexDirection: 'column',
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      padding: theme.spacing(0, 2)
    },
  },
  title: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
    fontSize: '26px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(0),
      fontSize: '34px'
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  const { dispatch, state } = useContext(MovieContext)
  const [inputValue, setInputValue] = useState('')

  const classes = useStyles()

  function changeMovieTitle(e) {
    e.preventDefault()
    if(state.movieTitle.trim().toLowerCase() !== inputValue.trim().toLowerCase()) {
      if(inputValue.trim() === '') {
        dispatch({type: 'title', titleName: 'Avengers'})
      } else {
        dispatch({type: 'title', titleName: inputValue.trim()})
      }
    }
    setInputValue('')
  }

  return (
    <Container maxWidth={false} disableGutters={true}>
      <AppBar position='static'>
        <Toolbar className={classes.flex}>
          <Typography className={classes.title} variant="h4" noWrap>
            Movie App
          </Typography>
          <form onSubmit={changeMovieTitle} className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </form>
        </Toolbar>
      </AppBar>
    </Container>
  )
}