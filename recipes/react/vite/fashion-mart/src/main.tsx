import ReactDOM from "react-dom/client";
import { Router } from "./routes/router";
import "./app.scss";
import { AsgardeoProvider } from "@asgardeo/react-ui";

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
  signInRedirectURL: "https://localhost:5174",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AsgardeoProvider
    config={devConfig}
    customization={{
      preference: {
        theme: {
          LIGHT: {
            colors: { background: { surface: { main: "#686767" } } },
          },
        },
      },
    }}
  >
    <Router />
  </AsgardeoProvider>
);
