import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {SnackbarProvider} from "notistack";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider/>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
);
