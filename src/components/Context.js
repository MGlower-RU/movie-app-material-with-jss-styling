import React, { createContext } from 'react';

export const MovieContext = createContext();

export default function Context(props) {
  return (
    <MovieContext.Provider value={props.value}>
      {props.children}
    </MovieContext.Provider>
  )
}