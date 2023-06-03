import React from 'react';

const defaultValue = {
  films: [],
  categories: [],
  actors: [],
  directors: [],
  user: {},
  reservations: [],
  orders: [],
  isLoading: false,
};

export const ApplicationContext = React.createContext(defaultValue);
