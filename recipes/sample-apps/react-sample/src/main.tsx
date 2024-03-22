import ReactDOM from "react-dom/client";
import App from "./App.tsx";

//import { AsgardeoProvider } from "@asgardeo/react-ui";
import AsgardeoProvider from "../../../../packages/react/src/components/asgardeo-provider/asgardeo-provider.tsx";

const config = {
  baseUrl: "https://localhost:9443",
  clientID: "b1uRjwpqydvxjGR42Y6BnIdQMRMa",
  scope: ["openid", "internal_login", "profile"],
  signInRedirectURL: "https://localhost:5173",
};
// customization={{
//   preference: {
//     theme: {
//       LIGHT: {loginBox: {background: {backgroundColor: '#c19012'}}},
//     },
//   },
// }}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AsgardeoProvider config={config}>
    <App />
  </AsgardeoProvider>
);
