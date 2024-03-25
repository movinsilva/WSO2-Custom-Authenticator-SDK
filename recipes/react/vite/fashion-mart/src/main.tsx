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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AsgardeoProvider
    config={config}
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
