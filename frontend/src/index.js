import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CounterProvider } from './providers/counter';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CounterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CounterProvider>
  </React.StrictMode>
);
