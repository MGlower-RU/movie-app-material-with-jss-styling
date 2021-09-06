import React, { useContext } from 'react';

import { Card, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { MovieContext } from './Context';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    marginTop: '80px',
    marginBottom: '100px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
      marginBottom: '50px',
    },
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  gridItem: {
    [theme.breakpoints.down(769)]: {
      maxWidth: '50%',
      flexBasis: '50%',
    },
    [theme.breakpoints.down(500)]: {
      maxWidth: '100%',
      flexBasis: '100%',
    },
  },
  card: {
    minHeight: '300px',
    height: '100%',
    width: '100%',
  },
  control: {
    padding: theme.spacing(2),
  },
  media: {
    height: '240px',
  },
  noMoviesTitle: {
    width: '100%',
    textAlign: 'center'
  }
}));

export default function Movies() {
  const { state } = useContext(MovieContext)

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {
        state.loading ?
        <MoviesGrid classes={classes} state={state} isSkeleton={true} />
        :
        state.movies.length > 0 ?
        <MoviesGrid classes={classes} state={state} isSkeleton={false} />
        :
        <Typography variant="h5" component="h1" className={classes.noMoviesTitle}>
          There are no movies with this title
        </Typography>
      }
    </Container>
  )
}

function MoviesGrid({classes, state, isSkeleton}) {
  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" spacing={4} wrap='wrap'>
          {isSkeleton ?
            <>
              {new Array(9).fill(0).map((_, i) => {
                return (
                  <Grid key={i} item xs={4} className={classes.gridItem}>
                    <Card className={classes.card}>
                      <Skeleton
                        variant='rect'
                        animation="wave"
                        width='100%'
                        classes={{
                          root: classes.media
                        }}
                      />
                      <CardContent>
                        <Skeleton animation="wave" width='100%' height={40}>
                          <Typography gutterBottom variant="h5" component="h2" />
                        </Skeleton>
                        <Skeleton animation="wave" width='30%' height={30}>
                          <Typography variant="body2" color="textSecondary" component="p" />
                        </Skeleton>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </>
            :
            state.movies
            .sort((a, b) => {
              return b.Year.substr(0, 4) - a.Year.substr(0, 4)
            })
            .map((el) => {
              return (
                <Grid key={el.imdbID} item xs={4} className={classes.gridItem}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={el.Poster || 'https://via.placeholder.com/200/000000/FFFFFF/?text=NoPoster'}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {el.Title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {el.Year}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    </Grid>
  )
}