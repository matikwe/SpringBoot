import React from 'react';

const defaultValue = {
  movies: [],
  isLoading: false,
};

export const MoviesContext = React.createContext(defaultValue);
