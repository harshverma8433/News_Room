import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState('all news');

  return (
    <SearchContext.Provider value={{ search, setSearch, category, setCategory  }}>
      {children}
    </SearchContext.Provider>
  );
};
