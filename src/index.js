import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//react-grid-layout 사용하기 위해 import
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);