import Layout from "../layouts/layout";
import { useAuthentication } from "@asgardeo/react-ui";
import "./home-page.scss";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { user } = useAuthentication();
  const navigate = useNavigate();
  console.log(user);
  return (
    <Layout>
      <div className="home-page">
        <h1>Hi {user?.name?.givenName} !</h1>
        <p>Discover the latest trends in fashion</p>
        <button
          className="home-profile"
          onClick={() => navigate("../profile", { replace: false })}
        >
          Check out your profile
        </button>
      </div>
    </Layout>
  );
};

export default HomePage;
