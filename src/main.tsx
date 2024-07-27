import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer position="bottom-right" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
