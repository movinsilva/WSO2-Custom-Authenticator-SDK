import ReactDOM from 'react-dom/client';
import App from './App.tsx';

//import {AsgardeoProvider} from 'asgardeo-react';
import AsgardeoProvider from '../../../../packages/react/src/components/asgardeo-provider/asgardeo-provider.tsx';

const config = {
  baseUrl: 'https://localhost:9443',
  clientId: 'fyGmog7fpcFgTNTOqLFIGIt2laQa',
  scope: 'openid internal_login',
  redirectUri: 'https://localhost:5173',
};

// customization={{
//   preference: {
//     theme: {
//       LIGHT: {loginBox: {background: {backgroundColor: '#c19012'}}},
//     },
//   },
// }}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AsgardeoProvider config={config}>
    <App />
  </AsgardeoProvider>,
);
