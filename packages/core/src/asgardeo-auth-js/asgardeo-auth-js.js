// import { AsgardeoAuthClient } from '@asgardeo/auth-js';

// export class AuthClient {
//   static instance;

//   static getInstance(authClientConfig, store, cryptoUtils) {
//     if (!AuthClient.instance) {
//       AuthClient.instance = new AsgardeoAuthClient();
//       AuthClient.instance.initialize(authClientConfig, store, cryptoUtils);
//     }
//     return AuthClient.instance;
//   }
// }

// export function configureAuthClient(authClientConfig, store, cryptoUtils) {
//   AuthClient.getInstance(authClientConfig, store, cryptoUtils);
// }

// export async function requestAccessToken(authCode, sessionState) {
//   return await AuthClient.instance.requestAccessToken(authCode, sessionState);
// }
