import React from 'react';

import Reducer from './components/Reducer';
import Header from './components/Header';
import Movies from './components/Movies';
import Footer from './components/Footer';

import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters={true} className={classes.pageWrapper}>
        <Reducer>
          <Header />
          <Movies />
          <Footer />
        </Reducer>
      </Container>
    </>
  );
}

export default App;
