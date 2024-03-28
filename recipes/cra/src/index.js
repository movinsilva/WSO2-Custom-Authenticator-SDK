import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AsgardeoProvider } from '@asgardeo/react-ui';

const config = {
  baseUrl: "https://localhost:9443",
  clientID: "b1uRjwpqydvxjGR42Y6BnIdQMRMa",
  scope: ["openid", "internal_login", "profile"],
  signInRedirectURL: "https://localhost:5173",
};

window.Buffer = window.Buffer || require('buffer').Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AsgardeoProvider config={config}>
      <App />
    </AsgardeoProvider>
);


