import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./protected-route";
import LandingPage from "../pages/landing-page";
import LoginPage from "../pages/login-page";
import ProfilePage from "../pages/profile-page";
import HomePage from "../pages/home-page";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
