import ReactDOM from "react-dom/client";
import App from "./App.tsx";

//import { AsgardeoProvider } from "@asgardeo/react-ui";
import {
  AsgardeoProvider,
  AuthConfig,
  BrandingPreferenceTypes,
} from "../../../../packages/react/src/index.ts";

const config: AuthConfig = {
  baseUrl: "https://localhost:9443",
  clientID: "b1uRjwpqydvxjGR42Y6BnIdQMRMa",
  scope: ["openid", "internal_login", "profile"],
  signInRedirectURL: "https://localhost:5173",
  enableConsoleTextBranding: true,
};

const devConfig: AuthConfig = {
  baseUrl: "https://dev.api.asgardeo.io/t/movinorg",
  clientID: "kH5OfXOvpGLOvp1iAw4zQmNvv4oa",
  scope: ["openid", "internal_login", "profile"],
  signInRedirectURL: "https://localhost:5173",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AsgardeoProvider
    config={config}
    customization={{
      locale: "fr-FR",
      name: "carbon.super",
      type: BrandingPreferenceTypes.ORG,
      preference: {
        theme: {
          LIGHT: { loginBox: { background: { backgroundColor: "#ADC8E6" } } },
          DARK: { colors: { primary: { main: "#000000"}}}
        },
        text: {
          "en-US": {
            login: {
              "login.header": "Provider is here!",
            },
          },
        },
      },
    }}
  >
    <App />
  </AsgardeoProvider>
);
