import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Search from 'pages/Search';
import History from 'pages/SearchHistory';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import { baseTheme } from 'theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SnackBar from 'components/SnackBar';
import Navigation from 'modules/Navigation';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={baseTheme}>
          <Provider store={store}>
            <Navigation />
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/history" element={<History />} />
            </Routes>
            <SnackBar />
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
