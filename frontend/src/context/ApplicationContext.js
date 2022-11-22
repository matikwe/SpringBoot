import React from 'react';

const defaultValue = {
  films: [],
  categories: [],
  actors: [],
  directors: [],
  user: {},
  isLoading: false,
};

export const ApplicationContext = React.createContext(defaultValue);
