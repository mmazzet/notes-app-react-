import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'flag-icons/css/flag-icons.min.css';

import React, { Suspense } from "react";
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './utils/i18n';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const loadingMarkup = (
  <div className="py-4 text-center"><h2>Loading...</h2></div>
);
root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
