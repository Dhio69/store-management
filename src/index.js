import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;1,100&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&family=Viga&display=swap" rel="stylesheet"></link>



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
