import React from 'react';

const defaultValue = {
  movies: [],
  categories: [],
  actors: [],
  directors: [],
  isLoading: false,
};

export const ApplicationContext = React.createContext(defaultValue);
