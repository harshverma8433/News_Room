import React from 'react';
import ReactDOM from 'react-dom'; // Correct import for React 16
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './Components/Context/SearchContext';

// Use ReactDOM.render for React 16
ReactDOM.render(
  <SearchProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </SearchProvider>,
  document.getElementById('root')
);

// Measuring performance in your app
reportWebVitals();
