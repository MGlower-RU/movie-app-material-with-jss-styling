import React, { useContext, useState } from 'react';

import { Card, CardActionArea, CardContent, CardMedia, Container, Divider, Fab, Grid, makeStyles, Modal, Typography } from "@material-ui/core";
import { MovieContext } from './Context';
import { Rating, Skeleton } from '@material-ui/lab';
import { Close } from '@material-ui/icons';

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
  cardAction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',
  },
  control: {
    padding: theme.spacing(2),
  },
  media: {
    height: '240px',
    width: '100%'
  },
  noMoviesTitle: {
    width: '100%',
    textAlign: 'center'
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(0, 2)
  },
  modalPaper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: '15px',
    maxWidth: '900px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 8, 3, 4),
    [theme.breakpoints.down(769)]: {
      flexDirection: 'column',
      width: 'auto',
      padding: theme.spacing(2, 4, 3),
    },
  },
  modalImg: {
    width: '300px',
    height: '300px',
    flex: '0 0 auto',
    [theme.breakpoints.down(769)]: {
      display: 'none'
    },
  },
  modalText: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  },
  movieHeader: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem'
    },
  },
  movieRelease: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1, 0)
  },
  closeBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '16px',
    right: '24px',
    minHeight: '0',
    cursor: 'pointer',
    boxShadow: theme.shadows[2],
    '&:active': {
      boxShadow: theme.shadows[3],
    },
    [theme.breakpoints.down(769)]: {
      top: '10px',
      right: '10px',
      width: '24px',
      height: '24px',
      '& svg': {
        width: '16px',
        height: '16px'
      }
    },
  },
  imdbRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
    margin: theme.spacing(1, 0)
  },
  imdbRatingValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  movieGeneral: {
    margin: theme.spacing(1, 0)
  },
  plot: {
    marginTop: theme.spacing(1)
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
  const [open, setOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});

  const modalOpen = (movieId) => {
    fetch(`https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=dac294b0`, {
      "method": "GET",
    })
    .then(response => response.json())
    .then(movie => {
      console.log(movie)
      setMovieInfo(movie)
      setOpen(true)
    })
    .catch(err => {
      console.error(err);
    });
  };

  const modalClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" spacing={4} wrap='wrap'>
          <Modal
            open={open}
            onClose={modalClose}
            className={classes.modalContainer}
          >
            <Card className={classes.modalPaper}>
              <Fab
                size="small"
                onClick={modalClose}
                classes={{
                  root: classes.closeBtn,
                }}
              >
                <Close/>
              </Fab>
              <CardMedia
                className={classes.modalImg}
                image={movieInfo.Poster}
              />
              <CardContent classes={{root: classes.modalText}}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  className={classes.movieHeader}
                >
                  {movieInfo.Title}
                </Typography>
                <Divider />
                <div className={classes.movieRelease}>
                  <Typography gutterBottom variant="body1" component="p">
                    {movieInfo.Released}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {movieInfo.Rated}
                  </Typography>
                </div>
                <div className={classes.imdbRating}>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component="p"
                  >
                    imdbRating:
                  </Typography>
                  <div className={classes.imdbRatingValue}>
                    <Rating
                      defaultValue={Number(movieInfo.imdbRating)/2}
                      precision={0.1}
                      readOnly
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {movieInfo.imdbRating}/10
                    </Typography>
                  </div>
                </div>
                <Divider />
                <div className={classes.movieGeneral}>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component="p"
                  >
                    <b>Production:</b> {movieInfo.Production}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component="p"
                  >
                  <b>Actors:</b> {movieInfo.Actors}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component="p"
                  >
                    <b>Box office:</b> {movieInfo.BoxOffice}
                  </Typography>
                </div>
                <Divider />
                <Typography
                  variant="body2"
                  color="textPrimary"
                  component="p"
                  className={classes.plot}
                >
                  {movieInfo.Plot}
                </Typography>
              </CardContent>
            </Card>
          </Modal>
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
                  <Card
                    className={classes.card}
                    onClick={() => modalOpen(el.imdbID)}
                  >
                    <CardActionArea classes={{root: classes.cardAction}}>
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
                    </CardActionArea>
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