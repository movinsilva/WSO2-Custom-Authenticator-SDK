import {
  SignIn,
  SignedIn,
  SignedOut,
  useAuthentication,
} from "@asgardeo/react-ui";
import "./login-page.scss";
import { Navigate } from "react-router-dom";
import fashionLogo from "../assets/fashion-logo.png";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>{<Navigate to="/home" />}</SignedIn>
    </div>
  );
};

export default LoginPage;
