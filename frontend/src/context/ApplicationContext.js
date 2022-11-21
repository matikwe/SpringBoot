import React from 'react';

const defaultValue = {
  films: [],
  categories: [],
  actors: [],
  directors: [],
  isLoading: false,
};

export const ApplicationContext = React.createContext(defaultValue);
