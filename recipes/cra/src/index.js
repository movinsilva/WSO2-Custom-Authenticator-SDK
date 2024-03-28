import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AsgardeoProvider } from '@asgardeo/react-ui';

const config = {
  baseUrl: "https://localhost:9443",
  clientId: "fyGmog7fpcFgTNTOqLFIGIt2laQa",
  scope: "openid internal_login",
  redirectUri: "https://localhost:5173",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AsgardeoProvider config={config}>
      <App />
    </AsgardeoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
