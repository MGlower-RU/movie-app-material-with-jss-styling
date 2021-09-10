import React, { useEffect, useReducer } from 'react'

import Context from './Context'

const initialState = {
  loading: true,
  movies: [],
  movieTitle: 'Avengers'
};

function reducer(state, action) {
  switch (action.type) {
    case 'loaded':
      return {...state, loading: false, movies: action.movieData};
    case 'title':
      return {...state, loading: true, movieTitle: action.titleName};
    case 'noMovies':
      return {...state, loading: false, movies: []};
    default:
      throw new Error();
  }
}

export default function Reducer(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${state.movieTitle}&apikey=${process.env.REACT_APP_API_KEY}`, {
      "method": "GET",
    })
    .then(response => response.json())
    .then(movies => {
      if(movies.Search !== undefined && movies.Search.length !== 0) {
        dispatch({type: 'loaded', movieData: movies.Search})
      } else {
        dispatch({type: 'noMovies'})
      }
    })
    .catch(err => {
      console.error(err);
    });
  }, [state.movieTitle, state.loading])

  return (
    <Context value={{state, dispatch}}>
      {props.children}
    </Context>
  );
}