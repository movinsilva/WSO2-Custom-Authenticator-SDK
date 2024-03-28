import ReactDOM from "react-dom/client";
import App from "./App.tsx";

//import { AsgardeoProvider } from "@asgardeo/react-ui";
import AsgardeoProvider from "../../../../packages/react/src/components/asgardeo-provider/asgardeo-provider.tsx";
import {
  LanguageCode,
  Localization,
} from "@asgardeo/react-ui/src/models/localization.ts";

const config = {
  baseUrl: "https://localhost:9443",
  clientID: "b1uRjwpqydvxjGR42Y6BnIdQMRMa",
  scope: ["openid", "internal_login", "profile"],
  signInRedirectURL: "https://localhost:5173",
};

const customLocalization: Localization = {
  languageCode: LanguageCode.ENGLISH_US,
  languageResource: { login: { signinHeader: "Custom text works!" } },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AsgardeoProvider
    config={config}
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
