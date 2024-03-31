import ReactDOM from "react-dom/client";
import App from "./App.tsx";

//import { AsgardeoProvider } from "@asgardeo/react-ui";
import {
  AsgardeoProvider,
  LanguageCode,
  Localization,
} from "../../../../packages/react/src/index.ts";

const config = {
  baseUrl: "https://localhost:9443",
  clientID: "b1uRjwpqydvxjGR42Y6BnIdQMRMa",
  scope: ["openid", "internal_login", "profile"],
  signInRedirectURL: "https://localhost:5173",
};

const devConfig = {
  baseUrl: "https://dev.api.asgardeo.io/t/movinorg",
  clientID: "kH5OfXOvpGLOvp1iAw4zQmNvv4oa",
  scope: ["openid", "internal_login", "profile"],
  signInRedirectURL: "https://localhost:5173",
};

const customLocalization: Localization = {
  languageCode: LanguageCode.ENGLISH_US,
  languageResource: { login: { signinHeader: "Custom text works!" } },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AsgardeoProvider
    config={devConfig}
    localization={customLocalization}
    customization={{
      preference: {
        theme: {
          LIGHT: { loginBox: { background: { backgroundColor: "#ADC8E6" } } },
        },
      },
    }}
  >
    <App />
  </AsgardeoProvider>
);
