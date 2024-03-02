import ReactDOM from 'react-dom/client';
import App from './App.tsx';
//import { AsgardeoProvider } from 'asgardeo-react'
import {AsgardeoProvider} from '../../../react/src/components/asgardeo-provider/asgardeo-provider.tsx';

const config = {
  baseUrl: 'https://localhost:9443',
  clientId: '4qrmXXQ9_QFaYCmUrBRYsnwiSgga',
  scope: 'openid internal_login',
  redirectUri: 'https://localhost:5173',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AsgardeoProvider
    config={config}
    customization={{
      preference: {
        theme: {
          LIGHT: {loginBox: {background: {backgroundColor: '#a29012'}}},
        },
      },
    }}
  >
    <App />
  </AsgardeoProvider>,
);
