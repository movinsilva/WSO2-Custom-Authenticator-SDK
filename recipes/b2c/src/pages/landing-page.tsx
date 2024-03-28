import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../layouts/layout";
import "./landing-page.scss";
import { SignedIn } from "@asgardeo/react-ui";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout isFooter={true}>
      <div className="landing-page">
        <h1>Welcome to Fashion Mart</h1>
        <p>Discover the latest trends in fashion</p>
        <button onClick={() => navigate("/login")}>Shop Now</button>
        <SignedIn>
          <Navigate to="/home" />
        </SignedIn>
      </div>
    </Layout>
  );
};

export default LandingPage;
